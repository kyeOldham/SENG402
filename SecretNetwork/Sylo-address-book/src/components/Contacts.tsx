
import { Link, useHistory} from "react-router-dom";
import { useState, useEffect } from 'react';
import { useWeb3React } from "@web3-react/core"
import { BsChevronLeft, BsPlus } from 'react-icons/bs';
import InitialIcon from "./InitialsIcon";
import storage from './localStorage';

function Contacts() {
  const { active, deactivate } = useWeb3React()
  const history = useHistory();
  const [contacts, setContacts] = useState([]);
  // let contacts = [{'name': '', 'address': ''}]

  useEffect(() => {
    const init = async () => {
      let contactsStored = storage.get('contacts');
      if(contactsStored){
        for(let i = 0; i < contactsStored.length; i++){
          contactsStored[i] = JSON.parse(contactsStored[i]);
        }
        setContacts(contactsStored);
  }
    };
    init();
  }, []);
  
  
  
  // let contactStr = localStorage.getItem("contactList") || ""
  // let contactList = contactStr.split(" ")
  // contactList[0] = contactList[0].replace('{}', '')
  // for(let i = 0; i < contactList.length; i++){
  //   let splitted = contactList[i].split(",")
  //   //let tempObj: Object = Object.assign({'name': splitted[0], 'address': splitted[1]})
  //   contacts.push([splitted[0], splitted[1]])
  // }
  // console.log(contacts)
    // if(contactList !== ""){
    //   this.setState({
    //     contacts: contactList
    //   })
    // }
  
  async function disconnect() {
    try {
      deactivate()
    } catch (ex) {
      console.log(ex)
    }
  }

  function home() {
    history.push('/')
  }

  // function storeAddress(name: string, address: string) {
  //   localStorage.setItem(name, address);
  // }

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
          <Link to="/"><BsChevronLeft className="react-icon" /></Link>
          <h3>Address Book</h3>
      </div>
      <div className="contact-list">
          <ul className="list-contacts">
          <li className="contact newContact"><Link to="/contacts/new">
            <BsPlus className="react-plus contact-img" /> 
            <h3 className="contact-name">New Contact</h3>
            </Link></li>
          {contacts.map(function(contact: any){
         return (<li className="contact" key={contact.name}>
           {/* onClick={() => storeAddress(d[0], d[1])} */}
           <Link to={`/contacts/${contact.name}/send`}>
           <div className="contact-img">
           <InitialIcon initials={getInitials(contact.name)} />
           </div>
           <h3 className="contact-name">{contact.name}</h3>
           </Link>
           </li>)
       })}
       </ul>
      </div>
      {active ? <span>
        <button className="main-btn" onClick={disconnect}><span className="label">Disconnect</span></button> </span> : 
        home()}
    </div>
  );
}

export default Contacts;
