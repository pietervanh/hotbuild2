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
hotbuildglobal["hotbuild11s"] = [];
hotbuildglobal["hotbuild12s"] = [];
hotbuildglobal["hotbuild13s"] = [];
hotbuildglobal["hotbuild14s"] = [];
hotbuildglobal["hotbuild15s"] = [];
hotbuildglobal["hotbuild16s"] = [];
hotbuildglobal["hotbuild17s"] = [];
hotbuildglobal["hotbuild18s"] = [];
hotbuildglobal["hotbuild19s"] = [];
hotbuildglobal["hotbuild20s"] = [];

var hotbuildglobalname = {};

hotbuildglobalname["hotbuild1s"] = "";
hotbuildglobalname["hotbuild2s"] = "";
hotbuildglobalname["hotbuild3s"] = "";
hotbuildglobalname["hotbuild4s"] = "";
hotbuildglobalname["hotbuild5s"] = "";
hotbuildglobalname["hotbuild6s"] = "";
hotbuildglobalname["hotbuild7s"] = "";
hotbuildglobalname["hotbuild8s"] = "";
hotbuildglobalname["hotbuild9s"] = "";
hotbuildglobalname["hotbuild10s"] = "";
hotbuildglobalname["hotbuild11s"] = "";
hotbuildglobalname["hotbuild12s"] = "";
hotbuildglobalname["hotbuild13s"] = "";
hotbuildglobalname["hotbuild14s"] = "";
hotbuildglobalname["hotbuild15s"] = "";
hotbuildglobalname["hotbuild16s"] = "";
hotbuildglobalname["hotbuild17s"] = "";
hotbuildglobalname["hotbuild18s"] = "";
hotbuildglobalname["hotbuild19s"] = "";
hotbuildglobalname["hotbuild20s"] = "";

var hotbuildglobalkey = {}

hotbuildglobalkey["hotbuild1s"] = "";
hotbuildglobalkey["hotbuild2s"] = "";
hotbuildglobalkey["hotbuild3s"] = "";
hotbuildglobalkey["hotbuild4s"] = "";
hotbuildglobalkey["hotbuild5s"] = "";
hotbuildglobalkey["hotbuild6s"] = "";
hotbuildglobalkey["hotbuild7s"] = "";
hotbuildglobalkey["hotbuild8s"] = "";
hotbuildglobalkey["hotbuild9s"] = "";
hotbuildglobalkey["hotbuild10s"] = "";
hotbuildglobalkey["hotbuild11s"] = "";
hotbuildglobalkey["hotbuild12s"] = "";
hotbuildglobalkey["hotbuild13s"] = "";
hotbuildglobalkey["hotbuild14s"] = "";
hotbuildglobalkey["hotbuild15s"] = "";
hotbuildglobalkey["hotbuild16s"] = "";
hotbuildglobalkey["hotbuild17s"] = "";
hotbuildglobalkey["hotbuild18s"] = "";
hotbuildglobalkey["hotbuild19s"] = "";
hotbuildglobalkey["hotbuild20s"] = "";


//load hotbuildconfig from settings
var settings = decode(localStorage.settings);
hotbuildglobal = settings.hotbuildconfig ? settings.hotbuildconfig : hotbuildglobal;
hotbuildglobalkey = settings.hotbuildconfigkey ? settings.hotbuildconfigkey : hotbuildglobalkey;
hotbuildglobalname = settings.hotbuildconfigname ? settings.hotbuildconfigname : hotbuildglobalname;

//Special Actions
action_sets['hotbuild']['Toggle Energy'] = function (event) { energyToggle(event) };
action_sets['hotbuild']['Lock Pole'] = function (event) { polelockToggle(event) };
action_sets['hotbuild']['Requeue'] = function (event) { requeue(event) };
action_sets['hotbuild']['View Notification'] = function (event) { hotbuildViewAlert() };


//add keybinds as you see fit
/*
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
action_sets['hotbuild']['hotbuild11'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuildglobal["hotbuild11s"]) };
action_sets['hotbuild']['hotbuild12'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuildglobal["hotbuild12s"]) };
action_sets['hotbuild']['hotbuild13'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuildglobal["hotbuild13s"]) };
action_sets['hotbuild']['hotbuild14'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuildglobal["hotbuild14s"]) };
action_sets['hotbuild']['hotbuild15'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuildglobal["hotbuild15s"]) };
action_sets['hotbuild']['hotbuild16'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuildglobal["hotbuild16s"]) };
action_sets['hotbuild']['hotbuild17'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuildglobal["hotbuild17s"]) };
action_sets['hotbuild']['hotbuild18'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuildglobal["hotbuild18s"]) };
action_sets['hotbuild']['hotbuild19'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuildglobal["hotbuild19s"]) };
action_sets['hotbuild']['hotbuild20'] = function (event) { myHotBuildViewModel.hotBuild(event, hotbuildglobal["hotbuild20s"]) };
*/
/*
action_sets['hotbuild']['hotbuild1'] = '';
action_sets['hotbuild']['hotbuild2'] = '';
action_sets['hotbuild']['hotbuild3'] = '';
action_sets['hotbuild']['hotbuild4'] = '';
action_sets['hotbuild']['hotbuild5'] = '';
action_sets['hotbuild']['hotbuild6'] = '';
action_sets['hotbuild']['hotbuild7'] = '';
action_sets['hotbuild']['hotbuild8'] = '';
action_sets['hotbuild']['hotbuild9'] = '';
action_sets['hotbuild']['hotbuild10'] = '';
action_sets['hotbuild']['hotbuild11'] = '';
action_sets['hotbuild']['hotbuild12'] = '';
action_sets['hotbuild']['hotbuild13'] = '';
action_sets['hotbuild']['hotbuild14'] = '';
action_sets['hotbuild']['hotbuild15'] = '';
action_sets['hotbuild']['hotbuild16'] = '';
action_sets['hotbuild']['hotbuild17'] = '';
action_sets['hotbuild']['hotbuild18'] = '';
action_sets['hotbuild']['hotbuild19'] = '';
action_sets['hotbuild']['hotbuild20'] = '';
*/
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

default_keybinds['hotbuild']['Toggle Energy'] = '';
default_keybinds['hotbuild']['Lock Pole'] = '';
default_keybinds['hotbuild']['Requeue'] = '';
default_keybinds['hotbuild']['View Notification'] = '';


default_keybinds['hotbuild']['move'] = '';
default_keybinds['hotbuild']['attack'] = '';
default_keybinds['hotbuild']['assist'] = '';
default_keybinds['hotbuild']['repair'] = '';
default_keybinds['hotbuild']['reclaim'] = '';
default_keybinds['hotbuild']['patrol'] = '';
default_keybinds['hotbuild']['stop'] = '';
default_keybinds['hotbuild']['select commie'] = '';
default_keybinds['hotbuild']['unload'] = '';

//default bindings / you can change them in keyboard settings
/*
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
default_keybinds['hotbuild']['hotbuild11'] = '';
default_keybinds['hotbuild']['hotbuild12'] = '';
default_keybinds['hotbuild']['hotbuild13'] = '';
default_keybinds['hotbuild']['hotbuild14'] = '';
default_keybinds['hotbuild']['hotbuild15'] = '';
default_keybinds['hotbuild']['hotbuild16'] = '';
default_keybinds['hotbuild']['hotbuild17'] = '';
default_keybinds['hotbuild']['hotbuild18'] = '';
default_keybinds['hotbuild']['hotbuild19'] = '';
default_keybinds['hotbuild']['hotbuild20'] = '';
*/

