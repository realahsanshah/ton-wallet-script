"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
const Tonweb = require("tonweb");
const { randomBytes } = require("crypto");
const rpc = "https://testnet.toncenter.com/api/v2/jsonRPC";
const createAccount = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const tonweb = new Tonweb(rpc);
      debugger;
      const seedString = randomBytes(32).toString("base64");
      debugger;
      const seed = Tonweb.utils.base64ToBytes(seedString);
      const keyPair = Tonweb.utils.nacl.sign.keyPair.fromSeed(seed);
      debugger;
      // Create v3 wallet
      const WalletClass = tonweb.wallet.all["v3R2"];
      debugger;
      const wallet = new WalletClass(tonweb.provider, {
        publicKey: keyPair.publicKey,
        wc: 0,
      });
      debugger;
      const walletAddress = (yield wallet.getAddress()).toString(
        true,
        true,
        true
      );
      debugger;
      console.log("my address", walletAddress);
      debugger;
      const secretKey = keyPair.secretKey;
      debugger;
      console.log("my secret key", secretKey);
      debugger;
    } catch (e) {
      console.log(e);
    }
  });
createAccount();

export const getCoinBalance = async (address, coinAddress) => {};
