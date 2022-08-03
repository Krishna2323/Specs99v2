import React, { Fragment, useEffect, useState } from "react";
import ReactDom from "react-dom";
import { Transition } from "react-transition-group";
import Backdrop from "../Backdrop/Backdrop";
import "./OrderConfirmation.scss";

const OrderConfirmation = (props) => {
  const [randomNumber, setRandomNunber] = useState(0);
  const [codeInput, setCodeInput] = useState("");
  useEffect(() => {
    setRandomNunber(Math.floor(Math.random() * 899 + 100));
  }, []);

  const handleCodeInputChange = (e) => {
    setCodeInput(e.target.value);
  };

  const handleConfirmationCLick = (e) => {
    if (+codeInput === randomNumber) {
      props.onConfrimationClick();
    }
  };

  return (
    <Fragment>
      <Backdrop open={props.open} />

      <Transition mountOnEnter unmountOnExit in={props.open}>
        {(state) =>
          ReactDom.createPortal(
            <div className="order-confirmation">
              <h5 className="heading-1">
                Continue With {props.payment} Payment
              </h5>
              <span className="random-number">Code: {randomNumber}</span>
              <input
                type={"number"}
                placeholder={"Enter The Code Above"}
                onChange={handleCodeInputChange}
              />
              <button
                disabled={props.confirmationBtnDisable}
                className="btn-small"
                onClick={handleConfirmationCLick}
              >
                Confirm
              </button>
            </div>,
            document.getElementById("order-confirmation")
          )
        }
      </Transition>
    </Fragment>
  );
};

export default OrderConfirmation;
