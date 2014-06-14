console.log("loading hotbuild2 buildbar");

var hotbuild2live = (function () {
    //load html dynamically
    loadHotBuildTemplate = function (element, url, model) {
        element.load(url, function () {
            console.log("Loading html " + url);
            ko.applyBindings(model, element.get(0));
        });
    };

    var hotbuildglobal = {};
    var hotbuildglobalkey = {};
    var settings = decode(localStorage.settings);

    hotbuildglobal = settings.hotbuildconfig ? settings.hotbuildconfig : hotbuildglobal;
    hotbuildglobalkey = settings.hotbuildconfigkey ? settings.hotbuildconfigkey : hotbuildglobalkey;    
    hbgetBuildBarKey = function (id) {
        var result = '';
        var hbpos = 1;
        _.forEach(hotbuildglobal, function (hbkey) {
            _.forEach(hbkey, function (hbitem) {
                if (hbitem.json === id) {
                    if (hotbuildglobalkey["hotbuild" + hbpos + "s"] !== undefined) {
                        result += hotbuildglobalkey["hotbuild" + hbpos + "s"];
                        return false;
                    }
                }
                if (hbitem.json + ".player" === id) {
                    if (hotbuildglobalkey["hotbuild" + hbpos + "s"] !== undefined) {
                        result += hotbuildglobalkey["hotbuild" + hbpos + "s"];
                        return false;
                    }
                }                
            });
            hbpos += 1;
        });
        return result;
    };    
    console.log("lalala");

    //load hotbuildconfig from settings
    /*
    createFloatingFrame('hotbuild_info_frame', 220, 70, { 'offset': 'leftCenter', 'top': -200 });
    loadHotBuildTemplate($('#hotbuild_info_frame_content'), 'coui://ui/mods/hotbuild2/live_game/hotbuild_live.html', hotbuild2.hotbuildManager);
*/
    //show keybinds on build bar

    
    var show_key_on_buildbar = api.settings.isSet('ui','hotbuild_show_key_on_buildbar',true) || "ON";

    if (show_key_on_buildbar === "ON") {
        //Show key on buildbar
        $('.div_build_item .span_hotkey').replaceWith(
        '<span class="span_hotkey" data-bind="visible: hbgetBuildBarKey($data.id) != \'\' , text: hbgetBuildBarKey($data.id)"></span>'
        );
        $('.div_build_bar_cont').removeAttr('data-bind');
        //$('.div_command_item .span_hotkey').removeAttr('style');

        $('.div_unit_selection img').replaceWith(
        '<img class="img_selected_unit" src="" data-bind="attr: { src: $data.icon }" style="-webkit-transform: scaleX(-1);"/>' +
        '<span class="hbselectionbarkey" data-bind="visible: hbgetBuildBarKey($data.type) != \'\' , text: hhbgetBuildBarKey($data.type)"></span>');
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
    
})();    

model.hbunitspecs = ko.computed(function(){
    if(model.buildSet() !== undefined){
        if(model.buildSet().selectedSpecs() !== undefined){
            return model.buildSet().selectedSpecs();
        }
    }
});

model.hbunitspecs.subscribe(function(newval){
    //try{
        //console.log(newval);
        var specs = ko.toJS(newval[Object.keys(newval)[0]]);
        console.log(specs);
        var barr = [];
        if(specs !== undefined){
            
            //console.log(specs);
            for(var i = 0; i < specs.length; i++){
                var bspec = specs[i];
                delete bspec.build;
                delete bspec.commands;
                delete bspec.consumption;
                delete bspec.production;
                barr[i] = bspec;
            }
            
        }
        console.log(barr);
        api.Panel.message(api.Panel.parentId,'hbselection',barr);
   /* }
    catch(e){
        console.log(e);
    } */
});