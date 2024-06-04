const { TonClient, Address } = require('ton');

// async function getTokenBalance(address: string, tokenContract: string) {
//     const client = new TonClient({
//         endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC',
//     });
//     debugger
//     try {
//         const contractAddress = Address.parse(tokenContract);
//         const accountAddress = Address.parse(address);
//         debugger
//         // Fetch account info
//         // const accountInfo = await client.getAccount(accountAddress);
//         // if (accountInfo.state !== 'active') {
//         //     console.log('Account is not active.');
//         //     return;
//         // }
//         debugger
//         // Fetch token balance from the contract
//         const response = await client.callGetMethod(contractAddress, 'get_balance', [
//             { type: 'slice', value: accountAddress.toString() },
//         ]);
//         debugger
//         const balance = response.stack[0][1].toString();
//         console.log(`Balance: ${balance} USDT`);
//     } catch (error: any) {
//         console.error(`Error fetching balance: ${error.message}`);
//     } finally {
//         client.close();
//     }
// }

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
// getTokenBalance(address, tokenContract);
getTokenName(tokenContract)
