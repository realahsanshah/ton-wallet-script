import {
    WalletContractV4,
    beginCell,
    Address,
    contractAddress,
    ContractProvider,
    TonClient4,
    TonClient,
    fromNano,
    toNano,
    Cell,
    BitString,
    Slice,
} from "@ton/ton";
import { keyPairFromSecretKey } from "ton-crypto";
import { SampleJetton } from "./output/sample-jetton";
import { JettonDefaultWallet } from "./output/sample-jetton-default";
import { buildOnchainMetadata } from "./utils/jetton-helpers";
require('dotenv').config();

const rpc = 'https://testnet.toncenter.com/api/v2/jsonRPC';
// const rpc = "https://testnet.tonapi.io/";
// const rpc = "https://sandbox-v4.tonhubapi.com";

const secretKey = process.env.SECRET_KEY || "";
debugger

const USDT_CONTRACT_ADDRESS = "EQCKAYNR_4521mPf4-m1UiMqO63l9WEk0ZI_HzPypnxOHkFJ";


export const getClient = async (rpc: string) => {
    try {
        const client = new TonClient4({
            endpoint: rpc,
        });

        return client;
    }
    catch (err: any) {
        console.log(err);
        throw new Error(err?.message);
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

const getJettonBalance = async (
    jettonAddress: string,
) => {
    try {
        // const rpc = "https://testnet.tonapi.io/";
        // debugger
        // const client = await getClient(rpc);
        // debugger

        // debugger
        // const contractAddressInAddress = Address.parseFriendly(jettonAddress);
        // debugger
        // const tokenContract = await client.open(SampleJetton.fromAddress(contractAddressInAddress.address));

        // debugger

        // const walletAddress = Address.parseFriendly("0QAeCIcNxWGLUSjU7gyUZkR6RExnDQknpggyUbDvGHDMBadc");
        debugger

        // const jetton_wallet = await tokenContract.getGetWalletAddress(walletAddress.address);
        debugger
        // const contract_dataFormat = JettonDefaultWallet.fromAddress(jetton_wallet);
        debugger
        // let contract = client.open(contract_dataFormat);
        debugger
        // console.log("Deployer's JettonWallet: " + contract.address);
        // debugger
        // let jettonWalletBalance = await (await contract.getGetWalletData()).balance;
        // debugger
        // let owner_of_wallet = await (await contract.getGetWalletData()).owner;
        // debugger
        // console.log("JettonWallet Balance: " + jettonWalletBalance);
        // console.log("JettonWallet Owner: \n" + owner_of_wallet);
        debugger
        // let contract = client.open(contract_dataFormat);
        // console.log("Deployer's JettonWallet: " + contract.address);



        // reference code
        // const rpc = 'https://testnet.toncenter.com/api/v2/jsonRPC';
        debugger
        const client = await getClient(rpc);
        const keyPair = await keyPairFromSecretKey(Buffer.from(secretKey.split(',').map((x) => parseInt(x))));
        const workchain = 0;
        debugger
        let deploy_wallet = WalletContractV4.create({ workchain: 0, publicKey: keyPair.publicKey });
        debugger
        let deploy_wallet_contract = client.open(deploy_wallet);
        debugger
        // Get deployment wallet balance
        // let balance: bigint = await deploy_address.getBalance();
        // const jettonParams = {
        //     name: "Test 123 Best Practice",
        //     description: "This is description of Test tact jetton",
        //     symbol: "PPPPPPPP",
        //     image: "https://cdn.logo.com/hotlink-ok/logo-social.png",
        // };
        debugger
        // let max_supply = toNano(1234567666666689011); // Set the specific total supply in nano
        debugger
        // Create content Cell
        // let content = buildOnchainMetadata(jettonParams);
        // debugger
        // let init = await SampleJetton.init(deploy_wallet_contract.address, content, max_supply);
        // debugger
        // let jetton_minter_contract_address = contractAddress(workchain, init);
        const jetton_minter_contract_address = Address.parse("EQBNXnmozSrMWSaBI2x247OSfexFJnbT_WkLRqb7Nx4mqiN1");
        debugger
        console.log("Jetton Master: " + jetton_minter_contract_address);
        debugger
        let contract_ddd = await client.open(SampleJetton.fromAddress(jetton_minter_contract_address));
        debugger
        // let jetton_wallet = await contract_ddd.getGetWalletAddress(deploy_wallet_contract.address);
        let jetton_wallet = await contract_ddd.getGetWalletAddress(Address.parse("EQCKAYNR_4521mPf4-m1UiMqO63l9WEk0ZI_HzPypnxOHkFJ"));
        debugger
        let contract_dataFormat = JettonDefaultWallet.fromAddress(jetton_wallet);
        debugger
        let contract = client.open(contract_dataFormat);
        console.log("Deployer's JettonWallet: " + contract.address);
        debugger
        let jettonWalletBalance = await (await contract.getGetWalletData()).balance;
        debugger
        let owner_of_wallet = await (await contract.getGetWalletData()).owner;
        debugger
        console.log("JettonWallet Balance: " + jettonWalletBalance);
        console.log("JettonWallet Owner: \n" + owner_of_wallet);
        debugger
        // TODO:
        // // loadOwnershipAssigned => msg.forwardload
        // let aa = loadTransferEvent(src.asSlice());
        // console.log("Mint MemberID: " + aa.item_index + ", by " + aa.minter);

        // reference code end

    }
    catch (err) {
        console.error(err);
    }
}

(async () => {
    const wallet = await getAccount(secretKey);

    debugger

    const jettonBalance = await getJettonBalance(USDT_CONTRACT_ADDRESS);

    debugger
})()