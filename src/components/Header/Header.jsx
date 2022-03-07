import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Header.css'

const Header = ({showBtn, setShowBtn}) => {

  const navigate = useNavigate();

  const goToCreate = () => {
    navigate("./create");
    setShowBtn(!showBtn)

  }
  return (

    <nav className="navbar navbar-dark paddingNav">
      <div className="container-fluid">
        <h1 className="h">Phone Book</h1>
        <Button className="btn-sm" onClick={goToCreate} style={{ display: showBtn ? "block" : "none" }}>Add</Button>
      </div>
    </nav>
  )
}

export default Header