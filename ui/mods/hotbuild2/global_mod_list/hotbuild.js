//IntelliSense for WebMatrix /VS
/// <reference path="../.vsdoc/jquery-1.9.1-vsdoc.js" /> 
/// <reference path="../.vsdoc/knockout-2.2.1.debug.js" />

action_sets.hotbuild = {}; //adds a hotbuildgroup item to keys settings
default_keybinds.hotbuild = {}; 
//for the default keys and actions check the xxxkeys.js files

//Make sure settings are set / if not set defaults
initialSettingValue('hotbuild_reset_time',2000);
initialSettingValue('hotbuild_requeue_amount',50);
//initialSettingValue('hotbuild_preview_display','ON');

var settings = decode(localStorage.settings);

model.hotbuild_reset_time = parseInt(settings.hotbuild_reset_time);
//fast check on bad reset_time input
if (isNaN(model.hotbuild_reset_time)) {
    model.hotbuild_reset_time = 2000;
}


function HotBuildViewModel(resetTime) {
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
        if (hotbuilds !== undefined) {
            self.hotbuildPreviews([]);
            for (i = hbindex; i < hotbuilds.length; i++) {
                if (self.knowsBuildCommand(hotbuilds[i].json)) {
                    unitinfo = model.unitSpecs[hotbuilds[i].json];
                    if (unitinfo.buildStructure) {
                        self.hotbuildPreviews.push(unitinfo.buildIcon);
                    }
                }
            }
            for (j = 0; j < hbindex; j++) {
                if (self.knowsBuildCommand(hotbuilds[j].json)) {
                    unitinfo = model.unitSpecs[hotbuilds[j].json];
                    if (unitinfo.buildStructure) {
                        self.hotbuildPreviews.push(unitinfo.buildIcon);
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
                        gameConsole.log("loop of death\n"); // I dont think this should ever happen...
                        return;
                    }
                } while (!self.knowsBuildCommand(self.hotbuilds()[self.cycleid()].json) && self.knowsAnyBuildCommand());
                self.hbtriggertime(_.now());
                setTimeout(self.clean, self.cycleResetTime + 1000);
                if (model.unitSpecs[self.hotbuilds()[self.cycleid()].json].buildStructure) {
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
                gameConsole.log('could not hotbuild item ' + self.debuginfo());
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
        /*
        for (var i = 0; i < model.buildTabLists()[0].length; i++) {
        if (model.buildTabLists()[0][i].id == cmd) {
        return true;
        }
        }*/

        for (var i = 0; i < model.buildItems().length; i++) {
            if (model.buildItems()[i].id() == cmd) {
                return true;
            }
        }
        return false;
    };

    //move trough hotbuilds array when pushing multiple time the same key in a certain time interval
    self.doCycleId = function (length, key) {
        var thisTime = new Date();
        if (thisTime - self.lastCycleTime > self.cycleResetTime || key != myHotBuildViewModel.lastkey()) {
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
            if (model.buildItems()[i].id() == self.hotbuilds()[self.cycleid()].json) {
                return i;
            }
        }
        return -1;
    };
}

//init hotbuildsystem
var myHotBuildViewModel = new HotBuildViewModel(model.hotbuild_reset_time);

//Pause / Unpause energy
function energyToggle(event) {
    var currentOrder = model.selectedEnergyOrderIndex();
    if (currentOrder === 0) {
        eOrder = 'conserve';
    } else {
        eOrder = 'consume';
    }
    model.selectedEnergyOrderIndex(model.energyOrdersMap[eOrder]);
    model.endFabMode();
    engine.call('set_order_state', 'energy', eOrder);
    event.preventDefault();
}

//Pole Lock on/off
function polelockToggle(event) {
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
}

//ReQueue Functionality
var recentQueueCommands = [];

var oldApiUnitBuild = api.unit.build;
api.unit.build = function (itemId, cnt, ctrK) {
    recentQueueCommands.push({ "id": itemId, "count": cnt, "ctrl": ctrK });
    return oldApiUnitBuild(itemId, cnt, ctrK);
};

function requeue(event) {
    for (var x = 0; x < settings.hotbuild_requeue_amount; x++) {
        for (var i = 0; i < recentQueueCommands.length; i++) {
            var cmd = recentQueueCommands[i];
            oldApiUnitBuild(cmd["id"], cmd["count"], cmd["ctrl"]);
        }
    }
}

//Standard CommandMode functionality

function hotbuildCommandMode(cmd) {
    if (model['setCommandIndex']) {
        model['setCommandIndex'](cmd);
    }
}

// View Event
function hotbuildViewAlert() {
    if (model.unitAlertModel.alerts().length > 0) {
        for (i = 0; i < model.unitAlertModel.alerts().length; i++) {
            //console.log(model.unitAlertModel.alerts()[i]);
            var alert = model.unitAlertModel.alerts()[i];
            var target = {
                location: alert.location,
                planet_id: alert.planet_id
            };
            engine.call('camera.lookAt', JSON.stringify(target));
        }
    }
}

//load html dynamically
function loadHotBuildTemplate(element, url, model) {
    element.load(url, function () {
        console.log("Loading html " + url);
        ko.applyBindings(model, element.get(0));
    });
}

//same as the one in media\ui\alpha\shared\js\inputmap.js
//problem default you can't give in the arrays with upper and lower keys
//this version automaticaly gives in [binding,binding+shift] wich solves the problem
function apply_keybindsHotbuild(set, used_keybinds, conflicts, resolve) {

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
                    binding = [binding,'shift+' + binding]; //array with shift DIFFERENCE so both upper and lower case should work
                    Mousetrap.bind(binding, _.partial(function (callback, event, binding) { callback(event, binding); event.preventDefault(); }, action));
                }
            }
        }
    }
}

