import React from "react";
import "./Loading.scss";
import * as bsIcons from "react-icons/bs";

const Loading = (props) => {
  const { emoji = true, error = true } = props;
  const div =
    emoji && props.type === "loading" ? (
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    ) : error ? (
      <bsIcons.BsEmojiFrownFill />
    ) : (
      <bsIcons.BsEmojiSmileUpsideDownFill />
    );
  return (
    <div className={`loading ${props.dark ? "loading--dark" : ""}`}>
      <h3>{props.heading}</h3>
      {div}
      {/* <span>{props.message}</span> */}
    </div>
  );
};

export default Loading;
