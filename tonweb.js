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
exports.getAccount = void 0;
var ton_1 = require("ton");
var ton_crypto_1 = require("ton-crypto");
var TonWeb = require('tonweb');
var tonweb = new TonWeb(new TonWeb.HttpProvider('https://testnet.toncenter.com/api/v2/jsonRPC'));
debugger;
var getAccount = function (secretKey) { return __awaiter(void 0, void 0, void 0, function () {
    var secretKeyArray, keyPair, workchain, wallet, e_1;
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
                e_1 = _a.sent();
                console.log(e_1);
                throw e_1;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAccount = getAccount;
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var client, secretKey, secretKeyBuffer, keyPair, wallet, usdtContractAddress, recipientAddress, tokenAmount, Cell, transferMessage, seqno, contract, result, sendResult, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                client = new ton_1.TonClient({
                    endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC'
                });
                secretKey = "159,25,68,91,70,155,130,104,242,178,123,154,151,60,215,203,158,81,154,125,150,68,113,158,158,254,164,33,56,41,122,180,114,216,56,227,212,167,222,239,153,57,241,228,154,105,154,81,16,183,169,40,201,203,2,226,37,223,163,11,103,184,200,63";
                secretKeyBuffer = Buffer.from(secretKey.split(',').map(function (x) { return parseInt(x); }));
                debugger;
                keyPair = (0, ton_crypto_1.keyPairFromSecretKey)(secretKeyBuffer);
                debugger;
                return [4 /*yield*/, (0, exports.getAccount)(secretKey)];
            case 1:
                wallet = _a.sent();
                debugger;
                // const walletAddress = await wallet.getAddress();
                // console.log('Wallet Address:', walletAddress.toString(true, true, true));
                console.log();
                debugger;
                usdtContractAddress = 'EQBNXnmozSrMWSaBI2x247OSfexFJnbT_WkLRqb7Nx4mqiN1';
                recipientAddress = 'EQAoOK0KUf9fTnnLywTpLfvRvxktcv6iIMVyCu0_Nm_nvDzp';
                tokenAmount = 1 * Math.pow(10, 6);
                Cell = TonWeb.boc.Cell;
                transferMessage = new Cell();
                transferMessage.bits.writeUint(0x178D4519, 32); // OP Transfer
                transferMessage.bits.writeUint(0, 64); // Query ID
                transferMessage.bits.writeAddress(new TonWeb.Address(recipientAddress));
                transferMessage.bits.writeCoins(tokenAmount);
                transferMessage.bits.writeUint(0, 1); // Forward payload (optional)
                debugger;
                seqno = 0;
                contract = client.open(wallet);
                return [4 /*yield*/, contract.createTransfer({
                        seqno: seqno,
                        messages: [(0, ton_1.internal)({
                                to: usdtContractAddress,
                                value: '0.05',
                                body: transferMessage
                            })],
                        secretKey: keyPair.secretKey
                    })];
            case 2:
                result = _a.sent();
                console.log('transfer result', result);
                return [4 /*yield*/, contract.send(result)];
            case 3:
                sendResult = _a.sent();
                console.log('send result', sendResult);
                debugger;
                return [3 /*break*/, 5];
            case 4:
                e_2 = _a.sent();
                console.log(e_2);
                debugger;
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); })();
