
import { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import { BsChevronLeft } from 'react-icons/bs';
import storage from './localStorage';
import ErrorMessage from "./ErrorMessage";

const EditContact = (props: any) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});
  // const [errors, setErrors] = useState([]);
  // let errors: any = {};
  const pathName = props.match.params.name;

  useEffect(() => {
    const init = async () => {
      const storedAddress = storage.getAddress('contacts', pathName);
      if(storedAddress){
        setName(pathName);
        setAddress(storedAddress);
      }
    };
    init();
  }, []);
  
  const history = useHistory();

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

  async function deleteContact(){
    storage.delete('contacts', pathName);
    history.push('/contacts');
  }

  function handleFormSubmit(e: any) {
    e.preventDefault();
    if(handleValidation()){
      storage.update('contacts', pathName, name, address);
      history.push(`/contacts/${name}/send`);
    } 
  };

  return (
    <div className="App">
    <div className="title-arrow">
          <Link to={`/contacts/${pathName}/send`}><BsChevronLeft className="react-icon"/></Link>
          <h3 >Edit Contact {pathName}</h3>
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
      <button className="main-btn delete" value="Delete" onClick={deleteContact}><span className="label">Delete Contact</span></button>
      <button className="main-btn" value="Save"><span className="label">Save</span></button>
    </form>
    </div>
  );
};

export default EditContact;

