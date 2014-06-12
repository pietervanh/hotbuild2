//IntelliSense for WebMatrix /VS
/// <reference path="../.vsdoc/jquery-1.9.1-vsdoc.js" /> 
/// <reference path="../.vsdoc/knockout-2.2.1.debug.js" />
/// <reference path="../.vsdoc/lodash-2.4.1.js" />

var hotbuild2 = (function () {

    var hotbuildglobal = {};
    var hotbuildglobalkey = {};
    
    /*variables for hotbuild toggle*/
    var hotbuild_enable=true; //allow hotbuild buildbar
    var hotbuild_select_enable=true; //allow hotbuild select bar
    var hotbuild_frameEvent; //animationFrame Timer

    var settings = decode(localStorage.settings);

    hotbuildglobal = settings.hotbuildconfig ? settings.hotbuildconfig : hotbuildglobal;
    hotbuildglobalkey = settings.hotbuildconfigkey ? settings.hotbuildconfigkey : hotbuildglobalkey;
    var hotbuildshiftrecycle = settings.hotbuild_show_key_on_buildbar ? settings.hotbuild_show_key_on_buildbar : "OFF";

    model.hotbuild_reset_time = parseInt(settings.hotbuild_reset_time,0);
    //fast check on bad reset_time input
    if (isNaN(model.hotbuild_reset_time)) {
        model.hotbuild_reset_time = 2000;
    }

    var hotbuild2 = {};

    var imbawallclick = "nobuild";

    function hbManager(resetTime) {
        var self = this;
        self.buildable_units = ko.observableArray([]);
        handlers["hbselection"] = function(payload){
            //get data from buildbar;
            console.log("got buildlist from buildbar");
            console.log(payload);
            self.buildable_units(payload);
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
        self.imbawallers = ko.observableArray(["/pa/units/land/laser_defense/laser_defense.json",
                                                "/pa/units/land/laser_defense_single/laser_defense_single.json",
                                                "/pa/units/land/laser_defense_adv/laser_defense_adv.json",
                                                "/pa/units/land/laser_defense/laser_defense.json.player",
                                                "/pa/units/land/laser_defense_single/laser_defense_single.json.player",
                                                "/pa/units/land/laser_defense_adv/laser_defense_adv.json.player"
                                                ]);

        self.buildPreviewList = function (hbindex, hotbuilds) {
            //set the buildPreview list
            if (hotbuilds !== undefined) {
                self.hotbuildPreviews([{ 'icon': '', 'json': '' }]);
                var unitinfo;

                for (var i = hbindex; i < hotbuilds.length; i++) {
                    if (self.knowsBuildCommand(hotbuilds[i].json)) {

                        unitinfo = model.unitSpecs[hotbuilds[i].json];
                        if(unitinfo === undefined){
                         unitinfo = model.unitSpecs[hotbuilds[i].json + ".player"];   
                        }
                        if (unitinfo.structure) {
                            self.hotbuildPreviews.push({ 'icon': unitinfo.buildIcon, 'json': hotbuilds[i].json });
                        }
                    }
                }
                for (var j = 0; j < hbindex; j++) {
                    if (self.knowsBuildCommand(hotbuilds[j].json)) {
                        unitinfo = model.unitSpecs[hotbuilds[j].json];
                        if(unitinfo === undefined){
                         unitinfo = model.unitSpecs[hotbuilds[i].json + ".player"];   
                        }                        
                        if (unitinfo.structure) {
                            self.hotbuildPreviews.push({ 'icon': unitinfo.buildIcon, 'json': hotbuilds[j].json });
                        }
                    }
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
        };
        
        self.hotBuild = function (event, hotbuilds) {
            self.hotbuilds(hotbuilds);
            //debugger;
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
                    } while (!self.knowsBuildCommand(self.hotbuilds()[self.cycleid()].json) && self.knowsAnyBuildCommand());
                    self.hbtriggertime(_.now());
                    setTimeout(self.clean, self.cycleResetTime + 1000);
                    //debugger;
                    
                    var hbunit = model.unitSpecs[self.hotbuilds()[self.cycleid()].json];
                    if(hbunit === undefined){
                        hbunit = model.unitSpecs[self.hotbuilds()[self.cycleid()].json + ".player"];
                    }
                    
                    if (hbunit.structure) {
                        //check if it' needs to be ImbaWalled

                        //model.maybeSetBuildTarget(self.hotbuilds()[self.cycleid()].json);
                        model.buildItemBySpec(hbunit.id);
                        if (self.imbawallers.indexOf(hbunit.id) !== -1) {
                            imbawallclick = "build";
                        }
                    }
                    else {
                        //model.buildItemBySpec(hbunit.id);
                        //console.log(hbunit.id);
                        //model.executeStartBuild(event, self.getBuildItemId());
                        //model.executeStartBuild(event, hbunit);
                        //debugger;
                        var params = {}
                        params.item = hbunit.id;
                        params.batch = event.shiftKey;
                        params.cancel = false;
                        params.urgent = false;
                        params.more = "";
                        model.executeStartBuild(params);
                    }
                    self.unitName(hbunit.name);
                    self.buildPreviewList(self.cycleid(), self.hotbuilds());
                    self.previewvisible(true);
                    event.preventDefault();
                }
                else {
                    if (model.selectionList().length > 0&&hotbuild_select_enable) { //check if units are selected ?
                        var selectionTypes = [];
                        for (var i = 0; i < self.hotbuilds().length; i++) {

                            var typeindex = _.findIndex(model.selectionList(), { 'type': self.hotbuilds()[i].json });
                            if (typeindex !== -1) {
                                selectionTypes.push(self.hotbuilds()[i].json);
                            }
                        }
                        var currentselection = [];
                        for (i = 0; i < model.selectionList().length; i++) {
                            currentselection.push(model.selectionList()[i].type);
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
            for (var i = 0; i < self.hotbuilds().length; i++) {
                if (self.knowsBuildCommand(self.hotbuilds()[i].json)) {
                    return true;
                }
            }
            return false;
        };

        self.knowsBuildCommand = function (cmd) {
            //check on buildtablist empty
            //debugger;
            if(self.buildable_units().length > 0){
                for(var i = 0; i < self.buildable_units().length; i++){
                    if(self.buildable_units()[i].id == cmd) {
                        return true;
                    }
                    //GW fix
                    if(self.buildable_units()[i].id == cmd + ".player") {
                        return true;
                    }  
                }
            }
            /*
            if (model.buildTabLists().length > 0){
                for (var b = 0; b < model.buildTabLists().length; b++){
                    for (var i = 0; i < model.buildTabLists()[b].length; i++) {
                        if (_.isObject(model.buildTabLists()[b][i])){
                            //console.log(model.buildTabLists()[b][i].id.replace(".player", "", "gi"));
                            if(model.buildTabLists()[b][i].id == cmd) {
                                return true;
                            }
                            //GW fix
                            if(model.buildTabLists()[b][i].id == cmd + ".player") {
                                return true;
                            }                            
                        }
                    }
                }
            }
            */
            return false;
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
    hotbuild2.hotbuildManager = new hbManager(model.hotbuild_reset_time);

    hotbuild2.hbgetBuildBarKey = function (id) {
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
    
    if (hotbuildshiftrecycle === "ON") {
        var oldEndFabMode = model.endFabMode;
        model.endFabMode = function () {
            hotbuild2.hotbuildManager.cycleid(-1);
            oldEndFabMode();
        };
    }

    hotbuild2.buildTemplates = function () {

        var buildTemplates = {};
        buildTemplates.popupVisible = ko.observable(false);

        var stepSize = 3;
        var oldZoomLevel = handlers.zoom_level;
        handlers.zoom_level = function (payload) {
            oldZoomLevel(payload);
            switch (payload.zoom_level) {
                case "surface":
                    stepSize = 8;
                    break;
                case "air":
                    stepSize = 3;
                    break;
                case "orbital":
                    stepSize = 2;
                    break;
                case "celestial":
                    stepSize = 1;
                    break;
            }
        };

        function buildAt(x, y, spec, queue, complete) {
            api.arch.beginFabMode(spec).then(function (ok) {
                buildSelectedAt(x, y, queue, function (suc) {
                    api.arch.endFabMode();
                    if (complete) {
                        complete(suc);
                    }
                });
            });
        }

        function buildSelectedAt(x, y, queue, complete) {
            model.holodeck.unitBeginFab(x, y, false);
            model.holodeck.unitEndFab(x, y, queue, false).then(function (success) {
                if (complete) {
                    complete(success);
                }
            });
        }

        function tryInLine(x, y, dir, complete) {
            var maxStepSize = 200;
            var stepCounter = 0;
            var doStep = function (suc) {
                stepCounter += stepSize;
                if (!suc && stepCounter < maxStepSize) {
                    var xx = x;
                    var yy = y;
                    for (var d = 0; d < dir.length; d++) {
                        switch (dir[d]) {
                            case "up":
                                xx -= stepCounter;
                                break;
                            case "down":
                                xx += stepCounter;
                                break;
                            case "right":
                                yy += stepCounter;
                                break;
                            case "left":
                                yy -= stepCounter;
                                break;
                        }
                    }
                    buildSelectedAt(xx, yy, true, doStep);
                } else {
                    if (complete) {
                        complete();
                    } else {
                        api.arch.endFabMode();
                        api.audio.playSound("/SE/UI/UI_Building_place");
                    }
                }
            };
            doStep(false);
        }

        var holodeck = api.Holodeck.get($('.holodeck'));
        var mouseX = 0;
        var mouseY = 0;
        $(document).mousemove(function (e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        buildTemplates.imbaWall2 = function (queue,mX,mY) {
            var wall = "/pa/units/land/land_barrier/land_barrier.json";

            window.setTimeout(function () {
                api.arch.beginFabMode(wall).then(function (ok) {
                    // the callback of the callback of the callback of the oh wtf
                    tryInLine(mX, mY, ["up"], function () {
                        tryInLine(mX, mY, ["down"], function () {
                            tryInLine(mX, mY, ["right"], function () {
                                tryInLine(mX, mY, ["left"], function () {
                                    tryInLine(mX, mY, ["up", "left"], function () {
                                        tryInLine(mX, mY, ["up", "right"], function () {
                                            tryInLine(mX, mY, ["down", "left"], function () {
                                                tryInLine(mX, mY, ["down", "right"]);
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            }, 750);
        };


        buildTemplates.chooseBuildTemplate = function () {
            buildTemplates.popupVisible(true);
            $("#hotbuildTemplatesDlg").dialog({
                height: 300,
                width: 300,
                modal: true,
                buttons: {
                    "Build Double Laser Turret": function () { buildTemplates.imbaWall($("#chkImba").val(), "/pa/units/land/laser_defense/laser_defense.json"); $(this).dialog("close"); },
                    "Build Air Defense": function () { buildTemplates.imbaWall($("#chkImba").val(), "/pa/units/land/air_defense/air_defense.json"); $(this).dialog("close"); },
                    "Build Flak": function () { buildTemplates.imbaWall($("#chkImba").val(), "/pa/units/land/air_defense_adv/air_defense_adv.json"); $(this).dialog("close"); }
                },
                close: function () {
                    buildTemplates.popupVisible(false);
                }
            });

        };
        return buildTemplates;

    }();

    //NON HOTKEY FUNCTIONS BUT CALLABLE THROUGH NORMAL KEYBOARD KEYS

    //Pole Lock on/off
    hotbuild2.polelockToggle = function (event) {
        var allSettings = decode(localStorage.settings);
        var currentPoleLock = allSettings.camera_pole_lock.toLowerCase(); // the settings store this upper case, the engine processes it in lowercase... wtf
        var nextSetting = "";
        if (currentPoleLock === 'off') {
            nextSetting = "on";
        } else {
            nextSetting = "off";
        }
        engine.call("set_camera_pole_lock", nextSetting);
        allSettings.camera_pole_lock = nextSetting.toUpperCase();
        localStorage.settings = encode(allSettings);
        event.preventDefault();
    };

    //cinematic mode on/off
    hotbuild2.cinematicToggle = function(event){
        var allSettings = decode(localStorage.settings);
        var currentCinematic = allSettings.cinematic_value; 
        var nextSetting = "";
        if (currentCinematic === 'OFF') {
            nextSetting = "ON";
        } else {
            nextSetting = "OFF";
        }
        allSettings.cinematic_value = nextSetting;
        localStorage.settings = encode(allSettings);
        model.applyUIDisplaySettings();
        event.preventDefault();
    };

    //terrestial toggle
    hotbuild2.terrestrialToggle = function(event){
        var allSettings = decode(localStorage.settings);
        var currentTerrestrial = allSettings.always_show_terrestrial_units;
        var nextSetting = "";
        if (currentTerrestrial === 'ALWAYS') {
            nextSetting = "RANGE DEPENDENT";
        } else {
            nextSetting = "ALWAYS";
        }
        allSettings.always_show_terrestrial_units = nextSetting;
        localStorage.settings = encode(allSettings);
        model.applyUIDisplaySettings();
        event.preventDefault();
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

    //capture mouse down to do the imbawalls after click place building
    var $holodeck = $('holodeck');
    var holodeckModeMouseDown = {};
    $holodeck.mousedown(function (mdevent) {
        if (mdevent.button === 0 && imbawallclick === "build" && mdevent.altKey === true) {
            var startx = mdevent.offsetX;
            var starty = mdevent.offsetY;
            var queue = mdevent.shiftKey; 
            hotbuild2.buildTemplates.imbaWall2(queue,startx,starty);
            imbawallclick = "nobuild";
        }
    });

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
console.log("sending hotbuild2 to buildbar");
api.panels.build_bar.message("hb_hotbuild", hotbuild2);
