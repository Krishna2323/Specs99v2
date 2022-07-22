import React from "react";
import "./Container.scss";

const Container = (props) => {
  return <div className="container">{props.children}</div>;
};

export default Container;
