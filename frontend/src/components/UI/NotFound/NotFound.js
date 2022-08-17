import React, { Fragment } from "react";
import Loading from "../Loading/Loading";
import "./NotFound.scss";

const NotFound = () => {
  return (
    <div className="not-found">
      <Loading heading="Page Not Found!" />
    </div>
  );
};

export default NotFound;
