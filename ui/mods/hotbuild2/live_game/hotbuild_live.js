//IntelliSense for WebMatrix /VS
/// <reference path="../.vsdoc/jquery-1.9.1-vsdoc.js" /> 
/// <reference path="../.vsdoc/knockout-2.2.1.debug.js" />
var hotbuild2live = (function () {

    //load html dynamically
    loadHotBuildTemplate = function (element, url, model) {
        element.load(url, function () {
            console.log("Loading html " + url);
            ko.applyBindings(model, element.get(0));
        });
    };

    //set empty defaults
    var hotbuildglobal = {};
    var hotbuildglobalkey = {};
    for (var i = 1; i < 21; i++) {
        eval("hotbuildglobal.hotbuild" + i + "s = []");
        eval("hotbuildglobalkey.hotbuild" + i + "s = ''");
    }
    //load hotbuildconfig from settings
    var settings = decode(localStorage.settings);
    hotbuildglobal = settings.hotbuildconfig ? settings.hotbuildconfig : hotbuildglobal;
    hotbuildglobalkey = settings.hotbuildconfigkey ? settings.hotbuildconfigkey : hotbuildglobalkey;


    createFloatingFrame('hotbuild_info_frame', 220, 70, { 'offset': 'leftCenter', 'top': -200 });
    loadHotBuildTemplate($('#hotbuild_info_frame_content'), '../../mods/hotbuild2/live_game/hotbuild_live.html', hotbuild2.hotbuildManager);



    // somehow when putting this directly into live_game js I cannot use an anon func.
    // can be changed to the usual anon func pattern latter
    var wallbuilder = function () {

        var wallbuilder = {};
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
            holodeck.unitBeginFab(x, y, false);
            holodeck.unitEndFab(x, y, queue, false).then(function (success) {
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

       wallbuilder.imbaWall = function (queue) {
            if (model.selectedMobile()) {
                var wall = "/pa/units/land/land_barrier/land_barrier.json";
                var turret = "/pa/units/land/laser_defense/laser_defense.json";
                (function () {
                    var mX = mouseX;
                    var mY = mouseY;
                    buildAt(mX, mY, turret, queue, function (suc) {
                        if (suc) {
                            // if we do not wait for a bit the turret wont be placed already
                            // it would not block the walls, making everything fail by placing the walls inside the turret
                            // does anybody know what to do about this?!
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
                        }
                    });
                }());
            }
        };
       return wallbuilder;

    }();

    action_sets.hotbuild['imbawall'] = function (event) { wallbuilder.imbaWall(true); };


    // hijack some method that is in the right place to execute our engine calls
    //might be not needed in future if live_game.js has no more 
    var hotbuildapplyUIDisplaySettings = model.applyUIDisplaySettings;
    model.applyUIDisplaySettings = function () {
        hotbuild2.apply_keybinds();
        hotbuildapplyUIDisplaySettings();
    };

    //get key for buildbar
    var hotbuild2live = {};
    hotbuild2live.hbgetBuildBarKey = function (id) {
        var result = '';
        var hbpos = 1;
        _.forEach(hotbuildglobal, function (hbkey) {
            _.forEach(hbkey, function (hbitem) {
                //debugger;
                if (hbitem.json === id) {
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

    if (settings.hotbuild_show_key_on_buildbar === "ON") {
        //Show key on buildbar
        $('.div_build_item img').replaceWith(
        '<img class="img_build_unit" src="img/build_bar/units/build_unit_sample.png" data-bind="attr: { src: icon }" /></a>' +
        '<span class="hbbuildbarkey" data-bind="visible: hotbuild2live.hbgetBuildBarKey($data.id()) != \'\' , text: hotbuild2live.hbgetBuildBarKey($data.id())"></span>');
    }


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
        20: "capslock",
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
        186: "semicolon",
        187: "equal",
        188: "comma",
        189: "dash",
        190: "period",
        191: "slash",
        192: "graveaccent",
        219: "openbracket",
        220: "backslash",
        221: "closebraket",
        222: "singlequote"
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
        for (var i = 1; i <= 20; i++) {
            if (hotbuildglobalkey["hotbuild" + i + "s"] === value) {
                hotbuild2.hotbuildManager.hotBuild(e, hotbuildglobal["hotbuild" + i + "s"]);
                break;
            }
        }

    });

    return hotbuild2live;
})();
