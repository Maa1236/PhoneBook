import React, { useState } from 'react';
import './FormInput.css';
import { Button, Form } from 'react-bootstrap';
import { handleUpload, db, listContacts } from '../../Services';
import { useNavigate, useOutletContext } from 'react-router-dom';


const FormInput = ({ user, setUser, setTables }) => {

  const navigate = useNavigate();
  const { setShowBtn } = useOutletContext();
  const [formerrors, setFormErrors] = useState({});

  const emptyUser = {
    image: null,
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


    const validate = (user) => {

      const errors = {};

      if (!user.firstname) {
        errors.nameError = "name is required";
      }
      if (!user.lastname) {
        errors.lastNameError = "Lastname is required";
      }

      if (!user.address) {
        errors.addressError = "address is required";
      }

      if (!user.image) {
        errors.imageError = "please select an image"
      }

      if (errors.nameError || errors.lastNameError || errors.addressError || errors.imageError) {
        setFormErrors({ ...formerrors, nameError: errors.nameError, lastNameError: errors.lastNameError, addressError: errors.addressError, imageError: errors.imageError })
        return false;
      }

      return true;

    };

    const handleCloseBtn = () => {
      setUser(emptyUser);
      navigate('/');
      setShowBtn(true);
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      validate(user)
      console.log(formerrors)
      var isValid = validate(user)
      if (isValid) {
        addContact()
        handleCloseBtn()
      }
      else {
        navigate('/create')
        alert("please fill out all fields")
      }
    }

    return (
      <div className="container-fluid con1">
        <Form noValidate id="input" onSubmit={handleSubmit}>
          <Form.Group>

            <Form.Label>Firstname:
              <Form.Control type="text" name="firstname" id="firstname" value={user.firstname} onChange={handleChange} />
            </Form.Label>

            <span className="text-warning" style={{ color: "yellow" }} >{formerrors.nameError}</span>

            <Form.Label>Lastname:
              <Form.Control type="text" name="lastname" id="lastname" value={user.lastname} onChange={handleChange} /></Form.Label>

            <span className="text-warning" style={{ color: "yellow" }} >{formerrors.lastNameError} </span>

            <Form.Label>Address:
              <Form.Control type="text" name="address" id="address" value={user.address} onChange={handleChange} /></Form.Label>

            <span className="text-warning" style={{ color: "yellow" }} >{formerrors.addressError} </span>

            <Form.Label>Image:
              <Form.Control type="file" name="image" id="image" onChange={(e) => { handleUpload(e, setUser, user) }} /></Form.Label>

            <span className="text-warning" style={{ color: "yellow" }} >{formerrors.imageError}</span>

            <Button type='submit' className="btn-sm btnCustom" >Add</Button>

            <Button className="btn-sm btnCustom" variant="secondary" size="sm" onClick={handleCloseBtn}>Cancel</Button>

          </Form.Group>
        </Form>
      </div>
    )
  }

export default FormInput