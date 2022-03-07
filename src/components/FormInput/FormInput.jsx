import React from 'react';
import './FormInput.css';
import { Button } from 'react-bootstrap';

const FormInput = ({ user, setUser, addContact }) => {

  const emptyUser = {
    image: [],
    firstname: "",
    lastname: "",
    address: ""
  }

  const handleChange = ({ target }) => {
    setUser({ ...user, [target.name]: target.value })
  }

  function encodeAsBase64(file) {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
    }
    return new Promise((resolve, reject) => {
      reader.onerror = () => {
        reader.abort();
        reject(new DOMException("Problem parsing input file."));
      };
      reader.onload = () => {
        resolve(reader.result);
      }
    })
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
        <Button type='submit' className="btn-sm" onClick={() => { addContact(user.image, user.firstname, user.lastname, user.address) }}>Add</Button>
      </form>
    </div>
  )
}

export default FormInput