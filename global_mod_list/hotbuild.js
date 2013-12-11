//IntelliSense for WebMatrix /VS
/// <reference path="../vsdoc/jquery-1.9.1-vsdoc.js" /> 
/// <reference path="../vsdoc/knockout-2.2.1.debug.js" />

action_sets.hotbuild = {}; //adds a hotbuildgroup item to keys settings
default_keybinds.hotbuild = {}; 
//for the default keys and actions check the xxxkeys.js files

//Make sure settings are set / if not set defaults
initialSettingValue('hotbuild_reset_time',2000);
initialSettingValue('hotbuild_requeue_amount',50);
initialSettingValue('hotbuild_preview_display','ON');

var settings = decode(localStorage.settings);

model.hotbuild_reset_time = parseInt(settings.hotbuild_reset_time);
//fast check on bad reset_time input
if (isNaN(model.hotbuild_reset_time)) {
    model.hotbuild_reset_time = 2000;
}


function HotBuildViewModel(resetTime) {
    this.cycleResetTime = resetTime; //time you have to press again to loop trough list
    this.lastCycleTime = ko.observable(new Date())
    this.lastkey = ko.observable(0);
    this.cycleid = ko.observable(0);
    this.hotbuilds = ko.observableArray([""]);
    this.hotbuildPreviews = ko.observableArray([""]);
    
    this.debuginfo = ko.computed(function () {
        if (this.hotbuilds() != undefined) {
            return this.hotbuilds().length;
        }
    }, this);

    this.unitName = ko.observable("");


    this.buildPreviewList = function (hbindex, hotbuilds) {
        //set the buildPreview list 
        if (hotbuilds != undefined) {
            this.hotbuildPreviews([]);
            for (i = hbindex; i < hotbuilds.length; i++) {
                if (this.knowsBuildCommand(hotbuilds[i])) {
                    unitinfo = model.unitSpecs[hotbuilds[i]];
                    if (unitinfo.buildStructure) {
                        this.hotbuildPreviews.push(unitinfo.buildIcon);
                    }
                }
            }
            for (j = 0; j < hbindex; j++) {
                if (this.knowsBuildCommand(hotbuilds[j])) {
                    unitinfo = model.unitSpecs[hotbuilds[j]];
                    if (unitinfo.buildStructure) {
                        this.hotbuildPreviews.push(unitinfo.buildIcon);
                    }
                }
            }
        }
    }

    this.hotBuild = function (event, hotbuilds) {
        this.hotbuilds(hotbuilds);
        if (model['maybeSetBuildTarget']) {
            if (this.knowsAnyBuildCommand()) {
                var failDetect = 0;
                do {
                    this.doCycleId(this.hotbuilds().length, event.which);
                    failDetect++;
                    if (failDetect > 1000) {
                        gameConsole.log("loop of death\n"); // I dont think this should ever happen...
                        return;
                    }
                } while (!this.knowsBuildCommand(this.hotbuilds()[this.cycleid()]) && this.knowsAnyBuildCommand());

                if (model.unitSpecs[this.hotbuilds()[this.cycleid()]].buildStructure) {
                    model['maybeSetBuildTarget'](this.hotbuilds()[this.cycleid()]);
                }
                else {
                    model.executeStartBuild(event, this.getBuildItemId())
                }
                this.unitName(model.unitSpecs[this.hotbuilds()[this.cycleid()]].name);
                this.buildPreviewList(this.cycleid(), this.hotbuilds());
                event.preventDefault();
            }
            else {
                gameConsole.log('could not hotbuild item ' + this.debuginfo());
            }
        }
    }

    this.knowsAnyBuildCommand = function () {
        for (var i = 0; i < this.hotbuilds().length; i++) {
            if (this.knowsBuildCommand(this.hotbuilds()[i])) {
                return true;
            }
        }
        return false;
    }

    this.knowsBuildCommand = function (cmd) {
        for (var i = 0; i < model.buildTabLists()[0].length; i++) {
            if (model.buildTabLists()[0][i].id == cmd) {
                return true;
            }
        }
        return false;
    }

    //move trough hotbuilds array when pushing multiple time the same key in a certain time interval
    this.doCycleId = function (length, key) {
        var thisTime = new Date();
        if (thisTime - this.lastCycleTime > this.cycleResetTime || key != myHotBuildViewModel.lastkey()) {
            //if (key != this.lastkey()) {
            this.cycleid(0);
        } else {
            this.cycleid(this.cycleid() + 1);
            if (this.cycleid() == length) {
                this.cycleid(0);
            }
        }
        this.lastCycleTime = thisTime;
        this.lastkey(key);

    }


    this.getBuildItemId = function () {
        for (var i = 0; i < model.buildItems().length; i++) {
            if (model.buildItems()[i].id() == this.hotbuilds()[this.cycleid()]) {
                return i;
            }
        }
        return -1;
    }
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
    }

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
                    binding = [binding,'shift+' + binding] //array with shift DIFFERENCE so both upper and lower case should work
                    Mousetrap.bind(binding, _.partial(function (callback, event, binding) { callback(event, binding); event.preventDefault(); }, action));
                }
            }
        }
    }
}