//HOTBUILD2
// unit selection cannot cycle!
/*
Original Keys from Hotbuild 1 
*/

//// add variables with references to json files you want to hotbuild 
//// look in your pa installfolder /media/pa/units/ to find what you want to put below
var hotbuild1 = [
	'/pa/units/land/vehicle_factory/vehicle_factory.json',
	'/pa/units/land/bot_factory/bot_factory.json',
    '/pa/units/land/fabrication_bot/fabrication_bot.json',
	'/pa/units/land/fabrication_bot_adv/fabrication_bot_adv.json',
	'/pa/units/land/fabrication_vehicle/fabrication_vehicle.json',
	'/pa/units/land/fabrication_vehicle_adv/fabrication_vehicle_adv.json',
	'/pa/units/air/fabrication_aircraft/fabrication_aircraft.json',
	'/pa/units/air/fabrication_aircraft_adv/fabrication_aircraft_adv.json',
];
var hotbuild2 = [
	'/pa/units/air/air_factory_adv/air_factory_adv.json',
	'/pa/units/sea/naval_factory_adv/naval_factory_adv.json',
	'/pa/units/air/air_factory/air_factory.json',
	'/pa/units/sea/naval_factory/naval_factory.json',
	'/pa/units/land/land_scout/land_scout.json',
	'/pa/units/air/air_scout/air_scout.json',
	'/pa/units/land/bot_aa/bot_aa.json',
	'/pa/units/land/tank_heavy_mortar/tank_heavy_mortar.json',
	'/pa/units/land/bot_artillery_adv/bot_artillery_adv.json',
	'/pa/units/air/fighter_adv/fighter_adv.json'
];
var hotbuild3 = [
	'/pa/units/land/assault_bot/assault_bot.json',
	'/pa/units/land/assault_bot_adv/assault_bot_adv.json',
	'/pa/units/land/tank_laser_adv/tank_laser_adv.json',
	'/pa/units/air/fighter/fighter.json',
	'/pa/units/land/radar_adv/radar_adv.json',
	'/pa/units/land/radar/radar.json',
	'/pa/units/land/aa_missile_vehicle/aa_missile_vehicle.json',
	'/pa/units/air/bomber_adv/bomber_adv.json'
];
var hotbuild4 = [
 	'/pa/units/land/vehicle_factory_adv/vehicle_factory_adv.json',
	'/pa/units/land/bot_factory_adv/bot_factory_adv.json',
	'/pa/units/land/tank_light_laser/tank_light_laser.json',
	'/pa/units/air/bomber/bomber.json',
];
var hotbuild5 = [
	'/pa/units/land/energy_plant_adv/energy_plant_adv.json',
    '/pa/units/land/energy_plant/energy_plant.json',
];
var hotbuild6 = [
	'/pa/units/land/metal_extractor_adv/metal_extractor_adv.json',
	'/pa/units/land/metal_extractor/metal_extractor.json',
];
var hotbuild7 = [
	'/pa/units/land/laser_defense_adv/laser_defense_adv.json',
    '/pa/units/land/laser_defense/laser_defense.json',
	'/pa/units/land/laser_defense_single/laser_defense_single.json',
];
var hotbuild8 = [
 	'/pa/units/land/air_defense/air_defense.json',
	'/pa/units/land/land_barrier/land_barrier.json'
];
var hotbuild9 = [
	'/pa/units/land/artillery_short/artillery_short.json',
	'/pa/units/land/artillery_long/artillery_long.json'
];
var hotbuild10 = [
	'/pa/units/land/energy_storage/energy_storage.json',
	'/pa/units/land/metal_storage/metal_storage.json'
];

//add keybinds as you see fit
action_sets['gameplay']['hotbuild1'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuild1) };
action_sets['gameplay']['hotbuild2'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuild2) };
action_sets['gameplay']['hotbuild3'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuild3) };
action_sets['gameplay']['hotbuild4'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuild4) };
action_sets['gameplay']['hotbuild5'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuild5) };
action_sets['gameplay']['hotbuild6'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuild6) };
action_sets['gameplay']['hotbuild7'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuild7) };
action_sets['gameplay']['hotbuild8'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuild8) };
action_sets['gameplay']['hotbuild9'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuild9) };
action_sets['gameplay']['hotbuild10'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuild10) };
action_sets['gameplay']['hotbuilds1'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuild1) };
action_sets['gameplay']['hotbuilds2'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuild2) };
action_sets['gameplay']['hotbuilds3'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuild3) };
action_sets['gameplay']['hotbuilds4'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuild4) };
action_sets['gameplay']['hotbuilds5'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuild5) };
action_sets['gameplay']['hotbuilds6'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuild6) };
action_sets['gameplay']['hotbuilds7'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuild7) };
action_sets['gameplay']['hotbuilds8'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuild8) };
action_sets['gameplay']['hotbuilds9'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuild9) };
action_sets['gameplay']['hotbuilds10'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuild10) };
//change keys as you see fit
default_keybinds['gameplay']['hotbuild1'] = 'w';
default_keybinds['gameplay']['hotbuild2'] = 'e';
default_keybinds['gameplay']['hotbuild3'] = 'r';
default_keybinds['gameplay']['hotbuild4'] = 't';
default_keybinds['gameplay']['hotbuild5'] = 'f';
default_keybinds['gameplay']['hotbuild6'] = 's';
default_keybinds['gameplay']['hotbuild7'] = 'x';
default_keybinds['gameplay']['hotbuild8'] = 'c';
default_keybinds['gameplay']['hotbuild9'] = 'v';
default_keybinds['gameplay']['hotbuild10'] = 'd';
//you have to put the shift+ binding as well or queuing won't work
default_keybinds['gameplay']['hotbuilds1'] = 'shift+w';
default_keybinds['gameplay']['hotbuilds2'] = 'shift+e';
default_keybinds['gameplay']['hotbuilds3'] = 'shift+r';
default_keybinds['gameplay']['hotbuilds4'] = 'shift+t';
default_keybinds['gameplay']['hotbuilds4'] = 'shift+t';
default_keybinds['gameplay']['hotbuilds5'] = 'shift+f';
default_keybinds['gameplay']['hotbuilds6'] = 'shift+s';
default_keybinds['gameplay']['hotbuilds7'] = 'shift+x';
default_keybinds['gameplay']['hotbuilds8'] = 'shift+c';
default_keybinds['gameplay']['hotbuilds9'] = 'shift+v';
default_keybinds['gameplay']['hotbuilds10'] = 'shift+d';
//Special Actions
action_sets['gameplay']['energytoggle'] = function (event) { energyToggle(event) };
action_sets['gameplay']['pole_lock'] = function (event) { polelockToggle(event) };
action_sets['gameplay']['requeue'] = function (event) { requeue(event) };
default_keybinds['gameplay']['energytoggle'] = 'tab';
default_keybinds['gameplay']['pole_lock'] = '^';
default_keybinds['gameplay']['requeue'] = 'o';