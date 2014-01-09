//set empty defaults
var hotbuildglobal = {};
var hotbuildglobalkey = {};
for (i = 1; i < 21; i++) {
    eval("hotbuildglobal.hotbuild" + i + "s = []");
    eval("hotbuildglobalkey.hotbuild" + i + "s = ''");
    eval("default_keybinds.hotbuild.hotbuild" + i + "= ''"); //remove in future is cleanup previous versions
}
//load hotbuildconfig from settings
var settings = decode(localStorage.settings);
hotbuildglobal = settings.hotbuildconfig ? settings.hotbuildconfig : hotbuildglobal;
hotbuildglobalkey = settings.hotbuildconfigkey ? settings.hotbuildconfigkey : hotbuildglobalkey;

//Special Actions

action_sets.hotbuild['Toggle Energy'] = function (event) { energyToggle(event); };
action_sets.hotbuild['Lock Pole'] = function (event) { polelockToggle(event); };
action_sets.hotbuild['Requeue'] = function (event) { requeue(event); };
action_sets.hotbuild['View Notification'] = function (event) { hotbuildViewAlert(); };
//Fixes for Uber Casesensitive keybinds
action_sets.hotbuild['move'] = function(event) {hotbuildCommandMode(0);};
action_sets.hotbuild['attack'] = function(event) {hotbuildCommandMode(1);};
action_sets.hotbuild['assist'] = function(event) {hotbuildCommandMode(2);};
action_sets.hotbuild['repair'] = function(event) {hotbuildCommandMode(3);};
action_sets.hotbuild['reclaim'] = function(event) {hotbuildCommandMode(4);};
action_sets.hotbuild['patrol'] = function(event) {hotbuildCommandMode(5);};
action_sets.hotbuild['stop'] = function(event) {hotbuildCommandMode(-1);};
action_sets.hotbuild['select commie'] = input.doubleTap(api.select.commander, function () { api.camera.track(true); input.doubleTap.reset(); });
action_sets.hotbuild['unload'] = function(event) {hotbuildCommandMode(9);};


default_keybinds.hotbuild['Toggle Energy'] = '';
default_keybinds.hotbuild['Lock Pole'] = '';
default_keybinds.hotbuild['Requeue'] = '';
default_keybinds.hotbuild['View Notification'] = '';
default_keybinds.hotbuild['move'] = '';
default_keybinds.hotbuild['attack'] = '';
default_keybinds.hotbuild['assist'] = '';
default_keybinds.hotbuild['repair'] = '';
default_keybinds.hotbuild['reclaim'] = '';
default_keybinds.hotbuild['patrol'] = '';
default_keybinds.hotbuild['stop'] = '';
default_keybinds.hotbuild['select commie'] = '';
default_keybinds.hotbuild['unload'] = '';
