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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dice = void 0;
var UnitError = (function (_super) {
    __extends(UnitError, _super);
    function UnitError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UnitError;
}(Error));
var tolerance = 0.01;
var Dice = (function () {
    function Dice(numSides, weights) {
        this.sides = numSides;
        this.pmf = weights ? weights : new Array(numSides).fill(1 / numSides);
        var unitSum = this.pmf.reduce(function (acc, x) { return acc + x; });
        if (Math.abs(1 - unitSum) >= tolerance) {
            throw new UnitError("Sum of weights does not equal 1.");
        }
        this.cdf = this.pmf.map((function (sum) { return function (value) { return sum += value; }; })(0));
    }
    Dice.prototype.roll = function () {
        return this.cdf.findIndex(function (el) { return Math.random() <= el; }) + 1;
    };
    return Dice;
}());
exports.Dice = Dice;
