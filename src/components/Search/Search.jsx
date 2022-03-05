import React from "react";
import "./Search.css"

export const Search = ({ setSearch }) => {
  return (
    <div className="container-fluid">
      <p>Search contacts</p>
      <div className="search">
        <i className="material-icons">search</i>
        <input
          className="inputWithoutBorder"
          type="search"
          placeholder="Search"
          onChange={(event) => {
            setSearch(event.target.value)
          }}
        ></input>
      </div>
    </div>
  );
};