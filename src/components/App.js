import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { v4 as uuid } from "uuid";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";

const router1 = createBrowserRouter([
  {
    index: true,
    elements: <ContactList />,
  },
  {
    path:'/add',
    element:<AddContact/>
  }
]);

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);

  const addContactHandler = (contact) => {
    setContacts([...contacts, { id: uuid(), ...contact }]);
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };

  useEffect(() => {
    const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retriveContacts) setContacts(retriveContacts);
    // console.log(retriveContacts);
    delete localStorage[""];
  }, []);

  useEffect(() => {
    if (contacts.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
    }
  }, [contacts]);
  return (
    <>
    <RouterProvider router={router1}/>;
      {/* <div className="ui container">
        <BrowserRouter>
          <Routes>
            <Header />
            <Route path="/add" component={AddContact} />
            <Route path="/" component={ContactList} />
          </Routes>



          <AddContact addContactHandler={addContactHandler} />
          <ContactList contacts={contacts} getContactId={removeContactHandler}/>



        </BrowserRouter>
      </div> */}
    </>
  );
}

export default App;
