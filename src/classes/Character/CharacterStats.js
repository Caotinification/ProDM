"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterStats = exports.Stat = void 0;
var Stat;
(function (Stat) {
    Stat["STR"] = "strength";
    Stat["DEX"] = "dexterity";
    Stat["CON"] = "constitution";
    Stat["INT"] = "intelligence";
    Stat["WIS"] = "wisdom";
    Stat["CHA"] = "charisma";
})(Stat || (exports.Stat = Stat = {}));
var CharacterStats = (function () {
    function CharacterStats() {
        this.stats = new Map([
            [Stat.STR, 0],
            [Stat.DEX, 0],
            [Stat.CON, 0],
            [Stat.INT, 0],
            [Stat.WIS, 0],
            [Stat.CHA, 0]
        ]);
    }
    CharacterStats.prototype.get = function (stat) {
        return this.stats.get(stat);
    };
    CharacterStats.prototype.set = function (stat, newValue) {
        return this.stats.set(stat, newValue);
    };
    CharacterStats.prototype[Symbol.iterator] = function () {
        var _a, _b, _c, statName, statValue, e_1_1;
        var e_1, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 5, 6, 7]);
                    _a = __values(this.stats), _b = _a.next();
                    _e.label = 1;
                case 1:
                    if (!!_b.done) return [3, 4];
                    _c = __read(_b.value, 2), statName = _c[0], statValue = _c[1];
                    return [4, [statName, statValue]];
                case 2:
                    _e.sent();
                    _e.label = 3;
                case 3:
                    _b = _a.next();
                    return [3, 1];
                case 4: return [3, 7];
                case 5:
                    e_1_1 = _e.sent();
                    e_1 = { error: e_1_1 };
                    return [3, 7];
                case 6:
                    try {
                        if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7];
                case 7: return [2];
            }
        });
    };
    CharacterStats.prototype.combine = function (that) {
        var e_2, _a;
        var _b, _c;
        try {
            for (var that_1 = __values(that), that_1_1 = that_1.next(); !that_1_1.done; that_1_1 = that_1.next()) {
                var _d = __read(that_1_1.value, 2), statName = _d[0], statValue = _d[1];
                this.stats.set(statName, ((_c = (_b = this.stats) === null || _b === void 0 ? void 0 : _b.get(statName)) !== null && _c !== void 0 ? _c : 0) + statValue);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (that_1_1 && !that_1_1.done && (_a = that_1.return)) _a.call(that_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return this;
    };
    CharacterStats.prototype.scale = function (scalar) {
        var e_3, _a;
        var _b, _c;
        try {
            for (var _d = __values(this), _e = _d.next(); !_e.done; _e = _d.next()) {
                var _f = __read(_e.value, 2), statName = _f[0], _ = _f[1];
                this.stats.set(statName, ((_c = (_b = this.stats) === null || _b === void 0 ? void 0 : _b.get(statName)) !== null && _c !== void 0 ? _c : 0) * scalar);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return this;
    };
    return CharacterStats;
}());
exports.CharacterStats = CharacterStats;
