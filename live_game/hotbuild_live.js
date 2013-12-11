//IntelliSense for WebMatrix /VS
/// <reference path="../vsdoc/jquery-1.9.1-vsdoc.js" /> 
/// <reference path="../vsdoc/knockout-2.2.1.debug.js" />

var settings = decode(localStorage.settings);

model.hotbuild_preview_enabled = ko.computed(function () {
    return settings.hotbuild_preview_display_val == 'ON';
},this);

//createFloatingFrame('hotbuild_info_frame', 320, 58, {'offset': 'leftCenter', 'left': 0});

//$('#hotbuild_info_frame_content').append(
$('body').append(
'<div id="hotbuild_info" class="ignoremouse" data-bind="Visible: model.hotbuild_preview_enabled , with: myHotBuildViewModel">' +
    //'<div data-bind="text: lastkey"/>' +
    //'<div data-bind="text: cycleid"/>' +
    //'<div>Debug: <span data-bind="text: debuginfo"/>' +
    '<div data-bind="text: unitName"/>' +
    //'<div data-bind="foreach: hotbuilds"><div data-bind="text: $data"/></div>' +
    '<div class="hotbuild_fab_info_cont">' +
        '<div class="hotbuild_current_fab_info_cont" data-bind="foreach: hotbuildPreviews">' +
            '<div class="hotbuild_fab_selection">' +
                '<img class="hotbuild_selected_fab" src="" data-bind="attr: { src: $data }" border="0" />' +
                '<span class="hotbuild_selected_text" data-bind="text: $index"/>' +
            '</div>' +
        '</div>' +
'</div>');
ko.applyBindings(myHotBuildViewModel, $('#hotbuild_info')[0]);

apply_keybindsHotbuild('hotbuild');
