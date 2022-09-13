const { Wallet, SecretNetworkClient, MsgSend, MsgMultiSend } = require("secretjs");

// import { SecretNetworkClient, grpc } from "secretjs";

require('dotenv').config();

const wallet = new Wallet(
    "grant rice replace explain federal release fix clever romance raise often wild taxi quarter soccer fiber love must tape steak together observe swap guitar",
);
const myAddress = wallet.address;

const grpcWebUrl = "http://localhost:9091";

// const grpcWebUrl = "https://secret-4.api.trivium.network:9091";

// To create a signer secret.js client you must also pass in `wallet`, `walletAddress` and `chainId`
const secretjs = await SecretNetworkClient.create({
    grpcWebUrl,
    chainId: "secretdev-1",
    wallet: wallet,
    walletAddress: myAddress,
});

const sSCRT = "secret18vd8fpwxzck93qlwghaj6arh4p7c5n8978vsyg";
// Get codeHash using `secretcli q compute contract-hash secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek`
const sScrtCodeHash = "f0dbf228914d338371700ebb28c5f1c9c949f1ba8b2ae5598bec833dc372480f";



export async function getCount() {
    try {
        const { count } = await secretjs.query.compute.queryContract({
            contractAddress: sSCRT,
            codeHash: sScrtCodeHash,
            query: { get_count: {} },
        });
        console.log(count)
    } catch {
        console.log('Error getting count')
    }
}

export async function incrementCount() {
    try {
        const { count } = await secretjs.query.compute.queryContract({
            contractAddress: sSCRT,
            codeHash: sScrtCodeHash,
            query: { get_count: {} },
        });
        console.log(count)
    } catch {
        console.log('Error getting count')
    }
}

export async function resetCount(newCount) {
    try {
        const { count } = await secretjs.query.compute.queryContract({
            contractAddress: sSCRT,
            codeHash: sScrtCodeHash,
            query: { get_count: {} },
        });
        console.log(count)
    } catch {
        console.log('Error getting count')
    }
}

// const main = async() => {
//     // Create connection to DataHub Secret Network node
//     // const client = new CosmWasmClient(process.env.SECRET_REST_URL)

//     const wallet = new Wallet(
//         "grant rice replace explain federal release fix clever romance raise often wild taxi quarter soccer fiber love must tape steak together observe swap guitar",
//     );
//     const myAddress = wallet.address;
//     console.log(myAddress)

//     const grpcWebUrl = "http://localhost:9091";

//     // const grpcWebUrl = "https://secret-4.api.trivium.network:9091";

//     // To create a signer secret.js client you must also pass in `wallet`, `walletAddress` and `chainId`
//     const secretjs = await SecretNetworkClient.create({
//         grpcWebUrl,
//         chainId: "secretdev-1",
//         wallet: wallet,
//         walletAddress: myAddress,
//     });
//     // console.dir(secretjs, { depth: null });

//     // const secretjs = await SecretNetworkClient.create({
//     //     grpcWebUrl,
//     //     chainId: "secret-4",
//     // });


//     const {
//         balance: { amount },
//     } = await secretjs.query.bank.balance({
//             address: "secret1ap26qrlp8mcq2pg6r47w43l0y8zkqm8a450s03",
//             denom: "uscrt",
//         })
//         // console.log(balance)
//         /*,
//          // optional: query at a specific height (using an archive node) 
//          new grpc.Metadata({"x-cosmos-block-height": "2000000"})
//          */
//         //     ,
//         // );

//     console.log(`I have ${Number(amount) / 1e6} SCRT!`);

//     const sSCRT = "secret18vd8fpwxzck93qlwghaj6arh4p7c5n8978vsyg";
//     // Get codeHash using `secretcli q compute contract-hash secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek`
//     const sScrtCodeHash = "f0dbf228914d338371700ebb28c5f1c9c949f1ba8b2ae5598bec833dc372480f";

//     try {
//         const { count } = await secretjs.query.compute.queryContract({
//             contractAddress: sSCRT,
//             codeHash: sScrtCodeHash,
//             query: { get_count: {} },
//         });
//         console.log(count)
//     } catch {
//         console.log('sdsd')
//     }




//     // console.log(`sSCRT has ${count.decimals} things!`);
// }

// (async() => {
//     main();
// })();