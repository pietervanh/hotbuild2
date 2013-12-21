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

//Special Actions
action_sets['hotbuild']['Toggle Energy'] = function (event) { energyToggle(event) };
action_sets['hotbuild']['Lock Pole'] = function (event) { polelockToggle(event) };
action_sets['hotbuild']['Requeue'] = function (event) { requeue(event) };
action_sets['hotbuild']['View Notification'] = function (event) { hotbuildViewAlert() };
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