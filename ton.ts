import { Address, Cell, JettonWallet, TonClient, WalletContractV4, WalletContractV3R2, beginCell, internal, toNano, fromNano } from "ton";
import { keyPairFromSecretKey, mnemonicNew, mnemonicToPrivateKey, } from "ton-crypto";
import TonWeb from "tonweb";

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

export const getJettonBalance = async (walletAddress: string) => {
    try {
        // const balance = await tonweb.getBalance(address, tokenAddress);




    }
    catch (e) {
        console.log(e);
    }
}

export const transferJetton = async (wallet: WalletContractV4, secretKey: string, to: string, amount: number, tokenAddress: string, message = "") => {
    try {
        const client = new TonClient({
            endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC',
        });

        const secretKeyArray = secretKey.split(',').map((x) => parseInt(x));
        const keyPair = await keyPairFromSecretKey(Buffer.from(secretKeyArray));

        const wallet = WalletContractV4.create({ workchain: 0, publicKey: keyPair.publicKey });

        const jettonMaster = tokenAddress; // Jetton Master address



    }
    catch (e) {
        console.log(e);
    }
}


export const TON_TOKEN_HEX = {
    hex: "b5ee9c72410214010002d4000114ff00f4a413f4bcf2c80b010201200203020148040504f8f28308d71820d31fd31fd31f02f823bbf264ed44d0d31fd31fd3fff404d15143baf2a15151baf2a205f901541064f910f2a3f80024a4c8cb1f5240cb1f5230cbff5210f400c9ed54f80f01d30721c0009f6c519320d74a96d307d402fb00e830e021c001e30021c002e30001c0039130e30d03a4c8cb1f12cb1fcbff1011121302e6d001d0d3032171b0925f04e022d749c120925f04e002d31f218210706c7567bd22821064737472bdb0925f05e003fa403020fa4401c8ca07cbffc9d0ed44d0810140d721f404305c810108f40a6fa131b3925f07e005d33fc8258210706c7567ba923830e30d03821064737472ba925f06e30d06070201200809007801fa00f40430f8276f2230500aa121bef2e0508210706c7567831eb17080185004cb0526cf1658fa0219f400cb6917cb1f5260cb3f20c98040fb0006008a5004810108f45930ed44d0810140d720c801cf16f400c9ed540172b08e23821064737472831eb17080185005cb055003cf1623fa0213cb6acb1fcb3fc98040fb00925f03e20201200a0b0059bd242b6f6a2684080a06b90fa0218470d4080847a4937d29910ce6903e9ff9837812801b7810148987159f31840201580c0d0011b8c97ed44d0d70b1f8003db29dfb513420405035c87d010c00b23281f2fff274006040423d029be84c600201200e0f0019adce76a26840206b90eb85ffc00019af1df6a26840106b90eb858fc0006ed207fa00d4d422f90005c8ca0715cbffc9d077748018c8cb05cb0222cf165005fa0214cb6b12ccccc973fb00c84014810108f451f2a7020070810108d718fa00d33fc8542047810108f451f2a782106e6f746570748018c8cb05cb025006cf165004fa0214cb6a12cb1fcb3fc973fb0002006c810108d718fa00d33f305224810108f459f2a782106473747270748018c8cb05cb025005cf165003fa0213cb6acb1f12cb3fc973fb00000af400c9ed54696225e5",
};

export const TON_WALLET_HEX = {
    hex: "b5ee9c724102120100037300019993635c9adc5dea000008003c110e1b8ac316a251a9dc1928cc88f48898ce1a124f4c1064a361de30e1980b0013579e6a334ab31649a048db1db8ece49f7b11499db4ff5a42d1a9becdc789aaa0010114ff00f4a413f4bcf2c80b0202016203040202cc0506001ba0f605da89a1f401f481f481a8610201d40708020120090a00c30831c02497c138007434c0c05c6c2544d7c0fc03383e903e900c7e800c5c75c87e800c7e800c1cea6d0000b4c7e08403e29fa954882ea54c4d167c0278208405e3514654882ea58c511100fc02b80d60841657c1ef2ea4d67c02f817c12103fcbc2000113e910c1c2ebcb853600201200b0c0083d40106b90f6a2687d007d207d206a1802698fc1080bc6a28ca9105d41083deecbef09dd0958f97162e99f98fd001809d02811e428027d012c678b00e78b6664f6aa401f1503d33ffa00fa4021f001ed44d0fa00fa40fa40d4305136a1522ac705f2e2c128c2fff2e2c254344270542013541403c85004fa0258cf1601cf16ccc922c8cb0112f400f400cb00c920f9007074c8cb02ca07cbffc9d004fa40f40431fa0020d749c200f2e2c4778018c8cb055008cf1670fa0217cb6b13cc80d0201200e0f009e8210178d4519c8cb1f19cb3f5007fa0222cf165006cf1625fa025003cf16c95005cc2391729171e25008a813a08209c9c380a014bcf2e2c504c98040fb001023c85004fa0258cf1601cf16ccc9ed5402f73b51343e803e903e90350c0234cffe80145468017e903e9014d6f1c1551cdb5c150804d50500f214013e809633c58073c5b33248b232c044bd003d0032c0327e401c1d3232c0b281f2fff274140371c1472c7cb8b0c2be80146a2860822625a019ad822860822625a028062849e5c412440e0dd7c138c34975c2c060101100d73b51343e803e903e90350c01f4cffe803e900c145468549271c17cb8b049f0bffcb8b08160824c4b402805af3cb8b0e0841ef765f7b232c7c572cfd400fe8088b3c58073c5b25c60063232c14933c59c3e80b2dab33260103ec01004f214013e809633c58073c5b3327b552000705279a018a182107362d09cc8cb1f5230cb3f58fa025007cf165007cf16c9718010c8cb0524cf165006fa0215cb6a14ccc971fb0010241023007cc30023c200b08e218210d53276db708010c8cb055008cf165004fa0216cb6a12cb1f12cb3fc972fb0093356c21e203c85004fa0258cf1601cf16ccc9ed544f271769",
};

const JETTON_MINTER_ADDRESS = "EQBNXnmozSrMWSaBI2x247OSfexFJnbT_WkLRqb7Nx4mqiN1";
const JETTON_WALLET_ADDRESS = "EQCKAYNR_4521mPf4-m1UiMqO63l9WEk0ZI_HzPypnxOHkFJ";


// export const getJettonContract = async (tokenAddress: string, tokenOwnerAddress: string) => {
//     debugger
//     const JETTON_MINTER_CODE = Cell.fromBoc(Buffer.from(TON_TOKEN_HEX?.hex, "hex")); // code cell from build output
//     debugger
//     const JETTON_WALLET_CODE = Cell.fromBoc(Buffer.from(TON_WALLET_HEX?.hex, "hex")); // code cell from build output
//     debugger
//     const address = Address.parse(tokenAddress);

//     const minterAddress = Address.parse(JETTON_MINTER_ADDRESS);
//     const walletAddress = Address.parse(JETTON_WALLET_ADDRESS);
//     debugger
//     const contract = await JettonWallet.create(
//         JETTON_WALLET_CODE,
//         beginCell()
//             .storeCoins(0)
//             .storeAddress(minterAddress)
//             .storeAddress(walletAddress)
//             .storeRef(JETTON_WALLET_CODE)
//             .endCell()
//     )
//     debugger
// }


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
(async () => {
    const secretKey = "159,25,68,91,70,155,130,104,242,178,123,154,151,60,215,203,158,81,154,125,150,68,113,158,158,254,164,33,56,41,122,180,114,216,56,227,212,167,222,239,153,57,241,228,154,105,154,81,16,183,169,40,201,203,2,226,37,223,163,11,103,184,200,63";
    const wallet = await getAccount(secretKey);
    debugger
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

    // const data = await getTokenBalance(userAddress, tokenAddress);
    debugger
    // await getJettonContract(tokenAddress, "");
    // const secretKey = "159,25,68,91,70,155,130,104,242,178,123,154,151,60,215,203,158,81,154,125,150,68,113,158,158,254,164,33,56,41,122,180,114,216,56,227,212,167,222,239,153,57,241,228,154,105,154,81,16,183,169,40,201,203,2,226,37,223,163,11,103,184,200,63";

    const tokenBalance = await getJettonBalance(userAddress);

    debugger
})()