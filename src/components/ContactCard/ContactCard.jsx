import React, { useEffect } from 'react';
import { db } from '../../Services';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './ContactCard.css'

const ContactCard = ({ roID, user, setUser }) => {

  const navigate = useNavigate();

  function listContact() {

    db.transaction(function (tx) {
      tx.executeSql('SELECT * FROM contacts WHERE ID=?', [roID], function (tx, results) {
        var item = results.rows[0];
        setUser(item)
      });
    });
  }

  useEffect(() => {
    listContact()
  }, []);

  const goToHome = () => {
    navigate("/")
  }
  return (
    <div className="wrapper">
      <Card style={{ width: '400px', margin: "0 auto", backgroundColor: "black", color: "white" }}>
        <Card.Img style={{ marginTop: "100px", borderRadius: "15px" }} variant="top" src={user.image} />
        <Card.Body >
          <Card.Title>Firstname: {user.firstname}</Card.Title>
          <Card.Title>Lastname: {user.lastname} </Card.Title>
          <Card.Title style={{ paddingBottom: "15px" }} >Address: {user.address} </Card.Title>
          <Button variant="dark" onClick={goToHome}>Go to All Contacts</Button>
        </Card.Body>
      </Card>
    </div>

  )
}

export default ContactCard