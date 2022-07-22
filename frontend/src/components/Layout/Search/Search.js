import React, { Fragment } from "react";
import ReactDom from "react-dom";
import "./Search.scss";
import * as AiIcons from "react-icons/ai";

const Search = (props) => {
  return (
    <Fragment>
      {ReactDom.createPortal(
        <div className="backdrop" onClick={props.closeModal}></div>,
        document.getElementById("backdrop")
      )}
      {ReactDom.createPortal(
        <div className="search">
          <input type="text" className="search-input" />
          <div>
            <AiIcons.AiOutlineSearch
              className="search-icon"
              onClick={props.closeModal}
            />
          </div>
        </div>,
        document.getElementById("search")
      )}
    </Fragment>
  );
};

export default Search;
