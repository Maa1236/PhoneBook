import React from 'react';
import { Button } from 'react-bootstrap';
import './EditRow.css';
import { encodeAsBase64 } from '../../Services';

const EditRow = ({ tableItem, user, setUser, setShow, show, editData }) => {

    const handleEditChange = ({ target }) => {
        setUser({ ...user, [target.name]: target.value })
    }

    const handleShow = () => {
        editData(tableItem.id);
        setShow(!show)
    }

    const handleUpload = async (event) => {
        try {
            const fileContents = await encodeAsBase64(event.target.files[0])
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
            <td style={{ width: "20%" }} className='btns'><Button className="btn-sm btnCustom" onClick={handleShow}>Save</Button><Button className="btn-sm btnCustom" variant="secondary" onClick={() => { setShow(false) }}>Cancel</Button></td>
        </tr>
    )
}

export default EditRow