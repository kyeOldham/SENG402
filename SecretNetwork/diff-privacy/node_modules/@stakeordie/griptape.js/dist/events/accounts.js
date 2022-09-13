"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onAccountDisconnect = exports.onAccountNotAvailable = exports.onAccountChange = exports.onAccountAvailable = void 0;
var index_1 = require("./index");
var __1 = require("..");
function onAccountAvailable(callback) {
    index_1.subscribeEvent('account-available', callback);
    return index_1.unsubscribeEventCallback('account-available', callback);
}
exports.onAccountAvailable = onAccountAvailable;
function onAccountChange(callback) {
    index_1.subscribeEvent('account-change', callback);
    return function () {
        var _a, _b;
        if (!__1.provider) {
            throw new Error('No provider available');
        }
        (_a = __1.getWindow()) === null || _a === void 0 ? void 0 : _a.removeEventListener('account-change', callback);
        if (!__1.accountChangedCallback)
            return;
        (_b = __1.getWindow()) === null || _b === void 0 ? void 0 : _b.removeEventListener('keplr_keystorechange', __1.accountChangedCallback);
    };
}
exports.onAccountChange = onAccountChange;
function onAccountNotAvailable(callback) {
    index_1.subscribeEvent('account-not-available', callback);
    return index_1.unsubscribeEventCallback('account-not-available', callback);
}
exports.onAccountNotAvailable = onAccountNotAvailable;
function onAccountDisconnect(callback) {
    index_1.subscribeEvent('shutdown', callback);
    return index_1.unsubscribeEventCallback('shutdown', callback);
}
exports.onAccountDisconnect = onAccountDisconnect;
//# sourceMappingURL=accounts.js.map