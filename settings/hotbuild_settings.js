//IntelliSense for WebMatrix /VS
/// <reference path="../.vsdoc/jquery-1.9.1-vsdoc.js" /> 
/// <reference path="../.vsdoc/knockout-2.2.1.debug.js" />

//model.addSetting_DropDown('Hotbuild Preview UI','hotbuild_preview_display','UI',['ON','OFF'],0);
model.addSetting_Text('Hotbuild Reset Time','hotbuild_reset_time','UI','Number',2000);
model.addSetting_Text('Hotbuild Requeue Amount','hotbuild_requeue_amount','UI','Number',50);
model.registerFrameSetting('hotbuild_info_frame', 'Hotbuild Preview', true);


var hotbuilds1 = [
	'/pa/units/land/vehicle_factory/vehicle_factory.json',
	'/pa/units/land/bot_factory/bot_factory.json',
    '/pa/units/land/fabrication_bot/fabrication_bot.json',
	'/pa/units/land/fabrication_bot_adv/fabrication_bot_adv.json',
	'/pa/units/land/fabrication_vehicle/fabrication_vehicle.json',
	'/pa/units/land/fabrication_vehicle_adv/fabrication_vehicle_adv.json',
	'/pa/units/air/fabrication_aircraft/fabrication_aircraft.json',
	'/pa/units/air/fabrication_aircraft_adv/fabrication_aircraft_adv.json',
];
var hotbuilds2 = [
	'/pa/units/air/air_factory_adv/air_factory_adv.json',
	'/pa/units/sea/naval_factory_adv/naval_factory_adv.json',
	'/pa/units/air/air_factory/air_factory.json',
	'/pa/units/sea/naval_factory/naval_factory.json',
	'/pa/units/land/land_scout/land_scout.json',
	'/pa/units/air/air_scout/air_scout.json',
	'/pa/units/land/bot_aa/bot_aa.json',
	'/pa/units/land/tank_heavy_mortar/tank_heavy_mortar.json',
	'/pa/units/land/bot_artillery_adv/bot_artillery_adv.json',
	'/pa/units/air/fighter_adv/fighter_adv.json'
];


function HotBuildSettingsViewModel()
{
    this.keyinfos = ko.observableArray([
        {hbid:"hotbuilds1",info:hotbuilds1},
        {hbid:"hotbuilds2",info:hotbuilds2}
    ]);
    this.selectedhotbuild = ko.observableArray([""]);
    //this.buildings = ko.observableArray(hotbuildgamemodel.unitSpecs());
    this.buildings = ko.observableArray(["Bot Factory","Vehicule Factory"]);
    this.units = ko.observableArray(["Fabber","Dox","Ant"]);
    this.selectedkeyinfo = ko.observable();
    this.selectKey = function () {
        this.selectedhotbuild(eval(this.selectedkeyinfo()));
    };
    
    this.selectedbuilding = ko.observable();
    
    this.selectedunit = ko.observable();
    
    

    this.addBuilding = function () {
        this.selectedhotbuild.push(this.selectedbuilding());
    };
    this.addUnit = function () {
        this.selectedhotbuild.push(this.selectedunit());
    };

    this.remFromList = function (item) {
        this.selectedhotbuild.remove(item);
    };

}

var hbuisettings = new HotBuildSettingsViewModel();


$("#game_settings").children(":first").append("<li class='game_settings'>" +
                "<a href='#tab_hotbuildprefs'>HOTBUILD</a>" +
            "</li>");
$("#game_settings").append('<div class="div_settings" id="tab_hotbuildprefs" data-bind="with: hbuisettings" style="height: 400px; overflow: scroll; overflow-x:hidden;">' +
                '<h1>Work in Progress<h1/><br/>' +
                'Select Hotbuild key: <select name="uihotbuildkey" data-bind="options: keyinfos, value: selectedkeyinfo, optionsText: \'hbid\', optionsValue: \'hbid\',optionsCaption: \'Select an key...\',click:$root.selectKey"></select><br/>' +
                'Add Building to key: <select name="uihotbuildbuilding" data-bind="options: buildings, value: selectedbuilding ,optionsCaption: \'Select an Building...\'"></select>' +
                '<button id="hbuiaddbuilding" type="submit" data-bind="click_sound: \'default\', rollover_sound: \'default\',click:$root.addBuilding">Add</button></br>' +
                'Add Unit to key: <select name="uihotbuildunit" data-bind="options: units, value: selectedunit, optionsCaption: \'Select a unit...\'"></select>' +
                '<button id="hbuiaddunit" type="submit" data-bind="click_sound: \'default\', rollover_sound: \'default\',click:$root.addUnit">Add</button></br>' +
                '<hr>' +
                '<table cellspacing="2" cellpadding="2">' +
                '<thead><tr><th>Building/Unit</th><th>Sequence</th></tr></thead>' +
                '<tbody data-bind="foreach: selectedhotbuild">' +
                '<tr><td data-bind="text: $data"></td><td><button id="hbremovefromlist" type="submit" data-bind="click: $root.remFromList">Del</button></td></tr>' +
                '</tbody>' +
                '</table>' +
            '</div>');

ko.applyBindings(hbuisettings, $('#tab_hotbuildprefs')[0]);