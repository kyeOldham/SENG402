
import { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { BsChevronLeft } from 'react-icons/bs';
import storage from './localStorage';
import ErrorMessage from "./ErrorMessage";

const NewContact = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const history = useHistory();
  const [errors, setErrors] = useState({});


  function handleValidation(){
    let tempErrors: any = {};
    let formIsValid: Boolean = true;
    //name
    if(!name){
      formIsValid = false;
      tempErrors["name"] = "Name cannot be empty"
    } else if (typeof name !== "undefined") {
      if (!name.match(/^[a-zA-Z ]+$/)) {
        formIsValid = false;
        tempErrors["name"] = "Only letters allowed";
      }
    }

    //address
    if(!address){
      formIsValid = false;
      tempErrors["address"] = "Address cannot be empty"
    } else if (!address.match(/^0x[a-fA-F0-9]{40}$/)) {
      formIsValid = false;
      tempErrors["address"] = "Incorrect address format";
    }
    setErrors(tempErrors);
    return formIsValid;
  }

  function handleFormSubmit(e: any) {
    e.preventDefault();
    if(handleValidation()){
      storage.extend('contacts', { name: name, address: address});
      history.push('/contacts');
    }
  };

  return (
    <div className="App">
    <div className="title-arrow">
          <Link to="/contacts"><BsChevronLeft className="react-icon"/></Link>
          <h3 >New Contact</h3>
      </div>
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        aria-label="name"
      />
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Address"
        aria-label="address"
      />
      <ErrorMessage messages={errors} />
      <button className="main-btn" value="Save"><span className="label">Save</span></button>
    </form>
    </div>
  );
};

export default NewContact;

