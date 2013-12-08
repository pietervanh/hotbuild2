var settings = decode(localStorage.settings);
model.hotbuild_preview_enabled = ko.computed(function () {
    return settings.hotbuild_preview_display_val == 'ON';
},this);
model.hotbuild_reset_time = parseInt(settings.hotbuild_reset_time);
//fast check on bad reset_time input
if (isNaN(model.hotbuild_reset_time)) {
    model.hotbuild_reset_time = 2000;
}


$('body').append(
'<div id="hotbuild_info" class="ignoremouse" data-bind="Visible: model.hotbuild_preview_enabled , with: myHotBuildViewModel">' +
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

//same as the one in media\ui\alpha\shared\js\inputmap.js
//problem default you can't give in the arrays with upper and lower keys
//this version automaticaly gives in [binding,binding+shift] wich solves the problem
function apply_keybindscustom(set, used_keybinds, conflicts, resolve) {

    var key;
    var action;
    var binding;
    var clear_conflict;
    var i;
    var defaults = default_keybinds[set];

    var squelch = function (e) {
        if (e.preventDefault)
            e.preventDefault();
        return false;
    }

    // kill bad chrome defaults. todo: get list of all default bindings
    Mousetrap.bind('backspace', squelch);

    used_keybinds = (used_keybinds) ? used_keybinds : {};
    conflicts = (conflicts) ? conflicts : [];

    //console.log('apply_keybinds:' + set);

    for (key in action_sets[set]) {
        action = action_sets[set][key];
        binding = defaults[key];

        if (localStorage['keybinding_' + key] !== undefined)
            binding = decode(localStorage['keybinding_' + key]);

        //console.log(key + ":" + (binding) ? binding : "unbound");

        if (resolve) {
            clear_conflict = true;
            for (i = 0; i < conflicts.length; i++) {
                if (conflicts[i].binding === binding) {
                    localStorage['keybinding_' + key] = encode('conflict');
                    Mousetrap.unbind(binding);
                    clear_conflict = false;
                }
            }

            if (clear_conflict && binding === 'conflict')
                localStorage.removeItem('keybinding_' + key);
        }
        else {
            if (binding && binding !== 'conflict') {
                if (used_keybinds[binding])
                    conflicts.push({ 'set': set, 'key': key, 'binding': binding });
                else {
                    used_keybinds[binding] = true;
                    binding = [binding,'shift+' + binding] //array with shift DIFFERENCE so both upper and lower case should work
                    Mousetrap.bind(binding, _.partial(function (callback, event, binding) { callback(event, binding); event.preventDefault(); }, action));
                }
            }
        }
    }
}
apply_keybindscustom('hotbuild');
