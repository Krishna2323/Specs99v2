import React from "react";
import "./Loading.scss";

const Loading = (props) => {
  return (
    <div className="loading">
      <h3>{props.heading}</h3>
      <span>{props.message}</span>
    </div>
  );
};

export default Loading;
