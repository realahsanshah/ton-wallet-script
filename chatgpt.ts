// const { Address } = require('ton');
import { TonClient, } from '@tegro/ton3-client';
import { Coins } from 'ton3-core';
import { Address } from '@tegro/ton3-client/node_modules/ton3-core/dist'

async function getTokenBalance(address: string, tokenContract: string) {
    // const client = new TonClient({
    //     endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC',
    // });
    const tonClient = new TonClient({ endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC', });

    debugger
    try {
        const contractAddress = new Address(tokenContract);
        const accountAddress = new Address(address);
        debugger
        const jettonWallet = await tonClient.Jetton.getWalletAddress(contractAddress, accountAddress);
        debugger
        // jetton metadata
        const { content } = await tonClient.Jetton.getData(contractAddress);
        debugger
        const deployed = await tonClient.isContractDeployed(jettonWallet);
        debugger
        // user jetton balance
        const balance = deployed ? await tonClient.Jetton.getBalance(jettonWallet) : new Coins(0, { decimals: 9 });
        debugger

        console.log(`Balance: ${balance} USDT`);
    } catch (error: any) {
        console.error(`Error fetching balance: ${error.message}`);
    }
}

export const transferTokens = async (from: string, secretKey: string, to: string, amount: number, tokenContract: string,) => {
    const secretKeyArr = secretKey.split(',').map((x) => parseInt(x));
    const client = new TonClient({
        endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC',
    });
    try {
        const contractAddress = new Address(tokenContract);
        const fromAddress = new Address(from);
        const toAddress = new Address(to);
        const amountHex = `0x${amount.toString(16)}`;

        const response = await client.callGetMethod(contractAddress, 'transfer', [fromAddress, toAddress, amountHex]);
        console.log(`Transfer response: ${response}`);
    } catch (error: any) {
        console.error(`Error transferring tokens: ${error.message}`);
    } finally {
        client.close();
    }
}

export const getTokenName = async (tokenContract: string) => {
    const client = new TonClient({
        endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC',
    });
    try {
        debugger
        const contractAddress = Address.parse(tokenContract);
        debugger
        const response = await client.callGetMethod(contractAddress, 'name', []);
        debugger
        const name = response.stack[0].toString();
        debugger
        console.log(`Token Name: ${name}`);
    } catch (error: any) {
        console.error(`Error fetching token name: ${error.message}`);
    } finally {
        client.close();
    }
}

// Replace with the actual address and USDT token contract address
const address = 'EQAeCIcNxWGLUSjU7gyUZkR6RExnDQknpggyUbDvGHDMBUET';
const tokenContract = "EQBNXnmozSrMWSaBI2x247OSfexFJnbT_WkLRqb7Nx4mqiN1";

// Get the balance
getTokenBalance(address, tokenContract);
// getTokenName(tokenContract)
