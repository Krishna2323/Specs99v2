import React, { Fragment } from "react";
import ReactDom from "react-dom";
import { useSelector } from "react-redux";
// import { Transition } from "react-transition-group";
import "./Notification.scss";

const Notification = (props) => {
  const { status, message, type } = useSelector((state) => state.notification);
  const notificationAnimation = props.open
    ? "notification-box-open"
    : "notification-box-close";

  // const colorModifier=type===""

  return (
    <Fragment>
      {ReactDom.createPortal(
        <div
          className={`notification-box notification-box-${type} ${notificationAnimation}`}
        >
          <h4 className="notification-box__status">{status} :</h4>
          <span className="notification-box__message">{message}</span>
        </div>,
        document.getElementById("notification")
      )}
    </Fragment>
  );
};

export default Notification;
