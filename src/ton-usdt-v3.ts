import TonWeb from "tonweb";

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

const walletAddress = "EQAoOK0KUf9fTnnLywTpLfvRvxktcv6iIMVyCu0_Nm_nvDzp";
debugger
getJettonWalletAddress(walletAddress, JETTON_MASTER_ADDRESS);
debugger