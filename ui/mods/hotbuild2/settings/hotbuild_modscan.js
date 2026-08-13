console.log("loading hotbuild2 mod scan");

//Units a server mod adds are not in the client's file system outside a game: the engine
//builds its spec set from what the client has mounted, and a server mod's specs are only
//mounted into the server. This reads them straight off the enabled server mods instead.
var hbModScan = (function () {

    var MODS_DB = 'installed_mods';
    var SERVER_MODS = '/server_mods/';
    var UNIT_LIST = 'pa/units/unit_list.json';
    var BASE_SPEC_HOPS = 2;

    //mounted memory files answer to spec:, not to coui:
    function specUrl(base, path) {
        return 'spec:' + base + path.substr(1);
    }

    function stockSpecUrl(path) {
        return 'spec:/' + path;
    }

    //the community mods manager keeps every installed mod in one record, so this is the
    //only place that knows which server mods are enabled while no server is running
    function readInstalledMods() {
        var deferred = $.Deferred();
        var request;

        try {
            request = indexedDB.open(MODS_DB);
        }
        catch (ex) {
            console.log(ex);
            deferred.resolve([]);
            return deferred;
        }

        var creating = false;
        //no community mods manager: opening made the db, so put it back
        request.onupgradeneeded = function () {
            creating = true;
        };
        request.onerror = function () {
            deferred.resolve([]);
        };
        request.onsuccess = function (event) {
            var db = event.target.result;
            if (creating || !db.objectStoreNames.contains(MODS_DB)) {
                db.close();
                indexedDB.deleteDatabase(MODS_DB);
                deferred.resolve([]);
                return;
            }
            var mods = [];
            try {
                var cursor = db.transaction(MODS_DB, 'readonly').objectStore(MODS_DB).openCursor();
                cursor.onsuccess = function (ev) {
                    var entry = ev.target.result;
                    if (entry) {
                        if (entry.value && _.isArray(entry.value.value)) {
                            mods = mods.concat(entry.value.value);
                        }
                        entry.continue();
                        return;
                    }
                    db.close();
                    deferred.resolve(mods);
                };
                cursor.onerror = function () {
                    db.close();
                    deferred.resolve([]);
                };
            }
            catch (ex) {
                console.log(ex);
                db.close();
                deferred.resolve([]);
            }
        };

        return deferred;
    }

    //a mod the manager tracks. unitList is only set for mods shipping a unit list, so
    //ai, biome and map mods are dropped before anything is mounted.
    function trackedCandidates(mods) {
        var candidates = [];
        _.forEach(mods, function (mod) {
            if (!mod || mod.context !== 'server' || !mod.enabled || !mod.unitList) {
                return;
            }
            var installedPath = mod.installedPath || '';
            candidates.push({
                identifier: mod.identifier,
                version: mod.version,
                base: mod.mountPath || (SERVER_MODS + mod.identifier + '/'),
                zip: installedPath.slice(-4) === '.zip' ? installedPath : false
            });
        });
        return candidates;
    }

    //a loose directory under server_mods, i.e. installed by hand or by PAMM rather than
    //by the manager. api.file.list gives a coherent promise, so no done/fail here.
    function looseCandidates(taken) {
        var deferred = $.Deferred();

        api.file.list(SERVER_MODS, false).then(function (listing) {
            if (!_.isArray(listing)) {
                deferred.resolve([]);
                return;
            }
            //a mounted zip comes back without the trailing slash a real directory has
            var dirs = _.filter(listing, function (path) {
                return path.slice(-1) === '/';
            });
            if (!dirs.length) {
                deferred.resolve([]);
                return;
            }

            var candidates = [];
            var outstanding = dirs.length;
            var finished = function () {
                outstanding = outstanding - 1;
                if (outstanding === 0) {
                    deferred.resolve(candidates);
                }
            };

            _.forEach(dirs, function (dir) {
                $.getJSON('coui:' + dir + 'modinfo.json').done(function (modinfo) {
                    if (modinfo && modinfo.context !== 'client' && !taken[modinfo.identifier]) {
                        candidates.push({
                            identifier: modinfo.identifier,
                            version: modinfo.version,
                            base: dir,
                            zip: false
                        });
                    }
                    finished();
                }).fail(finished);
            });
        }, function () {
            deferred.resolve([]);
        });

        return deferred;
    }

    function discover() {
        var deferred = $.Deferred();

        readInstalledMods().always(function (mods) {
            var candidates = trackedCandidates(_.isArray(mods) ? mods : []);
            var taken = {};
            _.forEach(candidates, function (candidate) {
                taken[candidate.identifier] = true;
            });
            looseCandidates(taken).always(function (loose) {
                deferred.resolve(candidates.concat(_.isArray(loose) ? loose : []));
            });
        });

        return deferred;
    }

    function signatureOf(candidates) {
        return _.map(candidates, function (candidate) {
            return candidate.identifier + '@' + candidate.version;
        }).sort().join(';');
    }

    function parse(data) {
        return _.isString(data) ? JSON.parse(data) : data;
    }

    //read the mod's unit list, mounting its archive only if it is not readable already.
    //in a game the manager has usually mounted it, and that mount is the expensive part.
    function readUnitList(candidate) {
        var deferred = $.Deferred();

        var attempt = function (mayMount) {
            $.get(specUrl(candidate.base, '/' + UNIT_LIST)).done(function (data) {
                var list = null;
                try {
                    list = parse(data);
                }
                catch (ex) {
                    console.log(ex);
                }
                deferred.resolve(list && _.isArray(list.units) ? list.units : []);
            }).fail(function () {
                if (!mayMount || !candidate.zip) {
                    deferred.resolve([]);
                    return;
                }
                var mount = api.file.zip.mount(candidate.zip, candidate.base, false);
                if (!mount || !_.isFunction(mount.then)) {
                    deferred.resolve([]);
                    return;
                }
                mount.then(function () {
                    attempt(false);
                }, function () {
                    deferred.resolve([]);
                });
            });
        };

        attempt(true);
        return deferred;
    }

    //unit_types is usually on the unit's own spec, but a spec is free to inherit it
    function readSpec(candidate, path, hops, onDone) {
        var handle = function (data) {
            var spec = null;
            try {
                spec = parse(data);
            }
            catch (ex) {
                console.log(ex);
            }
            if (!spec) {
                onDone(null);
                return;
            }
            if (spec.unit_types || !spec.base_spec || hops <= 0) {
                onDone(spec);
                return;
            }
            readSpec(candidate, spec.base_spec, hops - 1, function (base) {
                if (base && base.unit_types) {
                    spec.unit_types = base.unit_types;
                    if (!spec.display_name) {
                        spec.display_name = base.display_name;
                    }
                    if (!spec.description) {
                        spec.description = base.description;
                    }
                }
                onDone(spec);
            });
        };

        //a base_spec often lives in the base game rather than in the mod
        $.get(specUrl(candidate.base, path)).done(handle).fail(function () {
            $.get(stockSpecUrl(path)).done(handle).fail(function () {
                onDone(null);
            });
        });
    }

    function entryFor(spec) {
        return {
            name: spec.display_name,
            description: spec.description,
            types: spec.unit_types,
            structure: _.contains(spec.unit_types, 'UNITTYPE_Structure')
        };
    }

    function collect(candidates, known) {
        var deferred = $.Deferred();
        var found = {};
        var seen = {};
        var lists = candidates.length;
        var specs = 0;

        var finish = function () {
            if (lists === 0 && specs === 0) {
                deferred.resolve(found);
            }
        };

        var take = function (candidate, path) {
            var canonical = hbSpecId.canonical(path);
            //the engine already has every stock unit, so only read what is new
            if (known[canonical] || seen[canonical]) {
                return;
            }
            seen[canonical] = true;
            specs = specs + 1;
            readSpec(candidate, path, BASE_SPEC_HOPS, function (spec) {
                if (spec && spec.unit_types) {
                    found[canonical] = entryFor(spec);
                }
                specs = specs - 1;
                finish();
            });
        };

        _.forEach(candidates, function (candidate) {
            readUnitList(candidate).always(function (units) {
                _.forEach(units, function (path) {
                    take(candidate, path);
                });
                lists = lists - 1;
                finish();
            });
        });

        return deferred;
    }

    var modscan = {};

    //resolves true when the unit cache gained something the picker should show.
    //known is a map of canonical spec ids the picker already has.
    modscan.run = function (known) {
        var deferred = $.Deferred();

        discover().always(function (candidates) {
            var signature = signatureOf(candidates);
            if (signature === hbUnitCache.signature()) {
                deferred.resolve(false);
                return;
            }
            if (!candidates.length) {
                hbUnitCache.merge({}, signature);
                deferred.resolve(false);
                return;
            }
            collect(candidates, known || {}).done(function (found) {
                hbUnitCache.merge(found, signature);
                console.log("hotbuild mod scan added " + _.size(found) + " units");
                deferred.resolve(_.size(found) > 0);
            });
        });

        return deferred;
    };

    return modscan;

})();

console.log("loaded hotbuild2 mod scan");
