"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.snip20PermitDef = exports.snip20BasePermitDef = exports.snip20Def = void 0;
var __1 = require("..");
exports.snip20Def = {
    queries: {
        getBalance: function (_a) {
            var address = _a.address, key = _a.key;
            return { balance: { address: address, key: key } };
        },
        getTokenInfo: function () {
            return { token_info: {} };
        },
        getTransferHistory: function (_a, page_size, page) {
            var address = _a.address, key = _a.key;
            return { transfer_history: { address: address, key: key, page_size: page_size, page: page } };
        },
        getMinters: function () {
            return { minters: {} };
        },
        getAllowance: function (_, owner, spender, key) {
            return { allowance: { owner: owner, spender: spender, key: key } };
        },
        getExchangeRate: function () {
            return { exchange_rate: {} };
        },
    },
    messages: {
        transfer: function (_a, recipient, amount) {
            var padding = _a.padding;
            var handleMsg = {
                transfer: { recipient: recipient, amount: amount, padding: padding },
            };
            return { handleMsg: handleMsg };
        },
        send: function (_a, recipient, amount, msg) {
            var padding = _a.padding;
            var handleMsg = {
                send: { recipient: recipient, amount: amount, msg: msg, padding: padding },
            };
            return { handleMsg: handleMsg };
        },
        registerReceive: function (_a, code_hash) {
            var padding = _a.padding;
            var handleMsg = {
                register_receive: { code_hash: code_hash, padding: padding },
            };
            return { handleMsg: handleMsg };
        },
        createViewingKey: function (_a) {
            var padding = _a.padding, entropy = _a.entropy;
            var handleMsg = {
                create_viewing_key: { entropy: entropy, padding: padding },
            };
            return { handleMsg: handleMsg };
        },
        setViewingKey: function (_a, key) {
            var padding = _a.padding;
            var handleMsg = {
                set_viewing_key: { key: key, padding: padding },
            };
            return { handleMsg: handleMsg };
        },
        increaseAllowances: function (_a, spender, amount, expiration) {
            var padding = _a.padding;
            var handleMsg = {
                increase_allowance: { spender: spender, amount: amount, expiration: expiration, padding: padding },
            };
            return { handleMsg: handleMsg };
        },
        decreaseAllowance: function (_a, spender, amount, expiration) {
            var padding = _a.padding;
            var handleMsg = {
                decrease_allowance: { spender: spender, amount: amount, expiration: expiration, padding: padding },
            };
            return { handleMsg: handleMsg };
        },
        transferFrom: function (_a, owner, recipient, amount) {
            var padding = _a.padding;
            var handleMsg = {
                transfer_from: { owner: owner, recipient: recipient, amount: amount, padding: padding },
            };
            return { handleMsg: handleMsg };
        },
        sendFrom: function (_a, owner, recipient, amount, msg) {
            var padding = _a.padding;
            var handleMsg = {
                send_from: { owner: owner, recipient: recipient, amount: amount, msg: msg, padding: padding },
            };
            return { handleMsg: handleMsg };
        },
        mint: function (_a, recipient, amount) {
            var padding = _a.padding;
            var handleMsg = {
                mint: { recipient: recipient, amount: amount, padding: padding },
            };
            return { handleMsg: handleMsg };
        },
        setMinters: function (_a, minters) {
            var padding = _a.padding;
            var handleMsg = {
                set_minters: { minters: minters, padding: padding },
            };
            return { handleMsg: handleMsg };
        },
        burn: function (_a, amount) {
            var padding = _a.padding;
            var handleMsg = {
                burn: { amount: amount, padding: padding },
            };
            return { handleMsg: handleMsg };
        },
        burnFrom: function (_a, owner, amount) {
            var padding = _a.padding;
            var handleMsg = {
                burn_from: { owner: owner, amount: amount, padding: padding },
            };
            return { handleMsg: handleMsg };
        },
        deposit: function (_a, amount) {
            var padding = _a.padding;
            var handleMsg = {
                deposit: { padding: padding },
            };
            var transferAmount = {
                denom: 'uscrt',
                amount: amount,
            };
            return { handleMsg: handleMsg, transferAmount: transferAmount };
        },
        redeem: function (_a, amount, denom) {
            var padding = _a.padding;
            var handleMsg = {
                redeem: { amount: amount, denom: denom, padding: padding },
            };
            return { handleMsg: handleMsg };
        },
    },
};
exports.snip20BasePermitDef = {
    queries: {
        getBalance: function (_a) {
            var permit = _a.permit;
            var query = { balance: {} };
            return { with_permit: { query: query, permit: permit } };
        },
        getTransferHistory: function (_a, page_size, page) {
            var permit = _a.permit;
            var query = { transfer_history: { page_size: page_size, page: page } };
            return { with_permit: { query: query, permit: permit } };
        },
        getAllowance: function (_a, owner, spender) {
            var permit = _a.permit;
            var query = { allowance: { owner: owner, spender: spender } };
            return { with_permit: { query: query, permit: permit } };
        },
    },
};
exports.snip20PermitDef = __1.extendContract(exports.snip20Def, exports.snip20BasePermitDef);
//# sourceMappingURL=snip-20-def.js.map