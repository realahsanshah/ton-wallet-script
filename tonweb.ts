import { TonClient, WalletContractV4, internal } from "ton";
import { keyPairFromSecretKey } from "ton-crypto";

const TonWeb = require('tonweb');
const tonweb = new TonWeb(new TonWeb.HttpProvider('https://testnet.toncenter.com/api/v2/jsonRPC'));
debugger
export const getAccount = async (secretKey: string) => {
    try {
        const secretKeyArray = secretKey.split(',').map((x) => parseInt(x));
        const keyPair = await keyPairFromSecretKey(Buffer.from(secretKeyArray));

        const workchain = 0;

        const wallet = WalletContractV4.create({ workchain, publicKey: keyPair.publicKey });

        console.log('my address', wallet.address);

        return wallet;
    }
    catch (e) {
        console.log(e);
        throw e;
    }
}
(async () => {
    try {
        const client = new TonClient({
            endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC',
        })
        const secretKey = "159,25,68,91,70,155,130,104,242,178,123,154,151,60,215,203,158,81,154,125,150,68,113,158,158,254,164,33,56,41,122,180,114,216,56,227,212,167,222,239,153,57,241,228,154,105,154,81,16,183,169,40,201,203,2,226,37,223,163,11,103,184,200,63";

        const secretKeyBuffer = Buffer.from(secretKey.split(',').map(x => parseInt(x)));
        debugger
        const keyPair = keyPairFromSecretKey(secretKeyBuffer);
        debugger
        // const WalletClass = tonweb.wallet.all.v4R1;
        // const wallet = new WalletClass(tonweb.provider, {
        //     publicKey: keyPair.publicKey,
        //     wc: 0
        // });
        const wallet = await getAccount(secretKey);
        debugger
        // const walletAddress = await wallet.getAddress();
        // console.log('Wallet Address:', walletAddress.toString(true, true, true));

        console.log()

        debugger
        const usdtContractAddress = 'EQBNXnmozSrMWSaBI2x247OSfexFJnbT_WkLRqb7Nx4mqiN1'; // Replace with the actual USDT contract address
        const recipientAddress = 'EQAoOK0KUf9fTnnLywTpLfvRvxktcv6iIMVyCu0_Nm_nvDzp'; // Replace with the recipient's TON address
        const tokenAmount = 1 * Math.pow(10, 6);
        // debugger
        const Cell = TonWeb.boc.Cell;
        const transferMessage = new Cell();
        transferMessage.bits.writeUint(0x178D4519, 32); // OP Transfer
        transferMessage.bits.writeUint(0, 64); // Query ID
        transferMessage.bits.writeAddress(new TonWeb.Address(recipientAddress));
        transferMessage.bits.writeCoins(tokenAmount);
        transferMessage.bits.writeUint(0, 1); // Forward payload (optional)
        debugger
        const seqno = 0;
        // debugger
        // const transfer = wallet.createTransfer({
        //     secretKey: keyPair.secretKey,
        //     to: usdtContractAddress,
        //     amount: TonWeb.utils.toNano('0.05'), // TON fee for the transaction
        //     seqno: seqno || 0,
        //     payload: transferMessage,
        // });
        const contract = client.open(wallet);

        const result = await contract.createTransfer({
            seqno,
            messages: [internal({
                to: usdtContractAddress,
                value: '0.05',
                body: transferMessage,
            })],
            secretKey: keyPair.secretKey,
        })

        console.log('transfer result', result);

        const sendResult = await contract.send(result);

        console.log('send result', sendResult);
        debugger
        // const fee = await transfer.estimateFee();
        // debugger
        // await transfer.send();
        // console.log('Transfer sent');
    } catch (e) {
        console.log(e)
        debugger
    }
})();