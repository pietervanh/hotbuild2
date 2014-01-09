//IntelliSense for WebMatrix /VS
/// <reference path="../.vsdoc/jquery-1.9.1-vsdoc.js" /> 
/// <reference path="../.vsdoc/knockout-2.2.1.debug.js" />
/// <reference path="../.vsdoc/lodash-2.4.1.js" />

//model.addSetting_DropDown('Hotbuild Preview UI','hotbuild_preview_display','UI',['ON','OFF'],0);
model.addSetting_Text('Hotbuild Reset Time', 'hotbuild_reset_time', 'UI', 'Number', 2000);
model.addSetting_Text('Hotbuild Requeue Amount', 'hotbuild_requeue_amount', 'UI', 'Number', 50);
model.registerFrameSetting('hotbuild_info_frame', 'Hotbuild Preview', true);

model.oldSettingsBeforeHotbuild = model.settings;

model.settings = ko.computed(function () {
    var newSettings = model.oldSettingsBeforeHotbuild();
    newSettings.hotbuildconfig = hotbuildglobal;
    newSettings.hotbuildconfigkey = hotbuildglobalkey;
    return newSettings;
});

//TODO read data from unit JSON files
//Problem don't know how to know it's a a buildable unit / factory
//hbLoadUnitInfo();
var hbbuildings = [
        { displayname: "Bot Factory", desc: "Bot Factory", json: "/pa/units/land/bot_factory/bot_factory.json" },
        { displayname: "Vehicle Factory", desc: "Vehicle Factory", json: "/pa/units/land/vehicle_factory/vehicle_factory.json" },
        { displayname: "Air Factory", desc: "Air Factory", json: "/pa/units/air/air_factory/air_factory.json" },
        { displayname: "Naval Factory", desc: "Naval Factory", json: "/pa/units/sea/naval_factory/naval_factory.json" },
        { displayname: "Advanced Vehicle Factory", desc: "Advanced Vehicle Factory", json: "/pa/units/land/vehicle_factory_adv/vehicle_factory_adv.json" },
		{ displayname: "Advanced Bot Factory", desc: "Advanced Bot Factory", json: "/pa/units/land/bot_factory_adv/bot_factory_adv.json" },
		{ displayname: "Advanced Air Factory", desc: "Advanced Air Factory", json: "/pa/units/air/air_factory_adv/air_factory_adv.json" },
        { displayname: "Advanced Naval Factory", desc: "Advanced Naval Factory", json: "/pa/units/sea/naval_factory_adv/naval_factory_adv.json" },
        { displayname: "Orbital Launcher", desc: "Orbital Launcher", json: "/pa/units/orbital/orbital_launcher/orbital_launcher.json" },
        { displayname: "Metal Extractor", desc: "Metal Extractor", json: "/pa/units/land/metal_extractor/metal_extractor.json" },
        { displayname: "Adv Metal Extractor", desc: "Advanced Metal Extractor", json: "/pa/units/land/metal_extractor_adv/metal_extractor_adv.json" },
		{ displayname: "Metal Storage", desc: "Metal Storage", json: "/pa/units/land/metal_storage/metal_storage.json" },
        { displayname: "Energy Plant", desc: "Energy Plant", json: "/pa/units/land/energy_plant/energy_plant.json" },
        { displayname: "Advanced Energy Plant", desc: "Advanced Energy Plant", json: "/pa/units/land/energy_plant_adv/energy_plant_adv.json" },
		{ displayname: "Energy Storage", desc: "Energy Storage", json: "/pa/units/land/energy_storage/energy_storage.json" },
		{ displayname: "Catapult", desc: "Tactical Missile Launcher", json: "/pa/units/land/tactical_missle_launcher/tactical_missle_launcher.json" },
        { displayname: "Holkins", desc: "Long Range Artillery", json: "/pa/units/land/artillery_long/artillery_long.json" },
        { displayname: "Pelter", desc: "Short Range Artillery", json: "/pa/units/land/artillery_short/artillery_short.json" },
        { displayname: "Missile Defense Tower", desc: "Air Defense", json: "/pa/units/land/air_defense/air_defense.json" },
        { displayname: "Land Barrier", desc: "Wall", json: "/pa/units/land/land_barrier/land_barrier.json" },
        { displayname: "Advanced Laser Defense Tower", desc: "Triple Barrel Laser Tower", json: "/pa/units/land/laser_defense_adv/laser_defense_adv.json" },
        { displayname: "Laser Defense Tower", desc: "Dual Barrel Laser Tower", json: "/pa/units/land/laser_defense/laser_defense.json" },
        { displayname: "Single Laser Defense Tower", desc: "Single Barrel Laser Tower", json: "/pa/units/land/laser_defense_single/laser_defense_single.json" },
        { displayname: "Umbrella", desc: "Orbital Defense (ground to orbital)", json: "/pa/units/orbital/ion_defense/ion_defense.json" },
        { displayname: "Jellyfish", desc: "Sea Mine", json: "/pa/units/sea/sea_mine/sea_mine.json" },
        { displayname: "Sonar", desc: "Sonar", json: "/pa/units/sea/sonar/sonar.json" },
        { displayname: "Advanced Sonar", desc: "Advanced Sonar", json: "/pa/units/sea/sonar_adv/sonar_adv.json" },
        { displayname: "Torpedo Launcher", desc: "Torpedo Launcher", json: "/pa/units/sea/torpedo_launcher/torpedo_launcher.json" },
        { displayname: "Advanced Torpedo Launcher", desc: "Advanced Torpedo Launcher", json: "/pa/units/sea/torpedo_launcher_adv/torpedo_launcher_adv.json" },
        { displayname: "Orbital and Deepspace Radar", desc: "Orbital and Deepspace Radar", json: "/pa/units/orbital/deep_space_radar/deep_space_radar.json" },
        { displayname: "Advanced Radar", desc: "Advanced Radar", json: "/pa/units/land/radar_adv/radar_adv.json" },
		{ displayname: "Radar", desc: "Radar", json: "/pa/units/land/radar/radar.json" },
        { displayname: "Halley", desc: "Delta-V Engine", json: "/pa/units/orbital/delta_v_engine/delta_v_engine.json" },
        { displayname: "Anti-Nuke Launcher", desc: "Anti-Nuke Launcher", json: "/pa/units/land/anti_nuke_launcher/anti_nuke_launcher.json" },
        { displayname: "Nuclear Missile Launcher", desc: "Nuclear Missile Launcher", json: "/pa/units/land/nuke_launcher/nuke_launcher.json" }
];

var hbunits = [
        { displayname: "Fabrication Bot", desc: "Fabrication Bot", factory: "botfac", json: "/pa/units/land/fabrication_bot/fabrication_bot.json" },
        { displayname: "Stinger", desc: "AA Bot", factory: "botfac", json: "/pa/units/land/bot_aa/bot_aa.json" },
        { displayname: "Dox", desc: "Assault Bot", factory: "botfac", json: "/pa/units/land/assault_bot/assault_bot.json" },
        { displayname: "Advanced Fabrication Bot", desc: "Advanced Fabrication Bot", factory: "abotfac", json: "/pa/units/land/fabrication_bot_adv/fabrication_bot_adv.json" },
        { displayname: "Slammer", desc: "Advanced Assault Bot", factory: "abotfac", json: "/pa/units/land/assault_bot_adv/assault_bot_adv.json" },
        { displayname: "Stomper", desc: "Artillery Bot", factory: "abotfac", json: "/pa/units/land/bot_artillery_adv/bot_artillery_adv.json" },
        { displayname: "Fabrication Vehicle", desc: "Fabrication Vehicle", factory: "vecfac", json: "/pa/units/land/fabrication_vehicle/fabrication_vehicle.json" },
        { displayname: "Skitter", desc: "Land Scout", factory: "vecfac", json: "/pa/units/land/land_scout/land_scout.json" },
        { displayname: "Ant", desc: "Tank", factory: "vecfac", json: "/pa/units/land/tank_light_laser/tank_light_laser.json" },
        { displayname: "Spinner", desc: "AA Tank", factory: "vecfac", json: "/pa/units/land/aa_missile_vehicle/aa_missile_vehicle.json" },
        { displayname: "Advanced Fabrication Vehicle", desc: "Advanced Fabrication Vehicle", factory: "avecfac", json: "/pa/units/land/fabrication_vehicle_adv/fabrication_vehicle_adv.json" },
        { displayname: "Leveler", desc: "Advanced Tank", factory: "avecfac", json: "/pa/units/land/tank_laser_adv/tank_laser_adv.json" },
        { displayname: "Sheller", desc: "Artillery Tank", factory: "avecfac", json: "/pa/units/land/tank_heavy_mortar/tank_heavy_mortar.json" },
        { displayname: "Fabrication Aircraft", desc: "Fabrication Aircraft", factory: "airfac", json: "/pa/units/air/fabrication_aircraft/fabrication_aircraft.json" },
        { displayname: "Hummingbird", desc: "Fighter", factory: "airfac", json: "/pa/units/air/fighter/fighter.json" },
        { displayname: "Firefly", desc: "Air Scout", factory: "airfac", json: "/pa/units/air/air_scout/air_scout.json" },
        { displayname: "Bumblebee", desc: "Bomber", factory: "airfac", json: "/pa/units/air/bomber/bomber.json" },
        { displayname: "Advanced Fab Aircraft", desc: "Advanced Fab Aircraft", factory: "aafac", json: "/pa/units/air/fabrication_aircraft_adv/fabrication_aircraft_adv.json" },
        { displayname: "Hornet", desc: "Advanced Bomber", factory: "aafac", json: "/pa/units/air/bomber_adv/bomber_adv.json" },
        { displayname: "Peregrine", desc: "Advanced Fighter", factory: "aafac", json: "/pa/units/air/fighter_adv/fighter_adv.json" },
        { displayname: "Fabrication Ship", desc: "Fabrication Ship", factory: "nfac", json: "/pa/units/sea/fabrication_ship/fabrication_ship.json" },
        { displayname: "Fabrication Sub", desc: "Fabrication Sub", factory: "nfac", json: "/pa/units/sea/fabrication_sub/fabrication_sub.json" },
        { displayname: "Sun Fish", desc: "Scout Ship", factory: "nfac", json: "/pa/units/sea/sea_scout/sea_scout.json" },
        { displayname: "Dolphin", desc: "Attack Sub", factory: "nfac", json: "/pa/units/sea/attack_sub/attack_sub.json" },
        { displayname: "Narwhal", desc: "AA Frigate", factory: "nfac", json: "/pa/units/sea/frigate/frigate.json" },
        { displayname: "Bluebottle", desc: "Destroyer", factory: "nfac", json: "/pa/units/sea/destroyer/destroyer.json" },
        { displayname: "Advanced Fabrication Ship", desc: "Advanced Fabrication Ship", factory: "anfac", json: "/pa/units/sea/fabrication_ship_adv/fabrication_ship_adv.json" },
        { displayname: "Leviathan", desc: "Advanced Destroyer", factory: "anfac", json: "/pa/units/sea/battleship/battleship.json" },
        { displayname: "Stingray", desc: "Missile Ship", factory: "anfac", json: "/pa/units/sea/missile_ship/missile_ship.json" },
        { displayname: "Barracuda", desc: "Nuclear Sub", factory: "anfac", json: "/pa/units/sea/nuclear_sub/nuclear_sub.json" },
        { displayname: "Avenger", desc: "Orbital Fighter", factory: "ofac", json: "/pa/units/orbital/orbital_fighter/orbital_fighter.json" },
        { displayname: "Astraeus", desc: "Orbital Lander", factory: "ofac", json: "/pa/units/orbital/orbital_lander/orbital_lander.json" },
        { displayname: "SXX-1304 Laser Platform", desc: "Mining Laser", factory: "ofac", json: "/pa/units/orbital/orbital_laser/orbital_laser.json" },
        { displayname: "Radar Satellite", desc: "Radar Satellite", factory: "ofac", json: "/pa/units/orbital/radar_satellite/radar_satellite.json" },
        { displayname: "Advanced Radar Satellite", desc: "Advanced Radar Satellite", factory: "ofac", json: "/pa/units/orbital/radar_satellite_adv/radar_satellite_adv.json" },
        { displayname: "Solar Array", desc: "Solar Panel Satellite", factory: "ofac", json: "/pa/units/orbital/solar_array/solar_array.json" }
];

var hbbuildingstst = [ 
	new hbListItem("/pa/units/land/bot_factory/bot_factory.json"),
	new hbListItem("/pa/units/land/vehicle_factory/vehicle_factory.json")
];

var hbunitstst = [ 
	new hbListItem("/pa/units/land/fabrication_bot/fabrication_bot.json"),
	new hbListItem("/pa/units/land/bot_aa/bot_aa.json")
];

function hbListItem(jsonpayload)
{
	//TODO
	var self = this;
	self.json = ko.observable(jsonpayload);
	self.desc = ko.observable();
	self.displayname = ko.observable();
	self.factory = ko.observable(); //css based on factory ?
	self.image = ko.observable(); //get image of unit / building
	self.json.subscribe(function(value){
		//fetch from json file the data	
		var unitdata = hbLoadJSON(value);
		debugger;
		//write to listitem props();
		/*
		unitdata.description != undefined ? self.desc(unitdata.description) : self.desc('');
		unitdata.displayname != undefined ? self.displayname(unitdata.displayname) : self.displayname('');
		unitdata.factory != undefined ? self.factory(unitdata.factory) : self.factory('');
		*/
	});
	
};

function HotBuildSettingsViewModel() {
    var self = this;
    self.selectedhotbuild = ko.observableArray([]);
    self.buildings = ko.observableArray(hbbuildings);
    self.units = ko.observableArray(hbunits);
    self.keyboardkey = ko.observable();
    self.uberkey = ko.observable();
    self.selectedkeyinfo = ko.observable();
    self.selectKey = function () {
        self.selectedhotbuild(hotbuildglobal[self.selectedkeyinfo() + "s"]);
    };

    self.selectedkeyinfo.subscribe(function(value)
    {
        self.selectKey();
    });

    self.keyboardkey.subscribe(function (value) {
        var keyindex = _.indexOf(_.keys(_.invert(hotbuildglobalkey)), value);
        var hotbuildkey = _.keys(hotbuildglobalkey)[keyindex];
        if (hotbuildkey !== undefined)
        {
            self.selectedkeyinfo(hotbuildkey.substring(0, hotbuildkey.length - 1));
        }
        else
        {
            //find first unused hotbuildkey and select it 
            keyindex = _.indexOf(_.keys(_.invert(hotbuildglobalkey)), "");
            hotbuildkey = _.keys(hotbuildglobalkey)[keyindex];
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
        if(!fuberkey)
        {
            self.uberkey(undefined);
        }
    });

    self.hbkey = ko.computed({
        read: function () {
            return hotbuildglobalkey[self.selectedkeyinfo() + "s"];
        },
        write: function (value) {
            hotbuildglobalkey[self.selectedkeyinfo() + "s"] = value;
        },
        owner: self
    });

    self.selectedbuilding = ko.observable();

    self.selectedunit = ko.observable();

    self.addBuilding = function () {
        self.selectedhotbuild.push(self.selectedbuilding());
        hotbuildglobalkey[self.selectedkeyinfo() + "s"] = self.keyboardkey();
        self.Save();
    };

    self.addUnit = function () {
        //if(self.selectedhotbuild contains already a unit with the same factory ignore)
        var unitCheck = true;
        for (var i = 0; i < self.selectedhotbuild().length; i++) {
            if (self.selectedhotbuild()[i].factory == self.selectedunit().factory) {
                unitCheck = false;
                break;
            }
        }
        if (unitCheck) {
            hotbuildglobalkey[self.selectedkeyinfo() + "s"] = self.keyboardkey();
            self.selectedhotbuild.push(self.selectedunit());
        }
        self.Save();
    };

    self.remFromList = function (item) {
        self.selectedhotbuild.remove(item);
        self.Save();
        if (self.selectedhotbuild().length === 0)
        {
            hotbuildglobalkey[self.selectedkeyinfo() + "s"] = "";
            self.InitKeyboard();
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
        hotbuildglobal[self.selectedkeyinfo()] = self.selectedhotbuild();
    };

    self.InitKeyboard = function () {
        var arrkeys = _.keys(_.invert(hotbuildglobalkey));
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
        self.selectedkeyinfo(undefined);
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

    self.ComunityDefaults = function () {
        for (i = 1; i < 21; i++) {
            eval("hotbuildglobal.hotbuild" + i + "s = []");
            eval("default_keybinds.hotbuild.hotbuild" + i + "= ''");
            eval("hotbuildglobalkey.hotbuild" + i + "s = ''");
        }
        hotbuildglobal.hotbuild1s = [
            { displayname: "Vehicle Factory", desc: "Vehicle Factory", json: "/pa/units/land/vehicle_factory/vehicle_factory.json" },
            { displayname: "Bot Factory", desc: "Bot Factory", json: "/pa/units/land/bot_factory/bot_factory.json" },
            { displayname: "Advanced Fabrication Bot", desc: "Advanced Fabrication Bot", factory: "abotfac", json: "/pa/units/land/fabrication_bot_adv/fabrication_bot_adv.json" },
            { displayname: "Fabrication Bot", desc: "Fabrication Bot", factory: "botfac", json: "/pa/units/land/fabrication_bot/fabrication_bot.json" },
            { displayname: "Advanced Fabrication Vehicle", desc: "Advanced Fabrication Vehicle", factory: "avecfac", json: "/pa/units/land/fabrication_vehicle_adv/fabrication_vehicle_adv.json" },
            { displayname: "Fabrication Vehicle", desc: "Fabrication Vehicle", factory: "vecfac", json: "/pa/units/land/fabrication_vehicle/fabrication_vehicle.json" },
            { displayname: "Advanced Fab Aircraft", desc: "Advanced Fab Aircraft", factory: "aafac", json: "/pa/units/air/fabrication_aircraft_adv/fabrication_aircraft_adv.json" },
            { displayname: "Fabrication Aircraft", desc: "Fabrication Aircraft", factory: "airfac", json: "/pa/units/air/fabrication_aircraft/fabrication_aircraft.json" },
            { displayname: "Advanced Fabrication Ship", desc: "Advanced Fabrication Ship", factory: "anfac", json: "/pa/units/sea/fabrication_ship_adv/fabrication_ship_adv.json" },
            { displayname: "Fabrication Ship", desc: "Fabrication Ship", factory: "nfac", json: "/pa/units/sea/fabrication_ship/fabrication_ship.json" }
        ];
        hotbuildglobal.hotbuild2s = [
			{ displayname: "Advanced Air Factory", desc: "Advanced Air Factory", json: "/pa/units/air/air_factory_adv/air_factory_adv.json" },
            { displayname: "Advanced Naval Factory", desc: "Advanced Naval Factory", json: "/pa/units/sea/naval_factory_adv/naval_factory_adv.json" },
            { displayname: "Air Factory", desc: "Air Factory", json: "/pa/units/air/air_factory/air_factory.json" },
            { displayname: "Naval Factory", desc: "Naval Factory", json: "/pa/units/sea/naval_factory/naval_factory.json" },
            { displayname: "Orbital Launcher", desc: "Orbital Launcher", json: "/pa/units/orbital/orbital_launcher/orbital_launcher.json" },
            { displayname: "Skitter", desc: "Land Scout", factory: "vecfac", json: "/pa/units/land/land_scout/land_scout.json" },
            { displayname: "Firefly", desc: "Air Scout", factory: "airfac", json: "/pa/units/air/air_scout/air_scout.json" },
            { displayname: "Stinger", desc: "AA Bot", factory: "botfac", json: "/pa/units/land/bot_aa/bot_aa.json" },
            { displayname: "Sheller", desc: "Artillery Tank", factory: "avecfac", json: "/pa/units/land/tank_heavy_mortar/tank_heavy_mortar.json" },
            { displayname: "Peregrine", desc: "Advanced Fighter", factory: "aafac", json: "/pa/units/air/fighter_adv/fighter_adv.json" },
            { displayname: "Dolphin", desc: "Attack Sub", factory: "nfac", json: "/pa/units/sea/attack_sub/attack_sub.json" },
            { displayname: "Stingray", desc: "Missile Ship", factory: "anfac", json: "/pa/units/sea/missile_ship/missile_ship.json" },
            { displayname: "SXX-1304 Laser Platform", desc: "Mining Laser", factory: "ofac", json: "/pa/units/orbital/orbital_laser/orbital_laser.json" }
        ];
        hotbuildglobal.hotbuild3s = [
            { displayname: "Advanced Radar", desc: "Advanced Radar", json: "/pa/units/land/radar_adv/radar_adv.json" },
			{ displayname: "Radar", desc: "Radar", json: "/pa/units/land/radar/radar.json" },
            { displayname: "Dox", desc: "Assault Bot", factory: "botfac", json: "/pa/units/land/assault_bot/assault_bot.json" },
            { displayname: "Slammer", desc: "Advanced Assault Bot", factory: "abotfac", json: "/pa/units/land/assault_bot_adv/assault_bot_adv.json" },
            { displayname: "Ant", desc: "Tank", factory: "vecfac", json: "/pa/units/land/tank_light_laser/tank_light_laser.json" },
            { displayname: "Leveler", desc: "Advanced Tank", factory: "avecfac", json: "/pa/units/land/tank_laser_adv/tank_laser_adv.json" },
            { displayname: "Hummingbird", desc: "Fighter", factory: "airfac", json: "/pa/units/air/fighter/fighter.json" },
            { displayname: "Hornet", desc: "Advanced Bomber", factory: "aafac", json: "/pa/units/air/bomber_adv/bomber_adv.json" },
            { displayname: "Bluebottle", desc: "Destroyer", factory: "nfac", json: "/pa/units/sea/destroyer/destroyer.json" },
            { displayname: "Leviathan", desc: "Advanced Destroyer", factory: "anfac", json: "/pa/units/sea/battleship/battleship.json" },
            { displayname: "Avenger", desc: "Orbital Fighter", factory: "ofac", json: "/pa/units/orbital/orbital_fighter/orbital_fighter.json" }
        ];
        hotbuildglobal.hotbuild4s = [
            { displayname: "Advanced Vehicle Factory", desc: "Advanced Vehicle Factory", json: "/pa/units/land/vehicle_factory_adv/vehicle_factory_adv.json" },
            { displayname: "Advanced Bot Factory", desc: "Advanced Bot Factory", json: "/pa/units/land/bot_factory_adv/bot_factory_adv.json" },
            { displayname: "Spinner", desc: "AA Tank", factory: "vecfac", json: "/pa/units/land/aa_missile_vehicle/aa_missile_vehicle.json" },
            { displayname: "Narwhal", desc: "AA Frigate", factory: "nfac", json: "/pa/units/sea/frigate/frigate.json" },
            { displayname: "Barracuda", desc: "Nuclear Sub", factory: "anfac", json: "/pa/units/sea/nuclear_sub/nuclear_sub.json" },
            { displayname: "Bumblebee", desc: "Bomber", factory: "airfac", json: "/pa/units/air/bomber/bomber.json" },
            { displayname: "Astraeus", desc: "Orbital Lander", factory: "ofac", json: "/pa/units/orbital/orbital_lander/orbital_lander.json" }
        ];
        hotbuildglobal.hotbuild5s = [
            { displayname: "Advanced Energy Plant", desc: "Advanced Energy Plant", json: "/pa/units/land/energy_plant_adv/energy_plant_adv.json" },
            { displayname: "Energy Plant", desc: "Energy Plant", json: "/pa/units/land/energy_plant/energy_plant.json" },
            { displayname: "Solar Array", desc: "Solar Panel Satellite", factory: "ofac", json: "/pa/units/orbital/solar_array/solar_array.json" }
        ];
        hotbuildglobal.hotbuild6s = [
            { displayname: "Adv Metal Extractor", desc: "Advanced Metal Extractor", json: "/pa/units/land/metal_extractor_adv/metal_extractor_adv.json" },
            { displayname: "Metal Extractor", desc: "Metal Extractor", json: "/pa/units/land/metal_extractor/metal_extractor.json" }
        ];
        hotbuildglobal.hotbuild7s = [
            { displayname: "Advanced Laser Defense Tower", desc: "Triple Barrel Laser Tower", json: "/pa/units/land/laser_defense_adv/laser_defense_adv.json" },
            { displayname: "Laser Defense Tower", desc: "Dual Barrel Laser Tower", json: "/pa/units/land/laser_defense/laser_defense.json" },
            { displayname: "Single Laser Defense Tower", desc: "Single Barrel Laser Tower", json: "/pa/units/land/laser_defense_single/laser_defense_single.json" }
        ];
        hotbuildglobal.hotbuild8s = [
            { displayname: "Missile Defense Tower", desc: "Air Defense", json: "/pa/units/land/air_defense/air_defense.json" },
            { displayname: "Land Barrier", desc: "Wall", json: "/pa/units/land/land_barrier/land_barrier.json" }
        ];
        hotbuildglobal.hotbuild9s = [
			{ displayname: "Catapult", desc: "Tactical Missile Launcher", json: "/pa/units/land/tactical_missle_launcher/tactical_missle_launcher.json" },
            { displayname: "Holkins", desc: "Long Range Artillery", json: "/pa/units/land/artillery_long/artillery_long.json" },
            { displayname: "Pelter", desc: "Short Range Artillery", json: "/pa/units/land/artillery_short/artillery_short.json" }
        ];
        hotbuildglobal.hotbuild10s = [
            { displayname: "Energy Storage", desc: "Energy Storage", json: "/pa/units/land/energy_storage/energy_storage.json" },
            { displayname: "Metal Storage", desc: "Metal Storage", json: "/pa/units/land/metal_storage/metal_storage.json" }
        ];

        hotbuildglobalkey.hotbuild1s = 'w';
        hotbuildglobalkey.hotbuild2s = 'e';
        hotbuildglobalkey.hotbuild3s = 'r';
        hotbuildglobalkey.hotbuild4s = 't';
        hotbuildglobalkey.hotbuild5s = 'f';
        hotbuildglobalkey.hotbuild6s = 's';
        hotbuildglobalkey.hotbuild7s = 'x';
        hotbuildglobalkey.hotbuild8s = 'c';
        hotbuildglobalkey.hotbuild9s = 'v';
        hotbuildglobalkey.hotbuild10s = 'd';

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
        default_keybinds.hotbuild['select commie'] = 'c';
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
        for (i = 1; i < 21; i++)
        {
            eval("hotbuildglobal.hotbuild" + i + "s = []") ;
            eval("default_keybinds.hotbuild.hotbuild" + i + "= ''");
            eval("hotbuildglobalkey.hotbuild" + i + "s = ''");
        }
        hotbuildglobal.hotbuild1s = [
            { displayname: "Vehicle Factory", desc: "Vehicle Factory", json: "/pa/units/land/vehicle_factory/vehicle_factory.json" },
            { displayname: "Bot Factory", desc: "Bot Factory", json: "/pa/units/land/bot_factory/bot_factory.json" },
            { displayname: "Skitter", desc: "Land Scout", factory: "vecfac", json: "/pa/units/land/land_scout/land_scout.json" },
            { displayname: "Firefly", desc: "Air Scout", factory: "airfac", json: "/pa/units/air/air_scout/air_scout.json" }
        ];
        hotbuildglobal.hotbuild2s = [
			{ displayname: "Advanced Air Factory", desc: "Advanced Air Factory", json: "/pa/units/air/air_factory_adv/air_factory_adv.json" },
            { displayname: "Advanced Naval Factory", desc: "Advanced Naval Factory", json: "/pa/units/sea/naval_factory_adv/naval_factory_adv.json" },
            { displayname: "Air Factory", desc: "Air Factory", json: "/pa/units/air/air_factory/air_factory.json" },
            { displayname: "Naval Factory", desc: "Naval Factory", json: "/pa/units/sea/naval_factory/naval_factory.json" },
            { displayname: "Orbital Launcher", desc: "Orbital Launcher", json: "/pa/units/orbital/orbital_launcher/orbital_launcher.json" },
            { displayname: "Sheller", desc: "Artillery Tank", factory: "avecfac", json: "/pa/units/land/tank_heavy_mortar/tank_heavy_mortar.json" },
            { displayname: "Dolphin", desc: "Attack Sub", factory: "nfac", json: "/pa/units/sea/attack_sub/attack_sub.json" },
            { displayname: "Stingray", desc: "Missile Ship", factory: "anfac", json: "/pa/units/sea/missile_ship/missile_ship.json" },
            { displayname: "SXX-1304 Laser Platform", desc: "Mining Laser", factory: "ofac", json: "/pa/units/orbital/orbital_laser/orbital_laser.json" }
        ];
        hotbuildglobal.hotbuild3s = [
            { displayname: "Advanced Radar", desc: "Advanced Radar", json: "/pa/units/land/radar_adv/radar_adv.json" },
			{ displayname: "Radar", desc: "Radar", json: "/pa/units/land/radar/radar.json" },
			{ displayname: "Hummingbird", desc: "Fighter", factory: "airfac", json: "/pa/units/air/fighter/fighter.json" },
            { displayname: "Peregrine", desc: "Advanced Fighter", factory: "aafac", json: "/pa/units/air/fighter_adv/fighter_adv.json" },
            { displayname: "Spinner", desc: "AA Tank", factory: "vecfac", json: "/pa/units/land/aa_missile_vehicle/aa_missile_vehicle.json" },
			{ displayname: "Stinger", desc: "AA Bot", factory: "botfac", json: "/pa/units/land/bot_aa/bot_aa.json" },
            { displayname: "Narwhal", desc: "AA Frigate", factory: "nfac", json: "/pa/units/sea/frigate/frigate.json" }
        ];
        hotbuildglobal.hotbuild4s = [
            { displayname: "Advanced Vehicle Factory", desc: "Advanced Vehicle Factory", json: "/pa/units/land/vehicle_factory_adv/vehicle_factory_adv.json" },
            { displayname: "Advanced Bot Factory", desc: "Advanced Bot Factory", json: "/pa/units/land/bot_factory_adv/bot_factory_adv.json" },
            { displayname: "Barracuda", desc: "Nuclear Sub", factory: "anfac", json: "/pa/units/sea/nuclear_sub/nuclear_sub.json" },
            { displayname: "Astraeus", desc: "Orbital Lander", factory: "ofac", json: "/pa/units/orbital/orbital_lander/orbital_lander.json" }
        ];
        hotbuildglobal.hotbuild5s = [
            { displayname: "Advanced Energy Plant", desc: "Advanced Energy Plant", json: "/pa/units/land/energy_plant_adv/energy_plant_adv.json" },
            { displayname: "Energy Plant", desc: "Energy Plant", json: "/pa/units/land/energy_plant/energy_plant.json" },
            { displayname: "Dox", desc: "Assault Bot", factory: "botfac", json: "/pa/units/land/assault_bot/assault_bot.json" },
            { displayname: "Slammer", desc: "Advanced Assault Bot", factory: "abotfac", json: "/pa/units/land/assault_bot_adv/assault_bot_adv.json" },
            { displayname: "Ant", desc: "Tank", factory: "vecfac", json: "/pa/units/land/tank_light_laser/tank_light_laser.json" },
            { displayname: "Leveler", desc: "Advanced Tank", factory: "avecfac", json: "/pa/units/land/tank_laser_adv/tank_laser_adv.json" },
            { displayname: "Bumblebee", desc: "Bomber", factory: "airfac", json: "/pa/units/air/bomber/bomber.json" },
            { displayname: "Hornet", desc: "Advanced Bomber", factory: "aafac", json: "/pa/units/air/bomber_adv/bomber_adv.json" },
            { displayname: "Bluebottle", desc: "Destroyer", factory: "nfac", json: "/pa/units/sea/destroyer/destroyer.json" },
            { displayname: "Leviathan", desc: "Advanced Destroyer", factory: "anfac", json: "/pa/units/sea/battleship/battleship.json" },
            { displayname: "Avenger", desc: "Orbital Fighter", factory: "ofac", json: "/pa/units/orbital/orbital_fighter/orbital_fighter.json" }
        ];
        hotbuildglobal.hotbuild6s = [
            { displayname: "Adv Metal Extractor", desc: "Advanced Metal Extractor", json: "/pa/units/land/metal_extractor_adv/metal_extractor_adv.json" },
            { displayname: "Metal Extractor", desc: "Metal Extractor", json: "/pa/units/land/metal_extractor/metal_extractor.json" },
            { displayname: "Advanced Fabrication Bot", desc: "Advanced Fabrication Bot", factory: "abotfac", json: "/pa/units/land/fabrication_bot_adv/fabrication_bot_adv.json" },
            { displayname: "Fabrication Bot", desc: "Fabrication Bot", factory: "botfac", json: "/pa/units/land/fabrication_bot/fabrication_bot.json" },
            { displayname: "Advanced Fabrication Vehicle", desc: "Advanced Fabrication Vehicle", factory: "avecfac", json: "/pa/units/land/fabrication_vehicle_adv/fabrication_vehicle_adv.json" },
            { displayname: "Fabrication Vehicle", desc: "Fabrication Vehicle", factory: "vecfac", json: "/pa/units/land/fabrication_vehicle/fabrication_vehicle.json" },
            { displayname: "Advanced Fab Aircraft", desc: "Advanced Fab Aircraft", factory: "aafac", json: "/pa/units/air/fabrication_aircraft_adv/fabrication_aircraft_adv.json" },
            { displayname: "Fabrication Aircraft", desc: "Fabrication Aircraft", factory: "airfac", json: "/pa/units/air/fabrication_aircraft/fabrication_aircraft.json" },
            { displayname: "Advanced Fabrication Ship", desc: "Advanced Fabrication Ship", factory: "anfac", json: "/pa/units/sea/fabrication_ship_adv/fabrication_ship_adv.json" },
            { displayname: "Fabrication Ship", desc: "Fabrication Ship", factory: "nfac", json: "/pa/units/sea/fabrication_ship/fabrication_ship.json" }
        ];
        hotbuildglobal.hotbuild7s = [
            { displayname: "Advanced Laser Defense Tower", desc: "Triple Barrel Laser Tower", json: "/pa/units/land/laser_defense_adv/laser_defense_adv.json" },
            { displayname: "Laser Defense Tower", desc: "Dual Barrel Laser Tower", json: "/pa/units/land/laser_defense/laser_defense.json" },
            { displayname: "Single Laser Defense Tower", desc: "Single Barrel Laser Tower", json: "/pa/units/land/laser_defense_single/laser_defense_single.json" }
        ];
        hotbuildglobal.hotbuild8s = [
            { displayname: "Missile Defense Tower", desc: "Air Defense", json: "/pa/units/land/air_defense/air_defense.json" },
            { displayname: "Land Barrier", desc: "Wall", json: "/pa/units/land/land_barrier/land_barrier.json" }
        ];
        hotbuildglobal.hotbuild9s = [
            { displayname: "Pelter", desc: "Short Range Artillery", json: "/pa/units/land/artillery_short/artillery_short.json" },
            { displayname: "Catapult", desc: "Tactical Missile Launcher", json: "/pa/units/land/tactical_missle_launcher/tactical_missle_launcher.json" },
            { displayname: "Holkins", desc: "Long Range Artillery", json: "/pa/units/land/artillery_long/artillery_long.json" }
        ];
        hotbuildglobal.hotbuild10s = [
            { displayname: "Energy Storage", desc: "Energy Storage", json: "/pa/units/land/energy_storage/energy_storage.json" },
            { displayname: "Metal Storage", desc: "Metal Storage", json: "/pa/units/land/metal_storage/metal_storage.json" },
            { displayname: "Nuclear Missile Launcher", desc:"Nuclear Missile Launcher", json: "/pa/units/land/nuke_launcher/nuke_launcher.json" },
            { displayname: "Anti-Nuke Launcher", desc:"Anti-Nuke Launcher", json: "/pa/units/land/anti_nuke_launcher/anti_nuke_launcher.json" },
        ];
        
        hotbuildglobalkey.hotbuild1s = 'f';
        hotbuildglobalkey.hotbuild2s = 'g';
        hotbuildglobalkey.hotbuild3s = 't';
        hotbuildglobalkey.hotbuild4s = 'h';
        hotbuildglobalkey.hotbuild5s = 'r';
        hotbuildglobalkey.hotbuild6s = 'e';
        hotbuildglobalkey.hotbuild7s = 'x';
        hotbuildglobalkey.hotbuild8s = 'c';
        hotbuildglobalkey.hotbuild9s = 'v';
        hotbuildglobalkey.hotbuild10s = 'z';

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

var hbuisettings = new HotBuildSettingsViewModel();
$("#game_settings").children(":first").append("<li class='game_settings'>" +
            "<a href='#tab_hotbuildprefs'>HOTBUILD</a>" +
        "</li>");
$("#game_settings").append('<div class="div_settings" id="tab_hotbuildprefs"></div>');
loadHotBuildSettings($('#tab_hotbuildprefs'), '../../mods/hotbuild2/settings/hotbuild_settings.html', hbuisettings);

