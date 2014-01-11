//IntelliSense for WebMatrix /VS
/// <reference path="../.vsdoc/jquery-1.9.1-vsdoc.js" /> 
/// <reference path="../.vsdoc/knockout-2.2.1.debug.js" />

var settings = decode(localStorage.settings);

// take care of deleting all contents in the requeue array on any "stop" command
var hotBuildOldSetCmd = model.setCommandIndex;
model.setCommandIndex = function(index) {
	hotBuildOldSetCmd(index);
	if (index == -1) {
		recentQueueCommands = [];
	}
};

createFloatingFrame('hotbuild_info_frame', 220, 70, {'offset': 'leftCenter', 'top': -200});
loadHotBuildTemplate($('#hotbuild_info_frame_content'), '../../mods/hotbuild2/live_game/hotbuild_live.html', myHotBuildViewModel);

// hijack some method that is in the right place to execute our engine calls
var hotbuildapplyUIDisplaySettings = model.applyUIDisplaySettings;
model.applyUIDisplaySettings = function() {
       apply_keybindsHotbuild('hotbuild');
       hotbuildapplyUIDisplaySettings();
};


if (settings.hotbuild_show_key_on_buildbar === "ON") {
    //Show key on buildbar
	
    $('.div_build_item img').replaceWith(
    '<img class="img_build_unit" src="img/build_bar/units/build_unit_sample.png" data-bind="attr: { src: icon }" /></a>' +
    '<span class="hbbuildbarkey" data-bind="visible: hbgetBuildBarKey($data.id()) != \'\' , text: hbgetBuildBarKey($data.id())"></span>');
	/*
	$('.div_build_item img').append(
    '<span class="hbbuildbarkey" data-bind="visible: hbgetBuildBarKey($data.id()) != \'\' , text: hbgetBuildBarKey($data.id())"></span>');
	*/
}


//fix for allowing multiple bindings per key
//for example stop = s / build mex = s
// stop = s = default mousetrap binding
// build mex = hotbuild key = using keydown
$(document).keydown(function (e) {

    if (!model.hasSelection() || model.showLanding() || model.chatSelected())
        return;

    var value = String.fromCharCode(e.keyCode).toLowerCase();
    for (i = 1; i <= 20; i++) {
        if (hotbuildglobalkey["hotbuild" + i + "s"] == value) {
            myHotBuildViewModel.hotBuild(e, hotbuildglobal["hotbuild" + i + "s"]);
            break;
        }
    }

});