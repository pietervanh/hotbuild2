//IntelliSense for WebMatrix /VS
/// <reference path="../.vsdoc/jquery-1.9.1-vsdoc.js" /> 
/// <reference path="../.vsdoc/knockout-2.2.1.debug.js" />
var hotbuild2 = (function () {

    //Make sure settings are set / if not set defaults
    initialSettingValue('hotbuild_reset_time', 2000);
    initialSettingValue('hotbuild_requeue_amount', 50);
    initialSettingValue('hotbuild_show_key_on_buildbar', 'ON');

    var settings = decode(localStorage.settings);

    model.hotbuild_reset_time = parseInt(settings.hotbuild_reset_time);
    //fast check on bad reset_time input
    if (isNaN(model.hotbuild_reset_time)) {
        model.hotbuild_reset_time = 2000;
    }

    var hotbuild2 = {};

    function hbManager(resetTime) {
        var self = this;
        self.cycleResetTime = resetTime; //time you have to press again to loop trough list
        self.lastCycleTime = ko.observable(new Date());
        self.lastkey = ko.observable(0);
        self.cycleid = ko.observable(0);
        self.hotbuilds = ko.observableArray([""]);
        self.hotbuildPreviews = ko.observableArray([""]);
        self.hbtriggertime = ko.observable();
        self.previewvisible = ko.observable(false);

        self.debuginfo = ko.computed(function () {
            if (self.hotbuilds() !== undefined) {
                return self.hotbuilds().length;
            }
        }, this);

        self.unitName = ko.observable("");

        self.buildPreviewList = function (hbindex, hotbuilds) {
            //set the buildPreview list
            //debugger;
            if (hotbuilds !== undefined) {
                self.hotbuildPreviews([{ 'icon': '', 'json': '' }]);
                var unitinfo;
                for (var i = hbindex; i < hotbuilds.length; i++) {
                    if (self.knowsBuildCommand(hotbuilds[i].json)) {
                        unitinfo = model.unitSpecs[hotbuilds[i].json];
                        if (unitinfo.buildStructure) {
                            self.hotbuildPreviews.push({ 'icon': unitinfo.buildIcon, 'json': hotbuilds[i].json });
                        }
                    }
                }
                for (var j = 0; j < hbindex; j++) {
                    if (self.knowsBuildCommand(hotbuilds[j].json)) {
                        unitinfo = model.unitSpecs[hotbuilds[j].json];
                        if (unitinfo.buildStructure) {
                            self.hotbuildPreviews.push({ 'icon': unitinfo.buildIcon, 'json': hotbuilds[j].json });
                        }
                    }
                }
            }
        };
        //hide preview
        self.clean = function () {
            var current_time = _.now();
            if (current_time - self.hbtriggertime() > self.cycleResetTime) {
                self.previewvisible(false);
                self.previewvisible.notifySubscribers();
            }
        };

        self.hotBuild = function (event, hotbuilds) {
            self.hotbuilds(hotbuilds);
            if (model['maybeSetBuildTarget']) {
                if (self.knowsAnyBuildCommand()) {
                    var failDetect = 0;
                    do {
                        self.doCycleId(self.hotbuilds().length, event.which);
                        failDetect++;
                        if (failDetect > 1000) {
                            console.log("loop of death\n"); // I dont think this should ever happen...
                            return;
                        }
                    } while (!self.knowsBuildCommand(self.hotbuilds()[self.cycleid()].json) && self.knowsAnyBuildCommand());
                    self.hbtriggertime(_.now());
                    setTimeout(self.clean, self.cycleResetTime + 1000);
                    if (model.unitSpecs[self.hotbuilds()[self.cycleid()].json].buildStructure) {
                        //check if it' needs to be ImbaWalled
                        //self.wallbuilder.imbaWall(true, self.hotbuilds()[self.cycleid()].json);
                        model['maybeSetBuildTarget'](self.hotbuilds()[self.cycleid()].json);
                    }
                    else {
                        model.executeStartBuild(event, self.getBuildItemId());
                    }
                    self.unitName(model.unitSpecs[self.hotbuilds()[self.cycleid()].json].name);
                    self.buildPreviewList(self.cycleid(), self.hotbuilds());
                    self.previewvisible(true);
                    event.preventDefault();
                }
                else {
                    console.log('could not hotbuild item ' + self.debuginfo());
                }
            }
        };

        self.knowsAnyBuildCommand = function () {
            for (var i = 0; i < self.hotbuilds().length; i++) {
                if (self.knowsBuildCommand(self.hotbuilds()[i].json)) {
                    return true;
                }
            }
            return false;
        };

        self.knowsBuildCommand = function (cmd) {
            for (var i = 0; i < model.buildTabLists()[model.selectedBuildTabIndex()].length; i++) {
                if (model.buildTabLists()[model.selectedBuildTabIndex()][i].id == cmd) {
                    return true;
                }
            }
            return false;
        };

        //move trough hotbuilds array when pushing multiple time the same key in a certain time interval
        self.doCycleId = function (length, key) {
            var thisTime = new Date();
            if (thisTime - self.lastCycleTime > self.cycleResetTime || key != self.lastkey()) {
                //if (key != self.lastkey()) {
                self.cycleid(0);
            } else {
                self.cycleid(self.cycleid() + 1);
                if (self.cycleid() == length) {
                    self.cycleid(0);
                }
            }
            self.lastCycleTime = thisTime;
            self.lastkey(key);

        };


        self.getBuildItemId = function () {
            for (var i = 0; i < model.buildItems().length; i++) {
                if (model.buildItems()[i].id() === self.hotbuilds()[self.cycleid()].json) {
                    return i;
                }
            }
            return -1;
        };
    }

    //init hotbuildsystem
    hotbuild2.hotbuildManager = new hbManager(model.hotbuild_reset_time);

    //NON HOTKEY FUNCTIONS BUT CALLABLE THROUGH NORMAL KEYBOARD KEYS

    hotbuild2.buildTemplates = function () {

        var buildTemplates = {};
        buildTemplates.popupVisible = ko.observable(false);

        var stepSize = 3;
        var oldZoomLevel = handlers.zoom_level;
        handlers.zoom_level = function (payload) {
            oldZoomLevel(payload);
            switch (payload.zoom_level) {
                case "surface":
                    stepSize = 8;
                    break;
                case "air":
                    stepSize = 3;
                    break;
                case "orbital":
                    stepSize = 2;
                    break;
                case "celestial":
                    stepSize = 1;
                    break;
            }
        };

        function buildAt(x, y, spec, queue, complete) {
            api.arch.beginFabMode(spec).then(function (ok) {
                buildSelectedAt(x, y, queue, function (suc) {
                    api.arch.endFabMode();
                    if (complete) {
                        complete(suc);
                    }
                });
            });
        }

        function buildSelectedAt(x, y, queue, complete) {
            holodeck.unitBeginFab(x, y, false);
            holodeck.unitEndFab(x, y, queue, false).then(function (success) {
                if (complete) {
                    complete(success);
                }
            });
        }

        function tryInLine(x, y, dir, complete) {
            var maxStepSize = 200;
            var stepCounter = 0;
            var doStep = function (suc) {
                stepCounter += stepSize;
                if (!suc && stepCounter < maxStepSize) {
                    var xx = x;
                    var yy = y;
                    for (var d = 0; d < dir.length; d++) {
                        switch (dir[d]) {
                            case "up":
                                xx -= stepCounter;
                                break;
                            case "down":
                                xx += stepCounter;
                                break;
                            case "right":
                                yy += stepCounter;
                                break;
                            case "left":
                                yy -= stepCounter;
                                break;
                        }
                    }
                    buildSelectedAt(xx, yy, true, doStep);
                } else {
                    if (complete) {
                        complete();
                    } else {
                        api.arch.endFabMode();
                        api.audio.playSound("/SE/UI/UI_Building_place");
                    }
                }
            };
            doStep(false);
        }

        var holodeck = api.Holodeck.get($('.holodeck'));
        var mouseX = 0;
        var mouseY = 0;
        $(document).mousemove(function (e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        buildTemplates.imbaWall = function (queue, defence) {
            if (model.selectedMobile()) {
                var wall = "/pa/units/land/land_barrier/land_barrier.json";
                var turret = defence;
                (function () {
                    var mX = mouseX;
                    var mY = mouseY;
                    buildAt(mX, mY, turret, queue, function (suc) {
                        if (suc) {
                            // if we do not wait for a bit the turret wont be placed already
                            // it would not block the walls, making everything fail by placing the walls inside the turret
                            // does anybody know what to do about this?!
                            window.setTimeout(function () {
                                api.arch.beginFabMode(wall).then(function (ok) {
                                    // the callback of the callback of the callback of the oh wtf
                                    tryInLine(mX, mY, ["up"], function () {
                                        tryInLine(mX, mY, ["down"], function () {
                                            tryInLine(mX, mY, ["right"], function () {
                                                tryInLine(mX, mY, ["left"], function () {
                                                    tryInLine(mX, mY, ["up", "left"], function () {
                                                        tryInLine(mX, mY, ["up", "right"], function () {
                                                            tryInLine(mX, mY, ["down", "left"], function () {
                                                                tryInLine(mX, mY, ["down", "right"]);
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            }, 750);
                        }
                    });
                }());
            }
        };

        buildTemplates.chooseBuildTemplate = function () {
            buildTemplates.popupVisible(true);
            $("#hotbuildTemplatesDlg").dialog({
                height: 300,
                width: 300,
                modal: true,
                buttons: {
                    "Build Double Laser Turret": function () { buildTemplates.imbaWall($("#chkImba").val(), "/pa/units/land/laser_defense/laser_defense.json"); $(this).dialog("close"); },
                    "Build Air Defense": function () { buildTemplates.imbaWall($("#chkImba").val(), "/pa/units/land/air_defense/air_defense.json"); $(this).dialog("close"); },
                    "Build Flak": function () { buildTemplates.imbaWall($("#chkImba").val(), "/pa/units/land/air_defense_adv/air_defense_adv.json"); $(this).dialog("close"); }
                },
                close: function () {
                    buildTemplates.popupVisible(false);
                }
            });

        };
        return buildTemplates;

    }();

    //Pause / Unpause energy
    hotbuild2.energyToggle = function (event) {
        var currentOrder = model.selectedEnergyOrderIndex();
        var eOrder;
        if (currentOrder === 0) {
            eOrder = 'conserve';
        } else {
            eOrder = 'consume';
        }
        model.selectedEnergyOrderIndex(model.energyOrdersMap[eOrder]);
        model.endFabMode();
        engine.call('set_order_state', 'energy', eOrder);
        event.preventDefault();
    };

    //Pole Lock on/off
    hotbuild2.polelockToggle = function (event) {
        var allSettings = decode(localStorage.settings);
        var currentPoleLock = allSettings.camera_pole_lock.toLowerCase(); // the settings store this upper case, the engine processes it in lowercase... wtf
        var nextSetting = "";
        if (currentPoleLock === 'off') {
            nextSetting = "on";
        } else {
            nextSetting = "off";
        }
        engine.call("set_camera_pole_lock", nextSetting);
        allSettings.camera_pole_lock = nextSetting.toUpperCase();
        localStorage.settings = encode(allSettings);
        event.preventDefault();
    };

    //ReQueue Functionality   
    hotbuild2.requeue = function (event) {
        model.toggleBuildStanceOrderIndex();
    };

    //Standard CommandMode functionality
    hotbuild2.CommandMode = function (cmd) {
        if (model['setCommandIndex']) {
            model['setCommandIndex'](cmd);
        }
    };

    //View Event
    hotbuild2.viewAlert = function () {
        if (model.unitAlertModel.alerts().length > 0) {
            for (var i = 0; i < model.unitAlertModel.alerts().length; i++) {
                //console.log(model.unitAlertModel.alerts()[i]);
                var alert = model.unitAlertModel.alerts()[i];
                var target = {
                    location: alert.location,
                    planet_id: alert.planet_id
                };
                engine.call('camera.lookAt', JSON.stringify(target));
            }
        }
    };




    //same as the one in media\ui\alpha\shared\js\inputmap.js
    //problem default you can't give in the arrays with upper and lower keys
    //this version automaticaly gives in [binding,binding+shift] wich solves the problem
    hotbuild2.apply_keybinds = function (used_keybinds, conflicts, resolve) {
        var set = 'hotbuild';
        var key;
        var action;
        var binding;
        var clear_conflict;
        var i;
        var defaults = default_keybinds[set];

        var squelch = function (e) {
            if (e.preventDefault)
                e.preventDefault();
            return false;
        };

        // kill bad chrome defaults. todo: get list of all default bindings
        Mousetrap.bind('backspace', squelch);

        used_keybinds = (used_keybinds) ? used_keybinds : {};
        conflicts = (conflicts) ? conflicts : [];

        //console.log('apply_keybinds:' + set);

        for (key in action_sets[set]) {
            action = action_sets[set][key];
            binding = defaults[key];

            if (localStorage['keybinding_' + key] !== undefined)
                binding = decode(localStorage['keybinding_' + key]);

            //console.log(key + ":" + (binding) ? binding : "unbound");
            //debugger;
            if (resolve) {
                clear_conflict = true;
                for (i = 0; i < conflicts.length; i++) {
                    if (conflicts[i].binding === binding) {
                        localStorage['keybinding_' + key] = encode('conflict');
                        Mousetrap.unbind(binding);
                        clear_conflict = false;
                    }
                }

                if (clear_conflict && binding === 'conflict')
                    localStorage.removeItem('keybinding_' + key);
            }
            else {
                if (binding && binding !== 'conflict') {
                    if (used_keybinds[binding])
                        conflicts.push({ 'set': set, 'key': key, 'binding': binding });
                    else {
                        used_keybinds[binding] = true;
                        binding = [binding, 'shift+' + binding]; //array with shift DIFFERENCE so both upper and lower case should work
                        Mousetrap.bind(binding, _.partial(function (callback, event, binding) { callback(event, binding); event.preventDefault(); }, action));
                    }
                }
            }
        }
    };


    //Special Actions
    action_sets.hotbuild['Toggle Energy'] = function (event) { hotbuild2.energyToggle(event); };
    action_sets.hotbuild['Lock Pole'] = function (event) { hotbuild2.polelockToggle(event); };
    action_sets.hotbuild['Requeue'] = function (event) { hotbuild2.requeue(event); };
    action_sets.hotbuild['View Notification'] = function (event) { hotbuild2.viewAlert(); };
    action_sets.hotbuild['Build Template'] = function (event) { hotbuild2.buildTemplates.chooseBuildTemplate(); };
    //Fixes for Uber Casesensitive keybinds
    action_sets.hotbuild['move'] = function (event) { hotbuild2.CommandMode(0); };
    action_sets.hotbuild['attack'] = function (event) { hotbuild2.CommandMode(1); };
    action_sets.hotbuild['assist'] = function (event) { hotbuild2.CommandMode(2); };
    action_sets.hotbuild['repair'] = function (event) { hotbuild2.CommandMode(3); };
    action_sets.hotbuild['reclaim'] = function (event) { hotbuild2.CommandMode(4); };
    action_sets.hotbuild['patrol'] = function (event) { hotbuild2.CommandMode(5); };
    action_sets.hotbuild['stop'] = function (event) { hotbuild2.CommandMode(-1); };
    action_sets.hotbuild['select commie'] = input.doubleTap(api.select.commander, function () { api.camera.track(true); input.doubleTap.reset(); });
    action_sets.hotbuild['unload'] = function (event) { hotbuild2.CommandMode(9); };
    


    return hotbuild2;

})();
