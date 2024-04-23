"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.EventNode = void 0;
var DELIMITER = '\t';
var InvariantViolation = (function (_super) {
    __extends(InvariantViolation, _super);
    function InvariantViolation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return InvariantViolation;
}(Error));
var SelfLoopViolation = (function (_super) {
    __extends(SelfLoopViolation, _super);
    function SelfLoopViolation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SelfLoopViolation;
}(Error));
var EventNode = (function () {
    function EventNode(name, description) {
        this.description = '';
        this.outcomes = new Map();
        this.name = name;
        this.description = description !== null && description !== void 0 ? description : this.description;
    }
    EventNode.prototype.add = function (newEvent) {
        if (newEvent === this) {
            throw new SelfLoopViolation("Attempt to add a self loop on ".concat(this.name, "."));
        }
        this.invariant(newEvent);
        return this.outcomes.set(newEvent.name, newEvent);
    };
    EventNode.prototype.remove = function (newEvent) {
        return this.outcomes.delete(newEvent);
    };
    EventNode.prototype[Symbol.iterator] = function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [5, __values(this.preorder(0))];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    };
    EventNode.prototype.generateLevels = function () {
        var e_1, _a;
        var levels = new Array();
        try {
            for (var _b = __values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), outcome = _d[0], depth = _d[1];
                levels[depth] = levels[depth] ? levels[depth] : new Array();
                levels[depth].push(outcome);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return levels;
    };
    EventNode.prototype.getSize = function () {
        var e_2, _a;
        var _b = __read([0, 0], 2), numNodes = _b[0], numConnections = _b[1];
        try {
            for (var _c = __values(this), _d = _c.next(); !_d.done; _d = _c.next()) {
                var _e = __read(_d.value, 2), outcome = _e[0], _ = _e[1];
                numNodes++;
                numConnections += outcome.outcomes.size;
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return [numNodes, numConnections];
    };
    EventNode.prototype.toString = function () {
        var e_3, _a;
        var s = '';
        try {
            for (var _b = __values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), outcome = _d[0], depth = _d[1];
                s = s.concat("".concat(DELIMITER.repeat(depth)).concat(outcome.name, "\n"));
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return s;
    };
    EventNode.prototype.invariant = function (newest) {
        var _a = __read(this.getSize(), 2), numNodes = _a[0], numConnections = _a[1];
        numNodes += 1;
        numConnections += newest.outcomes.size + 1;
        if (numConnections != numNodes - 1) {
            throw new InvariantViolation("An invariant violation has occurred with the addition of ".concat(newest.name, " to ").concat(this.name, "."));
        }
    };
    EventNode.prototype.preorder = function (depth) {
        var _a, _b, outcome, e_4_1;
        var e_4, _c;
        if (depth === void 0) { depth = 0; }
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4, [this, depth]];
                case 1:
                    _d.sent();
                    if (!(this.outcomes.size > 0)) return [3, 9];
                    _d.label = 2;
                case 2:
                    _d.trys.push([2, 7, 8, 9]);
                    _a = __values(this.outcomes.values()), _b = _a.next();
                    _d.label = 3;
                case 3:
                    if (!!_b.done) return [3, 6];
                    outcome = _b.value;
                    return [5, __values(outcome.preorder(depth + 1))];
                case 4:
                    _d.sent();
                    _d.label = 5;
                case 5:
                    _b = _a.next();
                    return [3, 3];
                case 6: return [3, 9];
                case 7:
                    e_4_1 = _d.sent();
                    e_4 = { error: e_4_1 };
                    return [3, 9];
                case 8:
                    try {
                        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                    }
                    finally { if (e_4) throw e_4.error; }
                    return [7];
                case 9: return [2];
            }
        });
    };
    return EventNode;
}());
exports.EventNode = EventNode;
