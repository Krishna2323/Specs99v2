import React, { Fragment } from "react";
import ReactDom from "react-dom";
import { Link } from "react-router-dom";
import * as VsIcons from "react-icons/vsc";
import "./Singup.scss";
// import img1 from "./../../public/img/bs/ra4.jpg";
// import * as AiIcons from "react-icons/ai";

const Singup = (props) => {
  const singupAnimation = props.open
    ? "singup-form-open"
    : "singup-form-closed";
  const backdropAnimation = props.open ? "backdrop-open" : "backdrop-closed";

  return (
    <Fragment>
      {ReactDom.createPortal(
        <div
          className={`backdrop ${backdropAnimation}`}
          onClick={props.closeSingupForm}
        ></div>,
        document.getElementById("backdrop")
      )}
      {ReactDom.createPortal(
        <form className={`singup-form ${singupAnimation}`}>
          <h5 className="heading-3">Welcome To Specs99!</h5>
          <div className="form-row">
            <label htmlFor="singup-name">Name</label>

            <input type="text" id="singup-name" autoComplete="off" />
          </div>

          <div className="form-row">
            <label htmlFor="singup-email">Email</label>

            <input type="email" id="singup-email" autoComplete="off" />
          </div>
          <div className="form-row">
            <label htmlFor="singup-password">Password</label>

            <input type="password" id="singup-password" minLength={8} />
          </div>
          <div className="form-row">
            <label htmlFor="singup-confirm-password">Confirm Password</label>

            <input type="password" id="singup-confirm-password" minLength={8} />
          </div>

          <button className="form-btn mt-small">Submit</button>
          <Link
            to="#"
            onClick={props.onSigupToLoginLink}
            className="singup-form__link mt-small-1"
          >
            Already A User? Login Here.
          </Link>
          <VsIcons.VscChromeClose
            className="singup-form__close-icon"
            onClick={props.closeSingupForm}
          />
        </form>,
        document.getElementById("singup-form")
      )}
    </Fragment>
  );
};

export default Singup;
