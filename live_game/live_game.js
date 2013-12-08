var settings = decode(localStorage.settings);
model.hotbuild_preview_enabled = ko.computed(function () { return settings.hotbuild_preview_display_val == 'ON' });
model.hotbuild_reset_time = parseInt(settings.hotbuild_reset_time);
//fast check on bad reset_time input
if (isNaN(model.hotbuild_reset_time)) {
    model.hotbuild_reset_time = 2000;
}


$('body').append(
'<div id="hotbuild_info" class="ignoremouse" data-bind="visible: model.hotbuild_preview_enabled, with: myHotBuildViewModel">'+
    //'<div data-bind="text: lastkey"/>' +
    //'<div data-bind="text: cycleid"/>' +
    //'<div>Debug: <span data-bind="text: debuginfo"/>' +
    '<div data-bind="text: unitName"/>' +
    '<div data-bind="foreach: hotbuilds"><div data-bind="text: $data"/></div>' +
    '<div class="hotbuild_fab_info_cont">' +
        '<div class="hotbuild_current_fab_info_cont" data-bind="foreach: hotbuildPreviews">' +
//'<!-- ko foreach: hotbuildPreviews -->' +
            '<div class="hotbuild_fab_selection">' +
                '<img class="hotbuild_selected_fab" src="" data-bind="attr: { src: $data }" border="0" />' +
                '<span class="hotbuild_selected_text" data-bind="text: $index"/>' +
            '</div>' +
//'<!-- /ko -->' +
        '</div>' +
'</div>');
ko.applyBindings(myHotBuildViewModel, $('#hotbuild_info')[0]);
apply_keybinds('hotbuild');
