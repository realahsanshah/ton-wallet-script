import TonWeb from "tonweb";

const rpc = 'https://testnet.toncenter.com/api/v2/jsonRPC';

const JETTON_CONTENT_URI = 'https://ton.org/jetton.json';

const JETTON_WALLET_HEX = {
    codeHex: "b5ee9c7241020d0100029c000114ff00f4a413f4bcf2c80b0102016202030202cc040502037a600b0c02f1d906380492f81f000e8698180b8d8492f81f07d207d2018fd0018b8eb90fd0018fd001801698fe99ff6a2687d007d206a6a18400aa9385d47199a9a9b1b289a6382f97024817d207d006a18106840306b90fd001812881a282178050a502819e428027d012c678b666664f6aa7041083deecbef29385d7181406070093b5f0508806e0a84026a8280790a009f404b19e2c039e2d99924591960225e801e80196019241f200e0e9919605940f97ff93a0ef003191960ab19e2ca009f4042796d625999992e3f60101c036373701fa00fa40f82854120670542013541403c85004fa0258cf1601cf16ccc922c8cb0112f400f400cb00c9f9007074c8cb02ca07cbffc9d05006c705f2e04aa1034545c85004fa0258cf16ccccc9ed5401fa403020d70b01c300915be30d0801a682102c76b9735270bae30235373723c0038e1a335035c705f2e04903fa403059c85004fa0258cf16ccccc9ed54e03502c0048e185124c705f2e049d4304300c85004fa0258cf16ccccc9ed54e05f05840ff2f009003e8210d53276db708010c8cb055003cf1622fa0212cb6acb1fcb3fc98042fb0001fe365f03820898968015a015bcf2e04b02fa40d3003095c821cf16c9916de28210d1735400708018c8cb055005cf1624fa0214cb6a13cb1f14cb3f23fa443070ba8e33f828440370542013541403c85004fa0258cf1601cf16ccc922c8cb0112f400f400cb00c9f9007074c8cb02ca07cbffc9d0cf16966c227001cb01e2f4000a000ac98040fb00007dadbcf6a2687d007d206a6a183618fc1400b82a1009aa0a01e428027d012c678b00e78b666491646580897a007a00658064fc80383a6465816503e5ffe4e840001faf16f6a2687d007d206a6a183faa9040ef7c997d",
};


const provider = new TonWeb.HttpProvider(rpc);

const tonweb = new TonWeb(provider);

const OWNER_WALLET = "EQAeCIcNxWGLUSjU7gyUZkR6RExnDQknpggyUbDvGHDMBUET";
async function main() {
    try {
        const jettonMinter = new TonWeb.token.jetton.JettonMinter(tonweb.provider, {
            adminAddress: new TonWeb.utils.Address(OWNER_WALLET),
            jettonContentUri: JETTON_CONTENT_URI,
            jettonWalletCodeHex: JETTON_WALLET_HEX.codeHex,
        });
        debugger
        const jettonWalletAddress = await jettonMinter.getJettonWalletAddress(new TonWeb.utils.Address(OWNER_WALLET));
        debugger
        // It is important to always check that wallet indeed is attributed to desired Jetton Master:
        const jettonWallet = new TonWeb.token.jetton.JettonWallet(tonweb.provider, {
            address: jettonWalletAddress
        });
        debugger
        const jettonData = await jettonWallet.getData();
        // if (jettonData.jettonMinterAddress.toString(false) !== new TonWeb.utils.Address(info.address).toString(false)) {
        //     throw new Error('jetton minter address from jetton wallet doesnt match config');
        // }
        debugger
        console.log('Jetton wallet address:', jettonWalletAddress.toString(true, true, true));
        debugger
    }
    catch (e) {
        console.error(e);
    }
}

main();


