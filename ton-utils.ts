import { keyPairFromSecretKey } from "ton-crypto";
import { Address } from "ton3-core";

const TonClient = require('ton-client-node-js');
debugger
const client = new TonClient.TONClient({
    endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC',
});

const transferJettons = async (secretKey: string, tokenAddress: string, to: string, amount: number, decimals = 9) => {
    try {
        const secretKeyArr = secretKey.split(',').map((x) => parseInt(x));
        const keyPair = await keyPairFromSecretKey(Buffer.from(secretKeyArr));

        const workchain = 0;
        debugger
        const wallet = client.open({
            workchain,
            publicKey: keyPair.publicKey,
        });

        const jettonWallet = await client.Jetton.getWalletAddress(tokenAddress, wallet.address);
        debugger
        const { content } = await client.Jetton.getData(tokenAddress);
        debugger
        const deployed = await client.isContractDeployed(jettonWallet);

        debugger

        const receiverAddress = new Address(to);

        const amountInNano = amount * Math.pow(10, decimals);

        const response = await wallet.transferJettons({
            to: receiverAddress,
            jettonWallet: jettonWallet,
            amount: amountInNano,
            tokenContract: tokenAddress,
            fee: 0.1,
        });

        debugger

    }
    catch (err) {
        console.log(err);
        debugger
    }
}

const secretKey = "159,25,68,91,70,155,130,104,242,178,123,154,151,60,215,203,158,81,154,125,150,68,113,158,158,254,164,33,56,41,122,180,114,216,56,227,212,167,222,239,153,57,241,228,154,105,154,81,16,183,169,40,201,203,2,226,37,223,163,11,103,184,200,63";
const tokenAddress = "EQBNXnmozSrMWSaBI2x247OSfexFJnbT_WkLRqb7Nx4mqiN1";
const userAddress = "EQAeCIcNxWGLUSjU7gyUZkR6RExnDQknpggyUbDvGHDMBUET"

transferJettons(secretKey, tokenAddress, userAddress, 10, 6);