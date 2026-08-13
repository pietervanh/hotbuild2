console.log("loading hotbuild2 spec id helper");

var hbSpecId = (function () {

    //same expressions stock PA uses: build.js and live_game_build_bar.js
    var CANONICAL = /(.*\.json)[^\/]*$/;
    var NOEXTENSION = /(.*)\.json[^\/]*$/;
    var MISSING_ICON = 'coui://ui/main/game/live_game/img/build_bar/img_missing_unit.png';

    var specid = {};

    //'/pa/x/y.json.player1' -> '/pa/x/y.json' , untagged ids pass through
    specid.canonical = function (id) {
        if (!id) {
            return id;
        }
        var match = CANONICAL.exec(id);
        return (match && match[1]) ? match[1] : id;
    };

    //'/pa/x/y.json.player1' -> '.player1' , untagged ids give ''
    specid.tag = function (id) {
        if (!id) {
            return '';
        }
        var canon = specid.canonical(id);
        return (id.length > canon.length) ? id.slice(canon.length) : '';
    };

    specid.same = function (a, b) {
        return specid.canonical(a) === specid.canonical(b);
    };

    //the settings scene has no Build global, build.js isn't in settings.html
    specid.buildBarIcon = function (id) {
        var match = id ? NOEXTENSION.exec(id) : null;
        if (!match || !match[1]) {
            return MISSING_ICON;
        }
        return 'coui:/' + match[1] + '_icon_buildbar.png';
    };

    //the path is a convention, not a guarantee: a mod's internal spawn units have no
    //build bar art. onerror handler, so clear it first or a missing fallback loops.
    specid.fallbackIcon = function (img) {
        img.onerror = null;
        img.src = MISSING_ICON;
    };

    //first entry of list whose .id is the same unit, whatever tag either carries
    specid.findSpec = function (list, id) {
        var canon = specid.canonical(id);
        var count = list ? list.length : 0;
        for (var i = 0; i < count; i++) {
            if (list[i] && specid.canonical(list[i].id) === canon) {
                return list[i];
            }
        }
        return undefined;
    };

    //in place, never adds/removes/reorders hotbuildNs keys
    specid.normaliseConfig = function (config) {
        for (var hotkey in config) {
            var entries = config[hotkey];
            if (!entries || entries.length === undefined) {
                continue;
            }
            for (var i = 0; i < entries.length; i++) {
                if (entries[i] && entries[i].json) {
                    entries[i].json = specid.canonical(entries[i].json);
                }
            }
        }
        return config;
    };

    return specid;

})();

console.log("loaded hotbuild2 spec id helper");
