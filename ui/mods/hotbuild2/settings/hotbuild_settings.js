//IntelliSense for WebMatrix /VS
/// <reference path="../.vsdoc/jquery-1.9.1-vsdoc.js" /> 
/// <reference path="../.vsdoc/knockout-2.2.1.debug.js" />
/// <reference path="../.vsdoc/lodash-2.4.1.js" />

var hotbuildsettings = (function () {

    //Problem don't know how to know it's a a buildable unit / factory  so can't dynamically fill buildings and units
    var hbbuildings = [
        new hbListItem().json("/pa/units/air/air_factory/air_factory.json"),
		new hbListItem().json("/pa/units/air/air_factory_adv/air_factory_adv.json"),
		new hbListItem().json("/pa/units/land/vehicle_factory/vehicle_factory.json"),
		new hbListItem().json("/pa/units/land/vehicle_factory_adv/vehicle_factory_adv.json"),
		new hbListItem().json("/pa/units/land/bot_factory/bot_factory.json"),
		new hbListItem().json("/pa/units/land/bot_factory_adv/bot_factory_adv.json"),
		new hbListItem().json("/pa/units/land/metal_extractor/metal_extractor.json"),
		new hbListItem().json("/pa/units/land/metal_extractor_adv/metal_extractor_adv.json"),
		new hbListItem().json("/pa/units/land/metal_storage/metal_storage.json"),
		new hbListItem().json("/pa/units/land/energy_plant/energy_plant.json"),
		new hbListItem().json("/pa/units/land/energy_plant_adv/energy_plant_adv.json"),
		new hbListItem().json("/pa/units/land/energy_storage/energy_storage.json"),
		new hbListItem().json("/pa/units/land/tactical_missile_launcher/tactical_missile_launcher.json"),
		new hbListItem().json("/pa/units/land/artillery_long/artillery_long.json"),
		new hbListItem().json("/pa/units/land/artillery_short/artillery_short.json"),
		new hbListItem().json("/pa/units/land/air_defense/air_defense.json"),
        new hbListItem().json("/pa/units/land/air_defense_adv/air_defense_adv.json"),
		new hbListItem().json("/pa/units/land/land_barrier/land_barrier.json"),
		new hbListItem().json("/pa/units/land/laser_defense_adv/laser_defense_adv.json"),
		new hbListItem().json("/pa/units/land/laser_defense/laser_defense.json"),
		new hbListItem().json("/pa/units/land/laser_defense_single/laser_defense_single.json"),
		new hbListItem().json("/pa/units/land/nuke_launcher/nuke_launcher.json"),
		new hbListItem().json("/pa/units/land/radar_adv/radar_adv.json"),
		new hbListItem().json("/pa/units/land/radar/radar.json"),
		new hbListItem().json("/pa/units/orbital/deep_space_radar/deep_space_radar.json"),
		new hbListItem().json("/pa/units/orbital/delta_v_engine/delta_v_engine.json"),
		new hbListItem().json("/pa/units/orbital/orbital_launcher/orbital_launcher.json"),
		new hbListItem().json("/pa/units/orbital/ion_defense/ion_defense.json"),
        new hbListItem().json("/pa/units/orbital/orbital_fighter/orbital_fighter.json"),
        new hbListItem().json("/pa/units/orbital/orbital_laser/orbital_laser.json"),
		new hbListItem().json("/pa/units/orbital/radar_satellite_adv/radar_satellite_adv.json"),
		new hbListItem().json("/pa/units/orbital/solar_array/solar_array.json"),
		new hbListItem().json("/pa/units/sea/naval_factory/naval_factory.json"),
		new hbListItem().json("/pa/units/sea/naval_factory_adv/naval_factory_adv.json"),
		new hbListItem().json("/pa/units/sea/sea_mine/sea_mine.json"),
		new hbListItem().json("/pa/units/sea/sonar/sonar.json"),
		new hbListItem().json("/pa/units/sea/sonar_adv/sonar_adv.json"),
		new hbListItem().json("/pa/units/sea/torpedo_launcher/torpedo_launcher.json"),
        new hbListItem().json("/pa/units/land/land_mine/land_mine.json"),
        new hbListItem().json("/pa/units/land/teleporter/teleporter.json"),
		new hbListItem().json("/pa/units/sea/torpedo_launcher_adv/torpedo_launcher_adv.json"),
        new hbListItem().json("/pa/units/land/nuke_launcher/nuke_launcher.json"),
		new hbListItem().json("/pa/units/land/anti_nuke_launcher/anti_nuke_launcher.json")
    ];

    var hbunits = [
		new hbListItem().json("/pa/units/land/fabrication_bot/fabrication_bot.json"),
        new hbListItem().json("/pa/units/land/fabrication_bot_combat/fabrication_bot_combat.json"),
		new hbListItem().json("/pa/units/land/bot_aa/bot_aa.json"),
		new hbListItem().json("/pa/units/land/assault_bot/assault_bot.json"),
		new hbListItem().json("/pa/units/land/fabrication_bot_adv/fabrication_bot_adv.json"),
		new hbListItem().json("/pa/units/land/fabrication_bot_combat_adv/fabrication_bot_combat_adv.json"),		
		new hbListItem().json("/pa/units/land/assault_bot_adv/assault_bot_adv.json"),
		new hbListItem().json("/pa/units/land/bot_artillery_adv/bot_artillery_adv.json"),
		new hbListItem().json("/pa/units/land/fabrication_vehicle/fabrication_vehicle.json"),
		new hbListItem().json("/pa/units/land/land_scout/land_scout.json"),
		new hbListItem().json("/pa/units/land/tank_light_laser/tank_light_laser.json"),
        new hbListItem().json("/pa/units/land/tank_armor/tank_armor.json"),
		new hbListItem().json("/pa/units/land/aa_missile_vehicle/aa_missile_vehicle.json"),
		new hbListItem().json("/pa/units/land/fabrication_vehicle_adv/fabrication_vehicle_adv.json"),
		new hbListItem().json("/pa/units/land/tank_laser_adv/tank_laser_adv.json"),
		new hbListItem().json("/pa/units/land/tank_heavy_mortar/tank_heavy_mortar.json"),
        new hbListItem().json("/pa/units/land/tank_heavy_armor/tank_heavy_armor.json"),
		new hbListItem().json("/pa/units/air/fabrication_aircraft/fabrication_aircraft.json"),
		new hbListItem().json("/pa/units/air/fighter/fighter.json"),
		new hbListItem().json("/pa/units/air/air_scout/air_scout.json"),
		new hbListItem().json("/pa/units/air/bomber/bomber.json"),
		new hbListItem().json("/pa/units/air/fabrication_aircraft_adv/fabrication_aircraft_adv.json"),
		new hbListItem().json("/pa/units/air/bomber_adv/bomber_adv.json"),
		new hbListItem().json("/pa/units/air/fighter_adv/fighter_adv.json"),
        new hbListItem().json("/pa/units/air/gunship/gunship.json"),
		new hbListItem().json("/pa/units/sea/fabrication_ship/fabrication_ship.json"),
		new hbListItem().json("/pa/units/sea/sea_scout/sea_scout.json"),
		new hbListItem().json("/pa/units/sea/frigate/frigate.json"),
		new hbListItem().json("/pa/units/sea/destroyer/destroyer.json"),
		new hbListItem().json("/pa/units/sea/fabrication_ship_adv/fabrication_ship_adv.json"),
		new hbListItem().json("/pa/units/sea/battleship/battleship.json"),
		new hbListItem().json("/pa/units/sea/missile_ship/missile_ship.json"),
        new hbListItem().json("/pa/units/orbital/orbital_fabrication_bot/orbital_fabrication_bot.json"),
        new hbListItem().json("/pa/units/orbital/defense_sattelite/defense_satellite.json"),
		new hbListItem().json("/pa/units/orbital/orbital_lander/orbital_lander.json"),
        new hbListItem().json("/pa/units/orbital/radar_satellite/radar_satellite.json"),
        new hbListItem().json("/pa/units/land/nuke_launcher/nuke_launcher_ammo.json"),
		new hbListItem().json("/pa/units/land/anti_nuke_launcher/anti_nuke_launcher_ammo.json"),
    ];
    //debugger;

    function onunitload(unitdata, listitem) {
        unitdata.description !== undefined ? listitem.desc(unitdata.description) : listitem.desc('not found');
        unitdata.display_name !== undefined ? listitem.displayname(unitdata.display_name) : listitem.displayname('not found');
        if (_.contains(unitdata.unit_types, 'UNITTYPE_Mobile')) {
            if (_.contains(unitdata.unit_types, 'UNITTYPE_Basic')) {
                _.contains(unitdata.unit_types, 'UNITTYPE_Bot') ? listitem.factory('botfac') : '';
                _.contains(unitdata.unit_types, 'UNITTYPE_Tank') ? listitem.factory('vecfac') : '';
                _.contains(unitdata.unit_types, 'UNITTYPE_Air') ? listitem.factory('afac') : '';
                _.contains(unitdata.unit_types, 'UNITTYPE_Naval') ? listitem.factory('nfac') : '';
            }
            else {
                _.contains(unitdata.unit_types, 'UNITTYPE_Bot') ? listitem.factory('abotfac') : '';
                _.contains(unitdata.unit_types, 'UNITTYPE_Tank') ? listitem.factory('avecfac') : '';
                _.contains(unitdata.unit_types, 'UNITTYPE_Air') ? listitem.factory('aafac') : '';
                _.contains(unitdata.unit_types, 'UNITTYPE_Naval') ? listitem.factory('anfac') : '';
            }
            //Orbital is changing rapidly so hacky fixes here
            if (listitem.json2 === "/pa/units/orbital/orbital_fabrication_bot/orbital_fabrication_bot.json"){
                listitem.factory('ofac');
            }
            if (listitem.json2 === "/pa/units/orbital/defense_sattelite/defense_satellite.json") {
                listitem.factory('ofac');
            }
            if (listitem.json2 === "/pa/units/orbital/orbital_lander/orbital_lander.json") {
                listitem.factory('ofac');
            }
            if (listitem.json2 === "/pa/units/orbital/radar_satellite/radar_satellite.json") {
                listitem.factory('ofac');
            }
            console.log(listitem.factory());
        }
        if (listitem.factory() === undefined) {
            listitem.factory('');
        }
        //if(unitdata.json() != '')
        //listitem = ko.toJS(listitem);
    }

    function hbListItem() {
        //TODO
        var self = this;
        self.json = ko.observable();
        self.desc = ko.observable("loading");
        self.displayname = ko.observable("loading");
        self.factory = ko.observable(); //css based on factory ?
        self.image = ""; //get image of unit / building
        self.json.subscribe(function (value) {
            self.json2 = value;
            self.json(value);
            switch (value) {
                case "/pa/units/land/nuke_launcher/nuke_launcher_ammo.json":
                    self.desc("Nuclear Missile Ammo");
                    self.displayname("Nuclear Missile");
                    break;
                case "/pa/units/land/anti_nuke_launcher/anti_nuke_launcher_ammo.json":
                    self.desc("Anti-Nuclear Missile Ammo");
                    self.displayname("Anti-Nuclear Missile");
                    break;
                default:
                    //fetch from json file the data	
                    $.getJSON('coui:/' + value, function (unitdata) {
                        onunitload(unitdata, self);
                    });
                    break;
            }
            var start = /[^\/]*$/;  // ^ : start , \/ : '/', $ : end // as wildcard: /*.json 
            var end = /[.]json$/;
            self.image = '../live_game/img/build_bar/units/' + value.substring(value.search(start), value.search(end)) + '.png';
        });
    }



    function HotBuildSettingsViewModel(hbglobal, hbglobalkey) {
        var self = this;
        self.hotbuildglobal = ko.observable(hbglobal);
        self.hotbuildglobalkey = ko.observable(hbglobalkey);
        self.selectedhotbuild = ko.observableArray([]);
        self.buildings = ko.observableArray(hbbuildings);
        self.units = ko.observableArray(hbunits);
        self.keyboardkey = ko.observable();
        self.uberkey = ko.observable();
        self.selectedkeyinfo = ko.observable();
        self.selectKey = function () {
            self.selectedhotbuild(self.hotbuildglobal()[self.selectedkeyinfo() + "s"]);
        };

        self.selectedkeyinfo.subscribe(function (value) {
            self.selectKey();
        });

        self.keyboardkey.subscribe(function (value) {
            //debugger; 
            var keyindex = _.indexOf(_.keys(_.invert(self.hotbuildglobalkey())), value);
            var hotbuildkey = _.keys(self.hotbuildglobalkey())[keyindex];
            if (hotbuildkey !== undefined) {
                self.selectedkeyinfo(hotbuildkey.substring(0, hotbuildkey.length - 1));
            }
            else {
                //TODO check if it works if no empty hotbuildglobalkeys"" ones are there
                //find first unused hotbuildkey and select it 
                keyindex = _.indexOf(_.keys(_.invert(self.hotbuildglobalkey())), "");
                hotbuildkey = _.keys(self.hotbuildglobalkey())[keyindex];
                self.selectedkeyinfo(hotbuildkey.substring(0, hotbuildkey.length - 1));
            }
            //get uberkey info

            var fuberkey = false;
            _.forEach(model.keybindGroups(), function (o) {
                _.forEach(o.keybinds(), function (k) {
                    if (k.binding() == value) {
                        fuberkey = true;
                        self.uberkey(k.action());
                    }
                });
            });
            if (!fuberkey) {
                self.uberkey(undefined);
            }
        });

        self.hbkey = ko.computed({
            read: function () {
                return self.hotbuildglobalkey()[self.selectedkeyinfo() + "s"];
            },
            write: function (value) {
                self.hotbuildglobalkey()[self.selectedkeyinfo() + "s"] = value;
            },
            owner: self
        });

        self.selectedbuilding = ko.observable();

        self.selectedunit = ko.observable();

        self.addBuilding = function () {
            self.selectedhotbuild.push(ko.toJS(self.selectedbuilding()));
            self.hotbuildglobalkey()[self.selectedkeyinfo() + "s"] = self.keyboardkey();
            self.Save();
            !$('.active').hasClass('hbk') ? $('.active').addClass('hbk') : '';
        };

        self.addUnit = function () {
            //if(self.selectedhotbuild contains already a unit with the same factory ignore)
            var unitCheck = true;
            //debugger;
            var selectedunit = ko.toJS(self.selectedunit());
            for (var i = 0; i < self.selectedhotbuild().length; i++) {
                if (self.selectedhotbuild()[i].factory == selectedunit.factory) {
                    unitCheck = false;
                    break;
                }
            }
            if (unitCheck) {
                self.hotbuildglobalkey()[self.selectedkeyinfo() + "s"] = self.keyboardkey();
                self.selectedhotbuild.push(selectedunit);
            }
            self.Save();
            !$('.active').hasClass('hbk') ? $('.active').addClass('hbk') : '';
        };

        self.remFromList = function (item) {
            self.selectedhotbuild.remove(item);
            self.Save();
            if (self.selectedhotbuild().length === 0) {
                self.hotbuildglobalkey()[self.selectedkeyinfo() + "s"] = "";
                // self.InitKeyboard();
                $('.active').hasClass('hbk') ? $('.active').removeClass('hbk') : '';
            }
        };

        //Maybe replace this with dragging ? 
        self.upList = function (item) {
            var i = self.selectedhotbuild.indexOf(item);
            if (i >= 1 && i <= self.selectedhotbuild().length) {
                var array = self.selectedhotbuild();
                self.selectedhotbuild.splice(i - 1, 2, array[i], array[i - 1]);
            }
            self.Save();
        };

        self.downList = function (item) {
            var i = self.selectedhotbuild.indexOf(item);
            if (i < self.selectedhotbuild().length - 1) {
                var array = self.selectedhotbuild();
                self.selectedhotbuild.splice(i, 2, array[i + 1], array[i]);
            }
            self.Save();
        };

        self.Save = function () {
            model.hotbuildconfig = self.hotbuildglobal();
            model.hotbuildconfigkey = self.hotbuildglobalkey();
            self.hotbuildglobal()[self.selectedkeyinfo()] = self.selectedhotbuild();
        };

        self.keyboardclickhandler = function () {
            var $this = $(this);
            var character = $this.html();
            //debugger;
            if (!$this.hasClass('dis')) {
                //self.InitKeyboard();
                if (!$this.hasClass('active')) {
                    $('#keyboard li').each(function (index) {
                        if ($(this).hasClass('active')) {
                            $(this).toggleClass('active');
                            $(this).css('box-shadow', '');
                        }
                    });
                    $(this).addClass('active');
                    $(this).css('box-shadow', '0px 0px 2px 2px rgba(0,255,255,.7)');
                }
                //var $kbselection = $('#kbselection');
                //$kbselection.html($($this.clone()));
                var $selectedButton = $this.clone();
                //$selectedButton.removeClass('active');
                $selectedButton.attr('id', 'kbselection');
                $selectedButton.css({ 'box-shadow': '', 'border': 'rgba(0,255,255,1) solid thin', '-webkit-border-radius': '5px', 'text-transform': 'uppercase !important' });
                $('#kbselection').replaceWith($selectedButton);

                //$('#kbselection').css('text-transform', 'uppercase !important');
                

                $('#kbselection').click(function () {
                    $('#changeKeyDlg').dialog({
                        height: 150,
                        width: 150,
                        modal: true,
                        buttons: {
                            "Change Key": function () { self.swapKey(); self.InitKeyboard(); $(this).dialog("close"); }
                        },
                        close: function () {
                        }
                    });

                });

                self.keyboardkey(character.toLowerCase());
            }
        };

        self.swapKey = function () {
            swapto = $("#swapkey").val();

            if(self.keyboardkey() !== "" && swapto !== "")
            {
                if (self.keyboardkey() !== swapto) {
                    var swapposition;
                    var currentposition;
                    //find swap position
                    for (var i = 1; i <= 20; i++) {
                        if (hotbuildglobalkey["hotbuild" + i + "s"] === swapto) {
                            swapposition = i;
                            break;
                        }
                    }
                    //find current key position
                    for (var i = 1; i <= 20; i++) {
                        if (hotbuildglobalkey["hotbuild" + i + "s"] === self.keyboardkey()) {
                            currentposition = i;
                            break;
                        }
                    }
                    if (swapposition !== undefined) {
                        hotbuildglobalkey["hotbuild" + currentposition + "s"] = swapto;
                        hotbuildglobalkey["hotbuild" + swapposition + "s"] = self.keyboardkey();
                    }
                    else {
                        hotbuildglobalkey["hotbuild" + currentposition + "s"] = swapto;
                    }
                }
            }
        }

        self.InitKeyboard = function () {
            self.selectedkeyinfo(undefined);
            var arrkeys = _.keys(_.invert(self.hotbuildglobalkey()));
            var uberkeys = [];
            _.forEach(model.keybindGroups(), function (o) {
                _.forEach(o.keybinds(), function (k) {
                    uberkeys.push(k.binding());
                });
            });
            var diskeys = ['caps lock', 'shift', 'return'];
            if (model.camera_key_pan_style() === "WASD") {
                diskeys = diskeys.concat(['w', 'a', 's', 'd']);
            }
            $('#keyboard li').each(function (index) {
                if ($(this).hasClass('hbk')) {
                    $(this).removeClass('hbk');
                }
                if ($(this).hasClass('uber')) {
                    $(this).removeClass('uber');
                }
                if ($(this).hasClass('dis')) {
                    $(this).removeClass('dis');
                }
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                }
            });
            $('#keyboard li').each(function (index) {
                for (var i = 0; i < arrkeys.length; i++) {
                    if ($(this).html() == arrkeys[i]) {
                        $(this).toggleClass('hbk');
                    }
                }
                for (var i = 0; i < uberkeys.length; i++) {
                    if ($(this).html() == uberkeys[i]) {
                        $(this).toggleClass('uber');
                    }
                }
                for (var i = 0; i < diskeys.length; i++) {
                    if ($(this).html() == diskeys[i]) {
                        $(this).toggleClass('dis');
                    }
                }
            });

        };

        self.showingDefaultPrompt = ko.observable(false);
        self.showingDefaultWASDPrompt = ko.observable(false);

        self.showCommunityDefaultPrompt = function () {
            self.showingDefaultPrompt(true);
            $("#comdefaultsDlg").dialog({
                dialogClass: "no-close",
                draggable: false,
                resizable: false,
                modal: true,
                complete: function (data, textStatus) { }
            });
            $("#setComDefaults").click(function () {
                console.log("set Community Defaults");
                //disable osk
                //$("#keyboard li").unbind("click dblclick", self.keyboardclickhandler);
                self.ComunityDefaults();
                self.showingDefaultPrompt(false);
                $("#comdefaultsDlg").dialog("close");
                //enable osk
                //$("#keyboard li").bind("click dblclick", self.keyboardclickhandler);
            });
            $("#ignoreComDefaults").click(function () {
                self.showingDefaultPrompt(false);
                $("#comdefaultsDlg").dialog("close");
            });
        };

        self.showCommunityDefaultWASDPrompt = function () {
            self.showingDefaultWASDPrompt(true);
            $("#comdefaultsWASDDlg").dialog({
                dialogClass: "no-close",
                draggable: false,
                resizable: false,
                modal: true,
                complete: function (data, textStatus) { }
            });
            $("#setComDefaultsWASD").click(function () {
                console.log("set Community Defaults WASD");
                //disable osk
                //$("#keyboard li").unbind("click dblclick", self.keyboardclickhandler);
                self.ComunityDefaultsWASD();
                self.showingDefaultWASDPrompt(false);
                $("#comdefaultsWASDDlg").dialog("close");
                //enable osk
                //$("#keyboard li").bind("click dblclick", self.keyboardclickhandler);
            });
            $("#ignoreComDefaultsWASD").click(function () {
                self.showingDefaultWASDPrompt(false);
                $("#comdefaultsWASDDlg").dialog("close");
            });
        };

        self.ComunityDefaults = function () {
            self.keyboardkey();
            self.importfromfile("/ui/mods/hotbuild2/defaults/ARROWS.json");
            model.camera_key_pan_style('ARROW');
            forgetFramePosition('hotbuild_info_frame');
            self.InitKeyboard();

        };

        self.ComunityDefaultsWASD = function () {
            self.keyboardkey();
            model.camera_key_pan_style('WASD');
            forgetFramePosition('hotbuild_info_frame');
            self.importfromfile("/ui/mods/hotbuild2/defaults/WASD.json");
        };

        self.export = function () {
            console.log('export');
            var keyboardsettings = {}
            keyboardsettings.uber = {};
            for (var key in localStorage) {
                if (localStorage.hasOwnProperty(key) && key.indexOf('keybinding') === 0) {
                    keyboardsettings.uber[key] = localStorage[key];
                }
            }
            keyboardsettings.hotbuildglobalkey = self.hotbuildglobalkey();
            keyboardsettings.hotbuildglobal = self.hotbuildglobal();
            $("#ieport").val(JSON.stringify(keyboardsettings));
        };

        self.import = function () {
            console.log('import');
            if ($("#ieport").val() !== '') {
                var imported = JSON.parse($("#ieport").val());
                for (var key in imported.uber) {
                    if (imported.hasOwnProperty(key)) {
                        localStorage[key] = imported[key];
                    }
                }
                self.hotbuildglobalkey(imported.hotbuildglobalkey);
                self.hotbuildglobal(imported.hotbuildglobal);
                self.InitKeyboard();
            }
            else {
                //alert("Please input Text to import in textbox");
            }
        };

        self.importfromfile = function (importfile) {
            console.log('importing importfile');
            $.getJSON('coui:/' + importfile, function (imported) {
                for (var key in imported.uber) {
                    if (imported.hasOwnProperty(key)) {
                        localStorage[key] = imported[key];
                    }
                }
                self.hotbuildglobalkey(imported.hotbuildglobalkey);
                self.hotbuildglobal(imported.hotbuildglobal);
                self.InitKeyboard();
            });
        };

        self.showingImportExportDialog = ko.observable(false);

        self.showImportExportDialog = function () {
            self.showingImportExportDialog(true);
            $('#importexportDlg').dialog({
                height: 300,
                width: 450,
                modal: true,
                buttons: {
                    "Import": function () { self.import() },
                    "Export": function () { self.export() }
                },
                close: function () {
                    self.showingImportExportDialog(false);
                }
            });
        };
    }

    self.getTemplate = function (hblistitem) {
        if(hblistitem.factory === "")
        {
            return "structureTemplate";
        }
        else
        {
            return "mobileTemplate";
        }
    }

    var hotbuildglobal = {};
    var hotbuildglobalkey = {};
    //remove this  
    for (var i = 1; i < 21; i++) {
        eval("hotbuildglobal.hotbuild" + i + "s = []");
        eval("hotbuildglobalkey.hotbuild" + i + "s = ''");
    }

    var settings = decode(localStorage.settings);
    hotbuildglobal = settings.hotbuildconfig ? settings.hotbuildconfig : hotbuildglobal;
    hotbuildglobalkey = settings.hotbuildconfigkey ? settings.hotbuildconfigkey : hotbuildglobalkey;

    var hbuisettings = new HotBuildSettingsViewModel(hotbuildglobal, hotbuildglobalkey);
    var hotbuildsettings = {};
    hotbuildsettings.viewmodel = hbuisettings;

    model.addSetting_Text('Hotbuild Reset Time', 'hotbuild_reset_time', 'UI', 'Number', 2000,'Hotbuild2');
    model.addSetting_Text('Hotbuild Requeue Amount', 'hotbuild_requeue_amount', 'UI', 'Number', 50,'Hotbuild2');
    model.addSetting_DropDown('Hotbuild Show Key on BuildBar', 'hotbuild_show_key_on_buildbar', 'UI', ['ON', 'OFF'], 0,'Hotbuild2');
    model.registerFrameSetting('hotbuild_info_frame', 'Hotbuild Preview', true);

    return hotbuildsettings;


})();

(function () {

    model.oldSettingsBeforeHotbuild = model.settings;
    model.settings = ko.computed(function () {
        var newSettings = model.oldSettingsBeforeHotbuild();
        newSettings.hotbuildconfig = hotbuildsettings.viewmodel.hotbuildglobal();
        newSettings.hotbuildconfigkey = hotbuildsettings.viewmodel.hotbuildglobalkey();
        return newSettings;
    });

    function loadHotBuildSettings(element, url, model) {
        element.load(url, function () {
            console.log("Loading html " + url);
            ko.applyBindings(model, element.get(0));
            hotbuildsettings.viewmodel.InitKeyboard();
            $("#keyboard li").bind("click dblclick", hotbuildsettings.viewmodel.keyboardclickhandler);
        });
    }

    var $gamesettings = $("#game_settings");
    $gamesettings.children(":first").append("<li class='game_settings'>" +
	            "<a href='#tab_hotbuildprefs'>HOTBUILD</a>" +
	        "</li>");
    $gamesettings.append('<div class="div_settings" id="tab_hotbuildprefs"></div>');
    loadHotBuildSettings($('#tab_hotbuildprefs'), '../../mods/hotbuild2/settings/hotbuild_settings.html', hotbuildsettings.viewmodel);

})();
