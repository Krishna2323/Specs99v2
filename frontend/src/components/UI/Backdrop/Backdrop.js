import React from "react";
import ReactDom from "react-dom";
import { Transition } from "react-transition-group";
import "./Backdrop.scss";

const Backdrop = (props) => {
  const backdropFormState = props.open ? "backdrop-open" : "backdrop-closed";

  return (
    <Transition in={props.open} unmountOnExit mountOnEnter timeout={300}>
      {(state) =>
        ReactDom.createPortal(
          <div
            className={`backdrop ${backdropFormState}`}
            style={{ transition: `all ${props.transitionTime}` }}
            onClick={props.onBackdropClick}
          ></div>,
          document.getElementById("backdrop")
        )
      }
    </Transition>
  );
};

export default Backdrop;
