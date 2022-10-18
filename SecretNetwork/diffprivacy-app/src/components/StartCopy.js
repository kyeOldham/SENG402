// Run:
// `npx create-react-app secret-dapp`
// `cd secret-dapp`
// `yarn add secretjs` (or `npm i secretjs`)
// Then copy the content of this file into `src/App.js`

// import React from "react";
import { React, useState, useEffect } from "react";
// import { SigningCosmWasmClient } from "secretjs";

const { SecretNetworkClient, Wallet } = require("secretjs");
// const { Wallet, SecretNetworkClient, MsgSend, MsgMultiSend } = require("secretjs");
// import { SecretNetworkClient } from "secretjs";

// const CHIAN_ID = "pulsar-2";

function Start() {
  // import { SecretNetworkClient } from "secretjs";
  //

  const DENOM = "SCRT";
  const MINIMAL_DENOM = "uscrt";

  // const GRPCWEB_URL = 'https://grpc.pulsar.scrttestnet.com';
  // const LCD_URL = 'https://api.pulsar.scrttestnet.com';
  // const RPC_URL = 'https://rpc.pulsar.scrttestnet.com';
  // const CHAIN_ID = 'pulsar-2';
  // const CHAIN_NAME = 'Secret Testnet';
  // const contractAddress = "secret1vuph04rrzxs0admn5w030ek3hrtacttwcdwtvj";

  const [myAddress, setMyAddress] = useState("");
  const [count, setCount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [secretjs, setSecretjs] = useState();
  const [keplrReady, setKeplrReady] = useState(false);

  const increment = async () => {
    console.log("incrementing");

    try {
      const tx = await secretjs.tx.compute.executeContract(
        {
          sender: myAddress,
          contractAddress: contractAddress,
          msg: { increment: {} },
        },
        {
          gasLimit: 100000,
        }
      );
      console.log(`broadcasted tx=${JSON.stringify(tx)}`);

      const { count } = await secretjs.query.compute.queryContract({
        contractAddress: contractAddress,
        query: { get_count: {} },
      });
      console.log(`counter=${count}`);

      setCount(count);
    } catch (err) {
      console.error(err);
    }
  };

  // async setupKeplr() {
  //   // Define sleep
  //   const sleep = (ms) => new Promise((accept) => setTimeout(accept, ms));

  //   // Wait for Keplr to be injected to the page
  //   while (
  //     !window.keplr &&
  //     !window.getOfflineSigner &&
  //     !window.getEnigmaUtils
  //   ) {
  //     await sleep(10);
  //   }

  //   // Use a custom chain with Keplr.
  //   // On mainnet we don't need this (`experimentalSuggestChain`).
  //   // This works well with `enigmampc/secret-network-sw-dev`:
  //   //     - https://hub.docker.com/r/enigmampc/secret-network-sw-dev
  //   //     - Run a local chain: `docker run -it --rm -p 26657:26657 -p 26656:26656 -p 1337:1337 -v $(shell pwd):/root/code --name secretdev enigmampc/secret-network-sw-dev`
  //   //     - `alias secretcli='docker exec -it secretdev secretcli'`
  //   //     - Store a contract: `docker exec -it secretdev secretcli tx compute store /root/code/contract.wasm.gz --from a --gas 10000000 -b block -y`
  //   // On holodeck, set:
  //   //     1. CHIAN_ID = "holodeck-2"
  //   //     2. rpc = "ttp://chainofsecrets.secrettestnet.io:26657"
  //   //     3. rest = "https://chainofsecrets.secrettestnet.io"
  //   //     4. chainName = Whatever you like
  //   // For more examples, go to: https://github.com/chainapsis/keplr-example/blob/master/src/main.js
  //   await window.keplr.experimentalSuggestChain({
  //     chainId: CHIAN_ID,
  //     chainName: "Local Secret Chain",
  //     rpc: "http://localhost:26657",
  //     rest: "http://localhost:1337",
  //     bip44: {
  //       coinType: 529,
  //     },
  //     coinType: 529,
  //     stakeCurrency: {
  //       coinDenom: "SCRT",
  //       coinMinimalDenom: "uscrt",
  //       coinDecimals: 6,
  //     },
  //     bech32Config: {
  //       bech32PrefixAccAddr: "secret",
  //       bech32PrefixAccPub: "secretpub",
  //       bech32PrefixValAddr: "secretvaloper",
  //       bech32PrefixValPub: "secretvaloperpub",
  //       bech32PrefixConsAddr: "secretvalcons",
  //       bech32PrefixConsPub: "secretvalconspub",
  //     },
  //     currencies: [
  //       {
  //         coinDenom: "SCRT",
  //         coinMinimalDenom: "uscrt",
  //         coinDecimals: 6,
  //       },
  //     ],
  //     feeCurrencies: [
  //       {
  //         coinDenom: "SCRT",
  //         coinMinimalDenom: "uscrt",
  //         coinDecimals: 6,
  //       },
  //     ],
  //     gasPriceStep: {
  //       low: 0.1,
  //       average: 0.25,
  //       high: 0.4,
  //     },
  //     features: ["secretwasm"],
  //   });

  //   // Enable Keplr.
  //   // This pops-up a window for the user to allow keplr access to the webpage.
  //   await window.keplr.enable(CHIAN_ID);

  //   // Setup SecrtJS with Keplr's OfflineSigner
  //   // This pops-up a window for the user to sign on each tx we sent
  //   this.keplrOfflineSigner = window.getOfflineSigner(CHIAN_ID);
  //   const accounts = await this.keplrOfflineSigner.getAccounts();

  //   this.secretjs = new SigningCosmWasmClient(
  //     "https://pulsar-2.api.trivium.network:1317", // holodeck - https://chainofsecrets.secrettestnet.io; mainnet - user your LCD/REST provider
  //     accounts[0].address,
  //     this.keplrOfflineSigner,
  //     window.getEnigmaUtils(CHIAN_ID),
  //     {
  //       // 300k - Max gas units we're willing to use for init
  //       init: {
  //         amount: [{ amount: "300000", denom: "uscrt" }],
  //         gas: "300000",
  //       },
  //       // 300k - Max gas units we're willing to use for exec
  //       exec: {
  //         amount: [{ amount: "300000", denom: "uscrt" }],
  //         gas: "300000",
  //       },
  //     }
  //   );

  //   console.log(accounts[0])
  //   const { amount } = await this.secretjs.query.bank.balance(
  //     {
  //       address: accounts[0].address,
  //       denom: "uscrt",
  //     });
  //   // this.getBalance(accounts[0].address)
  //   this.setState({ keplrReady: true, account: accounts[0] });
  // }

  useEffect(() => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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

      const secretjs = await SecretNetworkClient.create({
        grpcWebUrl: GRPCWEB_URL,
        chainId: CHAIN_ID,
        wallet: keplrOfflineSigner,
        walletAddress: myAddress,
        encryptionUtils: window.getEnigmaUtils(CHAIN_ID),
      });

      setKeplrReady(true);
      setMyAddress(myAddress);
      setSecretjs(secretjs);
    };
    getKeplr();

    return () => {};
  }, []);

  return (
    <div className="App">
      <h1>Differntial Privacy Tools</h1>

      {!keplrReady ? (
        <h1>Waiting for Keplr wallet integration...</h1>
      ) : (
        <div>
          <p>
            <strong>My Address:</strong> {myAddress}
          </p>
          <p>
            <strong>Balance:</strong> {balance} SCRT
          </p>
          <p>
            <strong>Counter:</strong> {count}
          </p>
          <p>
            <button onClick={increment}>Increment</button>
          </p>
        </div>
      )}
    </div>
  );
}

export default Start;
