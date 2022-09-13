"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unsubscribeEventCallback = exports.subscribeEvent = exports.emitEvent = void 0;
var utils_1 = require("../utils");
__exportStar(require("./accounts"), exports);
__exportStar(require("./viewing-keys"), exports);
var defaultEventOptions = { bubbles: true, cancelable: true };
function emitEvent(name, options) {
    if (options === void 0) { options = defaultEventOptions; }
    var event = new Event(name, options);
    document.dispatchEvent(event);
}
exports.emitEvent = emitEvent;
function subscribeEvent(name, callback) {
    var _a;
    (_a = utils_1.getWindow()) === null || _a === void 0 ? void 0 : _a.addEventListener(name, callback);
}
exports.subscribeEvent = subscribeEvent;
function unsubscribeEventCallback(name, callback) {
    return function () { var _a; return (_a = utils_1.getWindow()) === null || _a === void 0 ? void 0 : _a.removeEventListener(name, callback); };
}
exports.unsubscribeEventCallback = unsubscribeEventCallback;
//# sourceMappingURL=index.js.map