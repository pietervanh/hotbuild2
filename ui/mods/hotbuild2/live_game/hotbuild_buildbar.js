console.log("loading hotbuild2 buildbar");

var hotbuild2buildbar = (function () {

    //RELOAD BUILDBAR + MODS on Settings Exit
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
        //the build bar hands us tagged ids in Galactic War, ours are stored untagged
        var canonical = hbSpecId.canonical(id);
        //the two configs are joined by property name, so look the key up by name
        _.forEach(hotbuildglobal, function (hbkey, hbname) {
            _.forEach(hbkey, function (hbitem) {
                if (hbitem && hbSpecId.canonical(hbitem.json) === canonical) {
                    if (hotbuildglobalkey[hbname] !== undefined) {
                        result += hotbuildglobalkey[hbname];
                        return false;
                    }
                }
            });
        });
        return result;
    };

    //show keybinds on build bar
    if (show_key_on_buildbar() === "ON") {
        $('.div_build_item .span_hotkey').replaceWith(
        '<span class="span_hotkey hb_hotkey" data-bind="visible: hbgetBuildBarKey($data.id) != \'\' , text: hbgetBuildBarKey($data.id)"></span>'
        );
        $('.div_build_bar_cont').removeAttr('data-bind');
    }

})();


//TRANSFER BUILDBAR DATA to HOTBUILD CORE
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

console.log("loaded hotbuild2 buildbar");
