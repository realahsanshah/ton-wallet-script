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
exports.transferTons = exports.getBalance = exports.getAccount = exports.createAccount = void 0;
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
var transferTons = function (wallet, secretKey, to, amount, message) {
    if (message === void 0) { message = ""; }
    return __awaiter(void 0, void 0, void 0, function () {
        var contract, secretKeyArray, keyPair, seqno, result, sendResult, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    contract = client.open(wallet);
                    secretKeyArray = secretKey.split(',').map(function (x) { return parseInt(x); });
                    return [4 /*yield*/, (0, ton_crypto_1.keyPairFromSecretKey)(Buffer.from(secretKeyArray))];
                case 1:
                    keyPair = _a.sent();
                    debugger;
                    return [4 /*yield*/, contract.getSeqno()];
                case 2:
                    seqno = _a.sent();
                    debugger;
                    return [4 /*yield*/, contract.createTransfer({
                            seqno: seqno,
                            messages: [(0, ton_1.internal)({
                                    to: to,
                                    // value: amount?.toString(),
                                    value: '1.5',
                                    body: message
                                })],
                            secretKey: keyPair.secretKey
                        })];
                case 3:
                    result = _a.sent();
                    debugger;
                    console.log('transfer result', result);
                    debugger;
                    return [4 /*yield*/, contract.send(result)];
                case 4:
                    sendResult = _a.sent();
                    debugger;
                    console.log('send result', sendResult);
                    return [2 /*return*/, sendResult];
                case 5:
                    e_4 = _a.sent();
                    console.log(e_4);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
};
exports.transferTons = transferTons;
// const wallet = createAccount();
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var secretKey, wallet, balance, receiverAddress, result, newBalance;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                secretKey = '145,249,57,254,181,44,96,88,10,78,200,174,107,46,35,39,198,19,101,117,194,59,145,223,48,64,171,218,39,87,245,58,112,176,23,150,113,232,99,116,185,127,78,6,35,28,165,223,211,128,147,160,179,24,89,218,122,155,63,98,136,222,30,14';
                return [4 /*yield*/, (0, exports.getAccount)(secretKey)];
            case 1:
                wallet = _a.sent();
                return [4 /*yield*/, (0, exports.getBalance)(wallet)];
            case 2:
                balance = _a.sent();
                console.log('balance', balance);
                receiverAddress = "EQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqB2N";
                debugger;
                return [4 /*yield*/, (0, exports.transferTons)(wallet, secretKey, receiverAddress, 1, "Hello world")];
            case 3:
                result = _a.sent();
                debugger;
                console.log('transfer result', result);
                return [4 /*yield*/, (0, exports.getBalance)(wallet)];
            case 4:
                newBalance = _a.sent();
                console.log('new balance', newBalance);
                debugger;
                return [2 /*return*/];
        }
    });
}); })();
