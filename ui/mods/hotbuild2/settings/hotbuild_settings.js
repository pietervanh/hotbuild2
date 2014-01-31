//IntelliSense for WebMatrix /VS
/// <reference path="../.vsdoc/jquery-1.9.1-vsdoc.js" /> 
/// <reference path="../.vsdoc/knockout-2.2.1.debug.js" />
/// <reference path="../.vsdoc/lodash-2.4.1.js" />

var hbunitInfoParser =
	(typeof hbunitInfoParser === "undefined") ?
	(function () {
	    var _coherentHost = "coui://";
	    var _unitListPath = _coherentHost + "pa/units/unit_list.json";

	    // function parses all units, following unit bases recursively
	    // onComplete is given the finished map of spec => custom piece of data per spec
	    // dataGetter gets the data from the unit json, it expects one parameter: the parsed unit json
	    // datamerger expected two parameters, the data further up the definition tree of the unit and further down
	    // examples see the next 2 functions after this
	    var _loadUnitData = function (onComplete, dataGetter) {
	        var resultTypeMapping = [];
	        var spawnedUnitCalls = 0;
	        $.getJSON(_unitListPath, function (data) {
	            var units = data.units;
	            var finishedAll = false;

	            function readUnitDataFromFile(file, callback) {
	                $.getJSON(file, function (unit) {
	                    var freshDataFromUnit = dataGetter(unit);
	                    //forget about base specs they are not needed and no properties are being overriden of inherited from basespecs for hotbuild
	                    if (freshDataFromUnit != undefined) {
	                        callback(freshDataFromUnit);
	                    }
	                    spawnedUnitCalls--;
	                    if (spawnedUnitCalls === 0) {
	                        onComplete(resultTypeMapping);
	                    }
	                });
	            }

	            spawnedUnitCalls = units.length;
	            function processUnitPath(unitPath) {
	                readUnitDataFromFile(_coherentHost + unitPath, function (unitData) {
	                    var unitresult = { 'json': unitPath };
	                    for (var data in unitData) {
	                        unitresult[data] = unitData[data];
	                    }
	                    resultTypeMapping.push(unitresult);
	                });
	            }
	            for (var i = 0; i < units.length; i++) {
	                processUnitPath(units[i]);
	            }
	        });
	    };


	    //creates a map of all unit information to their display name
	    var _loadUnits = function (onComplete) {
	        _loadUnitData(onComplete, function (unit) {
	            var result = {};
	            result['displayname'] = unit.display_name;
	            result['desc'] = unit.description;
	            result['unit_types'] = unit.unit_types;
	            result['buildable_types'] = unit.buildable_types;
	            result['display_group'] = unit.display_group;

	            result.description !== undefined ? result.description : 'no description';
	            result.display_name !== undefined ? result.displayname : 'no name';
	            result.factory = '';
	            return result;
	        })
	    };

	    return {
	        loadUnitData: _loadUnitData,
	        loadUnits: _loadUnits
	    };
	}()) : hbunitInfoParser;

var hotbuildsettings = (function () {

    function HotBuildSettingsViewModel(hbglobal, hbglobalkey) {
        var self = this;
        self.hotbuildglobal = ko.observable(hbglobal).extend({ notify: 'always' });;
        self.hotbuildglobalkey = ko.observable(hbglobalkey);
        self.cleanhotbuildglobal = ko.observable(hbglobal);
        self.cleanhotbuildglobalkey = ko.observable(hbglobalkey);
        self.selectedhotbuild = ko.observableArray([]);
        self.filteredunits = ko.observableArray([]);
        self.units = ko.observableArray([]);
        hbunitInfoParser.loadUnits(function (results) {
            var filteredresults = [];
            var filteredunits = [];
            var filteredbuildings = [];
            var fabbers = [];
            var factories = [];
            //first filter
            for (var i = 0; i < results.length; i++) {
                if (!_.contains(results[i].unit_types, "UNITTYPE_NoBuild") && !_.contains(results[i].unit_types, "UNITTYPE_Debug") && results[i].unit_types !== undefined) {
                    //fixes
                    switch (results[i].json) {
                        case "/pa/units/land/nuke_launcher/nuke_launcher_ammo.json":
                            results[i].desc = "Nuclear Missile Ammo";
                            results[i].displayname = "Nuclear Missile";
                            results[i].display_group = 'ammo';
                            break;
                        case "/pa/units/land/anti_nuke_launcher/anti_nuke_launcher_ammo.json":
                            results[i].desc = "Anti-Nuclear Missile Ammo";
                            results[i].displayname = "Anti-Nuclear Missile";
                            results[i].display_group = 'ammo';
                            break;
                        case "/pa/units/air/gunship/gunship.json":
                            results[i].desc = "Gunship";
                            results[i].displayname = "Shoots Stuff from Air";
                            results[i].display_group = 60;
                    }
                    if (_.contains(results[i].unit_types, 'UNITTYPE_Mobile')) {
                        if (_.contains(results[i].unit_types, 'UNITTYPE_Basic')) {
                            _.contains(results[i].unit_types, 'UNITTYPE_Bot') ? results[i].factory = 'botfac' : '';
                            _.contains(results[i].unit_types, 'UNITTYPE_Tank') ? results[i].factory = 'vecfac' : '';
                            _.contains(results[i].unit_types, 'UNITTYPE_Air') ? results[i].factory = 'afac' : '';
                            _.contains(results[i].unit_types, 'UNITTYPE_Naval') ? results[i].factory = 'nfac' : '';
                        }
                        else {
                            _.contains(results[i].unit_types, 'UNITTYPE_Bot') ? results[i].factory = 'abotfac' : '';
                            _.contains(results[i].unit_types, 'UNITTYPE_Tank') ? results[i].factory = 'avecfac' : '';
                            _.contains(results[i].unit_types, 'UNITTYPE_Air') ? results[i].factory = 'aafac' : '';
                            _.contains(results[i].unit_types, 'UNITTYPE_Naval') ? results[i].factory = 'anfac' : '';
                        }
                        //Orbital is changing rapidly so hacky fixes here
                        //Orbital is changing rapidly so hacky fixes here
                        if (results[i].json === "/pa/units/orbital/orbital_fabrication_bot/orbital_fabrication_bot.json") {
                            results[i].factory = 'ofac';
                        }
                        if (results[i].json === "/pa/units/orbital/defense_sattelite/defense_satellite.json") {
                            results[i].factory = 'ofac';
                        }
                        if (results[i].json === "/pa/units/orbital/orbital_lander/orbital_lander.json") {
                            results[i].factory = 'ofac';
                        }
                        if (results[i].json === "/pa/units/orbital/radar_satellite/radar_satellite.json") {
                            results[i].factory = 'ofac';
                        }
                    }
                    var start = /[^\/]*$/;  // ^ : start , \/ : '/', $ : end // as wildcard: /*.json 
                    var end = /[.]json$/;
                    results[i].image = '../live_game/img/build_bar/units/' + results[i].json.substring(results[i].json.search(start), results[i].json.search(end)) + '.png';
                    filteredresults.push(results[i]);
                }
            }
            //second filter is based on buildable_types
            for (var j = 0; j < filteredresults.length; j++) {
                if (!_.contains(filteredresults[j].unit_types, "UNITTYPE_Structure") &&
                    (_.contains(filteredresults[j].unit_types, "UNITTYPE_FactoryBuild") || _.contains(filteredresults[j].unit_types, "UNITTYPE_FabOrbBuild") || _.contains(filteredresults[j].unit_types, "UNITTYPE_CombatFabBuild"))) {
                    filteredunits.push(filteredresults[j]);

                }
            }
            for (var j = 0; j < filteredresults.length; j++) {
                if (_.contains(filteredresults[j].unit_types, "UNITTYPE_Structure") &&
                    (_.contains(filteredresults[j].unit_types, "UNITTYPE_FabBuild") || _.contains(filteredresults[j].unit_types, "UNITTYPE_FabAdvBuild") ||
                    _.contains(filteredresults[j].unit_types, "UNITTYPE_Defense") || _.contains(filteredresults[j].unit_types, "UNITTYPE_Recon"))
                    || (_.contains(filteredresults[j].unit_types, "UNITTYPE_Advanced") && _.contains(filteredresults[j].unit_types, "UNITTYPE_Factory"))) {
                    filteredbuildings.push(filteredresults[j]);
                }
            }

            filteredresults = [];
            filteredbuildings = _.sortBy(filteredbuildings, 'display_group');
            filteredresults = filteredresults.concat(filteredbuildings, filteredunits);
            self.filteredunits(filteredbuildings); //set standard on buildings
            self.units(filteredresults);
            updateExistingSettings();
        });
        function updateExistingSettings() {
            //now compare / update the existing hotbuildglobal data so it's always up 2 date
            for (var hbkey in self.hotbuildglobal()) {
                //if(_.contains(self.units(),hb.json))
                for (var i = 0; i < self.hotbuildglobal()[hbkey].length; i++) {
                    var match = _.find(self.units(), { 'json': self.hotbuildglobal()[hbkey][i].json });
                    self.hotbuildglobal()[hbkey][i] = match;
                }
                var goodstuff = [];
                for (var i = 0; i < self.hotbuildglobal()[hbkey].length; i++) {
                    if (self.hotbuildglobal()[hbkey][i] !== undefined) {
                        goodstuff.push(self.hotbuildglobal()[hbkey][i]);
                    }
                }
                self.hotbuildglobal()[hbkey] = goodstuff;

            }
        }
        self.unitbuildfilter = ko.observable(true);
        self.unitbuildfilter.subscribe(function (value) {
            self.activeSubFilters("All");
            if (self.unitbuildfilter()) {
                self.filters(["All", "Economy", "Factory", "Defense", "Recon"])
            }
            else {
                self.filters(["All", "Land", "Air", "Naval", "Orbital"])
            }
            self.filterunits();
        });
        self.toggleTopFilter = function (buildings) {
            self.unitbuildfilter(buildings);
        };
        self.filters = ko.observableArray(["All", "Economy", "Factory", "Defense", "Recon"]);
        self.activeSubFilters = ko.observable("All");
        self.activeSubFilters.subscribe(function (value) {
            self.filterunits();
        });
        self.addFilter = function (filter) {
            self.activeSubFilters(filter);
        };
        self.filterunits = function () {
            self.filteredunits([]);
            var hassubgroup = false;
            if (self.unitbuildfilter()) {
                if (self.activeSubFilters() !== 'All') {
                    hassubgroup = true;
                }
                //check subfilters for buildings
                for (var i = 0; i < self.units().length; i++) {
                    var buildingadded = false;
                    if (self.units()[i].factory === "") {
                        if (self.activeSubFilters() === 'Economy' && _.contains(self.units()[i].unit_types, "UNITTYPE_Economy")) {
                            self.filteredunits.push(self.units()[i]);
                            buildingadded = true;
                        }
                        if (self.activeSubFilters() === 'Factory' && _.contains(self.units()[i].unit_types, "UNITTYPE_Factory")) {
                            self.filteredunits.push(self.units()[i]);
                            buildingadded = true;
                        }
                        if (self.activeSubFilters() === 'Defense' && !buildingadded && _.contains(self.units()[i].unit_types, "UNITTYPE_Defense")) {
                            self.filteredunits.push(self.units()[i]);
                            buildingadded = true;
                        }
                        if (self.activeSubFilters() === 'Recon' && !buildingadded && _.contains(self.units()[i].unit_types, "UNITTYPE_Recon")) {
                            self.filteredunits.push(self.units()[i]);
                            buildingadded = true;
                        }
                        if (!buildingadded && !hassubgroup) {
                            self.filteredunits.push(self.units()[i]);
                        }
                    }
                }
            }
            else {
                hassubgroup = false;
                if (self.activeSubFilters() !== 'All') {
                    hassubgroup = true;
                }
                //check subfilters for units
                for (var i = 0; i < self.units().length; i++) {
                    var unitadded = false;
                    if (self.units()[i].factory !== "") {
                        if (self.activeSubFilters() === 'Land' && _.contains(self.units()[i].unit_types, "UNITTYPE_Land")) {
                            self.filteredunits.push(self.units()[i]);
                            unitadded = true;
                        }
                        if (self.activeSubFilters() === 'Air' && !unitadded && _.contains(self.units()[i].unit_types, "UNITTYPE_Air")) {
                            self.filteredunits.push(self.units()[i]);
                            unitadded = true;
                        }
                        if (self.activeSubFilters() === 'Naval' && !unitadded && _.contains(self.units()[i].unit_types, "UNITTYPE_Naval")) {
                            self.filteredunits.push(self.units()[i]);
                            unitadded = true;
                        }
                        if (self.activeSubFilters() === 'Orbital' && !unitadded && _.contains(self.units()[i].unit_types, "UNITTYPE_Orbital")) {
                            self.filteredunits.push(self.units()[i]);
                            unitadded = true;
                        }
                        if (!unitadded && !hassubgroup) {
                            self.filteredunits.push(self.units()[i]);
                        }
                    }

                }
            }
        };

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
            console.log("keyboard key changed to " + value);

            var keyindex = _.indexOf(_.keys(_.invert(self.hotbuildglobalkey())), value);
            var hotbuildkey = _.keys(self.hotbuildglobalkey())[keyindex];
            if (hotbuildkey !== undefined) {
                self.selectedkeyinfo(hotbuildkey.substring(0, hotbuildkey.length - 1));
            }
            else {
                //find first unused hotbuildkey and select it 
                var lastindex = _.keys(self.hotbuildglobalkey()).length + 1;
                self.hotbuildglobalkey()['hotbuild' + lastindex + 's'] = value;
                self.hotbuildglobal()['hotbuild' + lastindex + 's'] = [];
                self.selectedkeyinfo('hotbuild' + lastindex);

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


        self.uberkeys = ko.computed(function () {
            var uberkeys = [];
            _.forEach(model.keybindGroups(), function (o) {
                _.forEach(o.keybinds(), function (k) {
                    uberkeys.push(k.binding());
                });
            });
            return uberkeys;
        });

        self.disabledkeys = ko.computed(function () {
            var diskeys = ['caps lock', 'shift', 'return'];
            if (model.camera_key_pan_style() === "WASD") {
                diskeys = diskeys.concat(['w', 'a', 's', 'd']);
            }
            return diskeys;
        });

        self.hotbuildkeys = ko.observableArray([]);

        self.hotbuildglobal.subscribe(function (value) {
            self.updatehotbuildkeys();
        });

        self.updatehotbuildkeys = function () {
            self.hotbuildkeys(_.keys(_.invert(self.hotbuildglobalkey())));
        }
        self.Save = function () {
            //do cleanup of empty props
            var viewmodelconfigkey = self.hotbuildglobalkey();
            var viewmodelconfig = self.hotbuildglobal();
            for (var hotkey in viewmodelconfigkey) {
                if (viewmodelconfig[hotkey].length === 0) {
                    delete viewmodelconfigkey[hotkey];
                    delete viewmodelconfig[hotkey];
                }
            }
            //create copy + rename props so they are back sequential
            var copyconfigkey = viewmodelconfigkey;
            var copyconfig = viewmodelconfig;
            viewmodelconfigkey = {};
            viewmodelconfig = {};
            //debugger;
            var nr = 1;
            for (var hotkey in copyconfigkey) {
                viewmodelconfigkey['hotbuild' + nr + 's'] = copyconfigkey[hotkey];
                viewmodelconfig['hotbuild' + nr + 's'] = [];
                for (var i = 0; i < copyconfig[hotkey].length; i++) {
                    viewmodelconfig['hotbuild' + nr + 's'].push({ 'json': copyconfig[hotkey][i].json });
                    //viewmodelconfig['hotbuild' + nr + 's'][i] = copyconfig[hotkey][i];
                }
                //viewmodelconfig['hotbuild' + nr + 's'].json = copyconfig[hotkey].json;
                nr++;
            }

            self.cleanhotbuildglobalkey(viewmodelconfigkey);
            self.cleanhotbuildglobal(viewmodelconfig);
            model.hotbuildconfig = self.cleanhotbuildglobal();
            model.hotbuildconfigkey = self.cleanhotbuildglobalkey();
        };



        self.swapKey = function () {
            swapto = $("#swapkey").val();

            if (self.keyboardkey() !== "" && swapto !== "") {
                if (self.keyboardkey() !== swapto) {
                    var swapposition;
                    var currentposition;
                    //find swap position
                    debugger;
                    for (var hotkey in self.hotbuildglobalkey()) {
                        if (self.hotbuildglobalkey()[hotkey] === swapto) {
                            swapposition = hotkey;
                            break;
                        }

                    }
                    //find current key position
                    for (var hotkey in self.hotbuildglobalkey()) {
                        if (self.hotbuildglobalkey()[hotkey] === self.keyboardkey()) {
                            currentposition = hotkey;
                            break;
                        }
                    }
                    if (swapposition !== undefined) {
                        self.hotbuildglobalkey()[currentposition] = swapto;
                        self.hotbuildglobalkey()[swapposition] = self.keyboardkey();
                    }
                    else {
                        self.hotbuildglobalkey()[currentposition] = swapto;
                    }
                    self.Save();
                }
            }
            self.updatehotbuildkeys();
            console.log(swapto);
            self.keyboardkey(swapto);

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
            self.importfromfile("/ui/mods/hotbuild2/defaults/ARROWS.json");
            model.camera_key_pan_style('ARROW');
            forgetFramePosition('hotbuild_info_frame');
        };

        self.ComunityDefaultsWASD = function () {
            model.camera_key_pan_style('WASD');
            forgetFramePosition('hotbuild_info_frame');
            self.importfromfile("/ui/mods/hotbuild2/defaults/WASD.json");
        };

        self.export = function () {
            console.log('export');
            var keyboardsettings = {};
            keyboardsettings.uber = {};
            for (var key in localStorage) {
                if (localStorage.hasOwnProperty(key) && key.indexOf('keybinding') === 0) {
                    keyboardsettings.uber[key] = localStorage[key];
                }
            }
            self.Save();
            keyboardsettings.hotbuildglobalkey = self.cleanhotbuildglobalkey();
            keyboardsettings.hotbuildglobal = self.cleanhotbuildglobal();
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
                updateExistingSettings();
                self.Save();
                self.keyboardkey();
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
                updateExistingSettings();
                self.Save();
                self.keyboardkey();
            });
        };

        self.showingImportExportDialog = ko.observable(false);

        self.showImportExportDialog = function () {
            self.showingImportExportDialog(true);
            $('#importexportDlg').dialog({
                width: 'auto',
                modal: true,
                buttons: {
                    "Import": function () { self.import(); },
                    "Export": function () { self.export(); }
                },
                close: function () {
                    self.showingImportExportDialog(false);
                }
            });
        };

        self.keyboardclickhandler = function () {
            var $this = $(this);
            var character = $this.html();
            if (!$this.hasClass('dis')) {
                if (!$this.hasClass('active')) {
                    self.keyboardkey(character.toLowerCase());
                }
            }
        };
    }


    var hotbuildglobal = {};
    var hotbuildglobalkey = {};

    var settings = decode(localStorage.settings);
    hotbuildglobal = settings.hotbuildconfig ? settings.hotbuildconfig : hotbuildglobal;
    hotbuildglobalkey = settings.hotbuildconfigkey ? settings.hotbuildconfigkey : hotbuildglobalkey;

    var hbuisettings = new HotBuildSettingsViewModel(hotbuildglobal, hotbuildglobalkey);
    var hotbuildsettings = {};
    hotbuildsettings.viewmodel = hbuisettings;
    hotbuildsettings.viewmodel.updatehotbuildkeys();


    return hotbuildsettings;

})();

(function () {

    function loadHotBuildSettings(element, url, model) {
        element.load(url, function () {
            console.log("Loading html " + url);
            ko.applyBindings(model, element.get(0));
            $("#keyboard li").bind("click dblclick", hotbuildsettings.viewmodel.keyboardclickhandler);
        });
    }

    model.oldSettingsBeforeHotbuild = model.settings;
    model.settings = ko.computed(function () {
        var newSettings = model.oldSettingsBeforeHotbuild();
        newSettings.hotbuildconfigkey = hotbuildsettings.viewmodel.cleanhotbuildglobalkey();
        newSettings.hotbuildconfig = hotbuildsettings.viewmodel.cleanhotbuildglobal();
        return newSettings;
    });

    model.addSetting_Text('Hotbuild Reset Time', 'hotbuild_reset_time', 'UI', 'Number', 2000, 'Hotbuild2');
    model.addSetting_DropDown('Hotbuild Show Key on BuildBar', 'hotbuild_show_key_on_buildbar', 'UI', ['ON', 'OFF'], 0, 'Hotbuild2');
    model.registerFrameSetting('hotbuild_info_frame', 'Hotbuild Preview', true);

    ko.bindingHandlers.sortable.beforeMove = function (arg) {
        if (hotbuildsettings.viewmodel.selectedkeyinfo() !== undefined) {
            if (arg.item.factory !== "") {
                var unitCheck = true;
                for (var i = 0; i < hotbuildsettings.viewmodel.selectedhotbuild().length; i++) {
                    if (hotbuildsettings.viewmodel.selectedhotbuild()[i].factory == arg.item.factory) {
                        unitCheck = false;
                        break;
                    }
                }
                if (!unitCheck) {
                    arg.cancelDrop = true;
                }
                return arg;
            }
        }
        else {
            arg.cancelDrop = true;
            return arg;
        }
    };

    ko.bindingHandlers.sortable.afterMove = function (arg) {
        for (var i = 0; i < hotbuildsettings.viewmodel.selectedhotbuild().length; i++) {
            hotbuildsettings.viewmodel.selectedhotbuild()[i] = ko.toJS(hotbuildsettings.viewmodel.selectedhotbuild()[i]);
        }
        hotbuildsettings.viewmodel.filterunits(); // should really clone eh
        hotbuildsettings.viewmodel.Save();
        hotbuildsettings.viewmodel.updatehotbuildkeys();

    };

    ko.bindingHandlers.colorhotbuildkeys = {
        update: function (element, valueAccessor, allBindings) {
            // First get the latest data that we're bound to
            var value = valueAccessor();
            // Next, whether or not the supplied model property is observable, get its current value
            var valueUnwrapped = ko.utils.unwrapObservable(value);
            $('#keyboard li').each(function (index) {
                if ($(this).hasClass('hbk')) {
                    $(this).removeClass('hbk');
                }
            });
            for (var i = 0; i < valueUnwrapped.length; i++) {
                $("#keyboard li").each(function (index) {
                    if ($(this).text() === valueUnwrapped[i]) {
                        if (!$(this).hasClass('hbk')) {
                            $(this).toggleClass('hbk');
                        }
                    }
                });
            }
        }
    };

    ko.bindingHandlers.coloruberkeys = {
        update: function (element, valueAccessor, allBindings) {
            // First get the latest data that we're bound to
            var value = valueAccessor();
            // Next, whether or not the supplied model property is observable, get its current value
            var valueUnwrapped = ko.utils.unwrapObservable(value);
            $('#keyboard li').each(function (index) {
                if ($(this).hasClass('uber')) {
                    $(this).removeClass('uber');
                }
            });
            for (var i = 0; i < valueUnwrapped.length; i++) {
                $("#keyboard li").each(function (index) {
                    if ($(this).text() === valueUnwrapped[i]) {
                        if (!$(this).hasClass('uber')) {
                            $(this).toggleClass('uber');
                        }
                    }
                });
            }
        }
    };

    ko.bindingHandlers.colordisabledkeys = {
        update: function (element, valueAccessor, allBindings) {
            // First get the latest data that we're bound to
            var value = valueAccessor();
            // Next, whether or not the supplied model property is observable, get its current value
            var valueUnwrapped = ko.utils.unwrapObservable(value);
            $('#keyboard li').each(function (index) {
                if ($(this).hasClass('dis')) {
                    $(this).removeClass('dis');
                }
            });
            for (var i = 0; i < valueUnwrapped.length; i++) {
                $("#keyboard li").each(function (index) {
                    if ($(this).text() === valueUnwrapped[i]) {
                        if (!$(this).hasClass('dis')) {
                            $(this).toggleClass('dis');
                        }
                    }
                });
            }
        }
    };

    ko.bindingHandlers.activekey = {
        update: function (element, valueAccessor, allBindings) {
            // First get the latest data that we're bound to
            var value = valueAccessor();
            // Next, whether or not the supplied model property is observable, get its current value
            var valueUnwrapped = ko.utils.unwrapObservable(value);
            $('#keyboard li').each(function (index) {
                if ($(this).hasClass('active')) {
                    $(this).css('box-shadow', '');
                    $(this).removeClass('active');
                }
            });
            $("#keyboard li").each(function (index) {
                if ($(this).text() === valueUnwrapped) {
                    var $this = $(this);
                    if (!$this.hasClass('active')) {
                        $this.addClass('active');
                        $this.css('box-shadow', '0px 0px 2px 2px rgba(0,255,255,.7)');
                        var $selectedButton = $this.clone();
                        //$selectedButton.removeClass('active');
                        $selectedButton.attr('id', 'kbselection');
                        $selectedButton.css({ 'box-shadow': '', 'border': 'rgba(0,255,255,1) solid thin', '-webkit-border-radius': '5px', 'text-transform': 'uppercase !important' });
                        $('#kbselection').replaceWith($selectedButton);
                        $('#kbselection').click(function () {
                            $('#changeKeyDlg').dialog({
                                height: 150,
                                width: 150,
                                modal: true,
                                buttons: {
                                    "Change Key": function () { hotbuildsettings.viewmodel.swapKey(); $(this).dialog("close"); }
                                },
                                close: function () {
                                }
                            });

                        });
                        return true;
                    }
                }
            });
        }
    };

    var $gamesettings = $("#game_settings");
    $gamesettings.children(":first").append("<li class='game_settings'>" +
                                            "<a href='#tab_hotbuildprefs'>HOTBUILD</a>" +
                                            "</li>");
    $gamesettings.append('<div class="div_settings" id="tab_hotbuildprefs"></div>');
    loadHotBuildSettings($('#tab_hotbuildprefs'), '../../mods/hotbuild2/settings/hotbuild_settings.html', hotbuildsettings.viewmodel);
})();
