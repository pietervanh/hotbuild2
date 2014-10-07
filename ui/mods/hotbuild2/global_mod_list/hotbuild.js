//Special Actions
action_sets.gameplay.hotbuild_lock_pole = function () {
    if(hotbuild2.polelockToggle) hotbuild2.polelockToggle();
};
action_sets.gameplay.hotbuild_toggle = function () {
    if(hotbuild2.toggleState) hotbuild2.toggleState();
};
action_sets.gameplay.hotbuild_hotselect = function () {
    if(hotbuild2.toggleState_select) hotbuild2.toggleState_select();
};

api.settings.definitions.keyboard.settings.hotbuild_lock_pole = {
    title: 'Lock Pole Toggle',
    type: 'keybind',
    set: 'hotbuild',
    display_group: 'hotbuild',
    display_sub_group: 'hotbuild',
    default : 'y'
};

api.settings.definitions.keyboard.settings.hotbuild_toggle = {
    title: 'Hotbuild Toggle',
    type: 'keybind',
    set: 'hotbuild',
    display_group: 'hotbuild',
    display_sub_group: 'hotbuild',
    default: ''
};
api.settings.definitions.keyboard.settings.hotbuild_hotselect = {
    title: 'HotSelect Toggle',
    type: 'keybind',
    set: 'hotbuild',
    display_group: 'hotbuild',
    display_sub_group: 'hotbuild',
    default: ''
};

