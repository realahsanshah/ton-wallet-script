import { keyPairFromSecretKey } from "ton-crypto";
import TonWeb from "tonweb";
require('dotenv').config();

const rpc = 'https://testnet.toncenter.com/api/v2/jsonRPC';

const tonweb = new TonWeb(
    new TonWeb.HttpProvider(rpc)
);

const JETTON_MASTER_ADDRESS = "EQBNXnmozSrMWSaBI2x247OSfexFJnbT_WkLRqb7Nx4mqiN1";
// const JETTON_MASTER_ADDRESS = "EQAoOK0KUf9fTnnLywTpLfvRvxktcv6iIMVyCu0_Nm_nvDzp";


const getJettonWalletAddress = async (ownerAddress: string, tokenAddress: string) => {
    try {
        const addressData: any = {
            address: tokenAddress
        }


        const jettonMinter = new TonWeb.token.jetton.JettonMinter(tonweb.provider, addressData);

        debugger
        const address = await jettonMinter.getJettonWalletAddress(new TonWeb.utils.Address(ownerAddress));
        debugger
        // It is important to always check that wallet indeed is attributed to desired Jetton Master:
        const jettonWallet = new TonWeb.token.jetton.JettonWallet(tonweb.provider, {
            address: address,
        });
        debugger
        const jettonData = await jettonWallet.getData();
        debugger
        // if (jettonData.jettonMinterAddress.toString(false) !== new TonWeb.utils.Address(info.address).toString(false)) {
        //     throw new Error('jetton minter address from jetton wallet doesnt match config');
        // }
        debugger
        console.log('Jetton wallet address:', address.toString(true, true, true));
        debugger


    }
    catch (err: any) {
        console.log(err);
        debugger
        throw new Error(err?.message);
    }
}


export const transferJettons = async (tokenAddress: string, secretKey: string, from: string, to: string = "", amount: number = 0, message = "") => {
    try {
        debugger
        const secretKeyArray = secretKey.split(',').map((x) => parseInt(x));
        debugger
        const keyPair = await keyPairFromSecretKey(Buffer.from(secretKeyArray));
        debugger
        const WalletClass = tonweb.wallet.all['v4R1'];
        debugger
        const wallet = new WalletClass(tonweb.provider, {
            publicKey: keyPair.publicKey,
        });
        debugger
        const addressData: any = {
            address: tokenAddress
        }

        debugger
        const jettonMinter = new TonWeb.token.jetton.JettonMinter(tonweb.provider, addressData);

        debugger
        const address = await jettonMinter.getJettonWalletAddress(new TonWeb.utils.Address(from));
        debugger
        // It is important to always check that wallet indeed is attributed to desired Jetton Master:
        const jettonWallet = new TonWeb.token.jetton.JettonWallet(tonweb.provider, {
            address: address,
        });
        debugger
        debugger
        const JETTON_WALLET_ADDRESS = address.toString(true, true, true)

        debugger

        const comment = new Uint8Array([... new Uint8Array(4), ... new TextEncoder().encode('text comment')]);
        debugger

        const seqno = 0;
        debugger


        const trx = await wallet.methods.transfer({
            secretKey: keyPair.secretKey,
            toAddress: JETTON_WALLET_ADDRESS, // address of Jetton wallet of Jetton sender
            amount: TonWeb.utils.toNano('0.05'), // total amount of TONs attached to the transfer message
            seqno: seqno,
            payload: await jettonWallet.createTransferBody({
                tokenAmount: TonWeb.utils.toNano('500'), // Jetton amount (in basic indivisible units)
                toAddress: new TonWeb.utils.Address(to), // recepient user's wallet address (not Jetton wallet)
                forwardAmount: TonWeb.utils.toNano('0.01'), // some amount of TONs to invoke Transfer notification message
                forwardPayload: comment, // text comment for Transfer notification message
                responseAddress: new TonWeb.utils.Address(from) // return the TONs after deducting commissions back to the sender's wallet address
            }),
            sendMode: 3,
        }).send()

        debugger

        // await wallet.methods.transfer({
        //     secretKey:keyPair.secretKey,
        //     toAddress:
        // })


    }

    catch (e) {
        console.log(e);
    }
}


const walletAddress = "EQAoOK0KUf9fTnnLywTpLfvRvxktcv6iIMVyCu0_Nm_nvDzp";
// debugger
// getJettonWalletAddress(walletAddress, JETTON_MASTER_ADDRESS);
// debugger
const receiverAddress = "EQAvK1NK88r4n8O7JeGmsj1uflQAC4lJ1P_02LJRlqpIf_7M";
const secretKey = process.env.SECRET_KEY || "";
transferJettons(JETTON_MASTER_ADDRESS, secretKey, walletAddress, receiverAddress);