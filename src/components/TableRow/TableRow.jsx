import React from 'react';
import { Button } from 'react-bootstrap';
import './TableRow.css';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const TableRow = ({ tableItem, deleteFn, show, setShow, setRoID }) => {

    let { id } = useParams();
    id = tableItem.id
    const showRow = () => {
        setShow(!show)
        setRoID(tableItem.id)
    }

    const showAndDelete = () => {
        deleteFn(tableItem.id)
        setShow(!show)
    }

    return (
        <tr>
            <td><img src={tableItem.image} alt="a" style={{ width: "60px" }} /></td>
            <td>{tableItem.firstname}</td>
            <td>{tableItem.lastname}</td>
            <td>{tableItem.address}</td>
            <td style={{ width: "10%" }}><Button style={{ margin: "0 auto" }} className="btn-sm btnCustom" onClick={showAndDelete}>Delete</Button></td>
            {show ?
                (null)
                :
                (<td style={{ width: "10%" }}><Button style={{ margin: "0 auto" }} className="btn-sm btnCustom" onClick={showRow}>Edit</Button></td>)
            }
            <td style={{ width: "10%" }}><Link onClick={showRow} to={`./${id}`} > <i className="material-icons eye">visibility</i></Link></td>
        </tr>
    )
}

export default TableRow