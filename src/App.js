import './App.css';
import React, { useState, useEffect } from 'react';
import TableBook from './components/Table/TableBook';
import FormInput from './components/FormInput/FormInput';
import { createTables, listContacts } from './Services';
import { db } from './Services';



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

  function addContact(a, b, c, d) {

    db.transaction(function (tx) {
      tx.executeSql('INSERT INTO contacts(image,firstname,lastname,address) VALUES (?,?,?,?)', [a, b, c, d], function (tx, results) {
        listContacts(setTables);
      });
    });
  }

  function editData(id) {
    db.transaction(function (tx) {
      tx.executeSql('update contacts set image="' + user.image + '", firstname="' + user.firstname + '",lastname="' + user.lastname + '",address="' + user.address + '"where id=' + id + '', [],
        function (tx, result) {
          alert('Updated');
        },
        function (error) {
          alert(error);
        });
      listContacts(setTables);
    });
  }

  function deleteFn(id) {
    db.transaction(function (tx) {
      tx.executeSql("DELETE FROM contacts WHERE ID=?", [id])
    })
    listContacts(setTables)
  }

  return (
    <>
      <FormInput user={user} setUser={setUser} addContact={addContact} />
      <TableBook tables={tables} deleteFn={deleteFn} editData={editData} user={user} setUser={setUser} />
    </>
  );
}

export default App;
