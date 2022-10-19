import { Wallet, SecretNetworkClient, newPermit, Permit, fromUtf8, toBase64, Coin, Tx} from "secretjs";
import { readFileSync } from "fs";
import { randomBytes } from "crypto";
import { a, b, c, d } from "./accounts";
import { exit } from "process";
import { fail } from "assert";

const CHAIN_ID = "secretdev-1";

const entropy = (): string => {
    return randomBytes(32).toString('hex');
}

type ContractInfo = {
    codeHash: string;
    codeId: number;
}

const uploadContract = async(
    secretjs: SecretNetworkClient, 
    wasmByteCode: Uint8Array, 
    source: string, 
    builder: string, 
    gasLimit: number
): Promise<ContractInfo> => {
    const uploadTx = await secretjs.tx.compute.storeCode(
        {
            sender: secretjs.address,
            wasmByteCode,
            source,
            builder,
        },
        {
            gasLimit,
        },
    );
    const codeId = Number(
        uploadTx.arrayLog.find((log) => log.type === "message" && log.key === "code_id")
          .value,
    );
    const codeHash = await secretjs.query.compute.codeHash(codeId);
    return {codeId, codeHash};
}

const instantiate = async(
    secretjs: SecretNetworkClient, 
    codeId: number, 
    codeHash: string, 
    instantiateMsg: object, 
    label: string, 
    gasLimit: number
): Promise<string> => {
    const tx = await secretjs.tx.compute.instantiateContract(
        {
            sender: secretjs.address,
            codeId: codeId,
            codeHash: codeHash,
            initMsg: instantiateMsg,
            label,
            initFunds: [],
        },
        {
            gasLimit,
        },
    );
    console.dir(tx, {depth: null});
    return tx.arrayLog.find((log) => log.type === "message" && log.key === "contract_address").value;
}

const exec = async(
    secretjs: SecretNetworkClient, 
    address: string, 
    codeHash: string, 
    msg: object, 
    gasLimit: number, 
    sentFunds: Coin[] = []
): Promise<Tx> => {
    return await secretjs.tx.compute.executeContract(
        {
            sender: secretjs.address,
            contractAddress: address,
            codeHash: codeHash,
            msg,
            sentFunds,
        },
        {
            gasLimit,
        },
    );
}

const query = async(
    secretjs: SecretNetworkClient, 
    address: string, 
    codeHash: string, 
    query: object
): Promise<object> => {
    return await secretjs.query.compute.queryContract({
        contractAddress: address,
        codeHash: codeHash,
        query,
    });
}

const printBalance = async (name: string, secretjs: SecretNetworkClient) => {
    const { balance: { amount }, } = await secretjs.query.bank.balance({
        address: secretjs.address,
        denom: "uscrt",
    });
      
    console.log(`${name} - ${secretjs.address} has ${Number(amount) / 1e6} SCRT!`);
}

const main = async () => {
    console.log("Creating signers for a, b, c, d");
    a.signer = await SecretNetworkClient.create({
        grpcWebUrl: "http://localhost:9091",
        chainId: CHAIN_ID,
        wallet: a.wallet,
        walletAddress: a.wallet.address,
    });

    b.signer = await SecretNetworkClient.create({
        grpcWebUrl: "http://localhost:9091",
        chainId: CHAIN_ID,
        wallet: b.wallet,
        walletAddress: b.wallet.address,
    });

    c.signer = await SecretNetworkClient.create({
        grpcWebUrl: "http://localhost:9091",
        chainId: CHAIN_ID,
        wallet: c.wallet,
        walletAddress: c.wallet.address,
    });

    d.signer = await SecretNetworkClient.create({
        grpcWebUrl: "http://localhost:9091",
        chainId: CHAIN_ID,
        wallet: d.wallet,
        walletAddress: d.wallet.address,
    });

    // add contract to chain with "a" as admin
    console.log("Uploading contract code");
    const contract: ContractInfo = await uploadContract(
        a.signer, 
        readFileSync(`${__dirname}/../src/contract.wasm.gz`) as Uint8Array,
        "",
        "", 
        2_000_000
    );
    console.log(contract.codeId, contract.codeHash);

    // instantiate the contract
    // console.log("Instantiating contract: epsilon = 0.5, privacy budget = 2.0");
    // const instantiateMsg = {
    //     epsilon: "0.5",
    //     privacy_budget: "100.0",
    //     entropy: entropy()
    // };

    const instantiateMsg = {
      count: 5
    }
    const address = await instantiate(a.signer, contract.codeId, contract.codeHash, instantiateMsg, `diff-privacy-example-${contract.codeId}-${entropy()}`, 40_000);
    console.log(address);

    // load iris sepal length as dummy observations
    // console.log("Loading observations one at a time");
    // let sum = 0;
    // for (const data of iris) {
    //     process.stdout.write(".");
    //     const execMsg = {
    //         add_observation: {
    //             value: data[0].toString(),
    //             padding: "===================",
    //         }
    //     };
    //     await exec(b.signer, address, contract.codeHash, execMsg, 30_000);
    //     sum = sum + data[0];
    // };
    // const real_average = sum / iris.length;
    // console.log("");

    const privacyBudgetMsg = {
      get_count: {} }
    const privacyBudgetTx = await query(a.signer, address, contract.codeHash, privacyBudgetMsg);
      console.log(privacyBudgetTx)

    console.log("adding value");
    const fuzzyCountExecMsg = {
        add_value: {
            value: 2,
        }
    };
    const fuzzyCountTx = await exec(a.signer, address, contract.codeHash, fuzzyCountExecMsg, 40_000);
    // console.log(`Real count: ${iris.length}`);
    console.log(fuzzyCountTx)


    const privacyBudgetMsg1 = {
      get_count: {} }
    const privacyBudgetTx1 = await query(a.signer, address, contract.codeHash, privacyBudgetMsg1);
      console.log(privacyBudgetTx1)
    // console.log("Fuzzy count: " + fromUtf8(fuzzyCountTx.data[0]));
    
    // console.log("Getting fuzzy mean");
    // const fuzzyMeanExecMsg = {
    //     fuzzy_mean: {
    //         padding: "===================",
    //     }
    // };
    // const fuzzyMeanTx = await exec(a.signer, address, contract.codeHash, fuzzyMeanExecMsg, 40_000);
    // console.log(`Real mean: ${real_average}`);
    // console.log("Fuzzy mean: "+ fromUtf8(fuzzyMeanTx.data[0]));

    // console.log("Privacy budget should be used up so cannot do another fuzzy mean");
    // const failedPrivacyBudgetTx = await exec(a.signer, address, contract.codeHash, fuzzyMeanExecMsg, 40_000);
    // console.log(failedPrivacyBudgetTx.rawLog);
}

(async () => {
    main();
})();