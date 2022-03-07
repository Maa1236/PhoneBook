import './App.css';
import React, { useState, useEffect } from 'react';
import TableBook from './components/Table/TableBook';
import FormInput from './components/FormInput/FormInput';
import { createTables, listContacts } from './Services';

function App() {

  const [user, setUser] = useState({
    image: [],
    firstname: "",
    lastname: "",
    address: ""
  })

  const [tables, setTables] = useState([]);

  useEffect(() => {
    createTables()
    listContacts(setTables)
  }, [])

  return (
    <>
      <FormInput user={user} setUser={setUser} setTables={setTables} />
      <TableBook tables={tables} setTables={setTables} user={user} setUser={setUser} />
    </>
  );
}

export default App;
