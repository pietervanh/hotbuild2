//IntelliSense for WebMatrix /VS
/// <reference path="../.vsdoc/jquery-1.9.1-vsdoc.js" /> 
/// <reference path="../.vsdoc/knockout-2.2.1.debug.js" />
(function () {
    
    //Make sure settings are set / if not set defaults
    initialSettingValue('hotbuild_reset_time',2000);
    initialSettingValue('hotbuild_show_key_on_buildbar','ON');
    initialSettingValue('hotbuild_show_key_on_sidebar', 'ON');
    initialSettingValue('hotbuild_shift_key_recycle', 'OFF');
    
    //keyboard tab keys under hotbuild title
    action_sets.hotbuild = {}; 
    //Special Actions
    action_sets.hotbuild['Toggle Energy'] = function (event) { };
    action_sets.hotbuild['Lock Pole'] = function (event) { };
    action_sets.hotbuild['Toggle Cinematic'] = function (event) { };
    action_sets.hotbuild['Toggle Terrestrial'] = function (event) { };
    action_sets.hotbuild.Requeue = function (event) { };
    action_sets.hotbuild['View Notification'] = function (event) { };
    //action_sets.hotbuild['Build Template'] = function (event) { };
    //Fixes for Uber Casesensitive keybinds
    action_sets.hotbuild.move = function (event) { };
    action_sets.hotbuild.attack = function (event) { };
    action_sets.hotbuild.assist = function (event) { };
    action_sets.hotbuild.repair = function (event) { };
    action_sets.hotbuild.reclaim = function (event) { };
    action_sets.hotbuild.patrol = function (event) { };
    action_sets.hotbuild.stop = function (event) { };
    action_sets.hotbuild['select commie'] = function (event) { };
    action_sets.hotbuild.unload = function (event) { };
    action_sets.hotbuild['D-Gun'] = function (event) { };
    action_sets.hotbuild.Ping = function (event) { };
	action_sets.hotbuild['Toggle Hotbuild'] = function (event) { };  
	action_sets.hotbuild['Toggle HotSelect'] = function (event) { };
    
    //set defaults for when you click on the set defaults button in settings
    // here we set them empty click community defaults buttons for better defaults
    default_keybinds.hotbuild = {}; 
    default_keybinds.hotbuild['Toggle Energy'] = '';
    default_keybinds.hotbuild['Lock Pole'] = '';
    default_keybinds.hotbuild['Toggle Cinematic'] = '';
    default_keybinds.hotbuild['Toggle Terrestrial'] = '';
    default_keybinds.hotbuild.Requeue = '';
    default_keybinds.hotbuild['View Notification'] = '';
    //default_keybinds.hotbuild['Build Template'] = '';
    default_keybinds.hotbuild.move = '';
    default_keybinds.hotbuild.attack = '';
    default_keybinds.hotbuild.assist = '';
    default_keybinds.hotbuild.repair = '';
    default_keybinds.hotbuild.reclaim = '';
    default_keybinds.hotbuild.patrol = '';
    default_keybinds.hotbuild.stop = '';
    default_keybinds.hotbuild['select commie'] = '';
    default_keybinds.hotbuild.unload = '';
    default_keybinds.hotbuild['D-Gun'] = '';
    default_keybinds.hotbuild.Ping = '';
    default_keybinds.hotbuild['Toggle Hotbuild'] = '';
    default_keybinds.hotbuild['Toggle HotSelect'] = '';
    
})();
