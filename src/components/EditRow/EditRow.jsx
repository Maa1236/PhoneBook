import React from 'react';
import { Button } from 'react-bootstrap';
import './EditRow.css';
import { handleChange, handleUpload } from '../../Services';

const EditRow = ({ tableItem, user, setUser, setShow, show, editData }) => {

    const handleShow = () => {
        editData(tableItem.id);
        setShow(!show)
    }

    // const handleUpload = async (event) => {
    //     try {
    //         const fileContents = await encodeAsBase64(event.target.files[0])
    //         setUser({ ...user, [event.target.name]: fileContents })
    //     } catch (e) {
    //         console.log(e.message)
    //     }
    // }

    return (
        <tr>
            <td>
                <input
                    type="file"
                    name="image"
                    id="image"
                    onChange={(e) => { handleUpload(e, setUser, user) }} />
            </td>
            <td>
                <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    placeholder='firstname'
                    onChange={({ target }) => { handleChange({ target }, setUser, user) }} />
            </td>
            <td>
                <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    placeholder='lastname'
                    onChange={({ target }) => { handleChange({ target }, setUser, user) }} />
            </td>
            <td>
                <input
                    type="text"
                    name="address" id="address"
                    placeholder='address'
                    onChange={({ target }) => { handleChange({ target }, setUser, user) }} />
            </td>
            <td colSpan={"3"}
                style={{ width: "20%" }}
                className='btns'>
                <Button className="btn-sm btnCustom" onClick={handleShow}>Save</Button>
                <Button className="btn-sm btnCustom" variant="secondary" onClick={() => { setShow(false) }}>Cancel</Button>
            </td>
        </tr>
    )
}

export default EditRow