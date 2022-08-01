import React, { Fragment, useState } from "react";
import ReactDom from "react-dom";
import "./Search.scss";
import * as AiIcons from "react-icons/ai";
import { Navigate, useNavigate } from "react-router-dom";
import Backdrop from "./../../UI/Backdrop/Backdrop";

const Search = (props) => {
  const searchAnimation = props.open ? "search-open" : "search-close";
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearchInput = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/products/${search}`);
    props.closeModal();
  };
  return (
    <Fragment>
      <Backdrop
        onBackdropClick={props.closeModal}
        transitionTime=".3s"
        open={props.open}
      />
      {ReactDom.createPortal(
        <form onSubmit={handleSearch} className={`search ${searchAnimation}`}>
          <input
            type="text"
            onChange={handleSearchInput}
            className={`search-input ${searchAnimation}`}
          />
          <button className="search-button">
            <AiIcons.AiOutlineSearch className="search-button-icon" />
          </button>
        </form>,
        document.getElementById("search")
      )}
    </Fragment>
  );
};

export default Search;
