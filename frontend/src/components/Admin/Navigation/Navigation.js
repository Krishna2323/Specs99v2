import React from "react";
import "./Navigation.scss";
import * as IoIcons from "react-icons/io";

const Navigation = (props) => {
  return (
    <div className="account-navigation">
      <span onClick={props.onClick}>
        <IoIcons.IoIosArrowForward />
      </span>
    </div>
  );
};

export default Navigation;
