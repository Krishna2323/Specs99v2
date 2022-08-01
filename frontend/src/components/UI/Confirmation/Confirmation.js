import React, { Fragment } from "react";
import { Transition } from "react-transition-group";
import Backdrop from "../Backdrop/Backdrop";
import ReactDom from "react-dom";
import "./Confirmation.scss";

const Confirmation = (props) => {
  const modalAnimationClass = props.open
    ? "confirmation-modal-open"
    : "confirmation-modal-close";
  return (
    <Fragment>
      <Backdrop
        open={props.open}
        onBackdropClick={props.onBackdropClick}
        transitionTime=".3s"
      />

      <Transition in={props.open} mountOnEnter unmountOnExit timeout={300}>
        {(state) =>
          ReactDom.createPortal(
            <div className={`confirmation-modal ${modalAnimationClass}`}>
              <h4 className="confirmation-modal-text">{props.text}</h4>
              <div className="confirmation-modal-btn-div">
                <button
                  className="confirmation-modal-btn-div--cancle btn-small"
                  onClick={props.onBackdropClick}
                >
                  Cancle
                </button>
                <button
                  className="confirmation-modal-btn-div--confirm btn-small btn-small"
                  onClick={props.onConfirm}
                >
                  Confrim
                </button>
              </div>
            </div>,
            document.getElementById("confirmation")
          )
        }
      </Transition>
    </Fragment>
  );
};

export default Confirmation;
