"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scriber = exports.eventsSaveFileName = exports.characterSaveFileName = void 0;
var fs = require("fs");
exports.characterSaveFileName = 'Characters.json';
exports.eventsSaveFileName = 'Events.json';
var Scriber = (function () {
    function Scriber(saveDirectory) {
        this.saveDirectory = saveDirectory;
        if (!fs.existsSync(this.saveDirectory.toString())) {
            fs.mkdirSync(this.saveDirectory.toString());
        }
        this.initSaveFile(exports.characterSaveFileName);
        this.initSaveFile(exports.eventsSaveFileName);
    }
    Scriber.prototype.saveCharacter = function (character) {
        var newCharacter = { stats: Object.fromEntries(character.stats) };
        var file = fs.readFileSync(this.saveDirectory + '/' + exports.characterSaveFileName, 'utf-8');
        var characters = JSON.parse(file);
        characters[character.name.toString()] = newCharacter;
        fs.writeFileSync(this.saveDirectory + '/' + exports.characterSaveFileName, JSON.stringify(characters));
    };
    Scriber.prototype.initSaveFile = function (saveFileName) {
        var savePath = "".concat(this.saveDirectory, "/").concat(saveFileName);
        if (!fs.existsSync(savePath)) {
            fs.writeFileSync(savePath, '{}');
        }
    };
    return Scriber;
}());
exports.Scriber = Scriber;
