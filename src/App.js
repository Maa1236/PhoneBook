import './App.css';
import React, { useState, useEffect } from 'react';
import TableBook from './components/Table/TableBook';
import FormInput from './components/FormInput/FormInput';
import { createTables, listContacts } from './Services';
import { Routes, Route } from 'react-router-dom'

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
      <Routes>
        <Route path="/" element={<TableBook tables={tables} setTables={setTables} user={user} setUser={setUser} />} >
          <Route path="/create" element={<FormInput user={user} setUser={setUser} setTables={setTables} />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
