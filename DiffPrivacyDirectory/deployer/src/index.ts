import { Wallet, SecretNetworkClient, newPermit, Permit, fromUtf8, toBase64, Coin, Tx} from "secretjs";
import { readFileSync } from "fs";
import { a, b } from "./accounts";

const CHAIN_ID = "secretdev-1";

// Contract info type
type ContractInfo = {
    codeHash: string;
    codeId: number;
}


// Function for uploading contract code to the Secret Network blockchain
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

// Function for instantiating a contract on the Secret Network blockchain
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


const main = async () => {
    console.log("Creating signers for a, b, c, d");
    // Create signer for wallet account a
    b.signer = await SecretNetworkClient.create({
        grpcWebUrl: "http://localhost:9091",
        chainId: CHAIN_ID,
        wallet: b.wallet,
        walletAddress: b.wallet.address,
    });

    // add contract to chain with "a" as admin
    console.log("Uploading contract code");
    const contract: ContractInfo = await uploadContract(
        b.signer, 
        readFileSync(`${__dirname}/../../backend/contract.wasm.gz`) as Uint8Array,
        "",
        "", 
        2_000_000
    );
    console.log(contract.codeId, contract.codeHash);

    // Instantiate contract with value 5
    // Change this to whatever you would like the first value to be
    const instantiateMsg = {
      value: "-6"
    }
    const address = await instantiate(b.signer, contract.codeId, contract.codeHash, instantiateMsg, `diff-privacy-example-${contract.codeId}`, 40_000);
    console.log(address);
}

(async () => {
    main();
})();