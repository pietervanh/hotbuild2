//IntelliSense for WebMatrix /VS
/// <reference path="../.vsdoc/jquery-1.9.1-vsdoc.js" /> 
/// <reference path="../.vsdoc/knockout-2.2.1.debug.js" />

//model.addSetting_DropDown('Hotbuild Preview UI','hotbuild_preview_display','UI',['ON','OFF'],0);
model.addSetting_Text('Hotbuild Reset Time','hotbuild_reset_time','UI','Number',2000);
model.addSetting_Text('Hotbuild Requeue Amount','hotbuild_requeue_amount','UI','Number',50);
model.registerFrameSetting('hotbuild_info_frame', 'Hotbuild Preview', true);

model.oldSettingsBeforeHotbuild = model.settings;

model.settings = ko.computed(function () {
    var newSettings = model.oldSettingsBeforeHotbuild();
    newSettings.hotbuildconfig = hotbuildglobal;
    return newSettings;
});

function HotBuildSettingsViewModel()
{
    var self = this;
    self.keyinfos = ko.observableArray([
        {hbid:"hotbuild1s",info:hotbuildglobal["hotbuild1s"]},
        {hbid:"hotbuild2s",info:hotbuildglobal["hotbuild2s"]},       
        {hbid:"hotbuild3s",info:hotbuildglobal["hotbuild3s"]},
        {hbid:"hotbuild4s",info:hotbuildglobal["hotbuild4s"]},
        {hbid:"hotbuild5s",info:hotbuildglobal["hotbuild5s"]},
        {hbid:"hotbuild6s",info:hotbuildglobal["hotbuild6s"]},
        {hbid:"hotbuild7s",info:hotbuildglobal["hotbuild7s"]},
        {hbid:"hotbuild8s",info:hotbuildglobal["hotbuild8s"]},
        {hbid:"hotbuild9s",info:hotbuildglobal["hotbuild9s"]},
        {hbid:"hotbuild10s",info:hotbuildglobal["hotbuild10s"]},
    ]);
    self.selectedhotbuild = ko.observableArray([{displayname:"",json:""}]);


    //this.buildings = ko.observableArray(hotbuildgamemodel.unitSpecs());
    self.buildings = ko.observableArray([
                                         { displayname: "Bot Factory", json: "/pa/units/land/bot_factory/bot_factory.json" },
                                         { displayname: "Vehicule Factory", json: "/pa/units/land/vehicle_factory/vehicle_factory.json" },
                                         { displayname: "Air Factory", json: "/pa/units/air/air_factory/air_factory.json" },
                                         { displayname: "Advanced Vehicle Factory", json: "/pa/units/land/vehicle_factory_adv/vehicle_factory_adv.json" },
	                                     { displayname: "Advanced Bot Factory", json: "/pa/units/land/bot_factory_adv/bot_factory_adv.json" },
	                                     { displayname: "Advanced Air Factory", json: "/pa/units/air/air_factory_adv/air_factory_adv.json" },
                                         { displayname: "Metal Extractor", json: "/pa/units/land/metal_extractor/metal_extractor.json" },
                                         { displayname: "Adv Metal Extractor", json: "/pa/units/land/metal_extractor_adv/metal_extractor_adv.json" },
	                                     { displayname: "Energy Storage", json: "/pa/units/land/energy_storage/energy_storage.json" },
	                                     { displayname: "Metal Storage", json: "/pa/units/land/metal_storage/metal_storage.json" },
	                                     { displayname: "Catapult", json: "/pa/units/land/tactical_missle_launcher/tactical_missle_launcher.json" },
                                         { displayname: "Holkins", json: "/pa/units/land/artillery_long/artillery_long.json" },
                                         { displayname: "Pelter", json: "/pa/units/land/artillery_short/artillery_short.json" },
                                         { displayname: "Air Defense", json: "/pa/units/land/air_defense/air_defense.json" },
                                         { displayname: "Wall", json: "/pa/units/land/land_barrier/land_barrier.json" },
                                         { displayname: "Triple Barrel Laser Defense", json: "/pa/units/land/laser_defense_adv/laser_defense_adv.json" },
                                         { displayname: "Dual Barrel Laser Defense", json: "/pa/units/land/laser_defense/laser_defense.json" },
                                         { displayname: "Single Barrel Laser Defense", json: "/pa/units/land/laser_defense_single/laser_defense_single.json" },
                                         { displayname: "Advance Energy Plant", json: "/pa/units/land/energy_plant_adv/energy_plant_adv.json" },
                                         { displayname: "Energy Plant", json: "/pa/units/land/energy_plant/energy_plant.json" },
                                         { displayname: "Adanvced Radar", json: "/pa/units/land/radar_adv/radar_adv.json" },
	                                     { displayname: "Radar", json: "/pa/units/land/radar/radar.json" },
                                        ]);
	                                     self.units = ko.observableArray([
                                         { displayname: "Bot Fabber", factory: "botfac", json: "/pa/units/land/fabrication_bot/fabrication_bot.json" },
                                         { displayname: "AA Bot", factory: "botfac", json: "/pa/units/land/bot_aa/bot_aa.json" },
                                         { displayname: "Dox", factory: "botfac", json: "/pa/units/land/assault_bot/assault_bot.json" },
                                         { displayname: "Advanced Bot Fabber", factory: "abotfac", json: "/pa/units/land/fabrication_bot_adv/fabrication_bot_adv.json" },
                                         { displayname: "Slammer", factory: "abotfac", json: "/pa/units/land/assault_bot_adv/assault_bot_adv.json" },
                                         { displayname: "Vehicule Fabber", factory: "vecfac", json: "/pa/units/land/fabrication_vehicle/fabrication_vehicle.json" },
                                         { displayname: "Scout", factory: "vecfac", json: "/pa/units/land/land_scout/land_scout.json" },
                                         { displayname: "Ant", factory: "vecfac", json: "/pa/units/land/tank_light_laser/tank_light_laser.json" },
                                         { displayname: "Advanced Vehicle Fabber", factory: "avecfac", json: "/pa/units/land/fabrication_vehicle_adv/fabrication_vehicle_adv.json" },
                                         { displayname: "Leveler", factory: "avecfac", json: "/pa/units/land/tank_laser_adv/tank_laser_adv.json" },
                                         { displayname: "Fabrication Aircraft", factory: "airfac", json: "/pa/units/air/fabrication_aircraft/fabrication_aircraft.json" },
                                         { displayname: "Hummingbird", factory: "airfac", json: "/pa/units/air/fighter/fighter.json" },
                                         { displayname: "Advanced Fab Aircraft", factory: "aafac", json: "/pa/units/air/fabrication_aircraft_adv/fabrication_aircraft_adv.json" },
                                         { displayname: "Advanced Bomber", factory: "aafac", json: "/pa/units/air/bomber_adv/bomber_adv.json" },
                                         { displayname: "Destroyer", factory: "nfac", json: "/pa/units/sea/destroyer/destroyer.json" },
	                                     { displayname: "Battleship", factory: "nfac", json: "/pa/units/sea/battleship/battleship.json" },
                                        ]);
    self.selectedkeyinfo = ko.observable();
    self.selectKey = function () {
        self.selectedhotbuild(hotbuildglobal[self.selectedkeyinfo()]);
    };

    self.bindkey = ko.computed(function () {
        if (self.selectedkeyinfo() != undefined) {
            var hotbuildid = self.selectedkeyinfo();
            hotbuildid = hotbuildid.substr(0, hotbuildid.length - 1);
            return default_keybinds['hotbuild'][hotbuildid];
        }
    }, this);
    
    self.selectedbuilding = ko.observable();
    
    self.selectedunit = ko.observable();

    self.addBuilding = function () {
        self.selectedhotbuild.push(self.selectedbuilding());
    };
    self.addUnit = function () {
        //if(self.selectedhotbuild contains already a unit with the same factory ignore)
        var unitCheck = true;
        for(var i = 0; i < self.selectedhotbuild().length; i++)
        {
          if(self.selectedhotbuild()[i].factory == self.selectedunit().factory)
          {
            unitCheck = false;
            break;
          } 
        }
        if(unitCheck)
        {
          self.selectedhotbuild.push(self.selectedunit());
        }
    };

    self.remFromList = function (item) {
        self.selectedhotbuild.remove(item);
    };
    
    self.Save = function ()
    {
      hotbuildglobal[self.selectedkeyinfo()] =  self.selectedhotbuild();
      //save into settings
    };

}
//todo read the json files dynamically but we can't :(
var hbuisettings = new HotBuildSettingsViewModel();

$("#game_settings").children(":first").append("<li class='game_settings'>" +
                "<a href='#tab_hotbuildprefs'>HOTBUILD</a>" +
            "</li>");
$("#game_settings").append('<div class="div_settings" id="tab_hotbuildprefs" data-bind="with: hbuisettings" style="height: 400px; overflow: scroll; overflow-x:hidden;">' +
                '<h3>Work in Progress<h3/><p>Please give comments/ideas on the forum</p>' +
                'Select Hotbuild key: <select name="uihotbuildkey" data-bind="options: keyinfos, value: selectedkeyinfo, optionsText: \'hbid\', optionsValue: \'hbid\',optionsCaption: \'Select an key...\',click:$root.selectKey"></select>&nbsp;<span data-bind="text: bindkey"/><br/>' +
                'Add Building to key: <select name="uihotbuildbuilding" data-bind="options: buildings, value: selectedbuilding, optionsText:\'displayname\', optionsCaption: \'Select an Building...\'"></select>' +
                '<button id="hbuiaddbuilding" type="submit" data-bind="click_sound: \'default\', rollover_sound: \'default\',click:$root.addBuilding">Add</button></br>' +
                'Add Unit to key: <select name="uihotbuildunit" data-bind="options: units, value: selectedunit, optionsText:\'displayname\', optionsCaption: \'Select a unit...\'"></select>' +
                '<button id="hbuiaddunit" type="submit" data-bind="click_sound: \'default\', rollover_sound: \'default\',click:$root.addUnit">Add</button></br>' +
                '<hr>' +
                '<table class="tbl_hotbuildsui">' +
                '<thead><tr class="hotbuildsui_row_header"><th>Building/Unit</th><th>JSON</th><th>Sequence</th></tr></thead>' +
                '<tbody data-bind="foreach: selectedhotbuild">' +
                '<tr><td data-bind="text: displayname"></td><td data-bind="text: json"></td><td><button id="hbremovefromlist" type="submit" data-bind="click: $parent.remFromList">Del</button></td></tr>' +
                '</tbody>' +
                '</table>' +
                '<button id="hbuisave" type="submit" data-bind="click_sound: \'default\', rollover_sound: \'default\',click:$root.Save">Save</button>' +
            '</div>');

ko.applyBindings(hbuisettings, $('#tab_hotbuildprefs')[0]);
