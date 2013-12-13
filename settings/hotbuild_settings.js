//IntelliSense for WebMatrix /VS
/// <reference path="../.vsdoc/jquery-1.9.1-vsdoc.js" /> 
/// <reference path="../.vsdoc/knockout-2.2.1.debug.js" />

//model.addSetting_DropDown('Hotbuild Preview UI','hotbuild_preview_display','UI',['ON','OFF'],0);
model.addSetting_Text('Hotbuild Reset Time','hotbuild_reset_time','UI','Number',2000);
model.addSetting_Text('Hotbuild Requeue Amount','hotbuild_requeue_amount','UI','Number',50);
model.registerFrameSetting('hotbuild_info_frame', 'Hotbuild Preview', true);


var hotbuilds1 = [
        {displayname:"Vec Factory",json:"/pa/units/land/vehicle_factory/vehicle_factory.json"},
        {displayname:"Bot Factory",json:"/pa/units/land/bot_factory/bot_factory.json"},
        {displayname:"BotFabber",factory:"botfac",json:"/pa/units/land/fabrication_bot/fabrication_bot.json"},
        {displayname:"Adv BotFabber",factory:"advbotfac",json:"/pa/units/land/fabrication_bot_adv/fabrication_bot_adv.json"},
        {displayname:"VecFabber",factory:"vecfac",json:"/pa/units/land/fabrication_vehicle/fabrication_vehicle.json"},
        {displayname:"Adv VecFabber",factory:"vecfac",json:"/pa/units/land/fabrication_vehicle_adv/fabrication_vehicle_adv.json"},

];

hotbuildglobal[hotbuilds1] = hotbuilds1;

function HotBuildSettingsViewModel()
{
    var self = this;
    self.test = "test";
    self.keyinfos = ko.observableArray([
        {hbid:"hotbuilds1",info:hotbuildglobal[hotbuilds1]}
    ]);
    self.selectedhotbuild = ko.observableArray([{displayname:"Vec Factory",json:"/pa/units/land/vehicle_factory/vehicle_factory.json"}]);
    //this.buildings = ko.observableArray(hotbuildgamemodel.unitSpecs());
    self.buildings = ko.observableArray([
                                         {displayname:"Bot Factory",json:"/pa/units/land/bot_factory/bot_factory.json"},
                                         {displayname:"Vehicule Factory",json:"/pa/units/land/vehicle_factory/vehicle_factory.json"}
                                        ]);
    self.units = ko.observableArray([
                                     {displayname:"BotFabber",factory:"botfac",json:"/pa/units/land/fabrication_bot/fabrication_bot.json"},
                                     {displayname:"VecFabber",factory:"vecfac",json:"/pa/units/land/fabrication_vehicle/fabrication_vehicle.json"},
                                     {displayname:"AA Bot",factory:"botfac",json:"/pa/units/land/bot_aa/bot_aa.json"},
                                     {displayname:"Scout",facotry:"vecfac",json:"/pa/units/land/land_scout/land_scout.json"}
                                    ]);
    self.selectedkeyinfo = ko.observable();
    self.selectKey = function () {
        self.selectedhotbuild(hotbuildglobal[eval(self.selectedkeyinfo())]);
    };
    
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
      hotbuildglobal[eval(self.selectedkeyinfo())] =  self.selectedhotbuild();
    };

}

var hbuisettings = new HotBuildSettingsViewModel();

$("#game_settings").children(":first").append("<li class='game_settings'>" +
                "<a href='#tab_hotbuildprefs'>HOTBUILD</a>" +
            "</li>");
$("#game_settings").append('<div class="div_settings" id="tab_hotbuildprefs" data-bind="with: hbuisettings" style="height: 400px; overflow: scroll; overflow-x:hidden;">' +
                '<h1>Work in Progress<h1/><br/>' +
                'Select Hotbuild key: <select name="uihotbuildkey" data-bind="options: keyinfos, value: selectedkeyinfo, optionsText: \'hbid\', optionsValue: \'hbid\',optionsCaption: \'Select an key...\',click:$root.selectKey"></select><br/>' +
                'Add Building to key: <select name="uihotbuildbuilding" data-bind="options: buildings, value: selectedbuilding, optionsText:\'displayname\', optionsCaption: \'Select an Building...\'"></select>' +
                '<button id="hbuiaddbuilding" type="submit" data-bind="click_sound: \'default\', rollover_sound: \'default\',click:$root.addBuilding">Add</button></br>' +
                'Add Unit to key: <select name="uihotbuildunit" data-bind="options: units, value: selectedunit, optionsText:\'displayname\', optionsCaption: \'Select a unit...\'"></select>' +
                '<button id="hbuiaddunit" type="submit" data-bind="click_sound: \'default\', rollover_sound: \'default\',click:$root.addUnit">Add</button></br>' +
                '<hr>' +
                '<table cellspacing="2" cellpadding="2">' +
                '<thead><tr><th>Building/Unit</th><th>JSON</th><th>Sequence</th></tr></thead>' +
                '<tbody data-bind="foreach: selectedhotbuild">' +
                '<tr><td data-bind="text: displayname"></td><td data-bind="text: json"></td><td><button id="hbremovefromlist" type="submit" data-bind="click: $parent.remFromList">Del</button></td></tr>' +
                '</tbody>' +
                '</table>' +
                '<button id="hbuisave" type="submit" data-bind="click_sound: \'default\', rollover_sound: \'default\',click:$root.Save">Save</button>' +
            '</div>');

ko.applyBindings(hbuisettings, $('#tab_hotbuildprefs')[0]);
