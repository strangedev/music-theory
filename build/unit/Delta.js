"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delta = exports.isDelta = void 0;
var isDelta = function (obj) {
    return obj.type && obj.type === 'delta' && obj.value;
};
exports.isDelta = isDelta;
var delta = function (value) {
    return {
        type: 'delta',
        value: value
    };
};
exports.delta = delta;
