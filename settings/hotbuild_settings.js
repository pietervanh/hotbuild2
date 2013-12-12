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
    this.keyinfos = ko.observableArray([""]);
    this.selectedkeyinfo = ko.observable();

    this.buildings = ko.observableArray([""]);

    this.units = ko.observableArray([""]);

    this.selectedhotbuild = ko.observableArray([""]);

}

var hbuisettings = new HotBuildSettingsViewModel();
hbuisettings.keyinfos([]);
hbuisettings.keyinfos.push({"hbid":"hotbuild1","info":hotbuilds1});
hbuisettings.keyinfos.push({"hbid":"hotbuild2","info":hotbuilds2});



$("#game_settings").children(":first").append("<li class='game_settings'>" +
                "<a href='#tab_hotbuildprefs'>HOTBUILD</a>" +
            "</li>");
$("#game_settings").append('<div class="div_settings" id="tab_hotbuildprefs" data-bind="with: hbuisettings" >' +
                '<h1>Work in Progress<h1/><br/>' +
                'Select Hotbuild key: <select name="uihotbuildkey" data-bind="options: keyinfos, value: selectedkeyinfo, optionsText: \'hbid\', optionsValue: \'hbid\',optionsCaption: \'Select an key...\'"></select><br/>' +
                'Add Building to key: <select name="uihotbuildbuilding" data-bind="options: buildings,optionsCaption: \'Select an Building...\'"></select>' +
                '<button id="hbuiaddbuilding" type="submit" data-bind="click_sound: \'default\', rollover_sound: \'default\'">Add</button></br>' +
                'Add Unit to key: <select name="uihotbuildunit" data-bind="options: units,optionsCaption: \'Select a unit...\'"></select>' +
                '<button id="hbuiaddunit" type="submit" data-bind="click_sound: \'default\', rollover_sound: \'default\'">Add</button></br>' +
                '<hr>' +
                '<table cellspacing="1" cellpadding="1"><thead><tr><td><b>Building/Unit</b></td><td><b>Sequence</b></td></tr></thead>' +
                '<tr><td>Vehicule Factory</td><td>Down</td>' +
                
                '<tr data-bind="foreach: selectedhotbuild"><td></td><td></td></tr>' +
                
                '<tr><td>Bot Factory</td><td>Up Down</td>' +
                '<tr><td>Vehicule Fabricator</td><td>Up Down</td>' +
                '<tr><td>Bot Fabricator</td><td>Up</td>' +
                '<table>' +
            '</div>');

ko.applyBindings(hbuisettings, $('#tab_hotbuildprefs')[0]);