"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getTokenBalance = exports.getJettonContract = exports.TON_WALLET_HEX = exports.TON_TOKEN_HEX = exports.transferJetton = exports.transferTons = exports.getWalletSecretKeyFromMnemonic = exports.getWalletFromAddress = exports.getBalance = exports.getAccount = exports.createAccount = void 0;
var ton_1 = require("ton");
var ton_crypto_1 = require("ton-crypto");
var client = new ton_1.TonClient({
    endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC'
});
var createAccount = function () { return __awaiter(void 0, void 0, void 0, function () {
    var mnemonic, keyPair, workchain, wallet, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                debugger;
                return [4 /*yield*/, (0, ton_crypto_1.mnemonicNew)()];
            case 1:
                mnemonic = _a.sent();
                debugger;
                return [4 /*yield*/, (0, ton_crypto_1.mnemonicToPrivateKey)(mnemonic)];
            case 2:
                keyPair = _a.sent();
                debugger;
                workchain = 0;
                wallet = ton_1.WalletContractV4.create({ workchain: workchain, publicKey: keyPair.publicKey });
                debugger;
                console.log('my secret key', keyPair.secretKey);
                debugger;
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                console.log(e_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createAccount = createAccount;
var getAccount = function (secretKey) { return __awaiter(void 0, void 0, void 0, function () {
    var secretKeyArray, keyPair, workchain, wallet, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                secretKeyArray = secretKey.split(',').map(function (x) { return parseInt(x); });
                return [4 /*yield*/, (0, ton_crypto_1.keyPairFromSecretKey)(Buffer.from(secretKeyArray))];
            case 1:
                keyPair = _a.sent();
                workchain = 0;
                wallet = ton_1.WalletContractV4.create({ workchain: workchain, publicKey: keyPair.publicKey });
                console.log('my address', wallet.address);
                return [2 /*return*/, wallet];
            case 2:
                e_2 = _a.sent();
                console.log(e_2);
                throw e_2;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAccount = getAccount;
var getBalance = function (wallet) { return __awaiter(void 0, void 0, void 0, function () {
    var contract, balance, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                contract = client.open(wallet);
                return [4 /*yield*/, contract.getBalance()];
            case 1:
                balance = _a.sent();
                console.log('balance', balance);
                return [2 /*return*/, balance];
            case 2:
                e_3 = _a.sent();
                console.log(e_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getBalance = getBalance;
var getWalletFromAddress = function (address) { return __awaiter(void 0, void 0, void 0, function () {
    var wallet;
    return __generator(this, function (_a) {
        try {
            wallet = ton_1.WalletContractV4.create({ workchain: 0, publicKey: Buffer.from(address, 'hex') });
            return [2 /*return*/, wallet];
        }
        catch (e) {
            console.log(e);
        }
        return [2 /*return*/];
    });
}); };
exports.getWalletFromAddress = getWalletFromAddress;
var getWalletSecretKeyFromMnemonic = function (mnemonic) { return __awaiter(void 0, void 0, void 0, function () {
    var keyPair, e_4;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, ton_crypto_1.mnemonicToPrivateKey)(mnemonic)];
            case 1:
                keyPair = _d.sent();
                return [2 /*return*/, (_c = (_b = (_a = keyPair.secretKey) === null || _a === void 0 ? void 0 : _a.toJSON()) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.toString()];
            case 2:
                e_4 = _d.sent();
                console.log(e_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getWalletSecretKeyFromMnemonic = getWalletSecretKeyFromMnemonic;
var transferTons = function (wallet, secretKey, to, amount, message) {
    if (message === void 0) { message = ""; }
    return __awaiter(void 0, void 0, void 0, function () {
        var contract, secretKeyArray, keyPair, seqno, result, sendResult, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    contract = client.open(wallet);
                    secretKeyArray = secretKey.split(',').map(function (x) { return parseInt(x); });
                    return [4 /*yield*/, (0, ton_crypto_1.keyPairFromSecretKey)(Buffer.from(secretKeyArray))];
                case 1:
                    keyPair = _a.sent();
                    return [4 /*yield*/, contract.getSeqno()];
                case 2:
                    seqno = _a.sent();
                    return [4 /*yield*/, contract.createTransfer({
                            seqno: seqno,
                            messages: [(0, ton_1.internal)({
                                    to: to,
                                    value: amount === null || amount === void 0 ? void 0 : amount.toString(),
                                    body: message
                                })],
                            secretKey: keyPair.secretKey
                        })];
                case 3:
                    result = _a.sent();
                    console.log('transfer result', result);
                    return [4 /*yield*/, contract.send(result)];
                case 4:
                    sendResult = _a.sent();
                    console.log('send result', sendResult);
                    return [2 /*return*/, sendResult];
                case 5:
                    e_5 = _a.sent();
                    console.log(e_5);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
};
exports.transferTons = transferTons;
var transferJetton = function (wallet, secretKey, to, amount, tokenAddress, message) {
    if (message === void 0) { message = ""; }
    return __awaiter(void 0, void 0, void 0, function () {
        var client_1, secretKeyArray, keyPair, wallet_1, jettonMaster, e_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    client_1 = new ton_1.TonClient({
                        endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC'
                    });
                    secretKeyArray = secretKey.split(',').map(function (x) { return parseInt(x); });
                    return [4 /*yield*/, (0, ton_crypto_1.keyPairFromSecretKey)(Buffer.from(secretKeyArray))];
                case 1:
                    keyPair = _a.sent();
                    wallet_1 = ton_1.WalletContractV4.create({ workchain: 0, publicKey: keyPair.publicKey });
                    jettonMaster = tokenAddress;
                    return [3 /*break*/, 3];
                case 2:
                    e_6 = _a.sent();
                    console.log(e_6);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.transferJetton = transferJetton;
exports.TON_TOKEN_HEX = {
    hex: "b5ee9c72410214010002d4000114ff00f4a413f4bcf2c80b010201200203020148040504f8f28308d71820d31fd31fd31f02f823bbf264ed44d0d31fd31fd3fff404d15143baf2a15151baf2a205f901541064f910f2a3f80024a4c8cb1f5240cb1f5230cbff5210f400c9ed54f80f01d30721c0009f6c519320d74a96d307d402fb00e830e021c001e30021c002e30001c0039130e30d03a4c8cb1f12cb1fcbff1011121302e6d001d0d3032171b0925f04e022d749c120925f04e002d31f218210706c7567bd22821064737472bdb0925f05e003fa403020fa4401c8ca07cbffc9d0ed44d0810140d721f404305c810108f40a6fa131b3925f07e005d33fc8258210706c7567ba923830e30d03821064737472ba925f06e30d06070201200809007801fa00f40430f8276f2230500aa121bef2e0508210706c7567831eb17080185004cb0526cf1658fa0219f400cb6917cb1f5260cb3f20c98040fb0006008a5004810108f45930ed44d0810140d720c801cf16f400c9ed540172b08e23821064737472831eb17080185005cb055003cf1623fa0213cb6acb1fcb3fc98040fb00925f03e20201200a0b0059bd242b6f6a2684080a06b90fa0218470d4080847a4937d29910ce6903e9ff9837812801b7810148987159f31840201580c0d0011b8c97ed44d0d70b1f8003db29dfb513420405035c87d010c00b23281f2fff274006040423d029be84c600201200e0f0019adce76a26840206b90eb85ffc00019af1df6a26840106b90eb858fc0006ed207fa00d4d422f90005c8ca0715cbffc9d077748018c8cb05cb0222cf165005fa0214cb6b12ccccc973fb00c84014810108f451f2a7020070810108d718fa00d33fc8542047810108f451f2a782106e6f746570748018c8cb05cb025006cf165004fa0214cb6a12cb1fcb3fc973fb0002006c810108d718fa00d33f305224810108f459f2a782106473747270748018c8cb05cb025005cf165003fa0213cb6acb1f12cb3fc973fb00000af400c9ed54696225e5"
};
exports.TON_WALLET_HEX = {
    hex: "b5ee9c724102120100037300019993635c9adc5dea000008003c110e1b8ac316a251a9dc1928cc88f48898ce1a124f4c1064a361de30e1980b0013579e6a334ab31649a048db1db8ece49f7b11499db4ff5a42d1a9becdc789aaa0010114ff00f4a413f4bcf2c80b0202016203040202cc0506001ba0f605da89a1f401f481f481a8610201d40708020120090a00c30831c02497c138007434c0c05c6c2544d7c0fc03383e903e900c7e800c5c75c87e800c7e800c1cea6d0000b4c7e08403e29fa954882ea54c4d167c0278208405e3514654882ea58c511100fc02b80d60841657c1ef2ea4d67c02f817c12103fcbc2000113e910c1c2ebcb853600201200b0c0083d40106b90f6a2687d007d207d206a1802698fc1080bc6a28ca9105d41083deecbef09dd0958f97162e99f98fd001809d02811e428027d012c678b00e78b6664f6aa401f1503d33ffa00fa4021f001ed44d0fa00fa40fa40d4305136a1522ac705f2e2c128c2fff2e2c254344270542013541403c85004fa0258cf1601cf16ccc922c8cb0112f400f400cb00c920f9007074c8cb02ca07cbffc9d004fa40f40431fa0020d749c200f2e2c4778018c8cb055008cf1670fa0217cb6b13cc80d0201200e0f009e8210178d4519c8cb1f19cb3f5007fa0222cf165006cf1625fa025003cf16c95005cc2391729171e25008a813a08209c9c380a014bcf2e2c504c98040fb001023c85004fa0258cf1601cf16ccc9ed5402f73b51343e803e903e90350c0234cffe80145468017e903e9014d6f1c1551cdb5c150804d50500f214013e809633c58073c5b33248b232c044bd003d0032c0327e401c1d3232c0b281f2fff274140371c1472c7cb8b0c2be80146a2860822625a019ad822860822625a028062849e5c412440e0dd7c138c34975c2c060101100d73b51343e803e903e90350c01f4cffe803e900c145468549271c17cb8b049f0bffcb8b08160824c4b402805af3cb8b0e0841ef765f7b232c7c572cfd400fe8088b3c58073c5b25c60063232c14933c59c3e80b2dab33260103ec01004f214013e809633c58073c5b3327b552000705279a018a182107362d09cc8cb1f5230cb3f58fa025007cf165007cf16c9718010c8cb0524cf165006fa0215cb6a14ccc971fb0010241023007cc30023c200b08e218210d53276db708010c8cb055008cf165004fa0216cb6a12cb1f12cb3fc972fb0093356c21e203c85004fa0258cf1601cf16ccc9ed544f271769"
};
var JETTON_MINTER_ADDRESS = "EQBNXnmozSrMWSaBI2x247OSfexFJnbT_WkLRqb7Nx4mqiN1";
var JETTON_WALLET_ADDRESS = "EQCKAYNR_4521mPf4-m1UiMqO63l9WEk0ZI_HzPypnxOHkFJ";
var getJettonContract = function (tokenAddress, tokenOwnerAddress) { return __awaiter(void 0, void 0, void 0, function () {
    var JETTON_MINTER_CODE, JETTON_WALLET_CODE, address, minterAddress, walletAddress, contract;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                debugger;
                JETTON_MINTER_CODE = ton_1.Cell.fromBoc(Buffer.from(exports.TON_TOKEN_HEX === null || exports.TON_TOKEN_HEX === void 0 ? void 0 : exports.TON_TOKEN_HEX.hex, "hex"));
                debugger;
                JETTON_WALLET_CODE = ton_1.Cell.fromBoc(Buffer.from(exports.TON_WALLET_HEX === null || exports.TON_WALLET_HEX === void 0 ? void 0 : exports.TON_WALLET_HEX.hex, "hex"));
                debugger;
                address = ton_1.Address.parse(tokenAddress);
                minterAddress = ton_1.Address.parse(JETTON_MINTER_ADDRESS);
                walletAddress = ton_1.Address.parse(JETTON_WALLET_ADDRESS);
                debugger;
                return [4 /*yield*/, ton_1.JettonWallet.create(JETTON_WALLET_CODE, (0, ton_1.beginCell)()
                        .storeCoins(0)
                        .storeAddress(minterAddress)
                        .storeAddress(walletAddress)
                        .storeRef(JETTON_WALLET_CODE)
                        .endCell())];
            case 1:
                contract = _a.sent();
                debugger;
                return [2 /*return*/];
        }
    });
}); };
exports.getJettonContract = getJettonContract;
var getTokenBalance = function (address, tokenAddress) { return __awaiter(void 0, void 0, void 0, function () {
    var toncenter, data, e_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                toncenter = new ton_1.TonClient({
                    endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC'
                });
                debugger;
                return [4 /*yield*/, toncenter.getContractState(ton_1.Address.parse(tokenAddress))];
            case 1:
                data = _a.sent();
                debugger;
                debugger;
                return [3 /*break*/, 3];
            case 2:
                e_7 = _a.sent();
                console.log(e_7);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getTokenBalance = getTokenBalance;
// async function sendJettons(secretKey: string, toAddress: string, contractAddress: string) {
//     // Initialize TON client
//     const client = new TonClient({
//         endpoint: 'https://mainnet.tonhubapi.com/jsonRPC'
//     });
//     // Your wallet mnemonic and recipient address
//     const mnemonic = 'your 12 or 24 word mnemonic phrase here';
//     const recipient = 'recipient wallet address here';
//     const amount = toNano('1'); // Amount of Jettons to send, in nanoJettons
//     // Derive wallet key from mnemonic
//     const key = keyPairFromSecretKey(Buffer.from(secretKey.split(',').map(x => parseInt(x))));
//     // Create wallet instance
//     const wallet = WalletContractV3R2.create({
//         workchain: 0,
//         publicKey: key.publicKey
//     });
//     // Get wallet address   
//     const walletAddress = wallet.address.toString(true, true, true);
//     console.log('Wallet Address:', walletAddress);
//     // Ensure the wallet has enough balance for the transaction fee
//     const balance = await client.getBalance(wallet.address);
//     console.log('Wallet Balance:', fromNano(balance), 'TON');
//     debugger
//     // if (balance.lt(toNano('0.1'))) {
//     //     throw new Error('Not enough TON balance to cover transaction fee');
//     // }
//     // Create transfer payload for Jetton transfer
//     const Cell = TonWeb.boc.Cell;
//     const body = new Cell();
//     debugger
//     const toAddressParsed = new Address(toAddress);
//     const amountInNano = toNano('0.05'); // Transfer amount in nanoJettons
//     body.bits.writeUint(0x18, 6); // OP code for Jetton transfer
//     body.bits.writeUint(1, 64); // Query ID
//     body.bits.writeAddress(toAddressParsed); // Jetton amount destination
//     body.bits.writeCoins(Number(amount)); // Amount of Jettons
//     body.bits.writeAddress(new Address(wallet.address?.toString())); // Response destination
//     body.bits.writeUint(0, 1); // Custom payload
//     debugger
//     // Create message for Jetton transfer
//     const transferMessage = {
//         to: recipient,
//         value: toNano('0.05'), // Transfer fee in TON
//         body: body,
//         bounce: true
//     };
//     const seqno = 0;
//     const transfer = wallet.methods.transfer({
//         secretKey: key.secretKey,
//         toAddress: to,
//         amount: TonWeb.utils.toNano('0.05'), // TON fee for the transaction
//         seqno: seqno,
//         payload: transferMessage,
//         sendMode: 3,
//     });
//     // Send the transfer
//     await client.sendExternalMessage(wallet, key.secretKey, transferMessage);
//     console.log('Jetton transfer completed successfully');
// }
// const wallet = createAccount();
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var secretKey, wallet, tokenAddress, userAddress;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                secretKey = "159,25,68,91,70,155,130,104,242,178,123,154,151,60,215,203,158,81,154,125,150,68,113,158,158,254,164,33,56,41,122,180,114,216,56,227,212,167,222,239,153,57,241,228,154,105,154,81,16,183,169,40,201,203,2,226,37,223,163,11,103,184,200,63";
                return [4 /*yield*/, (0, exports.getAccount)(secretKey)];
            case 1:
                wallet = _a.sent();
                debugger;
                tokenAddress = "EQBNXnmozSrMWSaBI2x247OSfexFJnbT_WkLRqb7Nx4mqiN1";
                userAddress = "EQAeCIcNxWGLUSjU7gyUZkR6RExnDQknpggyUbDvGHDMBUET";
                // debugger
                debugger;
                // const data = await getTokenBalance(userAddress, tokenAddress);
                debugger;
                return [2 /*return*/];
        }
    });
}); })();
