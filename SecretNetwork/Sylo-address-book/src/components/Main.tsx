import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Start from './Start';
import Contacts from './Contacts';
import NewContact from './NewContact';
import EditContact from './EditContact';
import SendToContact from './SendToContact';


// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>
    <Switch>
        <Route exact path="/" component={Start}/>
        {/* <Route path="/contacts/new" component={NewContact}/>
        <Route path="/contacts/:name/edit" component={EditContact}/>
        <Route path="/contacts/:name/send" component={SendToContact}/>
        <Route exact path="/contacts" component={Contacts}/> */}
    </Switch>
  </main>
)

export default Main