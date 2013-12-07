//HOTBUILD2
// unit selection cannot cycle!
/*
E: MEX / Adv Factories
R: Power / Radar / Basic Spam / Adv Spam
A: Air Def / Single Laser / Pelter / Adv Laser / Med Laser / Wall
F: Veh Fac / Bot Fac / Air Fac / Nav Fac / Fabber
TAB: Pause / Unpuase
*/

/// <reference path="jquery-1.9.1-vsdoc.js" /> 
/// <reference path="knockout-2.2.1.debug.js" />

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

//Debug Window
$('body').append(
'<div id="hotbuild_info">' +
//'HOTBUILD INFO:' +
//'<div data-bind="text: myHotBuildViewModel.lastkey"></div>' +
//'C<div data-bind="text: myHotBuildViewModel.cycleid"></div>' +
//'S<div data-bind="text: myHotBuildViewModel.selectedcycleid"></div>' +
//'<div data-bind="text: myHotBuildViewModel.debuginfo"></div>' +
'<div data-bind="text: myHotBuildViewModel.unitName"></div>' +
'<div><img data-bind="attr: { src: myHotBuildViewModel.selectedimage }" border="0" /><img data-bind="attr: { src: myHotBuildViewModel.nextimage }" border="0" /><img data-bind="attr: { src: myHotBuildViewModel.nextimage2 }" border="0" /></div>' +
'</div>');

function HotBuildViewModel(lastkey, cycleid, hotbuilds, time) {
    this.cycleResetTime = 2000; //time you have to press again to loop trough list
    this.lastCycleTime = ko.observable(time)
    this.lastkey = ko.observable(lastkey);
    this.cycleid = ko.observable(cycleid);
    this.selectedcycleid = ko.observable(99);
    this.hotbuilds = ko.observableArray(hotbuilds);

    this.debuginfo = ko.computed(function () {
        if (this.hotbuilds() != undefined) {
            if (this.hotbuilds()[this.cycleid()] != undefined) {
                return model.unitSpecs[this.hotbuilds()[this.cycleid()]].name;
            }
            else {
                return this.hotbuilds()[this.cycleid()];
            }
        }
        else {
            return "";
        }
    }, this);

    this.unitName = ko.computed(function () {
        if (this.hotbuilds() != undefined) {
            if (this.hotbuilds()[this.cycleid()] != undefined) {
                if (this.knowsBuildCommand(this.hotbuilds()[this.cycleid()])) {
                    return model.unitSpecs[this.hotbuilds()[this.cycleid()]].name;
                }
            }
            else {
                return this.hotbuilds()[this.cycleid()];
            }
        }
        else {
            return "";
        }
    }, this);

    this.unitSpecs = ko.computed(function () {
        if (this.hotbuilds() != undefined) {
            if (this.hotbuilds()[this.cycleid()] != undefined) {
                if (this.knowsBuildCommand(this.hotbuilds()[this.cycleid()])) {
                    return model.unitSpecs[this.hotbuilds()[this.cycleid()]];
                }
            }
            else {
                return undefined;
            }
        }
        else {
            return undefined;
        }
    }, this);

   

    this.selectedimage = ko.computed(function () {
        if (this.unitSpecs() != undefined)
        {
            //debugger;
            return this.unitSpecs().buildIcon;
        }
        else
        {
            //return undefined;
            return "img/build_bar/units/undefined.png";
        }
        
    }, this);

    this.getStructureinList = function (n) {
        if (this.hotbuilds() != undefined && this.selectedcycleid() != 99) {
            if (this.hotbuilds().length > 0) {
                var nextid = this.selectedcycleid() + n;
                var unitinfo = undefined;
                var length = this.hotbuilds().length;
                var failDetect = 0;
                do {
                    failDetect++;
                    if (nextid == length) { //why is hotbuilds losing it's length
                        nextid = 0;
                    }
                    if (failDetect > 99) {
                        //debugger;
                        //gameConsole.log("loop of death\n"); // I dont think this should ever happen...
                        return;
                    }
                    unitinfo = model.unitSpecs[this.hotbuilds()[nextid]];

                }
                while (!unitinfo.buildStructure && !this.knowsBuildCommand(this.hotbuilds()[nextid]))

                return unitinfo;
            }
        }
    }

    this.unitSpecs1 = ko.computed(function () {
        return this.getStructureinList(1);
    }, this);

    this.unitSpecs2 = ko.computed(function () {
        return this.getStructureinList(2);
    }, this);

    this.nextimage = ko.computed(function () {
        if (this.unitSpecs1() != undefined) {
            //debugger;
            return this.unitSpecs1().buildIcon;
        }
        else {
            //return undefined;
            return "img/build_bar/units/undefined.png";
        }

    }, this);

    this.nextimage2 = ko.computed(function () {
        if (this.unitSpecs2() != undefined) {
            //debugger;
            return this.unitSpecs2().buildIcon;
        }
        else {
            //return undefined;
            return "img/build_bar/units/undefined.png";
        }

    }, this);

    this.hotBuild = function (event, hotbuilds) {
        this.selectedcycleid(99);
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
                
                if (this.unitSpecs().buildStructure) {
                    model['maybeSetBuildTarget'](this.hotbuilds()[this.cycleid()]);
                }
                else {
                    model.executeStartBuild(event,this.getBuildItemId())
                }
                this.selectedcycleid(this.cycleid());
                //model.setBuildHover(currentCycleId);
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
        /*for (var i = 0; i < model.buildItems().length; i++) {
            if (model.buildItems()[i].id() == cmd) {
                return true;
            }
        }
        */
        for (var i = 0; i < model.buildTabLists()[0].length; i++) {
            //debugger;
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
            //if (key != myHotBuildViewModel.lastkey()) {
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


    this.getBuildItemId = function() {
        for (var i = 0; i < model.buildItems().length; i++) {
            if (model.buildItems()[i].id() == this.hotbuilds()[this.cycleid()]) {
                return i;
            }
        }
        return -1;
    }
}

var myHotBuildViewModel = new HotBuildViewModel(0, 0, hotbuild1, new Date());
//var myHotBuildViewModel = new HotBuildViewModel(0, 0, hotbuild1);
ko.applyBindings(myHotBuildViewModel, $('#hotbuild_info')[0]);

var hotbuild1 = [
 	'/pa/units/land/metal_extractor_adv/metal_extractor_adv.json',
	'/pa/units/land/metal_extractor/metal_extractor.json',
];
var hotbuild2 = [
 	'/pa/units/land/energy_plant_adv/energy_plant_adv.json',
    '/pa/units/land/energy_plant/energy_plant.json',
	'/pa/units/land/radar_adv/radar_adv.json',
	'/pa/units/land/radar/radar.json',
    '/pa/units/land/assault_bot/assault_bot.json',
    '/pa/units/land/assault_bot_adv/assault_bot_adv.json',
    '/pa/units/land/tank_light_laser/tank_light_laser.json',
	'/pa/units/land/tank_laser_adv/tank_laser_adv.json',
	'/pa/units/air/fighter/fighter.json',
	'/pa/units/air/bomber_adv/bomber_adv.json',
	'/pa/units/sea/destroyer/destroyer.json',
	'/pa/units/sea/battleship/battleship.json'
];
var hotbuild3 = [
    '/pa/units/land/air_defense/air_defense.json',
    '/pa/units/land/laser_defense_single/laser_defense_single.json',
    '/pa/units/land/artillery_short/artillery_short.json',
	'/pa/units/land/laser_defense_adv/laser_defense_adv.json',
    '/pa/units/land/laser_defense/laser_defense.json',
	'/pa/units/land/land_barrier/land_barrier.json'
];
var hotbuild4 = [
	'/pa/units/land/vehicle_factory_adv/vehicle_factory_adv.json',
	'/pa/units/land/bot_factory_adv/bot_factory_adv.json',
	'/pa/units/air/air_factory_adv/air_factory_adv.json',
 	'/pa/units/land/vehicle_factory/vehicle_factory.json',
	'/pa/units/land/bot_factory/bot_factory.json',
	'/pa/units/air/air_factory/air_factory.json',
    '/pa/units/land/fabrication_bot_adv/fabrication_bot_adv.json',
    '/pa/units/land/fabrication_bot/fabrication_bot.json',
    '/pa/units/land/fabrication_vehicle_adv/fabrication_vehicle_adv.json',
	'/pa/units/land/fabrication_vehicle/fabrication_vehicle.json',
    '/pa/units/air/fabrication_aircraft_adv/fabrication_aircraft_adv.json',
	'/pa/units/air/fabrication_aircraft/fabrication_aircraft.json'
];

action_sets['gameplay']['hotbuild1'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuild1) };
action_sets['gameplay']['hotbuild2'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuild2) };
action_sets['gameplay']['hotbuild3'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuild3) };
action_sets['gameplay']['hotbuild4'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuild4) };
action_sets['gameplay']['hotbuilds1'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuild1) };
action_sets['gameplay']['hotbuilds2'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuild2) };
action_sets['gameplay']['hotbuilds3'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuild3) };
action_sets['gameplay']['hotbuilds4'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuild4) };
action_sets['gameplay']['energytoggle'] = function (event) { energyToggle(event) };
action_sets['gameplay']['pole_lock'] = function (event) { polelockToggle(event) };


default_keybinds['gameplay']['hotbuild1'] = 'e';
default_keybinds['gameplay']['hotbuild2'] = 'r';
default_keybinds['gameplay']['hotbuild3'] = 'q';
default_keybinds['gameplay']['hotbuild4'] = 'f';
default_keybinds['gameplay']['hotbuilds1'] = 'shift+e';
default_keybinds['gameplay']['hotbuilds2'] = 'shift+r';
default_keybinds['gameplay']['hotbuilds3'] = 'shift+q';
default_keybinds['gameplay']['hotbuilds4'] = 'shift+f';
default_keybinds['gameplay']['energytoggle'] = 'tab';
default_keybinds['gameplay']['pole_lock'] = 'p';

//maybe check keybind conflicts and give popup warning
