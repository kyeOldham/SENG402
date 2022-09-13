"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountManager = void 0;
var utils_1 = require("../utils");
var bootstrap_1 = require("../bootstrap");
var AccountManager = (function () {
    function AccountManager() {
        var _a;
        this.accounts = [];
        var item = (_a = utils_1.getWindow()) === null || _a === void 0 ? void 0 : _a.localStorage.getItem('griptape.js');
        if (item) {
            this.accounts = JSON.parse(item);
        }
    }
    AccountManager.prototype.addAccount = function () {
        var address = bootstrap_1.getAddress();
        if (!address)
            return;
        var account = { address: address, keys: [], permits: [] };
        this.accounts.push(account);
        return account;
    };
    AccountManager.prototype.getAccount = function () {
        var address = bootstrap_1.getAddress();
        return this.accounts.find(function (it) { return it.address === address; });
    };
    return AccountManager;
}());
exports.AccountManager = AccountManager;
//# sourceMappingURL=account.js.map