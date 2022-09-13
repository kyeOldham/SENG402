import { useHistory } from "react-router-dom";
import { useWeb3React } from "@web3-react/core"
import  React, { useState, useEffect } from  "react";

// import { injected } from "./wallet/Connectors";
import metamaskIcon from '../image-551.png';
import {
	bootstrap,
	getAddress,
	onAccountAvailable,
	getNativeCoinBalance,
	coinConvert
} from  '@stakeordie/griptape.js';

function Start() {
  bootstrap()
  const [address, setAddress] = useState('');
	const [coins, setCoins]  = useState('');

  const connect = async () => {
    await  bootstrap();
  }
  
  const getBalance = async () => {
    var  balance = await getNativeCoinBalance();
    balance = coinConvert(balance, 6, 'human');
    setCoins(balance);
  }

  useEffect(() => {
    const removeOnAccountAvailable = onAccountAvailable(() => {
      setAddress(getAddress()!);
      getBalance();
    })
    
    return () => {
      removeOnAccountAvailable()
    };
  }, []);

  return (
    <div className="App" id="start-page">
      <img src={metamaskIcon} className="big-img" id="wolf" alt="icon" />
      <div className="title-desc">
        <h1 className="home-title">Crypto Address book</h1>
        <p className="text">The easiest and quickest way to manage and pay your contacts.
        Connect your wallet to begin.</p>
      </div>
      <h1>Hello, Griptape!</h1>
		<button  onClick={connect}>Connect</button>
    <p>Your address is: {address}</p>
		<p>Your balance is: {coins}</p>
      {/* <div className="connect-metamask">
        {active ? <span>Connected with <b>{account}</b> 
        <button className="main-btn" onClick={disconnect}>Disconnect</button> </span> : 
        <button className="main-btn" onClick={connect}><span className="label">Connect Wallet</span></button>} */}
        {/* <Link to="/contacts">View Contacts</Link> */}
        {/* </div> */}
    </div>
  )
}


export default Start;
