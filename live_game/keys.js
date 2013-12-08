//HOTBUILD2
// unit selection cannot cycle!
/*
E: MEX / Adv Factories
R: Power / Radar / Basic Spam / Adv Spam
A: Air Def / Single Laser / Pelter / Adv Laser / Med Laser / Wall
F: Veh Fac / Bot Fac / Air Fac / Nav Fac / Fabber
TAB: Pause / Unpause
*/

//// add variables with references to json files you want to hotbuild 
//// look in your pa installfolder /media/pa/units/ to find what you want to put below
var hotbuild1 = [
 	'/pa/units/land/metal_extractor_adv/metal_extractor_adv.json',
	'/pa/units/land/metal_extractor/metal_extractor.json'
];
var hotbuild2 = [
 	'/pa/units/land/energy_plant_adv/energy_plant_adv.json',
    '/pa/units/land/energy_plant/energy_plant.json',
	'/pa/units/land/radar_adv/radar_adv.json',
	'/pa/units/land/radar/radar.json',
    '/pa/units/land/assault_bot_adv/assault_bot_adv.json',
    '/pa/units/land/assault_bot/assault_bot.json',
    '/pa/units/land/tank_laser_adv/tank_laser_adv.json',
    '/pa/units/land/tank_light_laser/tank_light_laser.json',
	'/pa/units/air/bomber_adv/bomber_adv.json',
	'/pa/units/air/fighter/fighter.json',
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
//add keybinds as you see fit
action_sets['gameplay']['hotbuild1'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuild1) };
action_sets['gameplay']['hotbuild2'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuild2) };
action_sets['gameplay']['hotbuild3'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuild3) };
action_sets['gameplay']['hotbuild4'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuild4) };
action_sets['gameplay']['hotbuilds1'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuild1) };
action_sets['gameplay']['hotbuilds2'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuild2) };
action_sets['gameplay']['hotbuilds3'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuild3) };
action_sets['gameplay']['hotbuilds4'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuild4) };

//change keys as you see fit
default_keybinds['gameplay']['hotbuild1'] = 'e';
default_keybinds['gameplay']['hotbuild2'] = 'r';
default_keybinds['gameplay']['hotbuild3'] = 'q';
default_keybinds['gameplay']['hotbuild4'] = 'f';
//you have to put the shift+ binding as well or queuing won't work
default_keybinds['gameplay']['hotbuilds1'] = 'shift+e';
default_keybinds['gameplay']['hotbuilds2'] = 'shift+r';
default_keybinds['gameplay']['hotbuilds3'] = 'shift+q';
default_keybinds['gameplay']['hotbuilds4'] = 'shift+f';

//Special Actions
action_sets['gameplay']['energytoggle'] = function (event) { energyToggle(event) };
action_sets['gameplay']['pole_lock'] = function (event) { polelockToggle(event) };
action_sets['gameplay']['requeue'] = function (event) { requeue(event) };
default_keybinds['gameplay']['energytoggle'] = 'tab';
default_keybinds['gameplay']['pole_lock'] = 'p';
default_keybinds['gameplay']['requeue'] = 'o';