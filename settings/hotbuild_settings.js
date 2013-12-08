var s = decode(localStorage.settings);

model.hotbuild_preview_display_options = ko.observableArray(['ON', 'OFF']);
model.hotbuild_preview_display_val = ko.observable(s ? s.hotbuild_preview_display_val : model.hotbuild_preview_display_options()[0]);

model.oldSettings = model.settings;

model.settings = ko.computed(function () {
    var newSettings = model.oldSettings();
    newSettings['hotbuild_preview_display_val'] = model.hotbuild_preview_display_val();
    //debugger;
    return newSettings;
});

model.oldDefaults = model.defaults;

model.defaults = function () {
    model.hotbuild_preview_display_val(model.hotbuild_preview_display_options()[0]);
    model.oldDefaults();
};

$(".div_settings_control_lbl:contains('SHOW TERRESTRIAL')").parent().parent().parent().append(
                        '<tr>' +
                           '<td>' +
                                '<div class="div_settings_control_lbl">' +
                                    'HOTBUILD PREVIEW' +
                                '</div>' +
                            '</td>' +
                            '<td>' +
                                '<div class="div_settings_control_input">' +
                                    '<select class="div_settings_control_select" data-bind="options: hotbuild_preview_display_options, value: hotbuild_preview_display_val" />' +
                                '</div>' +
                            '</td>' +
                        '</tr>');