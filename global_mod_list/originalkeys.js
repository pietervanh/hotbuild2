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


//Special Actions
action_sets['hotbuild']['Toggle Energy'] = function (event) { energyToggle(event) };
action_sets['hotbuild']['Lock Pole'] = function (event) { polelockToggle(event) };
action_sets['hotbuild']['Requeue'] = function (event) { requeue(event) };
default_keybinds['hotbuild']['Toggle Energy'] = 'tab';
default_keybinds['hotbuild']['Lock Pole'] = '^';
default_keybinds['hotbuild']['Requeue'] = 'o';

//add keybinds as you see fit
action_sets['hotbuild']['build T1 Veh/Bot Factory'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuild1) };
action_sets['hotbuild']['build Air/Naval Factory'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuild2) };
action_sets['hotbuild']['build Radar'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuild3) };
action_sets['hotbuild']['build T2 Veh/Bot Factory'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuild4) };
action_sets['hotbuild']['build Power'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuild5) };
action_sets['hotbuild']['build Metal Extractor'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuild6) };
action_sets['hotbuild']['build Laser Turret'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuild7) };
action_sets['hotbuild']['build AirDef/Wall'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuild8) };
action_sets['hotbuild']['build Artillery'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuild9) };
action_sets['hotbuild']['build Storage'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuild10) };

//default bindings / you can change them in keyboard settings
default_keybinds['hotbuild']['build T1 Veh/Bot Factory'] = 'w';
default_keybinds['hotbuild']['build Air/Naval Factory'] = 'e';
default_keybinds['hotbuild']['build Radar'] = 'r';
default_keybinds['hotbuild']['build T2 Veh/Bot Factory'] = 't';
default_keybinds['hotbuild']['build Power'] = 'f';
default_keybinds['hotbuild']['build Metal Extractor'] = 's';
default_keybinds['hotbuild']['build Laser Turret'] = 'x';
default_keybinds['hotbuild']['build AirDef/Wall'] = 'c';
default_keybinds['hotbuild']['build Artillery'] = 'v';
default_keybinds['hotbuild']['build Storage'] = 'd';

