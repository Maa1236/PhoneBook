import React, { useState } from 'react';
import './FormInput.css';
import { Button } from 'react-bootstrap';

const FormInput = ({ user, setUser, addContact }) => {

  const handleChange = ({ target }) => {
    setUser({ ...user, [target.name]: target.value })
  }

  const [fileBase64, setFileBase64] = useState("");

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
    event.persist();
    try {
      const fileContents = await encodeAsBase64(event.target.files[0])
      setFileBase64(fileContents)
      // console.log(fileContents)
      // console.log(fileBase64)
      setUser({ ...user, [event.target.name]: fileContents })
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <div className="container-fluid con1">
      <form id="input">
        <h1 className='h'>PhoneBook</h1>
        <label>Firstname: <input type="text" name="firstname" id="firstname" onChange={handleChange} /></label>
        <label>Lastname: <input type="text" name="lastname" id="lastname" onChange={handleChange} /></label>
        <label>Address: <input type="text" name="address" id="phonenumber" onChange={handleChange} /></label>
        <label>Image: <input type="file" name="image" id="image" onChange={handleUpload} /></label>
        <Button type='submit' className="btn-sm" onClick={() => { addContact(user.image, user.firstname, user.lastname, user.address) }}>Add</Button>
      </form>
    </div>
  )
}

export default FormInput