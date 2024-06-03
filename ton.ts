import { Address, TonClient, WalletContractV4, internal } from "ton";
import { keyPairFromSecretKey, mnemonicNew, mnemonicToPrivateKey, } from "ton-crypto";

const client = new TonClient({
    endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC',
});


export const createAccount = async () => {
    try {
        debugger
        const mnemonic = await mnemonicNew();
        debugger
        const keyPair = await mnemonicToPrivateKey(mnemonic);
        debugger
        const workchain = 0; // Usually you need a workchain 0
        const wallet = WalletContractV4.create({ workchain, publicKey: keyPair.publicKey });
        debugger
        console.log('my secret key', keyPair.secretKey);
        debugger
    }
    catch (e) {
        console.log(e);
    }
}


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

export const getBalance = async (wallet: WalletContractV4) => {
    try {
        const contract = client.open(wallet);

        const balance = await contract.getBalance();
        console.log('balance', balance);

        return balance;
    }
    catch (e) {
        console.log(e);
    }
}

export const getWalletFromAddress = async (address: string) => {
    try {
        const wallet = WalletContractV4.create({ workchain: 0, publicKey: Buffer.from(address, 'hex') });

        return wallet;
    }
    catch (e) {
        console.log(e);
    }
}

export const getWalletSecretKeyFromMnemonic = async (mnemonic: string[]) => {
    try {
        const keyPair = await mnemonicToPrivateKey(mnemonic);

        return keyPair.secretKey?.toJSON()?.data?.toString();
    }
    catch (e) {
        console.log(e);
    }
}

export const transferTons = async (wallet: WalletContractV4, secretKey: string, to: string, amount: number, message = "") => {
    try {
        const contract = client.open(wallet);

        const secretKeyArray = secretKey.split(',').map((x) => parseInt(x));
        const keyPair = await keyPairFromSecretKey(Buffer.from(secretKeyArray));

        const seqno: number = await contract.getSeqno();

        const result = await contract.createTransfer({
            seqno,
            messages: [internal({
                to: to,
                value: amount?.toString(),
                body: message,
            })],
            secretKey: keyPair.secretKey,
        })

        console.log('transfer result', result);

        const sendResult = await contract.send(result);

        console.log('send result', sendResult);
        return sendResult;
    }
    catch (e) {
        console.log(e);
    }
}

export const getTokenBalance = async (address: string, tokenAddress: string) => {
    try {
        const toncenter = new TonClient({
            endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC',
        });
        debugger
        const data = await toncenter.getContractState(Address.parse(tokenAddress));
        debugger

        debugger
    } catch (e) {
        console.log(e);
    }
}

// const wallet = createAccount();
(async () => {
    // const secretKey = '145,249,57,254,181,44,96,88,10,78,200,174,107,46,35,39,198,19,101,117,194,59,145,223,48,64,171,218,39,87,245,58,112,176,23,150,113,232,99,116,185,127,78,6,35,28,165,223,211,128,147,160,179,24,89,218,122,155,63,98,136,222,30,14';
    // const wallet = await getAccount(secretKey);

    // const balance = await getBalance(wallet);

    // console.log('balance', balance);

    // // const receiverAddress = "EQAeCIcNxWGLUSjU7gyUZkR6RExnDQknpggyUbDvGHDMBUET";
    // const receiverAddress = "EQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqB2N";
    // debugger;
    // const result = await transferTons(wallet, secretKey, receiverAddress, 1, "Hello world");
    // debugger;
    // console.log('transfer result', result);

    // const newBalance = await getBalance(wallet);

    // console.log('new balance', newBalance);

    // debugger;

    // const key = "useless friend alone share trip vacant swift title choose state stay jacket leopard spider robot coin step urge result exotic subway snack tide praise"?.split(' ');

    // const secretKey = await getWalletSecretKeyFromMnemonic(key);

    // console.log('secret key', secretKey);

    const tokenAddress = "EQBNXnmozSrMWSaBI2x247OSfexFJnbT_WkLRqb7Nx4mqiN1";
    const userAddress = "EQAeCIcNxWGLUSjU7gyUZkR6RExnDQknpggyUbDvGHDMBUET"
    // debugger
    debugger
    const data = await getTokenBalance(userAddress, tokenAddress);
    debugger
})()