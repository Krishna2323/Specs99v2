import React from "react";
import "./Loading.scss";
import * as bsIcons from "react-icons/bs";

const Loading = (props) => {
  const div =
    props.type === "loading" ? (
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    ) : (
      <bsIcons.BsEmojiFrownFill />
    );

  return (
    <div className="loading">
      <h3>{props.heading}</h3>
      {div}
      {/* <span>{props.message}</span> */}
    </div>
  );
};

export default Loading;