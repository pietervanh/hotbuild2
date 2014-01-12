//IntelliSense for WebMatrix /VS
/// <reference path="../.vsdoc/jquery-1.9.1-vsdoc.js" /> 
/// <reference path="../.vsdoc/knockout-2.2.1.debug.js" />
/// <reference path="../.vsdoc/lodash-2.4.1.js" />

//model.addSetting_DropDown('Hotbuild Preview UI','hotbuild_preview_display','UI',['ON','OFF'],0);
model.addSetting_Text('Hotbuild Reset Time', 'hotbuild_reset_time', 'UI', 'Number', 2000);
model.addSetting_Text('Hotbuild Requeue Amount', 'hotbuild_requeue_amount', 'UI', 'Number', 50);
model.addSetting_DropDown('Hotbuild Show Key on BuildBar', 'hotbuild_show_key_on_buildbar', 'UI', ['ON', 'OFF'], 0);
model.registerFrameSetting('hotbuild_info_frame', 'Hotbuild Preview', true);

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
        new hbListItem().json("/pa/units/sea/naval_factory/naval_factory.json"),
        new hbListItem().json("/pa/units/sea/naval_factory_adv/naval_factory_adv.json"),
        new hbListItem().json("/pa/units/sea/sea_mine/sea_mine.json"),
        new hbListItem().json("/pa/units/sea/sonar/sonar.json"),
        new hbListItem().json("/pa/units/sea/sonar_adv/sonar_adv.json"),
        new hbListItem().json("/pa/units/sea/torpedo_launcher/torpedo_launcher.json"),
        new hbListItem().json("/pa/units/sea/torpedo_launcher_adv/torpedo_launcher_adv.json"),
        new hbListItem().json("/pa/units/land/anti_nuke_launcher/anti_nuke_launcher.json")
];

var hbunits = [
	new hbListItem().json("/pa/units/land/fabrication_bot/fabrication_bot.json"),
	new hbListItem().json("/pa/units/land/bot_aa/bot_aa.json"),
	new hbListItem().json("/pa/units/land/assault_bot/assault_bot.json"),
	new hbListItem().json("/pa/units/land/fabrication_bot_adv/fabrication_bot_adv.json"),
	new hbListItem().json("/pa/units/land/assault_bot_adv/assault_bot_adv.json"),
	new hbListItem().json("/pa/units/land/bot_artillery_adv/bot_artillery_adv.json"),
	new hbListItem().json("/pa/units/land/fabrication_vehicle/fabrication_vehicle.json"),
	new hbListItem().json("/pa/units/land/land_scout/land_scout.json"),
	new hbListItem().json("/pa/units/land/tank_light_laser/tank_light_laser.json"),
	new hbListItem().json("/pa/units/land/aa_missile_vehicle/aa_missile_vehicle.json"),
	new hbListItem().json("/pa/units/land/fabrication_vehicle_adv/fabrication_vehicle_adv.json"),
	new hbListItem().json("/pa/units/land/tank_laser_adv/tank_laser_adv.json"),
	new hbListItem().json("/pa/units/land/tank_heavy_mortar/tank_heavy_mortar.json"),
	new hbListItem().json("/pa/units/air/fabrication_aircraft/fabrication_aircraft.json"),
	new hbListItem().json("/pa/units/air/fighter/fighter.json"),
	new hbListItem().json("/pa/units/air/air_scout/air_scout.json"),
	new hbListItem().json("/pa/units/air/bomber/bomber.json"),
	new hbListItem().json("/pa/units/air/fabrication_aircraft_adv/fabrication_aircraft_adv.json"),
	new hbListItem().json("/pa/units/air/bomber_adv/bomber_adv.json"),
	new hbListItem().json("/pa/units/air/fighter_adv/fighter_adv.json"),
	new hbListItem().json("/pa/units/sea/fabrication_ship/fabrication_ship.json"),
	new hbListItem().json("/pa/units/sea/fabrication_sub/fabrication_sub.json"),
	new hbListItem().json("/pa/units/sea/sea_scout/sea_scout.json"),
	new hbListItem().json("/pa/units/sea/attack_sub/attack_sub.json"),
	new hbListItem().json("/pa/units/sea/frigate/frigate.json"),
	new hbListItem().json("/pa/units/sea/destroyer/destroyer.json"),
	new hbListItem().json("/pa/units/sea/fabrication_ship_adv/fabrication_ship_adv.json"),
	new hbListItem().json("/pa/units/sea/battleship/battleship.json"),
	new hbListItem().json("/pa/units/sea/missile_ship/missile_ship.json"),
	new hbListItem().json("/pa/units/sea/nuclear_sub/nuclear_sub.json"),
	new hbListItem().json("/pa/units/orbital/orbital_fighter/orbital_fighter.json"),
	new hbListItem().json("/pa/units/orbital/orbital_lander/orbital_lander.json"),
	new hbListItem().json("/pa/units/orbital/orbital_laser/orbital_laser.json"),
	new hbListItem().json("/pa/units/orbital/radar_satellite/radar_satellite.json"),
	new hbListItem().json("/pa/units/orbital/radar_satellite_adv/radar_satellite_adv.json"),
	new hbListItem().json("/pa/units/orbital/solar_array/solar_array.json"),
    new hbListItem().json("/pa/units/land/nuke_launcher/nuke_launcher_ammo.json"),
	new hbListItem().json("/pa/units/land/anti_nuke_launcher/anti_nuke_launcher_ammo.json"),
];

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
        switch(value)
        {
            case "/pa/units/land/nuke_launcher/nuke_launcher_ammo.json":
                self.desc("Nuclear Missle");
                self.displayname("Nuclear Missile Ammo");
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
};

function onunitload(unitdata, listitem) {
    unitdata.description != undefined ? listitem.desc(unitdata.description) : listitem.desc('not found');
    unitdata.display_name != undefined ? listitem.displayname(unitdata.display_name) : listitem.displayname('not found');
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
        _.contains(unitdata.unit_types, 'UNITTYPE_Orbital') ? listitem.factory('ofac') : '';
        //console.log(listitem.factory());
    }
    //if(unitdata.json() != '')
    //listitem = ko.toJS(listitem);
}

function HotBuildSettingsViewModel(hbglobal,hbglobalkey) {
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
        self.selectedhotbuild.push(self.selectedbuilding());
        self.hotbuildglobalkey()[self.selectedkeyinfo() + "s"] = self.keyboardkey();
        self.Save();
        !$('.active').hasClass('hbk') ? $('.active').addClass('hbk') : '';
    };

    self.addUnit = function () {
        //if(self.selectedhotbuild contains already a unit with the same factory ignore)
        var unitCheck = true;
        for (var i = 0; i < self.selectedhotbuild().length; i++) {
            if (self.selectedhotbuild()[i].factory() == self.selectedunit().factory()) {
                unitCheck = false;
                break;
            }
        }
        if (unitCheck) {
            self.hotbuildglobalkey()[self.selectedkeyinfo() + "s"] = self.keyboardkey();
            self.selectedhotbuild.push(self.selectedunit());
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
        if (model.camera_key_pan_style() == "WASD") {
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
            for (i = 0; i < arrkeys.length; i++) {
                if ($(this).html() == arrkeys[i]) {
                    $(this).toggleClass('hbk');
                }
            }
            for (i = 0; i < uberkeys.length; i++) {
                if ($(this).html() == uberkeys[i]) {
                    $(this).toggleClass('uber');
                }
            }
            for (i = 0; i < diskeys.length; i++) {
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
            self.ComunityDefaults();
            self.showingDefaultPrompt(false);
            $("#comdefaultsDlg").dialog("close");
        });
        $("#ignoreComDefaults").click(function () {
            self.showingDefaultPrompt(false);
            $("#comdefaultsDlg").dialog("close");
        });
    };

    self.showCommunityDefaultWASDPrompt = function () {
        //debugger;
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
            self.ComunityDefaultsWASD();
            self.showingDefaultWASDPrompt(false);
            $("#comdefaultsWASDDlg").dialog("close");
        });
        $("#ignoreComDefaultsWASD").click(function () {
            self.showingDefaultWASDPrompt(false);
            $("#comdefaultsWASDDlg").dialog("close");
        });
    };

    self.ComunityDefaults = function () {
        self.hotbuildglobal({});
        self.hotbuildglobalkey({});
        for (i = 1; i < 21; i++) {
            eval("self.hotbuildglobal().hotbuild" + i + "s = []");
            eval("self.hotbuildglobalkey().hotbuild" + i + "s = ''");
        }
        self.hotbuildglobal().hotbuild1s = [
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/land/vehicle_factory/vehicle_factory.json" })),
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/land/bot_factory/bot_factory.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/land/fabrication_bot_adv/fabrication_bot_adv.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/land/fabrication_bot/fabrication_bot.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/land/fabrication_vehicle_adv/fabrication_vehicle_adv.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/land/fabrication_vehicle/fabrication_vehicle.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/air/fabrication_aircraft_adv/fabrication_aircraft_adv.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/air/fabrication_aircraft/fabrication_aircraft.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/sea/fabrication_ship/fabrication_ship.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/sea/fabrication_ship_adv/fabrication_ship_adv.json" }))
        ];
        self.hotbuildglobal().hotbuild2s = [
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/air/air_factory/air_factory.json" })),
	        ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/air/air_factory_adv/air_factory_adv.json" })),
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/sea/naval_factory/naval_factory.json" })),
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/sea/naval_factory_adv/naval_factory_adv.json" })),
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/orbital/orbital_launcher/orbital_launcher.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/land/land_scout/land_scout.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/air/air_scout/air_scout.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/sea/sea_scout/sea_scout.json" }))
        ];
        self.hotbuildglobal().hotbuild3s = [
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/land/radar_adv/radar_adv.json" })),
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/land/radar/radar.json" })),
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/orbital/deep_space_radar/deep_space_radar.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/air/fighter/fighter.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/air/fighter_adv/fighter_adv.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/land/aa_missile_vehicle/aa_missile_vehicle.json" })),
			ko.toJS(_.find(hbunits, { "json2": "/pa/units/land/bot_aa/bot_aa.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/sea/frigate/frigate.json" }))
        ];
        self.hotbuildglobal().hotbuild4s = [
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/land/vehicle_factory_adv/vehicle_factory_adv.json" })),
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/land/bot_factory_adv/bot_factory_adv.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/land/assault_bot/assault_bot.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/land/assault_bot_adv/assault_bot_adv.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/land/tank_laser_adv/tank_laser_adv.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/land/tank_light_laser/tank_light_laser.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/air/bomber_adv/bomber_adv.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/air/bomber/bomber.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/sea/destroyer/destroyer.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/sea/battleship/battleship.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/orbital/orbital_fighter/orbital_fighter.json" }))
        ];
        self.hotbuildglobal().hotbuild5s = [
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/land/energy_plant_adv/energy_plant_adv.json" })),
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/land/energy_plant/energy_plant.json" }))
        ];
        self.hotbuildglobal().hotbuild6s = [
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/land/metal_extractor_adv/metal_extractor_adv.json" })),
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/land/metal_extractor/metal_extractor.json" })),
        ];
        self.hotbuildglobal().hotbuild7s = [
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/land/laser_defense_adv/laser_defense_adv.json" })),
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/land/laser_defense/laser_defense.json" })),
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/land/laser_defense_single/laser_defense_single.json" }))
        ];
        self.hotbuildglobal().hotbuild8s = [
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/land/air_defense/air_defense.json" })),
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/land/land_barrier/land_barrier.json" })),
        ];
        self.hotbuildglobal().hotbuild9s = [
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/land/artillery_short/artillery_short.json" })),
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/land/tactical_missile_launcher/tactical_missile_launcher.json" })),
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/land/artillery_long/artillery_long.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/land/bot_artillery_adv/bot_artillery_adv.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/land/tank_heavy_mortar/tank_heavy_mortar.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/sea/missile_ship/missile_ship.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/orbital/orbital_laser/orbital_laser.json" }))
        ];
        self.hotbuildglobal().hotbuild10s = [
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/land/energy_storage/energy_storage.json" })),
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/land/metal_storage/metal_storage.json" }))
        ];

        self.hotbuildglobal().hotbuild11s = [
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/orbital/ion_defense/ion_defense.json" })),
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/orbital/delta_v_engine/delta_v_engine.json" }))
        ];

        self.hotbuildglobalkey().hotbuild1s = 'w';
        self.hotbuildglobalkey().hotbuild2s = 'e';
        self.hotbuildglobalkey().hotbuild3s = 'r';
        self.hotbuildglobalkey().hotbuild4s = 't';
        self.hotbuildglobalkey().hotbuild5s = 'f';
        self.hotbuildglobalkey().hotbuild6s = 's';
        self.hotbuildglobalkey().hotbuild7s = 'x';
        self.hotbuildglobalkey().hotbuild8s = 'c';
        self.hotbuildglobalkey().hotbuild9s = 'v';
        self.hotbuildglobalkey().hotbuild10s = 'd';
        self.hotbuildglobalkey().hotbuild11s = 'g';

        default_keybinds.hotbuild['Toggle Energy'] = 'tab';
        default_keybinds.hotbuild['Lock Pole'] = '^';
        default_keybinds.hotbuild['Requeue'] = 'o';
        default_keybinds.hotbuild['View Notification'] = 'space';
        default_keybinds.hotbuild['move'] = 'm';
        default_keybinds.hotbuild['attack'] = 'a';
        default_keybinds.hotbuild['assist'] = 'i';
        default_keybinds.hotbuild['repair'] = '';
        default_keybinds.hotbuild['reclaim'] = '';
        default_keybinds.hotbuild['patrol'] = 'q';
        default_keybinds.hotbuild['stop'] = '';
        default_keybinds.hotbuild['select commie'] = 'b';
        default_keybinds.hotbuild['unload'] = 'u';
        default_keybinds['gameplay']['command mode [move]'] = '';
        default_keybinds['gameplay']['command mode [attack]'] = '';
        default_keybinds['gameplay']['command mode [assist]'] = '';
        default_keybinds['gameplay']['command mode [repair]'] = '';
        default_keybinds['gameplay']['command mode [reclaim]'] = '';
        default_keybinds['gameplay']['command mode [patrol]'] = '';
        default_keybinds['gameplay']['command mode [special move]'] = '';
        default_keybinds['gameplay']['command mode [unload]'] = '';
        default_keybinds['gameplay']['command mode [celestial move]'] = '';
        default_keybinds['gameplay']['stop command'] = '';
        default_keybinds['gameplay']['next build tab'] = '';
        default_keybinds['gameplay']['select commander'] = '';
        default_keybinds['gameplay']['select idle fabbers'] = '';
        default_keybinds['gameplay']['track selection with camera'] = '';
        default_keybinds['camera']['zoom to celestial'] = '';
        model.restoreDefaultKeybinds();
        model.camera_key_pan_style('ARROW');
        forgetFramePosition('hotbuild_info_frame');
        self.InitKeyboard();

    };

    self.ComunityDefaultsWASD = function () {
        //debugger;
        self.hotbuildglobal({});
        self.hotbuildglobalkey({});
        for (i = 1; i < 21; i++) {
            eval("self.hotbuildglobal().hotbuild" + i + "s = []");
            eval("self.hotbuildglobalkey().hotbuild" + i + "s = ''");
        }
        self.hotbuildglobal().hotbuild1s = [
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/land/vehicle_factory/vehicle_factory.json" })),
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/land/bot_factory/bot_factory.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/land/land_scout/land_scout.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/air/air_scout/air_scout.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/sea/sea_scout/sea_scout.json" }))

        ];
        self.hotbuildglobal().hotbuild2s = [
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/air/air_factory/air_factory.json" })),
	        ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/air/air_factory_adv/air_factory_adv.json" })),
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/sea/naval_factory/naval_factory.json" })),
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/sea/naval_factory_adv/naval_factory_adv.json" })),
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/orbital/orbital_launcher/orbital_launcher.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/land/bot_artillery_adv/bot_artillery_adv.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/land/tank_heavy_mortar/tank_heavy_mortar.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/sea/attack_sub/attack_sub.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/sea/missile_ship/missile_ship.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/orbital/orbital_laser/orbital_laser.json" }))
        ];
        self.hotbuildglobal().hotbuild3s = [
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/land/radar_adv/radar_adv.json" })),
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/land/radar/radar.json" })),
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/orbital/deep_space_radar/deep_space_radar.json" })),
	        ko.toJS(_.find(hbunits, { "json2": "/pa/units/air/fighter/fighter.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/air/fighter_adv/fighter_adv.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/land/aa_missile_vehicle/aa_missile_vehicle.json" })),
			ko.toJS(_.find(hbunits, { "json2": "/pa/units/land/bot_aa/bot_aa.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/sea/frigate/frigate.json" }))
        ];
        self.hotbuildglobal().hotbuild4s = [
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/land/vehicle_factory_adv/vehicle_factory_adv.json" })),
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/land/bot_factory_adv/bot_factory_adv.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/sea/nuclear_sub/nuclear_sub.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/orbital/orbital_lander/orbital_lander.json" }))
        ];
        self.hotbuildglobal().hotbuild5s = [
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/land/energy_plant_adv/energy_plant_adv.json" })),
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/land/energy_plant/energy_plant.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/land/assault_bot/assault_bot.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/land/assault_bot_adv/assault_bot_adv.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/land/tank_light_laser/tank_light_laser.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/land/tank_laser_adv/tank_laser_adv.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/air/bomber/bomber.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/air/bomber_adv/bomber_adv.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/sea/destroyer/destroyer.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/sea/battleship/battleship.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/orbital/orbital_fighter/orbital_fighter.json" }))
        ];
        self.hotbuildglobal().hotbuild6s = [
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/land/metal_extractor_adv/metal_extractor_adv.json" })),
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/land/metal_extractor/metal_extractor.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/land/fabrication_bot_adv/fabrication_bot_adv.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/land/fabrication_bot/fabrication_bot.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/land/fabrication_vehicle_adv/fabrication_vehicle_adv.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/land/fabrication_vehicle/fabrication_vehicle.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/air/fabrication_aircraft_adv/fabrication_aircraft_adv.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/air/fabrication_aircraft/fabrication_aircraft.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/sea/fabrication_ship/fabrication_ship.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/sea/fabrication_ship_adv/fabrication_ship_adv.json" }))
        ];
        self.hotbuildglobal().hotbuild7s = [
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/land/laser_defense_adv/laser_defense_adv.json" })),
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/land/laser_defense/laser_defense.json" })),
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/land/laser_defense_single/laser_defense_single.json" }))
        ];
        self.hotbuildglobal().hotbuild8s = [
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/land/air_defense/air_defense.json" })),
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/land/land_barrier/land_barrier.json" })),
        ];
        self.hotbuildglobal().hotbuild9s = [
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/land/artillery_short/artillery_short.json" })),
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/land/tactical_missile_launcher/tactical_missile_launcher.json" })),
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/land/artillery_long/artillery_long.json" }))
        ];
        self.hotbuildglobal().hotbuild10s = [
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/land/energy_storage/energy_storage.json" })),
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/land/metal_storage/metal_storage.json" })),
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/land/anti_nuke_launcher/anti_nuke_launcher.json" })),
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/land/nuke_launcher/nuke_launcher.json" })),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/land/nuke_launcher/nuke_launcher_ammo.json"})),
            ko.toJS(_.find(hbunits, { "json2": "/pa/units/land/anti_nuke_launcher/anti_nuke_launcher_ammo.json"}))
        ];
        self.hotbuildglobal().hotbuild11s = [
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/orbital/ion_defense/ion_defense.json" })),
            ko.toJS(_.find(hbbuildings, { "json2": "/pa/units/orbital/delta_v_engine/delta_v_engine.json" }))
        ];

        self.hotbuildglobalkey().hotbuild1s = 'f';
        self.hotbuildglobalkey().hotbuild2s = 'g';
        self.hotbuildglobalkey().hotbuild3s = 't';
        self.hotbuildglobalkey().hotbuild4s = 'h';
        self.hotbuildglobalkey().hotbuild5s = 'r';
        self.hotbuildglobalkey().hotbuild6s = 'e';
        self.hotbuildglobalkey().hotbuild7s = 'x';
        self.hotbuildglobalkey().hotbuild8s = 'c';
        self.hotbuildglobalkey().hotbuild9s = 'v';
        self.hotbuildglobalkey().hotbuild10s = 'z';
        self.hotbuildglobalkey().hotbuild11s = 'j';

        default_keybinds.hotbuild['Toggle Energy'] = 'tab';
        default_keybinds.hotbuild['Lock Pole'] = 'y';
        default_keybinds.hotbuild['Requeue'] = 'o';
        default_keybinds.hotbuild['View Notification'] = 'space';
        default_keybinds.hotbuild['move'] = 'm';
        default_keybinds.hotbuild['attack'] = '';
        default_keybinds.hotbuild['assist'] = 'i';
        default_keybinds.hotbuild['repair'] = '';
        default_keybinds.hotbuild['reclaim'] = '';
        default_keybinds.hotbuild['patrol'] = '';
        default_keybinds.hotbuild['stop'] = 'q';
        default_keybinds.hotbuild['select commie'] = 'b';
        default_keybinds.hotbuild['unload'] = 'u';
        default_keybinds['gameplay']['command mode [move]'] = '';
        default_keybinds['gameplay']['command mode [attack]'] = '';
        default_keybinds['gameplay']['command mode [assist]'] = '';
        default_keybinds['gameplay']['command mode [repair]'] = '';
        default_keybinds['gameplay']['command mode [reclaim]'] = '';
        default_keybinds['gameplay']['command mode [patrol]'] = '';
        default_keybinds['gameplay']['command mode [special move]'] = '';
        default_keybinds['gameplay']['command mode [unload]'] = '';
        default_keybinds['gameplay']['command mode [celestial move]'] = '';
        default_keybinds['gameplay']['stop command'] = '';
        default_keybinds['gameplay']['next build tab'] = '';
        default_keybinds['gameplay']['select commander'] = '';
        default_keybinds['gameplay']['select idle fabbers'] = '';
        default_keybinds['gameplay']['track selection with camera'] = '';
        default_keybinds['camera']['zoom to celestial'] = '';
        model.restoreDefaultKeybinds();
        model.camera_key_pan_style('WASD');
        forgetFramePosition('hotbuild_info_frame');
        self.InitKeyboard();
    };
}

function loadHotBuildSettings(element, url, model) {
    element.load(url, function () {
        console.log("Loading html " + url);
        ko.applyBindings(model, element.get(0));
        hbuisettings.InitKeyboard();
        $('#keyboard li').click(function () {
            var $this = $(this);
            var character = $this.html();
            if (!$this.hasClass('dis')) {
                hbuisettings.InitKeyboard();
                $('#keyboard li').each(function (index) {
                    if ($(this).hasClass('active')) {
                        $(this).toggleClass('active');
                    }
                });

                $this.addClass('active');
                hbuisettings.keyboardkey(character);
            }
        });
    });
}

var hbuisettings = new HotBuildSettingsViewModel(hotbuildglobal,hotbuildglobalkey);
$("#game_settings").children(":first").append("<li class='game_settings'>" +
            "<a href='#tab_hotbuildprefs'>HOTBUILD</a>" +
        "</li>");
$("#game_settings").append('<div class="div_settings" id="tab_hotbuildprefs"></div>');
loadHotBuildSettings($('#tab_hotbuildprefs'), '../../mods/hotbuild2/settings/hotbuild_settings.html', hbuisettings);


model.oldSettingsBeforeHotbuild = model.settings;

model.settings = ko.computed(function () {
    var newSettings = model.oldSettingsBeforeHotbuild();
    newSettings.hotbuildconfig = hbuisettings.hotbuildglobal();
    newSettings.hotbuildconfigkey = hbuisettings.hotbuildglobalkey();
    return newSettings;
});
