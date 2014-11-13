console.log("loading hotbuild2 floatframe");

var hotbuild2floatframe = (function () {

    //RELOAD FloatFrame + MODS on Settings Exit
    handlers['hotbuildsettings.exit'] = function(){
      console.log("Settings Closed Reload hotbuild floatframe");
      window.location.reload();
    };

    var show_preview = ko.observable(api.settings.isSet('ui','hotbuild_show_preview',true) || "ON");

    if(show_preview() === "ON"){

      model.hotbuildPreviewVisible = ko.observable(false);
      model.hotbuildPreviews = ko.observableArray([]);

      //Retrieve PreviewData from hotbuild core
      handlers.hotbuildfloatframepreview = function(payload){
        model.hotbuildPreviewVisible(payload.visible);
        model.hotbuildPreviews(payload.list);
      };

      createFloatingFrame('hotbuild_info_frame', 220, 70, { 'offset': 'leftCenter', 'top': -200 });
      $('#hotbuild_info_frame_content').append(
          $.ajax({
              type: "GET",
              url: 'coui://ui/mods/hotbuild2/live_game/hotbuild_preview.html',
              async: false
          }).responseText
      );
    }
})();
console.log("loaded hotbuild2 floatframe");
