"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.line = /(\n|\\s)/g;
exports.trim = /(\s|\n|\\s)/g;
exports.match = /{{(.+?)}}/g;
exports.map = [
    '[object Array]',
    '[object Object]',
    '[object String]',
    '[object Boolean]',
    '[object Function]',
    '[object Number]',
    '[object Date]',
    '[object RegExp]'
];
function isString(target) {
    return Object.prototype.toString.call(target) === '[object String]';
}
exports.isString = isString;
function isFunction(target) {
    return Object.prototype.toString.call(target) === '[object Function]';
}
exports.isFunction = isFunction;
