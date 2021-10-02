"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.actualize = void 0;
var Frequency_1 = require("../signal/Frequency");
var Note_1 = require("./Note");
/**
 * Actualizes an AbstractScale by applying the Scale's Intervals starting from
 * the tonic. If the scale is octave-repeating, it generates one octave.
 * If the scale is not octave-repeating, it generates 100 notes.
 */
var actualize = function (scale, tonic, options) {
    var _a = __assign({ numOctaves: 1, numNotes: 100 }, options), numOctaves = _a.numOctaves, numNotes = _a.numNotes;
    var notes = [tonic];
    var currentIntervalIndex = 0;
    var currentNote = tonic;
    var octavesGenerated = 0;
    for (;;) {
        var currentInterval = scale.steps[currentIntervalIndex];
        var nextNote = (0, Frequency_1.fShiftBy)(currentNote, currentInterval);
        if ((0, Note_1.isOctave)(tonic, nextNote)) {
            octavesGenerated += 1;
        }
        if (octavesGenerated >= numOctaves || notes.length >= numNotes) {
            break;
        }
        notes.push(nextNote);
        currentNote = nextNote;
        currentIntervalIndex = (currentIntervalIndex + 1) % scale.steps.length;
    }
    return {
        notes: notes
    };
};
exports.actualize = actualize;
