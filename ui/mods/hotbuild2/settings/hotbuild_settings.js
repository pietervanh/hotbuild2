//IntelliSense for WebMatrix /VS
/// <reference path="../.vsdoc/jquery-1.9.1-vsdoc.js" />
/// <reference path="../.vsdoc/knockout-2.2.1.debug.js" />
/// <reference path="../.vsdoc/lodash-2.4.1.js" />
var hotbuildsettings = (function () {

    function HotBuildSettingsViewModel(hbglobal, hbglobalkey) {
        var self = this;
        self.hotbuildglobal = ko.observable(hbglobal).extend({ notify: 'always' });
        self.hotbuildglobalkey = ko.observable(hbglobalkey);
        self.cleanhotbuildglobal = ko.observable(hbglobal);
        self.cleanhotbuildglobalkey = ko.observable(hbglobalkey);
        self.selectedhotbuild = ko.observableArray([]);
        self.filteredunits = ko.observableArray([]);
        self.units = ko.observableArray([]);
        bif.registerBIFReadyCallback(function () {
            var start = /[^\/]*$/;  // ^ : start , \/ : '/', $ : end // as wildcard: /*.json
            var end = /[.]json$/;
            var filteredresults = [];
            var filteredunits = [];
            var filteredbuildings = [];
            var results = bif.getBuildableUnitIDs();
            for (var i = 0; i < results.length; i++) {
                var bifunit = bif.units[results[i]];
                var hotbuildunit = bifunit;
                hotbuildunit.json = hotbuildunit.path;
                //TEMP TRANSLATION FIX
                try{
                    hotbuildunit.displayname = hotbuildunit.display_name.slice(hotbuildunit.display_name.indexOf('):') + 2); 
                }
                catch(e){
                    hotbuildunit.displayname = hotbuildunit.display_name;
                    console.log("bad trans string : " + hotbuildunit.displayname);
                }
                try{
                    hotbuildunit.desc = hotbuildunit.description.slice(hotbuildunit.description.indexOf('):') + 2);
                }
                catch(e){
                    hotbuildunit.desc = hotbuildunit.description;
                    console.log("bad trans string : " + hotbuildunit.desc);
                }
                
                hotbuildunit.factory = "";
                //console.log(hotbuildunit.json);
                /*jshint -W030 */
                if (_.contains(hotbuildunit.unit_types, 'UNITTYPE_Mobile')) {
                    if (_.contains(hotbuildunit.unit_types, 'UNITTYPE_Basic')) {
                        _.contains(hotbuildunit.unit_types, 'UNITTYPE_Bot') ? hotbuildunit.factory = 'botfac' : '';
                        _.contains(hotbuildunit.unit_types, 'UNITTYPE_Tank') ? hotbuildunit.factory = 'vecfac' : '';
                        _.contains(hotbuildunit.unit_types, 'UNITTYPE_Air') ? hotbuildunit.factory = 'afac' : '';
                        _.contains(hotbuildunit.unit_types, 'UNITTYPE_Naval') ? hotbuildunit.factory = 'nfac' : '';
                    }
                    else {
                        _.contains(hotbuildunit.unit_types, 'UNITTYPE_Bot') ? hotbuildunit.factory = 'abotfac' : '';
                        _.contains(hotbuildunit.unit_types, 'UNITTYPE_Tank') ? hotbuildunit.factory = 'avecfac' : '';
                        _.contains(hotbuildunit.unit_types, 'UNITTYPE_Air') ? hotbuildunit.factory = 'aafac' : '';
                        _.contains(hotbuildunit.unit_types, 'UNITTYPE_Naval') ? hotbuildunit.factory = 'anfac' : '';
                    }
                    /*jshint +W030 */
                    //should change to bif is built by orbital launcher
                    //Orbital is changing rapidly so hacky fixes here
                    if (hotbuildunit.json === "/pa/units/orbital/orbital_fabrication_bot/orbital_fabrication_bot.json") {
                        hotbuildunit.factory = 'ofac';
                    }
                    if (hotbuildunit.json === "/pa/units/orbital/orbital_lander/orbital_lander.json") {
                        hotbuildunit.factory = 'ofac';
                    }
                    if (hotbuildunit.json === "/pa/units/orbital/orbital_fighter/orbital_fighter.json") {
                        hotbuildunit.factory = 'ofac';
                    }
                    if (hotbuildunit.json === "/pa/units/orbital/radar_satellite/radar_satellite.json") {
                        hotbuildunit.factory = 'ofac';
                    }
                }
                //console.log(hotbuildunit.buildPicture);
                hotbuildunit.image = hotbuildunit.buildPicture;
                filteredresults.push(hotbuildunit);

            }
            //hack for nuke and anti nuke ammo
            var nukeammo = {};
            nukeammo.json = "/pa/units/land/nuke_launcher/nuke_launcher_ammo.json";
            nukeammo.displayname = "Nuclear Missile";
            nukeammo.desc = "Creates Nuclear Explosion";
            nukeammo.factory = "nuke";
            nukeammo.unit_types = ['UNITTYPE_Air','UNITTYPE_Mobile','UNITTYPE_Orbital'];
            nukeammo.image = '../live_game/img/build_bar/units/' + nukeammo.json.substring(nukeammo.json.search(start), nukeammo.json.search(end)) + '.png';
            nukeammo.display_group = '1';
            filteredresults.push(nukeammo);
            var anukeammo = {};
            anukeammo.json = "/pa/units/land/anti_nuke_launcher/anti_nuke_launcher_ammo.json";
            anukeammo.displayname = "Anti Nuclear Missile";
            anukeammo.desc = "Intercepts Nuclear Missiles";
            anukeammo.factory = "antinuke";
            anukeammo.unit_types = ['UNITTYPE_Air','UNITTYPE_Mobile'];
            anukeammo.image = '../live_game/img/build_bar/units/' + anukeammo.json.substring(anukeammo.json.search(start), anukeammo.json.search(end)) + '.png';
            anukeammo.display_group = '1';
            filteredresults.push(anukeammo);

            for (var j = 0; j < filteredresults.length; j++) {
                if (!_.contains(filteredresults[j].unit_types, "UNITTYPE_Structure")){
                    filteredunits.push(filteredresults[j]);
                }
            }
            for (j = 0; j < filteredresults.length; j++) {
                if (_.contains(filteredresults[j].unit_types, "UNITTYPE_Structure")){
                    filteredbuildings.push(filteredresults[j]);
                }
            }

            filteredbuildings = _.sortBy(filteredbuildings, 'display_group');
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
                for (i = 0; i < self.hotbuildglobal()[hbkey].length; i++) {
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
            self.filters([]); //make empty to fix scrolling
            if (self.unitbuildfilter()) {
                self.filters(["All", "Economy", "Factory", "Defense", "Recon"]);
                if (self.activeSubFilters() !== 'All') {
                    //check subfilters for buildings
                    for (var i = 0; i < self.units().length; i++) {
                        if (self.units()[i].factory === "") {
                            if (self.activeSubFilters() === 'Economy' && _.contains(self.units()[i].unit_types, "UNITTYPE_Economy")) {
                                self.filteredunits.push(self.units()[i]);
                            }
                            if (self.activeSubFilters() === 'Factory' && _.contains(self.units()[i].unit_types, "UNITTYPE_Factory")) {
                                self.filteredunits.push(self.units()[i]);

                            }
                            if (self.activeSubFilters() === 'Defense' && _.contains(self.units()[i].unit_types, "UNITTYPE_Defense")) {
                                self.filteredunits.push(self.units()[i]);

                            }
                            if (self.activeSubFilters() === 'Recon' && _.contains(self.units()[i].unit_types, "UNITTYPE_Recon")) {
                                self.filteredunits.push(self.units()[i]);
                            }
                        }
                    }
                }
                else {
                    for (var j = 0; j < self.units().length; j++) {
                        if (self.units()[j].factory === "") {
                            self.filteredunits.push(self.units()[j]);
                        }
                    }
                }
            }
            else {
                self.filters(["All", "Land", "Air", "Naval", "Orbital"]);
                if (self.activeSubFilters() !== 'All') {
                    for (var l = 0; l < self.units().length; l++) {
                        if (self.units()[l].factory !== "") {
                            if (self.activeSubFilters() === 'Land' && _.contains(self.units()[l].unit_types, "UNITTYPE_Land")) {
                                self.filteredunits.push(self.units()[l]);
                            }
                            if (self.activeSubFilters() === 'Air' && _.contains(self.units()[l].unit_types, "UNITTYPE_Air")) {
                                self.filteredunits.push(self.units()[l]);
                            }
                            if (self.activeSubFilters() === 'Naval' && _.contains(self.units()[l].unit_types, "UNITTYPE_Naval")) {
                                self.filteredunits.push(self.units()[l]);
                            }
                            if (self.activeSubFilters() === 'Orbital' && _.contains(self.units()[l].unit_types, "UNITTYPE_Orbital")) {
                                self.filteredunits.push(self.units()[l]);
                            }
                        }
                    }
                }
                else {
                    for (var k = 0; k < self.units().length; k++) {
                        if (self.units()[k].factory !== "") {
                            self.filteredunits.push(self.units()[k]);
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
            
            _.forEach(model.keyboardSettingsItems(), function (o) {
                if (o.value() === value) {
                    fuberkey = true;
                    self.uberkey(o.title());
                }
            });

            if (!fuberkey) {
                self.uberkey(undefined);
            }
        });


        self.uberkeys = ko.computed(function () {
            var uberkeys = [];
            
            _.forEach(model.keyboardSettingsItems(), function (o) {
                uberkeys.push(o.value());
            });
        
            return uberkeys;
        });

        self.disabledkeys = ko.computed(function () {
            var diskeys = ['caps lock', 'shift', 'return'];
            /*
            Tripax needs to fix uber + disabled keys on same button first
            _.forEach(model.keybindings().bindings(), function (o) {
                if(o.action() === 'move_up' || o.action() === 'move_down' || o.action() === 'move_left' || o.action() === 'move_right'){
                    diskeys.push(o.value());    
                }
            });
            */
            return diskeys;
        });

        self.hotbuildkeys = ko.observableArray([]);

        self.hotbuildglobal.subscribe(function (value) {
            self.updatehotbuildkeys();
        });

        self.updatehotbuildkeys = function () {
            self.hotbuildkeys(_.keys(_.invert(self.hotbuildglobalkey())));
        };
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
            var nr = 1;
            for (hotkey in copyconfigkey) {
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
            //model.clean(false);
            api.settings.isDirty(true);
        };



        self.swapKey = function () {
            swapto = $("#swapkey").val();

            if (self.keyboardkey() !== "" && swapto !== "") {
                if (self.keyboardkey() !== swapto) {
                    var swapposition;
                    var currentposition;
                    //find swap position
                    for (var hotkey in self.hotbuildglobalkey()) {
                        if (self.hotbuildglobalkey()[hotkey] === swapto) {
                            swapposition = hotkey;
                            break;
                        }

                    }
                    //find current key position
                    for (hotkey in self.hotbuildglobalkey()) {
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
            //console.log(swapto);
            self.keyboardkey(swapto);

        };
        //remove for dummies that don't know to drag it back
        self.remFromList = function (item) {
            self.selectedhotbuild.remove(item);
            self.Save();
            self.updatehotbuildkeys();
        };

        self.showingDefaultPrompt = ko.observable(false);

        self.communitydefaultset = ko.observable("");

        self.showCommunityDefaultPrompt = function (defaultset) {
            self.showingDefaultPrompt(true);
            self.communitydefaultset(defaultset);
            $("#comdefaultsDlg").dialog({
                dialogClass: "no-close",
                height: 'auto',
                width: 460,
                draggable: false,
                resizable: false,
                modal: true,
                complete: function (data, textStatus) { }
            });
            $("#setComDefaults").click(function () {
                console.log("set Community Defaults " + defaultset);
                self.importfromfile("/ui/mods/hotbuild2/defaults/" + defaultset + ".json");
                self.showingDefaultPrompt(false);
                $("#comdefaultsDlg").dialog("close");
            });
            $("#ignoreComDefaults").click(function () {
                self.showingDefaultPrompt(false);
                $("#comdefaultsDlg").dialog("close");
            });
        };

        self.export = function () {
            console.log('export');
            var keyboardsettings = {};
            keyboardsettings.uber = ko.toJS(model.keyboardSettingsItems());
            self.Save();
            keyboardsettings.hotbuildglobalkey = self.cleanhotbuildglobalkey();
            keyboardsettings.hotbuildglobal = self.cleanhotbuildglobal();
            //keyboardsettings.cameraKeyPanStyle = model.cameraKeyPanStyle();
            $("#ieport").val(JSON.stringify(keyboardsettings));
        };

        self.import = function () {
            console.log('import');
            if ($("#ieport").val() !== '') {
                var imported = JSON.parse($("#ieport").val());
                for (var ukey in imported.uber) {
                    for(var i = 0; i < model.keyboardSettingsItems().length; i++){
                        if(model.keyboardSettingsItems()[i].title === ukey.title){
                            try{
                                console.log(imported.uber[ukey].title);
                                console.log("OLD " + model.keyboardSettingsItems()[i].value());
                                console.log("NEW " + ukey.value);
                                model.keyboardSettingsItems()[i].value(imported.uber[ukey].value);
                            }
                            catch (err) {
                                console.log(err);
                            }
                        }
                    }
                }
                self.hotbuildglobalkey(imported.hotbuildglobalkey);
                self.hotbuildglobal(imported.hotbuildglobal);
                //model.cameraKeyPanStyle(imported.cameraKeyPanStyle);
                updateExistingSettings();
                self.Save();
                self.keyboardkey('');
            }
            else {
                //alert("Please input Text to import in textbox");
            }
        };

        self.importfromfile = function (importfile) {
            console.log('importing importfile ' + importfile);
            $.getJSON('coui:/' + importfile, function (imported) {
                for (var ukey in imported.uber) {
                    for(var i = 0; i < model.keyboardSettingsItems().length; i++){
                        if(model.keyboardSettingsItems()[i].title === ukey.title){
                            try{
                                console.log(imported.uber[ukey].title);
                                console.log("OLD " + model.keyboardSettingsItems()[i].value());
                                console.log("NEW " + ukey.value);
                                model.keyboardSettingsItems()[i].value(imported.uber[ukey].value);
                            }
                            catch (err) {
                                console.log(err);
                            }
                        }
                    }
                }
                self.hotbuildglobalkey(imported.hotbuildglobalkey);
                self.hotbuildglobal(imported.hotbuildglobal);
                //console.log(imported.cameraKeyPanStyle);
                //model.cameraKeyPanStyle(imported.cameraKeyPanStyle);
                updateExistingSettings();
                self.Save();
                self.keyboardkey('');
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

        self.handlekey = function (data,event) {
            //console.log(event.target);
            var $this = $(event.target);
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
    hotbuildglobal = localStorage.hotbuildconfig ? decode(localStorage.hotbuildconfig) : hotbuildglobal;
    hotbuildglobalkey = localStorage.hotbuildconfigkey ? decode(localStorage.hotbuildconfigkey) : hotbuildglobalkey;

    var hbuisettings = new HotBuildSettingsViewModel(hotbuildglobal, hotbuildglobalkey);
    var hotbuildsettings = {};
    hotbuildsettings.viewmodel = hbuisettings;
    hotbuildsettings.viewmodel.updatehotbuildkeys();

    return hotbuildsettings;

})();

(function () {
    _.extend(api.settings.definitions.ui.settings, {
        hotbuild_reset_time: {
            title: 'Hotbuild Reset Time',
            type: 'slider',
            options:{
                min:0,
                max:10000,
                step:500
            },
            default: 2000
        },
        hotbuild_shift_key_recycle: {
            title: 'Hotbuild Reset Cycle when Shift isn\'t down',
            type: 'select',
            default: 'ON',
            options: ['ON','OFF']

        },
        hotbuild_show_key_on_buildbar: {
            title: 'Hotbuild Show Key on BuildBar',
            type: 'select',
            default: 'ON',
            options: ['ON','OFF']
        },
        hotbuild_show_key_on_sidebar: {
            title: 'Hotbuild Show Key on SideBar',
            type: 'select',
            default: 'ON',
            options: ['ON','OFF']
        }
    });

    _.extend(api.settings.definitions.keyboard.settings, {
        hotbuild_lock_pole: {
            title: 'Lock Pole Toggle',
            type: 'keybind',
            set: 'hotbuild',
            display_group: 'hotbuild',
            display_sub_group: 'hotbuild',
            default : 'y'
        },
        hotbuild_toggle: {
            title: 'Hotbuild Toggle',
            type: 'keybind',
            set: 'hotbuild',
            display_group: 'hotbuild',
            display_sub_group: 'hotbuild',
            default: ''
        },
        hotbuild_hotselect: {
            title: 'HotSelect Toggle',
            type: 'keybind',
            set: 'hotbuild',
            display_group: 'hotbuild',
            display_sub_group: 'hotbuild',
            default: ''
        }
    });

    model.oldsaveBeforeHotbuild = model.save;
    model.save = function(){
        //api.settings.set("hb","hotbuildconfigkey",hotbuildsettings.viewmodel.cleanhotbuildglobalkey())
        localStorage.hotbuildconfigkey = encode(hotbuildsettings.viewmodel.cleanhotbuildglobalkey());
        localStorage.hotbuildconfig = encode(hotbuildsettings.viewmodel.cleanhotbuildglobal());
        return model.oldsaveBeforeHotbuild();
    };
    model.oldsaveandexitBeforeHotbuild = model.saveAndExit;
    model.saveAndExit = function(){
        localStorage.hotbuildconfigkey = encode(hotbuildsettings.viewmodel.cleanhotbuildglobalkey());
        localStorage.hotbuildconfig = encode(hotbuildsettings.viewmodel.cleanhotbuildglobal());
        return model.oldsaveandexitBeforeHotbuild();
    };    

    //model.registerFrameSetting('hotbuild_info_frame', 'Hotbuild Preview', true);

    ko.bindingHandlers.sortable.beforeMove = function (arg) {
        if (hotbuildsettings.viewmodel.selectedkeyinfo() !== undefined) {
            if (arg.item.factory !== "" && arg.sourceParentNode.parent().attr("id") === "sequencelistR") {
                var unitCheck = true;
                for (var i = 0; i < hotbuildsettings.viewmodel.selectedhotbuild().length; i++) {
                    if (hotbuildsettings.viewmodel.selectedhotbuild()[i].factory === arg.item.factory) {
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
            $('#hbkeyboard li').each(function (index) {
                if ($(this).hasClass('hbk')) {
                    $(this).removeClass('hbk');
                }
            });
            /*jshint -W083 */
            for (var i = 0; i < valueUnwrapped.length; i++) {
                $("#hbkeyboard li").each(function (index) {
                    if ($(this).text() === valueUnwrapped[i]) {
                        if (!$(this).hasClass('hbk')) {
                            $(this).toggleClass('hbk');
                        }
                    }
                });
            }
            /*jshint +W083 */
        }
    };

    ko.bindingHandlers.coloruberkeys = {
        update: function (element, valueAccessor, allBindings) {
            // First get the latest data that we're bound to
            var value = valueAccessor();
            // Next, whether or not the supplied model property is observable, get its current value
            var valueUnwrapped = ko.utils.unwrapObservable(value);
            $('#hbkeyboard li').each(function (index) {
                if ($(this).hasClass('uber')) {
                    $(this).removeClass('uber');
                }
            });
            /*jshint -W083 */
            for (var i = 0; i < valueUnwrapped.length; i++) {
                $("#hbkeyboard li").each(function (index) {
                    if ($(this).text() === valueUnwrapped[i]) {
                        if (!$(this).hasClass('uber')) {
                            $(this).toggleClass('uber');
                        }
                    }
                });
            }
            /*jshint +W083 */
        }
    };

    ko.bindingHandlers.colordisabledkeys = {
        update: function (element, valueAccessor, allBindings) {
            // First get the latest data that we're bound to
            var value = valueAccessor();
            // Next, whether or not the supplied model property is observable, get its current value
            var valueUnwrapped = ko.utils.unwrapObservable(value);
            $('#hbkeyboard li').each(function (index) {
                if ($(this).hasClass('dis')) {
                    $(this).removeClass('dis');
                }
            });
            /*jshint -W083 */
            for (var i = 0; i < valueUnwrapped.length; i++) {
                $("#hbkeyboard li").each(function (index) {
                    if ($(this).text() === valueUnwrapped[i]) {
                        if (!$(this).hasClass('dis')) {
                            $(this).toggleClass('dis');
                        }
                    }
                });
            }
            /*jshint +W083 */
        }
    };

    ko.bindingHandlers.activekey = {
        update: function (element, valueAccessor, allBindings) {
            // First get the latest data that we're bound to
            var value = valueAccessor();
            // Next, whether or not the supplied model property is observable, get its current value
            var valueUnwrapped = ko.utils.unwrapObservable(value);
            $('#hbkeyboard li').each(function (index) {
                if ($(this).hasClass('active')) {
                    $(this).css('-webkit-filter', '');
                    $(this).removeClass('active');
                }
            });
            $("#hbkeyboard li").each(function (index) {
                if ($(this).text() === valueUnwrapped) {
                    var $this = $(this);
                    if (!$this.hasClass('active')) {
                        $this.addClass('active');
                        $this.css('-webkit-filter', 'drop-shadow(0px 0px 6px rgba(255,255,255,1))');
                        var $selectedButton = $this.clone();
                        //$selectedButton.removeClass('active');
                        $selectedButton.attr('id', 'kbselection');
                        $selectedButton.css({ '-webkit-filter': 'none', 'text-transform': 'uppercase !important' });
                        $('#kbselection').replaceWith($selectedButton);
                        $('#kbselection').click(function () {
                            $('#changeKeyDlg').dialog({
                                height: 'auto',
                                width: 320,
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
    model.settingGroups().push("hotbuild");
    model.settingDefinitions().hotbuild = {title:"Hotbuild",settings:{}};

    $(".option-list.ui .form-group").append(
        $.ajax({
            type: "GET",
            url: 'coui://ui/mods/hotbuild2/settings/hotbuild_ui_settings.html',
            async: false
        }).responseText
    );
    $(".option-list.keyboard").parent().append(
        $.ajax({
            type: "GET",
            url: 'coui://ui/mods/hotbuild2/settings/hotbuild_settings.html',
            async: false
        }).responseText
    );
    model.settingGroups.notifySubscribers();

})();
