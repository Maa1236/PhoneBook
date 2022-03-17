import React, { useState } from 'react';
import TableRow from '../TableRow/TableRow';
import { Search } from '../Search/Search';
import { Table } from 'react-bootstrap';
import EditRow from '../EditRow/EditRow';
import './TableBook.css';
import { ExportCSV } from '../ExportCSV/ExportCSV';
import { listContacts, db } from '../../Services';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';

const TableBook = ({ tables, user, setUser, setTables, setRoID, roID }) => {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [showBtn, setShowBtn] = useState(true);

  const deleteFn = (id) => {
    db.transaction(function (tx) {
      tx.executeSql("DELETE FROM contacts WHERE ID=?", [id])
    })
    listContacts(setTables)
  }

  function editData(id) {
    db.transaction(function (tx) {
      tx.executeSql('update contacts set image="' + user.image + '", firstname="' + user.firstname + '",lastname="' + user.lastname + '",address="' + user.address + '"where id=' + id + '', [],
        function (tx, result) {
          alert('Updated');
        },
        function (error) {
          alert(error);
        });
      listContacts(setTables);
    });
  }

  let component = tables
    .filter((item) => {
      let result = null;
      if (search === "") {
        result = item;
      } else if (item.firstname.toLowerCase().includes(search.toLowerCase()) || item.lastname.toLowerCase().includes(search.toLowerCase())) {
        result = item;
      }
      return result;
    })
    .map((tableItem, index) => {

      return (
        <>
          <TableRow key={index} tableItem={tableItem} tables={tables} deleteFn={deleteFn} setShow={setShow} show={show} setRoID={setRoID} />
          {(roID === tableItem.id && show) ? (
            <EditRow tableItem={tableItem} editData={editData} user={user} setUser={setUser} setShow={setShow} show={show} />
          ) : (null)
          }
        </>
      )
    })

  return (
    <>
      <div className="container-fluid con">
        <Header showBtn={showBtn} setShowBtn={setShowBtn} />
        <Outlet context={{ setShowBtn }} />
        <Search setSearch={setSearch} />
        <Table striped hover bordered variant="dark">
          <thead>
            <tr>
              <th>Image</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Address</th>
              <th colSpan={"3"}>Action</th>
            </tr>
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