/// <reference path="hotbuild_live.js" />
//IntelliSense for WebMatrix /VS
/// <reference path="../.vsdoc/jquery-1.9.1-vsdoc.js" /> 
/// <reference path="../.vsdoc/knockout-2.2.1.debug.js" />
/// <reference path="../.vsdoc/lodash-2.4.1.js" />
var hotbuild2live = (function () {

    //load html dynamically
    loadHotBuildTemplate = function (element, url, model) {
        element.load(url, function () {
            console.log("Loading html " + url);
            ko.applyBindings(model, element.get(0));
        });
    };

    //load hotbuildconfig from settings
    var settings = decode(localStorage.settings);

    createFloatingFrame('hotbuild_info_frame', 220, 70, { 'offset': 'leftCenter', 'top': -200 });
    loadHotBuildTemplate($('#hotbuild_info_frame_content'), '../../mods/hotbuild2/live_game/hotbuild_live.html', hotbuild2.hotbuildManager);

    //show keybinds on build bar
    if (settings.hotbuild_show_key_on_buildbar === "ON") {
        //Show key on buildbar
        $('.div_build_item img').replaceWith(
        '<img class="img_build_unit" src="img/build_bar/units/build_unit_sample.png" data-bind="attr: { src: icon }" /></a>' +
        '<span class="hbbuildbarkey" data-bind="visible: hotbuild2.hbgetBuildBarKey($data.id()) != \'\' , text: hotbuild2.hbgetBuildBarKey($data.id())"></span>');
        $('.div_unit_selection img').replaceWith(
        '<img class="img_selected_unit" src="" data-bind="attr: { src: $data.icon }" style="-webkit-transform: scaleX(-1);"/>' +
        //'<span class="hbbuildbarkey" data-bind="blah: console.log($data.type)"></span>');
        '<span class="hbselectionbarkey" data-bind="visible: hotbuild2.hbgetBuildBarKey($data.type) != \'\' , text: hotbuild2.hbgetBuildBarKey($data.type)"></span>');
    };

    if (settings.hotbuild_show_key_on_sidebar === "ON") {
        //show keybinds on command + orders sidebar
        //commands
        var keybindFix = function (keybind) {
            keybind = JSON.parse(localStorage.getItem(keybind));
            if (keybind !== undefined) {
                if (keybind !== 'undefined' && keybind !== '""' && keybind !== '') {
                    return keybind;
                }
                else {
                    return '';
                }
            }
            else {
                return '';
            }
        }
		
        if (keybindFix('keybinding_move') !== '') { $('.div_command_item > a#A5').append('<span class="hbsidebarkey">' + keybindFix('keybinding_move') + '</span>'); }
        if (keybindFix('keybinding_attack') !== '') { $('.div_command_item > a#A6').append('<span class="hbsidebarkey">' + keybindFix('keybinding_attack') + '</span>'); }        
        if (keybindFix('keybinding_assist') !== '') { $('.div_command_item > a#A7').append('<span class="hbsidebarkey">' + keybindFix('keybinding_assist') + '</span>'); }
        if (keybindFix('keybinding_repair') !== '') { $('.div_command_item > a#A8').append('<span class="hbsidebarkey">' + keybindFix('keybinding_repair') + '</span>'); }
        if (keybindFix('keybinding_reclaim') !== '') { $('.div_command_item > a#A9').append('<span class="hbsidebarkey">' + keybindFix('keybinding_reclaim') + '</span>'); }
        if (keybindFix('keybinding_patrol') !== '') { $('.div_command_item > a#A10').append('<span class="hbsidebarkey">' + keybindFix('keybinding_patrol') + '</span>'); }
        if (keybindFix('keybinding_unload') !== '') { $('.div_command_item > a#A12').append('<span class="hbsidebarkey">' + keybindFix('keybinding_unload') + '</span>'); }
        if (keybindFix('keybinding_stop') !== '') { $('.div_command_item > a#A13').append('<span class="hbsidebarkey">' + keybindFix('keybinding_stop') + '</span>'); }
        if (keybindFix('keybinding_D-Gun') !== '') { $('.div_command_item > a#A20').append('<span class="hbsidebarkey">' + keybindFix('keybinding_D-Gun') + '</span>'); }
        if (keybindFix('keybinding_Ping') !== '') { $('.div_command_item > a#A21').append('<span class="hbsidebarkey">' + keybindFix('keybinding_Ping') + '</span>'); }
        
        //orders
        if (keybindFix('keybinding_Toggle Energy') !== '') { $('.div_command_item.order_energy_item').append('<span class="hbsidebarkey">' + keybindFix('keybinding_Toggle Energy') + '</span>'); }
        if (keybindFix('keybinding_Requeue') !== '') { $('.div_command_item.order_buildstance_item').append('<span class="hbsidebarkey">' + keybindFix('keybinding_Requeue') + '</span>'); }
    };

    //Hook up Real Functions to Keyboard Keys
    //Special Action
    action_sets.hotbuild['Toggle Energy'] = function (event) { hotbuild2.energyToggle(event); };
    action_sets.hotbuild['Lock Pole'] = function (event) { hotbuild2.polelockToggle(event); };
    action_sets.hotbuild['Requeue'] = function (event) { hotbuild2.requeue(event); };
    action_sets.hotbuild['View Notification'] = function (event) { hotbuild2.viewAlert(); };
    //action_sets.hotbuild['Build Template'] = function (event) { hotbuild2.buildTemplates.chooseBuildTemplate(); };
    //Fixes for Uber Casesensitive keybinds
    action_sets.hotbuild['move'] = function (event) { hotbuild2.CommandMode(0); };
    action_sets.hotbuild['attack'] = function (event) { hotbuild2.CommandMode(1); };
    action_sets.hotbuild['assist'] = function (event) { hotbuild2.CommandMode(2); };
    action_sets.hotbuild['repair'] = function (event) { hotbuild2.CommandMode(3); };
    action_sets.hotbuild['reclaim'] = function (event) { hotbuild2.CommandMode(4); };
    action_sets.hotbuild['patrol'] = function (event) { hotbuild2.CommandMode(5); };
    action_sets.hotbuild['stop'] = function (event) { hotbuild2.CommandMode(-1); };
    action_sets.hotbuild['select commie'] = input.doubleTap(api.select.commander, function () { api.camera.track(true); input.doubleTap.reset(); });
    action_sets.hotbuild['unload'] = function (event) { hotbuild2.CommandMode(9); };
    action_sets.hotbuild['D-Gun'] = function (event) { hotbuild2.CommandMode(12); };
    action_sets.hotbuild['Ping'] = function (event) { hotbuild2.CommandMode(13); };

    // hijack some method that is in the right place to execute our engine calls
    //might be not needed in future if live_game.js has no more 
    /*
    var hotbuildapplyUIDisplaySettings = model.applyUIDisplaySettings;
    model.applyUIDisplaySettings = function () {
        hotbuild2.apply_keybinds();
        hotbuildapplyUIDisplaySettings();
    };
    */
    hotbuild2.apply_keybinds();

})();
