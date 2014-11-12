console.log("loading hotbuild2 buildbar");

var hotbuild2live = (function () {

    handlers['hotbuildsettings.exit'] = function(){
      console.log("Settings Closed Reload hotbuild live");
      window.location.reload();
    };

    var hotbuildglobal = {};
    var hotbuildglobalkey = {};
    hotbuildglobal = localStorage.hotbuildconfig ? decode(localStorage.hotbuildconfig) : hotbuildglobal;
    hotbuildglobalkey = localStorage.hotbuildconfigkey ? decode(localStorage.hotbuildconfigkey) : hotbuildglobalkey;
    var show_key_on_buildbar = ko.observable(api.settings.isSet('ui','hotbuild_show_key_on_buildbar',true) || "ON");

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


    /*
    This should move to LiveGame_FloatZone
    createFloatingFrame('hotbuild_info_frame', 220, 70, { 'offset': 'leftCenter', 'top': -200 });
    loadHotBuildTemplate($('#hotbuild_info_frame_content'), 'coui://ui/mods/hotbuild2/live_game/hotbuild_live.html', hotbuild2.hotbuildManager);
    */
    //show keybinds on build bar



    if (show_key_on_buildbar() === "ON") {
        //Show key on buildbar
        $('.div_build_item .span_hotkey').replaceWith(
        '<span class="span_hotkey hb_hotkey" data-bind="visible: hbgetBuildBarKey($data.id) != \'\' , text: hbgetBuildBarKey($data.id)"></span>'
        );
        $('.div_build_bar_cont').removeAttr('data-bind');
        //$('.div_command_item .span_hotkey').removeAttr('style');
    }

})();

model.hbunitspecs = ko.computed(function(){
    if(model.buildSet() !== undefined){
        if(model.buildSet().selectedSpecs() !== undefined){
            return model.buildSet().selectedSpecs();
        }
    }
});

model.hbunitspecs.subscribe(function(newval){
    try{
        //console.log(newval);
        var specs = ko.toJS(newval[Object.keys(newval)[0]]);
        //console.log(specs.length);
        //console.log(Object.keys(newval).length);
        if(Object.keys(newval).length > 1){
            //debugger;
            for(var j = 1; j <= Object.keys(newval).length; j++){
                specs = _.union(specs, ko.toJS(newval[Object.keys(newval)[j]]));
            }
        }
        //console.log(specs.length);
        //console.log(specs);
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
            barr = _.uniq(barr);
        }
        //console.log(barr.length);
        api.Panel.message(api.Panel.parentId,'hbselection',barr);
    }
    catch(e){
        console.log(e);
    }
});
