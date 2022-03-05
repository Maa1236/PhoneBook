import React, { useState } from 'react';
import TableRow from '../TableRow/TableRow';
import { Search } from '../Search/Search';
import { Table } from 'react-bootstrap';
import EditRow from '../EditRow/EditRow';
import './TableBook.css';
import { ExportCSV } from '../ExportCSV/ExportCSV';

const TableBook = ({ tables, deleteFn, updateContact, editData, user, setUser }) => {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [rowID, setRowID] = useState(null)

  let component = tables
    .filter((item) => {
      let result = null;
      if (search === "") {
        result = item;
      } else if (item.firstname.toLowerCase().includes(search.toLowerCase())) {
        result = item;
      }
      return result;
    })
    .map((tableItem, index) => {

      return (
        <>
          <TableRow key={index} tableItem={tableItem} deleteFn={deleteFn} tables={tables} updateContact={updateContact} editData={editData} setShow={setShow} show={show} setRowID={setRowID} />
          {(rowID == tableItem.id && show) ? (
            <EditRow tableItem={tableItem} editData={editData} user={user} setUser={setUser} setShow={setShow} show={show} />
          ) : (null)
          }
        </>
      )
    })

  return (
    <>
      <div className="container-fluid con">
        <Search setSearch={setSearch} />
        <Table striped hover bordered variant="dark">
          <thead>
            <th>Image</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Address</th>
            <th>Action</th>
          </thead>
          <tbody>
            {component}
          </tbody>
        </Table>
        <ExportCSV csvData={tables} fileName="Contacts" />
      </div>
    </>
  )
}

export default TableBook