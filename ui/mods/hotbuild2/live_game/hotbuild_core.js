console.log("loading hotbuild core");
var hotbuild2 = (function () {

    var hotbuildglobal = {};
    var hotbuildglobalkey = {};
    hotbuildglobal = localStorage.hotbuildconfig ? decode(localStorage.hotbuildconfig) : hotbuildglobal;
    hotbuildglobalkey = localStorage.hotbuildconfigkey ? decode(localStorage.hotbuildconfigkey) : hotbuildglobalkey;

    /*variables for hotbuild toggle*/
    var hotbuild_enable=true; //allow hotbuild buildbar
    var hotbuild_select_enable=true; //allow hotbuild select bar
    var hotbuild_frameEvent; //animationFrame Timer

    var hotbuildshiftrecycle = api.settings.isSet('ui','hotbuild_shift_key_recycle',true) || "OFF";
    var hotbuildreset_time = api.settings.isSet('ui','hotbuild_reset_time',true) || 2000;

    //handle settings refresh
    if(_.isFunction(handlers['settings.exit']))
    {
        var hotbuild2oldsettingsexit = handlers['settings.exit'];
        handlers['settings.exit'] = function(){
          hotbuildglobal = localStorage.hotbuildconfig ? decode(localStorage.hotbuildconfig) : hotbuildglobal;
          hotbuildglobalkey = localStorage.hotbuildconfigkey ? decode(localStorage.hotbuildconfigkey) : hotbuildglobalkey;
          api.panels.build_bar.message('hotbuildsettings.exit');
          api.panels.selection.message('hotbuildsettings.exit');
          api.panels.LiveGame_FloatZone.message('hotbuildsettings.exit');
          hotbuild2oldsettingsexit();
        };
    }

    var hotbuild2 = {};

    var imbawallclick = "nobuild";

    function hbManager(resetTime) {
        var self = this;
        //INPUT FROM BUILDBAR AND SELECTION SCENES
        self.buildable_units = ko.observableArray([]);
        handlers.hbselection = function(payload){
            //get data from buildbar;
            //console.log("got buildlist from buildbar");
            //console.log(payload);
            self.buildable_units(payload);
        };

        self.selectionList = ko.observableArray([]);
        handlers.hbunitselection = function(payload){
          //console.log("got selectionlist from selection");
          //console.log(payload);
          self.selectionList(payload);
        };

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
        self.imbawallers = ko.observableArray(["/pa/units/land/laser_defense/laser_defense.json",
                                                "/pa/units/land/laser_defense_single/laser_defense_single.json",
                                                "/pa/units/land/laser_defense_adv/laser_defense_adv.json",
                                                "/pa/units/land/artillery_short/artillery_short.json",
                                                "/pa/units/land/artillery_long/artillery_long.json",
                                                "/pa/units/land/tactical_missile_launcher/tactical_missile_launcher.json",
                                                "/pa/units/land/nuke_launcher/nuke_launcher.json",
                                                "/pa/units/land/anti_nuke_launcher/anti_nuke_launcher.json",
                                                "/pa/units/land/radar/radar.json",
                                                "/pa/units/land/radar_adv/radar_adv.json",
                                                "/pa/units/land/laser_defense/laser_defense.json.player",
                                                "/pa/units/land/laser_defense_single/laser_defense_single.json.player",
                                                "/pa/units/land/laser_defense_adv/laser_defense_adv.json.player",
                                                "/pa/units/land/artillery_short/artillery_short.json.player",
                                                "/pa/units/land/artillery_long/artillery_long.json.player",
                                                "/pa/units/land/tactical_missile_launcher/tactical_missile_launcher.json.player",
                                                "/pa/units/land/nuke_launcher/nuke_launcher.json.player",
                                                "/pa/units/land/anti_nuke_launcher/anti_nuke_launcher.json.player",
                                                "/pa/units/land/radar/radar.player",
                                                "/pa/units/land/radar_adv/radar_adv.player"
                                                ]);

        self.buildPreviewList = function (hbindex, hotbuilds) {
            //set the buildPreview list
            if (hotbuilds !== undefined) {
                self.hotbuildPreviews([{ 'icon': '', 'json': '' }]);
                var unitinfo;

                for (var i = hbindex; i < hotbuilds.length; i++) {
                    if (self.knowsBuildCommand(hotbuilds[i].json)) {

                        unitinfo = model.unitSpecs[hotbuilds[i].json];
                        if(unitinfo === undefined){
                         unitinfo = model.unitSpecs[hotbuilds[i].json + ".player"];
                        }
                        if (unitinfo.structure) {
                            console.log(unitinfo.buildIcon);
                            self.hotbuildPreviews.push({ 'icon':  unitinfo.buildIcon, 'json': hotbuilds[i].json });
                        }
                    }
                }
                for (var j = 0; j < hbindex; j++) {
                    if (self.knowsBuildCommand(hotbuilds[j].json)) {
                        unitinfo = model.unitSpecs[hotbuilds[j].json];
                        if(unitinfo === undefined){
                         unitinfo = model.unitSpecs[hotbuilds[i].json + ".player"];
                        }
                        if (unitinfo.structure) {
                            self.hotbuildPreviews.push({ 'icon':  unitinfo.buildIcon, 'json': hotbuilds[j].json });
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
            api.panels.LiveGame_FloatZone.message('hotbuildfloatframepreview',{visible:self.previewvisible(),list:self.hotbuildPreviews()});
        };

        self.hotBuild = function (event, hotbuilds) {
            self.hotbuilds(hotbuilds);
            //console.log(hotbuilds.length);
            if (model.maybeSetBuildTarget) {
                if (self.knowsAnyBuildCommand() && hotbuild_enable) {
                    var failDetect = 0;
                    do {
                        self.doCycleId(self.hotbuilds().length, event.which);
                        failDetect++;
                        if (failDetect > 1000) {
                            console.log("loop of death\n"); // I dont think this should ever happen...
                            return;
                        }
                        //console.log(self.hotbuilds()[self.cycleid()].json + " " + !self.knowsBuildCommand(self.hotbuilds()[self.cycleid()].json));
                    } while (!self.knowsBuildCommand(self.hotbuilds()[self.cycleid()].json) && self.knowsAnyBuildCommand());
                    self.hbtriggertime(_.now());
                    setTimeout(self.clean, self.cycleResetTime + 1000);
                    //debugger;

                    var hbunit = model.unitSpecs[self.hotbuilds()[self.cycleid()].json];
                    if(hbunit === undefined){
                        hbunit = model.unitSpecs[self.hotbuilds()[self.cycleid()].json + ".player"];
                    }

                    if (hbunit.structure) {
                        //check if it' needs to be ImbaWalled

                        //model.maybeSetBuildTarget(self.hotbuilds()[self.cycleid()].json);
                        //console.log(hbunit.id);
                        model.buildItemBySpec(hbunit.id);
                        if (self.imbawallers.indexOf(hbunit.id) !== -1) {
                            imbawallclick = "build";
                        }
                    }
                    else {
                        //model.buildItemBySpec(hbunit.id);
                        //console.log(hbunit.id);
                        //model.executeStartBuild(event, self.getBuildItemId());
                        //model.executeStartBuild(event, hbunit);
                        //debugger;
                        var params = {};
                        params.item = hbunit.id;
                        params.batch = event.shiftKey;
                        params.cancel = false;
                        params.urgent = event.ctrlKey;
                        params.more = "";
                        model.executeStartBuild(params);
                    }
                    self.unitName(hbunit.name);
                    self.buildPreviewList(self.cycleid(), self.hotbuilds());
                    self.previewvisible(true);
                    api.panels.LiveGame_FloatZone.message('hotbuildfloatframepreview',{visible:self.previewvisible(),list:self.hotbuildPreviews()});
                    event.preventDefault();
                }
                else {
                    if (self.selectionList().length > 0&&hotbuild_select_enable) { //check if units are selected ?
                        var selectionTypes = [];
                        for (var i = 0; i < self.hotbuilds().length; i++) {

                            var typeindex = _.findIndex(self.selectionList(), { 'type': self.hotbuilds()[i].json });
                            if (typeindex !== -1) {
                                selectionTypes.push(self.hotbuilds()[i].json);
                            }
                        }
                        var currentselection = [];
                        for (i = 0; i < self.selectionList().length; i++) {
                            currentselection.push(self.selectionList()[i].type);
                        }
                        if (event.ctrlKey) {
                            if(selectionTypes.length > 0){
                                model.holodeck.view.selectByTypes("remove", selectionTypes);
                            }
                        }
                        else {
                            if(selectionTypes.length > 0){
                                model.holodeck.view.selectByTypes("remove", _.difference(currentselection, selectionTypes));
                            }
                        }

                    }
                    else {
                        console.log('hotbuild doesnt know what to do (or hotSelect is disabled)' + self.debuginfo());
                    }

                }
            }
        };

        self.knowsAnyBuildCommand = function () {
            for (var bc = 0; bc < self.hotbuilds().length; bc++) {
                if (self.knowsBuildCommand(self.hotbuilds()[bc].json)) {
                    return true;
                }
            }
            return false;
        };

        self.knowsBuildCommand = function (cmd) {
            //check on buildtablist empty
            if(self.buildable_units().length > 0){
                for(var i = 0; i < self.buildable_units().length; i++){
                    if(self.buildable_units()[i].id == cmd) {
                        //console.log("can build " +self.buildable_units()[i].id);
                        return true;
                    }
                    //GW fix
                    if(self.buildable_units()[i].id == cmd + ".player") {
                        return true;
                    }
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
            for (var i = 0; i < model.buildLists.length; i++) {
                if (model.buildLists[i].id() === self.hotbuilds()[self.cycleid()].json) {
                    return i;
                }
            }
            return -1;
        };
    }

    //init hotbuildsystem
    hotbuild2.hotbuildManager = new hbManager(hotbuildreset_time);

    if (hotbuildshiftrecycle === "ON") {
        var oldEndFabMode = model.endFabMode;
        model.endFabMode = function () {
            hotbuild2.hotbuildManager.cycleid(-1);
            oldEndFabMode();
        };
    }

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
            model.holodeck.unitBeginFab(x, y, false);
            model.holodeck.unitEndFab(x, y, queue, false).then(function (success) {
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

        buildTemplates.imbaWall2 = function (queue,mX,mY) {
            var wall = "/pa/units/land/land_barrier/land_barrier.json";

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
        };

        return buildTemplates;
    }();

    //NON HOTKEY FUNCTIONS BUT CALLABLE THROUGH NORMAL KEYBOARD KEYS

    //Pole Lock on/off
    hotbuild2.polelockToggle = function () {
        console.log("PoleLock");
        var allSettings = decode(localStorage[localStorage.uberName + ".paSettings"]);
        if(allSettings.camera === undefined){
          allSettings.camera = {};
          allSettings.camera.pole_lock = undefined;
        }
        var currentPoleLock = allSettings.camera.pole_lock; // the settings store this upper case, the engine processes it in lowercase... wtf
        var nextSetting = "";
        if (currentPoleLock === undefined) {
            nextSetting = "ON";
            allSettings.camera.pole_lock = "ON";
        } else {
            nextSetting = "OFF";
            delete allSettings.camera.pole_lock;
        }
        engine.call("set_camera_pole_lock", nextSetting.toLowerCase());
        console.log("pole_lock : " + nextSetting);
        localStorage[localStorage.uberName + ".paSettings"] = encode(allSettings);
        //event.preventDefault();
    };

    /*Start of toggle Hotbuild*/

    //toggle hotbuild on or off
    hotbuild2.toggleState=function(){
        if(hotbuild_enable){
            hotbuild2.setBuildBehavior(false);
        }else{
            hotbuild2.setBuildBehavior(true);
        }
    };

    //toggle hotbuild on or off
    hotbuild2.toggleState_select=function(){
        if(hotbuild_select_enable){
            hotbuild2.setSelectBehavior(false);
        }else{
            hotbuild2.setSelectBehavior(true);
        }
    };

    //manually set the state of hotbuild (can be used by other mods)
    hotbuild2.setBuildBehavior=function(_state){
        if(_state){
            hotbuild_enable=true;
            $('.hbbuildbarkey:not(:empty)').show();
        }else{
            hotbuild_enable=false;
            $('.hbbuildbarkey').hide();
            hotbuild_frameEvent=requestAnimationFrame(hotbuild2.watch_toggle);
        }
    };

    //keep the buildbar hidden even though selections etc might change
    hotbuild2.watch_toggle=function(){
        //hotbuild is disabled, hide the buildbar
        if(!hotbuild_enable){
            $('.hbbuildbarkey').hide();
        }
        if(!hotbuild_select_enable){
            $('.hbselectionbarkey').hide();
        }
        //keep checking for hotbuild state if needed
        if(!hotbuild_enable||!hotbuild_select_enable){
            hotbuild_frameEvent=requestAnimationFrame(hotbuild2.watch_toggle);
        }
    };

    //set the behavior of the selection bar with hotbuild
    hotbuild2.setSelectBehavior=function(_state){
        if(_state){
            hotbuild_select_enable=true;
            $('.hbselectionbarkey:not(:empty)').show();
        }else{
            hotbuild_select_enable=false;
            $('.hbselectionbarkey').hide();
            hotbuild_frameEvent=requestAnimationFrame(hotbuild2.watch_toggle);
        }
    };

    /*End of toggle Hotbuild*/

    //capture mouse down to do the imbawalls after click place building
    var $holodeck = $('holodeck');
    var holodeckModeMouseDown = {};
    $holodeck.mousedown(function (mdevent) {
        if (mdevent.button === 0 && imbawallclick === "build" && mdevent.altKey === true) {
            var startx = mdevent.offsetX;
            var starty = mdevent.offsetY;
            var queue = mdevent.shiftKey;
            hotbuild2.buildTemplates.imbaWall2(queue,startx,starty);
            imbawallclick = "nobuild";
        }
    });

    var keycodes = {
        37: "left",
        38: "up",
        39: "right",
        40: "down",
        45: "insert",
        46: "delete",
        8: "backspace",
        9: "tab",
        13: "enter",
        16: "shift",
        17: "ctrl",
        18: "alt",
        19: "pause",
        20: "caps lock",
        27: "escape",
        32: "space",
        33: "pageup",
        34: "pagedown",
        35: "end",
        112: "f1",
        113: "f2",
        114: "f3",
        115: "f4",
        116: "f5",
        117: "f6",
        118: "f7",
        119: "f8",
        120: "f9",
        121: "f10",
        122: "f11",
        123: "f12",
        144: "numlock",
        145: "scrolllock",
        186: ";",
        187: "=",
        188: ",",
        189: "-",
        190: ".",
        191: "/",
        192: "graveaccent",
        219: "[",
        220: "\\",
        221: "]",
        222: "'"
    };
    //fix for allowing multiple bindings per key
    //for example stop = s / build mex = s
    // stop = s = default mousetrap binding
    // build mex = hotbuild key = using keydown
    $(document).keydown(function (e) {
        if (!model.hasSelection() || model.showLanding() || model.chatSelected())
            return;

        var value;
        //console.log(e.keyCode);
        if (e.which >= 48 && e.which <= 90) {

            /* grab letters */
            value = String.fromCharCode(e.which).toLowerCase();
        } else {

            /* if not a letter look in key codes */
            value = keycodes[e.which];
        }

        //console.log(value);
        for (var hotkey in hotbuildglobalkey)
        {
            if(hotbuildglobalkey[hotkey] === value)
            {
                hotbuild2.hotbuildManager.hotBuild(e, hotbuildglobal[hotkey]);
            }
        }
    });

    return hotbuild2;

})();
console.log("loaded hotbuild core");
