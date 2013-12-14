//Personal Keys PRoeleert

//set empty defaults
var hotbuildglobal = {};
hotbuildglobal["hotbuild1s"] = [];
hotbuildglobal["hotbuild2s"] = [];
hotbuildglobal["hotbuild3s"] = [];
hotbuildglobal["hotbuild4s"] = [];
hotbuildglobal["hotbuild5s"] = [];
hotbuildglobal["hotbuild6s"] = [];
hotbuildglobal["hotbuild7s"] = [];
hotbuildglobal["hotbuild8s"] = [];
hotbuildglobal["hotbuild9s"] = [];
hotbuildglobal["hotbuild10s"] = [];

//load hotbuildconfig from settings
var settings = decode(localStorage.settings);
hotbuildglobal = settings.hotbuildconfig ? settings.hotbuildconfig : hotbuildglobal;

//Special Actions
action_sets['hotbuild']['Toggle Energy'] = function (event) { energyToggle(event) };
action_sets['hotbuild']['Lock Pole'] = function (event) { polelockToggle(event) };
action_sets['hotbuild']['Requeue'] = function (event) { requeue(event) };

default_keybinds['hotbuild']['Toggle Energy'] = 'tab';
default_keybinds['hotbuild']['Lock Pole'] = '^';
default_keybinds['hotbuild']['Requeue'] = 'o';

//Fixes for Uber Casesensitive keybinds
action_sets['hotbuild']['move'] = function(event) {hotbuildCommandMode(0)};
action_sets['hotbuild']['attack'] = function(event) {hotbuildCommandMode(1)};
action_sets['hotbuild']['assist'] = function(event) {hotbuildCommandMode(2)};
action_sets['hotbuild']['repair'] = function(event) {hotbuildCommandMode(3)};
action_sets['hotbuild']['reclaim'] = function(event) {hotbuildCommandMode(4)};
action_sets['hotbuild']['patrol'] = function(event) {hotbuildCommandMode(5)};
action_sets['hotbuild']['stop'] = function(event) {hotbuildCommandMode(-1)};
action_sets['hotbuild']['select commie'] = input.doubleTap(api.select.commander, function () { api.camera.track(true); input.doubleTap.reset(); });
action_sets['hotbuild']['unload'] = function(event) {hotbuildCommandMode(9)};

default_keybinds['hotbuild']['move'] = '';
default_keybinds['hotbuild']['attack'] = '';
default_keybinds['hotbuild']['assist'] = '';
default_keybinds['hotbuild']['repair'] = '';
default_keybinds['hotbuild']['reclaim'] = '';
default_keybinds['hotbuild']['patrol'] = '';
default_keybinds['hotbuild']['stop'] = '';
default_keybinds['hotbuild']['select commie'] = '';
default_keybinds['hotbuild']['unload'] = '';

//add keybinds as you see fit
action_sets['hotbuild']['hotbuild1'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuildglobal["hotbuild1s"]) };
action_sets['hotbuild']['hotbuild2'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuildglobal["hotbuild2s"]) };
action_sets['hotbuild']['hotbuild3'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuildglobal["hotbuild3s"]) };
action_sets['hotbuild']['hotbuild4'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuildglobal["hotbuild4s"]) };
action_sets['hotbuild']['hotbuild5'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuildglobal["hotbuild5s"]) };
action_sets['hotbuild']['hotbuild6'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuildglobal["hotbuild6s"]) };
action_sets['hotbuild']['hotbuild7'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuildglobal["hotbuild7s"]) };
action_sets['hotbuild']['hotbuild8'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuildglobal["hotbuild8s"]) };
action_sets['hotbuild']['hotbuild9'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuildglobal["hotbuild9s"]) };
action_sets['hotbuild']['hotbuild10'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuildglobal["hotbuild10s"]) };

//default bindings / you can change them in keyboard settings
default_keybinds['hotbuild']['hotbuild1'] = '';
default_keybinds['hotbuild']['hotbuild2'] = '';
default_keybinds['hotbuild']['hotbuild3'] = '';
default_keybinds['hotbuild']['hotbuild4'] = '';
default_keybinds['hotbuild']['hotbuild5'] = '';
default_keybinds['hotbuild']['hotbuild6'] = '';
default_keybinds['hotbuild']['hotbuild7'] = '';
default_keybinds['hotbuild']['hotbuild8'] = '';
default_keybinds['hotbuild']['hotbuild9'] = '';
default_keybinds['hotbuild']['hotbuild10'] = '';




