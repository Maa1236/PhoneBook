import './App.css';
import React, { useState, useEffect } from 'react';
import TableBook from './components/Table/TableBook';
import FormInput from './components/FormInput/FormInput';
import { createTables, listContacts } from './Services';
import { Routes, Route } from 'react-router-dom'
import ContactCard from './components/ContactCard/ContactCard';

function App() {

  const [user, setUser] = useState({
    image: null,
    firstname: "",
    lastname: "",
    address: ""
  })

  const [tables, setTables] = useState([]);
  const [roID, setRoID] = useState(null);

  
  useEffect(() => {
    createTables() 
    listContacts(setTables)
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<TableBook tables={tables} setTables={setTables} user={user} setUser={setUser} setRoID={setRoID} roID={roID} />} >
          <Route path="/create" element={<FormInput user={user} setUser={setUser} setTables={setTables} />} />
        </Route>
        <Route path="/:id" element={<ContactCard roID={roID} user={user} setUser={setUser} />} />
      </Routes>
    </>
  );
}

export default App;
