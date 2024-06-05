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
exports.getTokenName = void 0;
// const { Address } = require('ton');
var ton3_client_1 = require("@tegro/ton3-client");
var ton3_core_1 = require("ton3-core");
var dist_1 = require("@tegro/ton3-client/node_modules/ton3-core/dist");
function getTokenBalance(address, tokenContract) {
    return __awaiter(this, void 0, void 0, function () {
        var tonClient, contractAddress, accountAddress, jettonWallet, content, deployed, balance, _a, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tonClient = new ton3_client_1.TonClient({ endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC' });
                    debugger;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 8, , 9]);
                    contractAddress = new dist_1.Address(tokenContract);
                    accountAddress = new dist_1.Address(address);
                    debugger;
                    return [4 /*yield*/, tonClient.Jetton.getWalletAddress(contractAddress, accountAddress)];
                case 2:
                    jettonWallet = _b.sent();
                    debugger;
                    return [4 /*yield*/, tonClient.Jetton.getData(contractAddress)];
                case 3:
                    content = (_b.sent()).content;
                    debugger;
                    return [4 /*yield*/, tonClient.isContractDeployed(jettonWallet)];
                case 4:
                    deployed = _b.sent();
                    debugger;
                    if (!deployed) return [3 /*break*/, 6];
                    return [4 /*yield*/, tonClient.Jetton.getBalance(jettonWallet)];
                case 5:
                    _a = _b.sent();
                    return [3 /*break*/, 7];
                case 6:
                    _a = new ton3_core_1.Coins(0, { decimals: 9 });
                    _b.label = 7;
                case 7:
                    balance = _a;
                    debugger;
                    console.log("Balance: ".concat(balance, " USDT"));
                    return [3 /*break*/, 9];
                case 8:
                    error_1 = _b.sent();
                    console.error("Error fetching balance: ".concat(error_1.message));
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
var getTokenName = function (tokenContract) { return __awaiter(void 0, void 0, void 0, function () {
    var client, contractAddress, response, name_1, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                client = new ton3_client_1.TonClient({
                    endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC'
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                debugger;
                contractAddress = dist_1.Address.parse(tokenContract);
                debugger;
                return [4 /*yield*/, client.callGetMethod(contractAddress, 'name', [])];
            case 2:
                response = _a.sent();
                debugger;
                name_1 = response.stack[0].toString();
                debugger;
                console.log("Token Name: ".concat(name_1));
                return [3 /*break*/, 5];
            case 3:
                error_2 = _a.sent();
                console.error("Error fetching token name: ".concat(error_2.message));
                return [3 /*break*/, 5];
            case 4:
                client.close();
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getTokenName = getTokenName;
// Replace with the actual address and USDT token contract address
var address = 'EQAeCIcNxWGLUSjU7gyUZkR6RExnDQknpggyUbDvGHDMBUET';
var tokenContract = "EQBNXnmozSrMWSaBI2x247OSfexFJnbT_WkLRqb7Nx4mqiN1";
// Get the balance
getTokenBalance(address, tokenContract);
// getTokenName(tokenContract)
