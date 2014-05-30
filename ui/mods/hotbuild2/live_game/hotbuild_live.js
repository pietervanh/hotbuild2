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
    loadHotBuildTemplate($('#hotbuild_info_frame_content'), 'coui://ui/mods/hotbuild2/live_game/hotbuild_live.html', hotbuild2.hotbuildManager);

    //show keybinds on build bar
    
    if (settings.hotbuild_show_key_on_buildbar === "ON") {
        //Show key on buildbar
        $('.div_build_item .span_hotkey').replaceWith(
        '<span class="span_hotkey" data-bind="visible: hotbuild2.hbgetBuildBarKey($data.id) != \'\' , text: hotbuild2.hbgetBuildBarKey($data.id)"></span>'
        );
        $('.div_build_bar_cont').removeAttr('data-bind');
        //$('.div_command_item .span_hotkey').removeAttr('style');

        $('.div_unit_selection img').replaceWith(
        '<img class="img_selected_unit" src="" data-bind="attr: { src: $data.icon }" style="-webkit-transform: scaleX(-1);"/>' +
        '<span class="hbselectionbarkey" data-bind="visible: hotbuild2.hbgetBuildBarKey($data.type) != \'\' , text: hotbuild2.hbgetBuildBarKey($data.type)"></span>');
    }
    /*
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
        };
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

    }
    */
    
    //Hook up Real Functions to Keyboard Keys
    //Special Action
    
    action_sets.hotbuild['Lock Pole'] = function (event) { hotbuild2.polelockToggle(event); };
    action_sets.hotbuild['Toggle Cinematic'] = function (event) { hotbuild2.cinematicToggle(event); };
    action_sets.hotbuild['Toggle Terrestrial'] = function (event) { hotbuild2.terrestrialToggle(event); };
    action_sets.hotbuild['Toggle Hotbuild']=function(event){hotbuild2.toggleState();};
    action_sets.hotbuild['Toggle HotSelect']=function(event){hotbuild2.toggleState_select();};

    

})();

apply_keybinds('hotbuild');

var input_maps = (function () {

    var result = {};

    function create_dictionary_and_keymap(group) {
        var dictionary = {};
        var keymap = {};

        var defaults = default_keybinds[group];

        _.forIn(action_sets[group], function (fn, key) {
            console.log(group);
            var binding = defaults[key];
            var alt;
            var use_alt = false;

            if (localStorage['keybinding_' + key] !== undefined)
                binding = decode(localStorage['keybinding_' + key]);

            if (binding && binding.length === 1) {
                alt = binding;
                alt = [alt.toLowerCase(), alt.toUpperCase()];

                if (alt[0] !== alt[1])
                    use_alt = true;
            }

            if (use_alt){
                dictionary[alt[0]] = fn;
                dictionary[alt[1]] = fn;
            }
            else
                dictionary[binding] = fn;

            keymap[binding] = key;
        });

        return {
            dictionary: dictionary,
            keymap: keymap
        };
    }

    _.forIn(action_sets, function (set, group) {
        result[group] = create_dictionary_and_keymap(group);
    });

    return result;
})();