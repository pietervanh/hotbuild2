console.log("loading hotbuild2 unit cache");

var hbUnitCache = (function () {

    var STORE = 'hotbuildunitcache';
    var VERSION = 1;

    var cache = null;

    //an id the engine never sends, e.g. message_type, is not a unit
    function isSpecId(id) {
        return !!id && id.indexOf('.json') !== -1;
    }

    //untagged wins, then this client's army, then any other tag. same ordering the
    //settings picker uses, so the copy stored is the one it would have shown.
    function tagRank(tag) {
        if (tag === '') {
            return 0;
        }
        if (tag === '.player') {
            return 1;
        }
        return 2;
    }

    function read() {
        var stored = null;
        try {
            stored = localStorage[STORE] ? decode(localStorage[STORE]) : null;
        }
        catch (ex) {
            console.log("hotbuild unit cache unreadable, starting empty");
            console.log(ex);
        }
        if (!stored || stored.v !== VERSION || !stored.units) {
            return { v: VERSION, sig: '', units: {} };
        }
        return stored;
    }

    function write(store) {
        try {
            localStorage[STORE] = encode(store);
        }
        catch (ex) {
            //a full quota must not take the picker down with it
            console.log("hotbuild unit cache could not be saved");
            console.log(ex);
        }
    }

    var unitcache = {};

    //{name, description, types, structure} per canonical spec id, the same fields
    //the engine sends, so a cached entry drops straight into hbBuildUnitList
    unitcache.load = function () {
        cache = read();
        return cache.units;
    };

    unitcache.signature = function () {
        cache = read();
        return cache.sig;
    };

    function same(stored, unit) {
        return !!stored
            && stored.name === unit.name
            && stored.description === unit.description
            && stored.structure === !!unit.structure
            && String(stored.types) === String(unit.types);
    }

    //the sim's own spec set, whatever supplied it. authoritative, so it overwrites.
    unitcache.harvest = function (payload) {
        if (!payload) {
            return;
        }
        cache = read();
        var best = {};
        var changed = false;
        for (var id in payload) {
            if (!isSpecId(id)) {
                continue;
            }
            var unit = payload[id];
            if (!unit || !unit.types) {
                continue;
            }
            var canonical = hbSpecId.canonical(id);
            var rank = tagRank(hbSpecId.tag(id));
            //a better ranked copy of this unit already came out of this payload
            if (best[canonical] !== undefined && rank >= best[canonical]) {
                continue;
            }
            best[canonical] = rank;
            if (same(cache.units[canonical], unit)) {
                continue;
            }
            changed = true;
            cache.units[canonical] = {
                name: unit.name,
                description: unit.description,
                types: unit.types,
                structure: !!unit.structure
            };
        }
        //every settings open replays the same payload, so only write a real change
        if (!changed) {
            return;
        }
        write(cache);
    };

    //units read off disk by the mod scan. lower trust than a harvest, so it only
    //fills gaps, and sig records which mod set produced them.
    unitcache.merge = function (extra, sig) {
        cache = read();
        for (var id in extra) {
            if (!cache.units[id]) {
                cache.units[id] = extra[id];
            }
        }
        cache.sig = sig;
        write(cache);
    };

    return unitcache;

})();

console.log("loaded hotbuild2 unit cache");
