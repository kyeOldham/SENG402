
import React, { useState, useEffect } from "react";
import { Wallet, SecretNetworkClient, fromUtf8, Coin, Tx } from "secretjs";
import metamaskIcon from '../twitter_header.png';
import Button from '@mui/material/Button';


// Local Secret chan ID
const CHAIN_ID = "secretdev-1";

// Walllet account
export interface Account {
  wallet: Wallet,
  signer?: SecretNetworkClient,
}

export const c: Account = {
  wallet: new Wallet('chair love bleak wonder skirt permit say assist aunt credit roast size obtain minute throw sand usual age smart exact enough room shadow charge'),
}

export const a: Account = {
  wallet: new Wallet('grant rice replace explain federal release fix clever romance raise often wild taxi quarter soccer fiber love must tape steak together observe swap guitar'),
}

// Start component
function Start() {
  // Set the contract address and the contract code hash
  const contractAddress = 'secret18vd8fpwxzck93qlwghaj6arh4p7c5n8978vsyg';
  const codeHash = '85939917d80298f314ae6a839f9c0ab126c4f7736ba859a764a50949c4fa4b68'

  const [myAddress, setMyAddress] = useState("");
  const [count, setCount] = useState(0);
  const [mean, setMean] = useState(0);
  const [inputVal, setInputVal] = useState("");
  const [secretjs, setSecretjs] = useState<SecretNetworkClient>();

  const [keplrReady, setKeplrReady] = useState(false);

  // Function for running execute methods for smart contract
  const exec = async (
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

  // Function for running query methods for smart contract
  const query = async (
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

  // Function for getting diff count
  async function fuzzyCount() {

    a.signer = await SecretNetworkClient.create({
      grpcWebUrl: "http://localhost:9091",
      chainId: CHAIN_ID,
      wallet: a.wallet,
      walletAddress: a.wallet.address,
      // ...
    });
    interface FuzzyCountNumber {
      count: string;
    }
    interface FuzzyCount {
      diff_count: FuzzyCountNumber;
    }


    const fuzzyCountExecMsg = {
      diff_count: {}
    };
    const fuzzyCountTx = await exec(secretjs, contractAddress, codeHash, fuzzyCountExecMsg, 40_000);

    console.log(fuzzyCountTx);
    const countUTF = fromUtf8(fuzzyCountTx.data[0])

    var countObject: FuzzyCount = JSON.parse(countUTF);

    setCount(parseFloat(countObject.diff_count.count))
  }

  // Function for getting diff mean
  async function fuzzyMean() {
    a.signer = await SecretNetworkClient.create({
      grpcWebUrl: "http://localhost:9091",
      chainId: CHAIN_ID,
      wallet: a.wallet,
      walletAddress: a.wallet.address,
    });

    interface FuzzyMeanNumber {
      mean: string;
    }

    interface FuzzyMean {
      diff_mean: FuzzyMeanNumber;
    }

    console.log("Getting fuzzy mean");
    const fuzzyMeanExecMsg = {
      diff_mean: {}
    };

    const fuzzyMeanTx = await exec(secretjs, contractAddress, codeHash, fuzzyMeanExecMsg, 40_000);

    console.log(fuzzyMeanTx);
    const meanUTF = fromUtf8(fuzzyMeanTx.data[0])
    //If errror privacy budget is too low
    var meanObject: FuzzyMean = JSON.parse(meanUTF);

    setMean(parseFloat(meanObject.diff_mean.mean))
  }

  // Function for adding value to smart contract
  async function addValue(val: String) {
    a.signer = await SecretNetworkClient.create({
      grpcWebUrl: "http://localhost:9091",
      chainId: CHAIN_ID,
      wallet: a.wallet,
      walletAddress: a.wallet.address,
      // ...
    });

    const addValueExecMsg = {
      add_value: {
        value: val,
      }
    };
    const fuzzyMeanTx = await exec(secretjs, contractAddress, codeHash, addValueExecMsg, 40_000);
    // const fuzzyMeanTx = await exec(a.signer, contractAddress, codeHash, addValueExecMsg, 40_000);
    console.log(fuzzyMeanTx)
    const countUTF = fromUtf8(fuzzyMeanTx.data[0])
    console.log(countUTF);

  }

  // Handle submit button
  function handleFormSubmit(e: any) {
    e.preventDefault();
    addValue(inputVal);
    console.log("added " + inputVal)
  };


  useEffect(() => {

    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    // Function for connecting to Keplr
    const getKeplr = async () => {
      // Wait for Keplr to be injected to the page
      while (
        !window.keplr &&
        !window.getOfflineSigner &&
        !window.getEnigmaUtils
      ) {
        await sleep(10);
      }

      const DENOM = 'SCRT';
      const MINIMAL_DENOM = 'uscrt';

      const CHAIN_NAME = 'Local Testnet';  //Anything you want
      const GRPCWEB_URL = 'http://localhost:9091';
      const LCD_URL = 'http://localhost:1317';
      const RPC_URL = 'http://localhost:26657';
      const CHAIN_ID = "secretdev-1";
      // For more examples, go to: https://github.com/chainapsis/keplr-example/blob/master/src/main.js
      await window.keplr.experimentalSuggestChain({
        chainId: CHAIN_ID,
        chainName: CHAIN_NAME,
        rpc: RPC_URL,
        rest: LCD_URL,
        bip44: {
          coinType: 529,
        },
        coinType: 529,
        stakeCurrency: {
          coinDenom: DENOM,
          coinMinimalDenom: MINIMAL_DENOM,
          coinDecimals: 6,
        },
        bech32Config: {
          bech32PrefixAccAddr: "secret",
          bech32PrefixAccPub: "secretpub",
          bech32PrefixValAddr: "secretvaloper",
          bech32PrefixValPub: "secretvaloperpub",
          bech32PrefixConsAddr: "secretvalcons",
          bech32PrefixConsPub: "secretvalconspub",
        },
        currencies: [
          {
            coinDenom: DENOM,
            coinMinimalDenom: MINIMAL_DENOM,
            coinDecimals: 6,
          },
        ],
        feeCurrencies: [
          {
            coinDenom: DENOM,
            coinMinimalDenom: MINIMAL_DENOM,
            coinDecimals: 6,
          },
        ],
        gasPriceStep: {
          low: 0.1,
          average: 0.25,
          high: 0.4,
        },
        features: ["secretwasm"],
      });

      // Enable Keplr.
      // This pops-up a window for the user to allow keplr access to the webpage.
      await window.keplr.enable(CHAIN_ID);

      // Setup SecrtJS with Keplr's OfflineSigner
      // This pops-up a window for the user to sign on each tx we sent

      const keplrOfflineSigner = window.getOfflineSignerOnlyAmino(CHAIN_ID);

      const [{ address: myAddress }] = await keplrOfflineSigner.getAccounts();

      const secretjs_client = await SecretNetworkClient.create({
        grpcWebUrl: GRPCWEB_URL,
        chainId: CHAIN_ID,
        wallet: keplrOfflineSigner,
        walletAddress: myAddress,
        encryptionUtils: window.getEnigmaUtils(CHAIN_ID),
      });

      setKeplrReady(true);
      setMyAddress(myAddress);
      setSecretjs(secretjs_client);
    };

    getKeplr();

    // Use this function when connecting with Secret.Js wallet instead of Keplr
    async function getSigner() {
      // You can await here
      a.signer = await SecretNetworkClient.create({
        grpcWebUrl: "http://localhost:9091",
        chainId: CHAIN_ID,
        wallet: a.wallet,
        walletAddress: a.wallet.address,
      });

      c.signer = await SecretNetworkClient.create({
        grpcWebUrl: "http://localhost:9091",
        chainId: CHAIN_ID,
        wallet: c.wallet,
        walletAddress: c.wallet.address,
      });

      setSecretjs(a.signer);

      setMyAddress(a.wallet.address);
    }


    // getSigner();

  }, []);

  return (
    <div className="App" id="start-page">
      <img src={metamaskIcon} className="big-img" id="wolf" alt="icon" />
      <div className="wrapper">


        {!keplrReady ?
          <h1>Waiting for Keplr wallet integration...</h1>
          :
          <div>
            <p>
              <strong>My Address:</strong> {myAddress}
            </p>
            <p>
              <strong>Fuzzy Count:</strong> {count}
            </p>
            <p>
              <strong>Fuzzy Mean:</strong> {mean}
            </p>
            <p>
              <Button variant="contained" onClick={fuzzyCount}>Fuzzy Count:</Button>

              <Button variant="contained" onClick={fuzzyMean}>Fuzzy Mean:</Button>

            </p>
            <div>
              <form onSubmit={handleFormSubmit}>
                <label>
                  Enter value to add to dataset:
                  <input type="text" name="name" defaultValue="0" onChange={(e) => setInputVal(e.target.value)} />
                </label>
                <input type="submit" value="Submit" />
              </form>
            </div>
          </div>

        }
      </div>
    </div>
  )

}


export default Start;
