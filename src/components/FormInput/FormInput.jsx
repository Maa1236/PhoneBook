import React from 'react';
import './FormInput.css';
import { Button } from 'react-bootstrap';
import { encodeAsBase64, db, listContacts } from '../../Services';


const FormInput = ({ user, setUser, setTables }) => {

  const emptyUser = {
    image: [],
    firstname: "",
    lastname: "",
    address: ""
  }

  const addContact = () => {
    db.transaction(function (tx) {
      tx.executeSql('INSERT INTO contacts(image,firstname,lastname,address) VALUES (?,?,?,?)', [user.image, user.firstname, user.lastname, user.address], function (tx, results) {
        listContacts(setTables);
      });
    });
  }

  const handleChange = ({ target }) => {
    setUser({ ...user, [target.name]: target.value })
  }

  const handleUpload = async (event) => {
    try {
      const fileContents = await encodeAsBase64(event.target.files[0])
      setUser({ ...user, [event.target.name]: fileContents })
    } catch (e) {
      console.log(e.message)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setUser(emptyUser);
  }

  return (
    <div className="container-fluid con1">
      <form id="input" onSubmit={handleSubmit}>
        <h1 className='h'>PhoneBook</h1>
        <label>Firstname: <input type="text" name="firstname" id="firstname" value={user.firstname} onChange={handleChange} /></label>
        <label>Lastname: <input type="text" name="lastname" id="lastname" value={user.lastname} onChange={handleChange} /></label>
        <label>Address: <input type="text" name="address" id="address" value={user.address} onChange={handleChange} /></label>
        <label>Image: <input type="file" name="image" id="image" onChange={handleUpload} /></label>
        <Button type='submit' className="btn-sm" onClick={addContact}>Add</Button>
      </form>
    </div>
  )
}

export default FormInput