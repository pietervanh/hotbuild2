console.log("loading hotbuild core");
var hotbuild2 = (function () {

    var hotbuildglobal = {};
    var hotbuildglobalkey = {};
    hotbuildglobal = localStorage.hotbuildconfig ? decode(localStorage.hotbuildconfig) : hotbuildglobal;
    hotbuildglobalkey = localStorage.hotbuildconfigkey ? decode(localStorage.hotbuildconfigkey) : hotbuildglobalkey;

    /*variables for hotbuild toggle*/
    var hotbuild_enable=true; //allow hotbuild buildbar
    var hotbuild_select_enable=true; //allow hotbuild select bar
    var hotbuild_frameEvent; //animationFrame Timer

    var hotbuildshiftrecycle = api.settings.isSet('ui','hotbuild_shift_key_recycle',true) || "OFF";
    var hotbuildreset_time = api.settings.isSet('ui','hotbuild_reset_time',true) || 2000;

    //remember the sim's spec set. it is the only place a server mod's units show up, and
    //the settings scene has no way to see them once the game is over.
    if(_.isFunction(handlers.unit_specs))
    {
        var hotbuild2oldunitspecs = handlers.unit_specs;
        handlers.unit_specs = function(payload){
          hotbuild2oldunitspecs(payload);
          try {
            hbUnitCache.harvest(payload);
          }
          catch (ex) {
            console.log(ex);
          }
        };
    }

    //handle settings refresh
    if(_.isFunction(handlers['settings.exit']))
    {
        var hotbuild2oldsettingsexit = handlers['settings.exit'];
        handlers['settings.exit'] = function(){
          hotbuildglobal = localStorage.hotbuildconfig ? decode(localStorage.hotbuildconfig) : hotbuildglobal;
          hotbuildglobalkey = localStorage.hotbuildconfigkey ? decode(localStorage.hotbuildconfigkey) : hotbuildglobalkey;
          api.panels.build_bar.message('hotbuildsettings.exit');
          api.panels.selection.message('hotbuildsettings.exit');
          api.panels.LiveGame_FloatZone.message('hotbuildsettings.exit');
          hotbuild2oldsettingsexit();
        };
    }

    var hotbuild2 = {};

    function hbManager(resetTime) {
        var self = this;
        //INPUT FROM BUILDBAR AND SELECTION SCENES
        self.buildable_units = ko.observableArray([]);
        handlers.hbselection = function(payload){
            //get data from buildbar;
            //console.log("got buildlist from buildbar");
            //console.log(payload);
            self.buildable_units(payload);
        };

        self.selectionList = ko.observableArray([]);
        handlers.hbunitselection = function(payload){
          //console.log("got selectionlist from selection");
          //console.log(payload);
          self.selectionList(payload);
        };

        self.cycleResetTime = resetTime; //time you have to press again to loop trough list
        self.lastCycleTime = ko.observable(new Date());
        self.lastkey = ko.observable(0);
        self.cycleid = ko.observable(0);
        self.hotbuilds = ko.observableArray([""]);
        self.hotbuildPreviews = ko.observableArray([""]);
        self.hbtriggertime = ko.observable();
        self.previewvisible = ko.observable(false);

        self.debuginfo = ko.computed(function () {
            if (self.hotbuilds() !== undefined) {
                return self.hotbuilds().length;
            }
        }, this);

        self.unitName = ko.observable("");

        self.buildPreviewList = function (hbindex, hotbuilds) {
            //set the buildPreview list, starting at the entry we just cycled to
            if (hotbuilds === undefined) {
                return;
            }
            //endFabMode parks cycleid at -1 when hotbuild_shift_key_recycle is ON
            if (hbindex < 0 || hbindex > hotbuilds.length) {
                hbindex = 0;
            }
            self.hotbuildPreviews([{ 'icon': '', 'json': '' }]);

            var order = [];
            var i;
            for (i = hbindex; i < hotbuilds.length; i++) {
                order.push(i);
            }
            for (i = 0; i < hbindex; i++) {
                order.push(i);
            }

            for (i = 0; i < order.length; i++) {
                var stored = hotbuilds[order[i]].json;
                var unitinfo = self.findBuildable(stored);
                if (unitinfo !== undefined && unitinfo.structure) {
                    self.hotbuildPreviews.push({
                        'icon': unitinfo.buildIcon || hbSpecId.buildBarIcon(unitinfo.id),
                        'json': hbSpecId.canonical(stored)
                    });
                }
            }
        };
        //hide preview
        self.clean = function () {
            var current_time = _.now();
            if (current_time - self.hbtriggertime() > self.cycleResetTime) {
                self.previewvisible(false);
                self.previewvisible.notifySubscribers();
            }
            api.panels.LiveGame_FloatZone.message('hotbuildfloatframepreview',{visible:self.previewvisible(),list:self.hotbuildPreviews()});
        };

        self.hotBuild = function (event, hotbuilds) {
            self.hotbuilds(hotbuilds);
            //console.log(hotbuilds.length);
            if (model.maybeSetBuildTarget) {
                if (self.knowsAnyBuildCommand() && hotbuild_enable) {
                    var failDetect = 0;
                    do {
                        self.doCycleId(self.hotbuilds().length, event.which);
                        failDetect++;
                        if (failDetect > 1000) {
                            console.log("loop of death\n"); // I dont think this should ever happen...
                            return;
                        }
                        //console.log(self.hotbuilds()[self.cycleid()].json + " " + !self.knowsBuildCommand(self.hotbuilds()[self.cycleid()].json));
                    } while (!self.knowsBuildCommand(self.hotbuilds()[self.cycleid()].json) && self.knowsAnyBuildCommand());
                    self.hbtriggertime(_.now());
                    setTimeout(self.clean, self.cycleResetTime + 1000);
                    //debugger;

                    //the build set carries this client's spec tag, so its id is the one the sim knows
                    var hbunit = self.findBuildable(self.hotbuilds()[self.cycleid()].json);
                    if (hbunit === undefined) {
                        console.log("hotbuild cannot build " + self.hotbuilds()[self.cycleid()].json);
                        return;
                    }

                    if (hbunit.structure) {
                        //console.log(hbunit.id);
                        model.buildItemBySpec(hbunit.id);
                    }
                    else {
                        //model.buildItemBySpec(hbunit.id);
                        //console.log(hbunit.id);
                        var params = {
                            item: hbunit.id,
                            batch: event.shiftKey,
                            cancel: false,
                            urgent: event.ctrlKey,
                            more: ""
                        };
                        model.executeStartBuild(params);
                    }
                    self.unitName(hbunit.name);
                    self.buildPreviewList(self.cycleid(), self.hotbuilds());
                    self.previewvisible(true);
                    api.panels.LiveGame_FloatZone.message('hotbuildfloatframepreview',{visible:self.previewvisible(),list:self.hotbuildPreviews()});
                    event.preventDefault();
                }
                else {
                    if (self.selectionList().length > 0&&hotbuild_select_enable) { //check if units are selected ?
                        var i;
                        var wanted = [];
                        for (i = 0; i < self.hotbuilds().length; i++) {
                            wanted.push(hbSpecId.canonical(self.hotbuilds()[i].json));
                        }
                        //selectByTypes wants the tagged types the sim knows, so pass those back
                        var selection = self.selectionList();
                        var selectionTypes = [];
                        var currentselection = [];
                        for (i = 0; i < selection.length; i++) {
                            currentselection.push(selection[i].type);
                            if (_.contains(wanted, hbSpecId.canonical(selection[i].type))) {
                                selectionTypes.push(selection[i].type);
                            }
                        }
                        if (event.ctrlKey) {
                            if(selectionTypes.length > 0){
                                model.holodeck.view.selectByTypes("remove", selectionTypes);
                            }
                        }
                        else {
                            if(selectionTypes.length > 0){
                                model.holodeck.view.selectByTypes("remove", _.difference(currentselection, selectionTypes));
                            }
                        }
                    }
                    else {
                        console.log('hotbuild doesnt know what to do (or hotSelect is disabled)' + self.debuginfo());
                    }
                }
            }
        };

        self.knowsAnyBuildCommand = function () {
            for (var bc = 0; bc < self.hotbuilds().length; bc++) {
                if (self.knowsBuildCommand(self.hotbuilds()[bc].json)) {
                    return true;
                }
            }
            return false;
        };

        //the live spec for a stored hotbuild entry, whatever spec tag this game uses
        self.findBuildable = function (cmd) {
            return hbSpecId.findSpec(self.buildable_units(), cmd);
        };

        self.knowsBuildCommand = function (cmd) {
            return self.findBuildable(cmd) !== undefined;
        };

        //move trough hotbuilds array when pushing multiple time the same key in a certain time interval
        self.doCycleId = function (length, key) {
            var thisTime = new Date();
            if (thisTime - self.lastCycleTime > self.cycleResetTime || key != self.lastkey()) {
                //if (key != self.lastkey()) {
                self.cycleid(0);
            } else {
                self.cycleid(self.cycleid() + 1);
                if (self.cycleid() == length) {
                    self.cycleid(0);
                }
            }
            self.lastCycleTime = thisTime;
            self.lastkey(key);

        };


        self.getBuildItemId = function () {
            for (var i = 0; i < model.buildLists.length; i++) {
                if (model.buildLists[i].id() === self.hotbuilds()[self.cycleid()].json) {
                    return i;
                }
            }
            return -1;
        };
    }

    //init hotbuildsystem
    hotbuild2.hotbuildManager = new hbManager(hotbuildreset_time);

    if (hotbuildshiftrecycle === "ON") {
        var oldEndFabMode = model.endFabMode;
        model.endFabMode = function () {
            hotbuild2.hotbuildManager.cycleid(-1);
            oldEndFabMode();
        };
    }

    //NON HOTKEY FUNCTIONS BUT CALLABLE THROUGH NORMAL KEYBOARD KEYS

    //Pole Lock on/off
    hotbuild2.polelockToggle = function () {
        console.log("PoleLock");
        var allSettings = decode(localStorage[localStorage.uberName + ".paSettings"]);
        if(allSettings.camera === undefined){
          allSettings.camera = {};
          allSettings.camera.pole_lock = undefined;
        }
        var currentPoleLock = allSettings.camera.pole_lock; // the settings store this upper case, the engine processes it in lowercase... wtf
        var nextSetting = "";
        if (currentPoleLock === undefined) {
            nextSetting = "ON";
            allSettings.camera.pole_lock = "ON";
        } else {
            nextSetting = "OFF";
            delete allSettings.camera.pole_lock;
        }
        engine.call("set_camera_pole_lock", nextSetting.toLowerCase());
        console.log("pole_lock : " + nextSetting);
        localStorage[localStorage.uberName + ".paSettings"] = encode(allSettings);
        //event.preventDefault();
    };

    /*Start of toggle Hotbuild*/

    //toggle hotbuild on or off
    hotbuild2.toggleState=function(){
        if(hotbuild_enable){
            hotbuild2.setBuildBehavior(false);
        }else{
            hotbuild2.setBuildBehavior(true);
        }
    };

    //toggle hotbuild on or off
    hotbuild2.toggleState_select=function(){
        if(hotbuild_select_enable){
            hotbuild2.setSelectBehavior(false);
        }else{
            hotbuild2.setSelectBehavior(true);
        }
    };

    //manually set the state of hotbuild (can be used by other mods)
    hotbuild2.setBuildBehavior=function(_state){
        if(_state){
            hotbuild_enable=true;
            $('.hbbuildbarkey:not(:empty)').show();
        }else{
            hotbuild_enable=false;
            $('.hbbuildbarkey').hide();
            hotbuild_frameEvent=requestAnimationFrame(hotbuild2.watch_toggle);
        }
    };

    //keep the buildbar hidden even though selections etc might change
    hotbuild2.watch_toggle=function(){
        //hotbuild is disabled, hide the buildbar
        if(!hotbuild_enable){
            $('.hbbuildbarkey').hide();
        }
        if(!hotbuild_select_enable){
            $('.hbselectionbarkey').hide();
        }
        //keep checking for hotbuild state if needed
        if(!hotbuild_enable||!hotbuild_select_enable){
            hotbuild_frameEvent=requestAnimationFrame(hotbuild2.watch_toggle);
        }
    };

    //set the behavior of the selection bar with hotbuild
    hotbuild2.setSelectBehavior=function(_state){
        if(_state){
            hotbuild_select_enable=true;
            $('.hbselectionbarkey:not(:empty)').show();
        }else{
            hotbuild_select_enable=false;
            $('.hbselectionbarkey').hide();
            hotbuild_frameEvent=requestAnimationFrame(hotbuild2.watch_toggle);
        }
    };
    /*End of toggle Hotbuild*/

    var keycodes = {
        37: "left",
        38: "up",
        39: "right",
        40: "down",
        45: "insert",
        46: "delete",
        8: "backspace",
        9: "tab",
        13: "enter",
        16: "shift",
        17: "ctrl",
        18: "alt",
        19: "pause",
        20: "caps lock",
        27: "escape",
        32: "space",
        33: "pageup",
        34: "pagedown",
        35: "end",
        112: "f1",
        113: "f2",
        114: "f3",
        115: "f4",
        116: "f5",
        117: "f6",
        118: "f7",
        119: "f8",
        120: "f9",
        121: "f10",
        122: "f11",
        123: "f12",
        144: "numlock",
        145: "scrolllock",
        186: ";",
        187: "=",
        188: ",",
        189: "-",
        190: ".",
        191: "/",
        192: "graveaccent",
        219: "[",
        220: "\\",
        221: "]",
        222: "'"
    };
    //fix for allowing multiple bindings per key
    //for example stop = s / build mex = s
    // stop = s = default mousetrap binding
    // build mex = hotbuild key = using keydown
    $(document).keydown(function (e) {
        if (!model.hasSelection() || model.showLanding() || model.chatSelected())
            return;

        var value;
        //console.log(e.keyCode);
        if (e.which >= 48 && e.which <= 90) {

            /* grab letters */
            value = String.fromCharCode(e.which).toLowerCase();
        } else {
            /* if not a letter look in key codes */
            value = keycodes[e.which];
        }
        //console.log(value);
        for (var hotkey in hotbuildglobalkey)
        {
            if(hotbuildglobalkey[hotkey] === value)
            {
                hotbuild2.hotbuildManager.hotBuild(e, hotbuildglobal[hotkey]);
            }
        }
    });

    return hotbuild2;

})();
console.log("loaded hotbuild core");
