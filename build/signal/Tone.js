"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.t = void 0;
var t = function (hertz, decibels) {
    if (decibels === void 0) { decibels = 0; }
    return {
        frequency: {
            hertz: hertz
        },
        amplitude: {
            decibels: decibels
        }
    };
};
exports.t = t;
