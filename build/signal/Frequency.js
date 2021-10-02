"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hz = exports.fShiftBy = exports.fAdd = void 0;
var hz = function (hertz) {
    return {
        hertz: hertz
    };
};
exports.hz = hz;
var fAdd = function (a, b) {
    return {
        hertz: a.hertz + b.hertz
    };
};
exports.fAdd = fAdd;
var fShiftBy = function (f, i) {
    return fAdd(f, i.value);
};
exports.fShiftBy = fShiftBy;
