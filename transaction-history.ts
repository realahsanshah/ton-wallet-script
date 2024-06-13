import { Address } from "ton";

const TonWeb = require('tonweb');

// Initialize TonWeb with the mainnet or testnet provider
const tonweb = new TonWeb(new TonWeb.HttpProvider('https://rpc-testnet.tonsquare.io'));


async function getTransactions(walletAddress: string) {
    try {
        // Convert the wallet address to the appropriate format
        const addressData = Address.parse(walletAddress);
        debugger;
        const address = new TonWeb.utils.Address(walletAddress);
        debugger;
        // Fetch transactions for the given address
        const transactions = await tonweb.provider.getTransactions(walletAddress);

        // Log the transactions to the console
        console.log(transactions);
    } catch (error) {
        // Log any errors that occur during the fetch process
        console.error('Error fetching transactions:', error);
    }
}

// Call the function to get transactions for the specified wallet address
const walletAddress = "EQAeCIcNxWGLUSjU7gyUZkR6RExnDQknpggyUbDvGHDMBUET"
getTransactions(walletAddress);