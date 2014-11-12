console.log("loading hotbuild2 selection");

var hotbuild2selection = (function () {

    handlers['hotbuildsettings.exit'] = function(){
      console.log("Settings Closed Reload hotbuild selection");
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

    if (show_key_on_buildbar() === "ON") {

        $('.div_unit_selection img').replaceWith(
        '<img class="img_selected_unit" src="" data-bind="attr: { src: $data.icon }" style="-webkit-transform: scaleX(-1);"/>' +
        '<span class="hbselectionbarkey" data-bind="visible: hbgetBuildBarKey($data.type) != \'\' , text: hbgetBuildBarKey($data.type)"></span>');
    }

})();

model.selectionList.subscribe(function(newval){
  api.Panel.message(api.Panel.parentId,'hbunitselection',model.selectionList());
});
