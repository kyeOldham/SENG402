"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.snip721PermitDef = exports.snip721Def = void 0;
var __1 = require("..");
exports.snip721Def = {
    queries: {
        getContractInfo: function () {
            return { contract_info: {} };
        },
        getNumTokens: function (_a, sendViewer) {
            var address = _a.address, viewing_key = _a.key;
            var viewer = sendViewer ? { address: address, viewing_key: viewing_key } : null;
            return { num_tokens: { viewer: viewer } };
        },
        getOwnerOf: function (_a, token_id, include_expired, sendViewer) {
            var address = _a.address, viewing_key = _a.key;
            var viewer = sendViewer ? { address: address, viewing_key: viewing_key } : null;
            return { owner_of: { token_id: token_id, viewer: viewer, include_expired: include_expired } };
        },
        getNftInfo: function (_, token_id) {
            return { nft_info: { token_id: token_id } };
        },
        getAllNftInfo: function (_a, token_id, include_expired, sendViewer) {
            var address = _a.address, viewing_key = _a.key;
            var viewer = sendViewer ? { address: address, viewing_key: viewing_key } : null;
            return { all_nft_info: { token_id: token_id, viewer: viewer, include_expired: include_expired } };
        },
        getPrivateMetadata: function (_a, token_id, sendViewer) {
            var address = _a.address, viewing_key = _a.key;
            var viewer = sendViewer ? { address: address, viewing_key: viewing_key } : null;
            return {
                private_metadata: {
                    token_id: token_id,
                    viewer: viewer,
                },
            };
        },
        getNftDossier: function (_a, token_id, include_expired, sendViewer) {
            var address = _a.address, viewing_key = _a.key;
            var viewer = sendViewer ? { address: address, viewing_key: viewing_key } : null;
            return {
                nft_dossier: {
                    token_id: token_id,
                    viewer: viewer,
                    include_expired: include_expired,
                },
            };
        },
        getTokenApprovals: function (_a, token_id, include_expired) {
            var viewing_key = _a.key;
            return {
                token_approvals: {
                    token_id: token_id,
                    viewing_key: viewing_key,
                    include_expired: include_expired,
                },
            };
        },
        getApprovedForAll: function (_a, include_expired, sendViewer) {
            var owner = _a.address, key = _a.key;
            var viewing_key = sendViewer ? key : null;
            return {
                approved_for_all: {
                    owner: owner,
                    viewing_key: viewing_key,
                    include_expired: include_expired,
                },
            };
        },
        getInventoryApprovals: function (_a, include_expired) {
            var address = _a.address, viewing_key = _a.key;
            return {
                inventory_approvals: {
                    address: address,
                    viewing_key: viewing_key,
                    include_expired: include_expired,
                },
            };
        },
        getTokens: function (_a, viewer, start_after, limit, sendViewer) {
            var owner = _a.address, key = _a.key;
            var viewing_key = sendViewer ? key : null;
            return {
                tokens: {
                    owner: owner,
                    viewer: viewer,
                    viewing_key: viewing_key,
                    start_after: start_after,
                    limit: limit,
                },
            };
        },
        getTransactionHistory: function (_a, page, page_size) {
            var address = _a.address, viewing_key = _a.key;
            return {
                transaction_history: {
                    address: address,
                    viewing_key: viewing_key,
                    page: page,
                    page_size: page_size,
                },
            };
        },
        getAllTokens: function (_a, limit, sendViewer) {
            var address = _a.address, viewing_key = _a.key;
            var viewer = sendViewer ? { address: address, viewing_key: viewing_key } : null;
            return { all_tokens: { viewer: viewer, limit: limit } };
        },
        getMinters: function (_) {
            return { minters: {} };
        },
        getRoyaltyInfo: function (_, token_id) {
            return { royalty_info: { token_id: token_id } };
        },
        getIsUnwrapped: function (_, token_id) {
            return { is_unwrapped: { token_id: token_id } };
        },
        getVerifyTransferApproval: function (_a, token_ids) {
            var address = _a.address, viewing_key = _a.key;
            return { verify_transfer_approval: { token_ids: token_ids, address: address, viewing_key: viewing_key } };
        },
    },
    messages: {
        transfer: function (_a, recipient, token_id, memo) {
            var padding = _a.padding;
            var handleMsg = {
                transfer_nft: { recipient: recipient, token_id: token_id, memo: memo, padding: padding },
            };
            return { handleMsg: handleMsg };
        },
        send: function (_a, contract, token_id, msg, memo) {
            var padding = _a.padding;
            var handleMsg = {
                send_nft: { contract: contract, token_id: token_id, msg: msg, memo: memo, padding: padding },
            };
            return { handleMsg: handleMsg };
        },
        approve: function (_a, spender, token_id, expires) {
            var padding = _a.padding;
            var handleMsg = {
                approve: { spender: spender, token_id: token_id, expires: expires, padding: padding },
            };
            return { handleMsg: handleMsg };
        },
        approveAll: function (_a, operator, expires) {
            var padding = _a.padding;
            var handleMsg = {
                approve_all: { operator: operator, expires: expires, padding: padding },
            };
            return { handleMsg: handleMsg };
        },
        revoke: function (_a, spender, token_id) {
            var padding = _a.padding;
            var handleMsg = {
                revoke: { spender: spender, token_id: token_id, padding: padding },
            };
            return { handleMsg: handleMsg };
        },
        revokeAll: function (_a, operator) {
            var padding = _a.padding;
            var handleMsg = {
                revoke_all: { operator: operator, padding: padding },
            };
            return { handleMsg: handleMsg };
        },
        setWhiteListedApproval: function (_a, address, token_id, view_owner, view_private_metadata, transfer, expires) {
            var padding = _a.padding;
            var handleMsg = {
                set_whitelisted_approval: {
                    address: address,
                    token_id: token_id,
                    view_owner: view_owner,
                    view_private_metadata: view_private_metadata,
                    transfer: transfer,
                    expires: expires,
                    padding: padding,
                },
            };
            return { handleMsg: handleMsg };
        },
        registerReceive: function (_a, code_hash, also_implements_batch_receive_nft) {
            var padding = _a.padding;
            var handleMsg = {
                register_receive_nft: {
                    code_hash: code_hash,
                    also_implements_batch_receive_nft: also_implements_batch_receive_nft,
                    padding: padding,
                },
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
        mintNft: function (_a, token_id, owner, public_metadata, private_metadata, serial_number, royalty_info, memo) {
            var address = _a.address, padding = _a.padding;
            var handleMsg = {
                mint_nft: {
                    token_id: token_id,
                    owner: owner || address,
                    public_metadata: public_metadata,
                    private_metadata: private_metadata,
                    serial_number: serial_number,
                    royalty_info: royalty_info,
                    memo: memo,
                    padding: padding,
                },
            };
            return {
                handleMsg: handleMsg,
            };
        },
        mintNftClones: function (_a, quantity, mint_run_id, owner, public_metadata, private_metadata, royalty_info, memo) {
            var address = _a.address, padding = _a.padding;
            var handleMsg = {
                mint_nft_clones: {
                    mint_run_id: mint_run_id,
                    quantity: quantity,
                    owner: owner || address,
                    public_metadata: public_metadata,
                    private_metadata: private_metadata,
                    royalty_info: royalty_info,
                    memo: memo,
                    padding: padding,
                },
            };
            return {
                handleMsg: handleMsg,
            };
        },
        addMinters: function (_a, minters) {
            var padding = _a.padding;
            var handleMsg = {
                add_minters: {
                    minters: minters,
                    padding: padding,
                },
            };
            return {
                handleMsg: handleMsg,
            };
        },
        removeMinters: function (_a, minters) {
            var padding = _a.padding;
            var handleMsg = {
                remove_minters: {
                    minters: minters,
                    padding: padding,
                },
            };
            return {
                handleMsg: handleMsg,
            };
        },
        setMinters: function (_a, minters) {
            var padding = _a.padding;
            var handleMsg = {
                set_minters: {
                    minters: minters,
                    padding: padding,
                },
            };
            return {
                handleMsg: handleMsg,
            };
        },
        setMetadata: function (_a, token_id, public_metadata, private_metadata) {
            var padding = _a.padding;
            var handleMsg = {
                set_metadata: {
                    token_id: token_id,
                    public_metadata: public_metadata,
                    private_metadata: private_metadata,
                    padding: padding,
                },
            };
            return {
                handleMsg: handleMsg,
            };
        },
        setRoyaltyInfo: function (_a, token_id, royalty_info) {
            var padding = _a.padding;
            var handleMsg = {
                set_royalty_info: {
                    token_id: token_id,
                    royalty_info: royalty_info,
                    padding: padding,
                },
            };
            return {
                handleMsg: handleMsg,
            };
        },
        batchMintNft: function (_a, mints) {
            var padding = _a.padding;
            var handleMsg = {
                batch_mint_nft: {
                    mints: mints,
                    padding: padding,
                },
            };
            return {
                handleMsg: handleMsg,
            };
        },
        batchTransferNft: function (_a, transfers) {
            var padding = _a.padding;
            var handleMsg = {
                batch_transfer_nft: {
                    transfers: transfers,
                    padding: padding,
                },
            };
            return {
                handleMsg: handleMsg,
            };
        },
        batchSendNft: function (_a, sends) {
            var padding = _a.padding;
            var handleMsg = {
                batch_send_nft: {
                    sends: sends,
                    padding: padding,
                },
            };
            return {
                handleMsg: handleMsg,
            };
        },
        burnNft: function (_a, token_id, memo) {
            var padding = _a.padding;
            var handleMsg = {
                burn_nft: {
                    token_id: token_id,
                    memo: memo,
                    padding: padding,
                },
            };
            return {
                handleMsg: handleMsg,
            };
        },
        BurnNft: function (_a, burns) {
            var padding = _a.padding;
            var handleMsg = {
                batch_burn_nft: {
                    burns: burns,
                    padding: padding,
                },
            };
            return {
                handleMsg: handleMsg,
            };
        },
        setGlobalApproval: function (_a, token_id, view_owner, view_private_metadata, expires) {
            var padding = _a.padding;
            var handleMsg = {
                set_global_approval: {
                    token_id: token_id,
                    view_owner: view_owner,
                    view_private_metadata: view_private_metadata,
                    expires: expires,
                    padding: padding,
                },
            };
            return {
                handleMsg: handleMsg,
            };
        },
        reveal: function (_a, token_id) {
            var padding = _a.padding;
            var handleMsg = {
                reveal: {
                    token_id: token_id,
                    padding: padding,
                },
            };
            return {
                handleMsg: handleMsg,
            };
        },
    },
};
var snip721BasePermitDef = {
    queries: {
        getNumTokens: function (_a, sendViewer) {
            var permit = _a.permit;
            var query = { num_tokens: {} };
            if (!sendViewer)
                return query;
            return { with_permit: { query: query, permit: permit } };
        },
        getOwnerOf: function (_a, token_id, include_expired, sendViewer) {
            var permit = _a.permit;
            var query = { owner_of: { token_id: token_id, include_expired: include_expired } };
            if (!sendViewer)
                return query;
            return { with_permit: { query: query, permit: permit } };
        },
        getAllNftInfo: function (_a, token_id, include_expired, sendViewer) {
            var permit = _a.permit;
            var query = { all_nft_info: { token_id: token_id, include_expired: include_expired } };
            if (!sendViewer)
                return query;
            return { with_permit: { query: query, permit: permit } };
        },
        getPrivateMetadata: function (_a, token_id, sendViewer) {
            var permit = _a.permit;
            var query = {
                private_metadata: {
                    token_id: token_id,
                },
            };
            if (!sendViewer)
                return query;
            return { with_permit: { query: query, permit: permit } };
        },
        getNftDossier: function (_a, token_id, include_expired, sendViewer) {
            var permit = _a.permit;
            var query = {
                nft_dossier: {
                    token_id: token_id,
                    include_expired: include_expired,
                },
            };
            if (!sendViewer)
                return query;
            return { with_permit: { query: query, permit: permit } };
        },
        getTokenApprovals: function (_a, token_id, include_expired) {
            var permit = _a.permit;
            var query = {
                token_approvals: {
                    token_id: token_id,
                    include_expired: include_expired,
                },
            };
            return { with_permit: { query: query, permit: permit } };
        },
        getApprovedForAll: function (_a, include_expired, sendViewer) {
            var owner = _a.address, permit = _a.permit;
            var query = {
                approved_for_all: {
                    owner: owner,
                    include_expired: include_expired,
                },
            };
            if (!sendViewer)
                return query;
            return { with_permit: { query: query, permit: permit } };
        },
        getInventoryApprovals: function (_a, include_expired) {
            var address = _a.address, permit = _a.permit;
            var query = {
                inventory_approvals: {
                    address: address,
                    include_expired: include_expired,
                },
            };
            return { with_permit: { query: query, permit: permit } };
        },
        getTokens: function (_a, viewer, start_after, limit, sendViewer) {
            var owner = _a.address, permit = _a.permit;
            var query = {
                tokens: {
                    owner: owner,
                    viewer: viewer,
                    start_after: start_after,
                    limit: limit,
                },
            };
            if (!sendViewer)
                return query;
            return { with_permit: { query: query, permit: permit } };
        },
        getTransactionHistory: function (_a, page, page_size) {
            var address = _a.address, permit = _a.permit;
            var query = {
                transaction_history: {
                    address: address,
                    page: page,
                    page_size: page_size,
                },
            };
            return { with_permit: { query: query, permit: permit } };
        },
        getAllTokens: function (_a, limit, sendViewer) {
            var permit = _a.permit;
            var query = { all_tokens: { limit: limit } };
            if (!sendViewer)
                return query;
            return { with_permit: { query: query, permit: permit } };
        },
        getVerifyTransferApproval: function (_a, token_ids) {
            var permit = _a.permit;
            var query = { verify_transfer_approval: { token_ids: token_ids } };
            return { with_permit: { query: query, permit: permit } };
        },
    },
};
exports.snip721PermitDef = __1.extendContract(exports.snip721Def, snip721BasePermitDef);
//# sourceMappingURL=snip-721-def.js.map