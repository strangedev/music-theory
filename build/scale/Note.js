"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.octavesBetween = exports.isOctave = void 0;
var octavesBetween = function (a, b) {
    return Math.log2(a.hertz / b.hertz);
};
exports.octavesBetween = octavesBetween;
var isOctave = function (a, b) {
    return Number.isInteger(octavesBetween(a, b));
};
exports.isOctave = isOctave;
