import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import './EditRow.css'

const EditRow = ({ editData, tableItem, user, setUser, setShow, show }) => {

    const handleEditChange = ({ target }) => {
        setUser({ ...user, [target.name]: target.value })
    }

    const handleShow = () => {
        editData(tableItem.id);
        setShow(!show)
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
            console.log(fileContents)
            console.log(fileBase64)
            setUser({ ...user, [event.target.name]: fileContents })
        } catch (e) {
            console.log(e.message)
        }
    }

    return (
        <tr>
            <td><input type="file" name="image" id="image" onChange={handleUpload} /></td>
            <td><input type="text" name="firstname" id="firstname" placeholder='firstname' onChange={handleEditChange} /></td>
            <td> <input type="text" name="lastname" id="lastname" placeholder='lastname' onChange={handleEditChange} /></td>
            <td><input type="text" name="address" id="address" placeholder='address' onChange={handleEditChange} /></td>
            <td className='btns'><Button className="btn-sm" onClick={handleShow}>Save</Button><Button className="btn-sm" variant="secondary" size="sm" onClick={() => { setShow(false) }}>Cancel</Button></td>
        </tr>
    )
}

export default EditRow