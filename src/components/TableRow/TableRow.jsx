import React from 'react';
import { Button } from 'react-bootstrap';
import './TableRow.css';


const TableRow = ({ tableItem, deleteFn, id, show, setShow, setRowID }) => {

    const showRow = () => {
        setShow(!show)
        setRowID(tableItem.id)
    }

    return (
        <tr id={id} >
            <td><img src={tableItem.image} alt="a" style={{ width: "60px" }} /></td>
            <td>{tableItem.firstname}</td>
            <td>{tableItem.lastname}</td>
            <td>{tableItem.address}</td>
            <td><Button className="btn-sm" onClick={() => { deleteFn(tableItem.id) }}>Delete</Button></td>
            {show ?
                (null)
                :
                (<td><Button className="btn-sm" onClick={showRow}>Edit</Button></td>)
            }
        </tr>
    )
}

export default TableRow