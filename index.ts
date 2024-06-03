const Tonweb = require('tonweb');
const { randomBytes } = require('crypto');


const rpc = "https://testnet.toncenter.com/api/v2/jsonRPC";

const createAccount = async () => {
    try {
        const tonweb = new Tonweb(rpc);
        debugger
        const seedString = randomBytes(32).toString('base64');
        debugger
        const seed = Tonweb.utils.base64ToBytes(seedString);
        const keyPair = Tonweb.utils.nacl.sign.keyPair.fromSeed(seed);
        debugger
        // Create v3 wallet

        const WalletClass = tonweb.wallet.all['v3R2'];
        debugger
        const wallet = new WalletClass(tonweb.provider, {
            publicKey: keyPair.publicKey,
            wc: 0
        });
        debugger
        const walletAddress = (await wallet.getAddress()).toString(true, true, true);
        debugger
        console.log('my address', walletAddress)
        debugger

        const secretKey = keyPair.secretKey;
        debugger;
        console.log("my secret key", secretKey);

        debugger;
    }
    catch (e) {
        console.log(e);
    }
}

export const isValidTonAddress = (address: string) => {
    try {
        debugger
        const data = new Tonweb.Address(address);
        debugger
        return true;
    } catch (e) {
        return false;
    }
}

// createAccount();

const address = "EQAoOK0KUf9fTnnLywTpLfvRvxkt6iIMVyCu0_Nm_nvDzp";

console.log(isValidTonAddress(address)); // true

