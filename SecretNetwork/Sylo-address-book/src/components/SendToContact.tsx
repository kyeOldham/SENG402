
import { useWeb3React } from '@web3-react/core';
import { useState } from 'react';
import { Link } from "react-router-dom";
import { BsChevronLeft } from 'react-icons/bs';
import InitialIcon from './InitialsIcon';
import ethFunc from './ethereum';
import storage from './localStorage';
import ErrorMessage from "./ErrorMessage";

const SendToContact = (props: any) => {
  const { account } = useWeb3React()
  console.log(account);
  const name = props.match.params.name;
  const address = storage.getAddress('contacts', name);
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(0);
  const [errors, setErrors] = useState({});

  if (!name) {
    return <div>Sorry, but the user was not found</div>
  }

  async function handleFormSubmit(event: any) {
    event.preventDefault();
    
    if(amount){
      getBalance();
    }
    if(handleValidation()){
      await ethFunc.startPayment({
        ether: amount,
        addr: address
      });
    }
    
  };

  function handleValidation(){
    setErrors({});
    let tempErrors: any = {};
    let formIsValid: Boolean = true;
    //name
    if(amount === ""){
      formIsValid = false;
      tempErrors["amount"] = "ETH amount cannot be empty"
    } else if (parseInt(amount) >= balance) {
        formIsValid = false;
        tempErrors["amount"] = "You do not have enough eth to complete transaction";
    }
    setErrors(tempErrors);
    return formIsValid;
  }

  async function getBalance(){
    try {
      let balance: any = await ethFunc.checkBalance(account);
      setBalance(balance);
    } catch (e){
      let currentErrs: any = errors;
      currentErrs["b"] = "Invalid address checksum/address";
      setErrors(currentErrs);
    }
    
  }

  function getInitials(name: string){
    let names = name.split(' '),
        initials = names[0].substring(0, 1).toUpperCase();
    
    if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  }
  
  return (
    <div className="App">
    <div className="title-arrow">
        <div className="back-arrow"><Link to="/contacts"><BsChevronLeft className="react-icon"/></Link></div>
        <h3>Send to {name}</h3>
        <div className="edit-btn"><Link to={`/contacts/${name}/edit`}>Edit</Link></div>
      </div>
    <div>
    <div className="big-icon">
    <InitialIcon initials={getInitials(name)} />
    </div>
    <p>{address}</p>
    </div>
    <form onSubmit={handleFormSubmit}>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="0 ETH"
        aria-label="name"
      />
      <span className="txn-fee">0.000023 ETH $0.6</span>
      <ErrorMessage messages={errors} />
      <button className="main-btn" value="Send"><span className="label">Send</span></button>
    </form>
    </div>
  );
};

export default SendToContact;
