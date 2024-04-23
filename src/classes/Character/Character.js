"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Character = void 0;
var CharacterStats_1 = require("./CharacterStats");
var Character = (function () {
    function Character(name, stats) {
        this.stats = new CharacterStats_1.CharacterStats();
        this.isAlive = true;
        this.name = name;
        this.stats = stats !== null && stats !== void 0 ? stats : this.stats;
    }
    Character.prototype.addStats = function (stats) {
        this.stats.combine(stats);
        return this;
    };
    Character.prototype.scaleStats = function (scalar) {
        this.stats.scale(scalar);
        return this;
    };
    return Character;
}());
exports.Character = Character;
