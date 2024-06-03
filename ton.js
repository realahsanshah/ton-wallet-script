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
exports.getTokenBalance = exports.transferTons = exports.getWalletSecretKeyFromMnemonic = exports.getWalletFromAddress = exports.getBalance = exports.getAccount = exports.createAccount = void 0;
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
var getTokenBalance = function (address, tokenAddress) { return __awaiter(void 0, void 0, void 0, function () {
    var toncenter, data, e_6;
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
                e_6 = _a.sent();
                console.log(e_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getTokenBalance = getTokenBalance;
// const wallet = createAccount();
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var tokenAddress, userAddress, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                tokenAddress = "EQBNXnmozSrMWSaBI2x247OSfexFJnbT_WkLRqb7Nx4mqiN1";
                userAddress = "EQAeCIcNxWGLUSjU7gyUZkR6RExnDQknpggyUbDvGHDMBUET";
                // debugger
                debugger;
                return [4 /*yield*/, (0, exports.getTokenBalance)(userAddress, tokenAddress)];
            case 1:
                data = _a.sent();
                debugger;
                return [2 /*return*/];
        }
    });
}); })();
