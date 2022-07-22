import React from "react";
import "./HomeBanner.scss";
import { Link } from "react-router-dom";

const HomeBanner = (props) => {
  return (
    <Link className="home-element home-banner" to="#">
      <img src={props.img} alt="" />
    </Link>
  );
};

export default HomeBanner;
