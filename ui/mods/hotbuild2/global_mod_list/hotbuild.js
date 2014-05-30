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
    
    action_sets.hotbuild['Lock Pole'] = function (event) { };
    action_sets.hotbuild['Toggle Cinematic'] = function (event) { };
    action_sets.hotbuild['Toggle Terrestrial'] = function (event) { };
	action_sets.hotbuild['Toggle Hotbuild'] = function (event) { };  
	action_sets.hotbuild['Toggle HotSelect'] = function (event) { };
    
    //set defaults for when you click on the set defaults button in settings
    // here we set them empty click community defaults buttons for better defaults
    default_keybinds.hotbuild = {}; 
    default_keybinds.hotbuild['Lock Pole'] = '';
    default_keybinds.hotbuild['Toggle Cinematic'] = '';
    default_keybinds.hotbuild['Toggle Terrestrial'] = '';
    default_keybinds.hotbuild['Toggle Hotbuild'] = '';
    default_keybinds.hotbuild['Toggle HotSelect'] = '';
    
})();
