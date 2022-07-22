import React, { Fragment } from "react";
import ReactDom from "react-dom";
import { Link } from "react-router-dom";
import * as VsIcons from "react-icons/vsc";
import useInput from "./../hooks/useInput";
import "./Login.scss";
import FormInput from "../UI/FormInput/FormInput";
import { useEffect } from "react";
// import { PasswordSharp } from "@mui/icons-material";

const Login = (props) => {
  const loginFormState = props.open ? "login-form-open" : "login-form-closed";
  const backdropFormState = props.open ? "backdrop-open" : "backdrop-closed";

  const emailValidator = (value) => {
    return value.length > 3 && value.includes("@") && value.includes(".");
  };

  const passwordValidator = (value) => {
    return value.trim().length >= 6;
  };

  const {
    value: emailValue,
    inputHandler: emailHandler,
    hasError: emailHasError,
    resetInput: emailInputReset,
    isTouched: emailIsTouched,
    inputBlurHandler: emailBlurHandler,
  } = useInput(emailValidator);

  const {
    value: passwordValue,
    inputHandler: passwordHandler,
    hasError: passwordHasError,
    inputBlurHandler: passwordBlurHandler,
    resetInput: passwordInputReset,
    isTouched: passwordIsTouched,
  } = useInput(passwordValidator);

  const disableSubmit = passwordHasError || emailHasError || !emailIsTouched;

  const onFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Fragment>
      {ReactDom.createPortal(
        <div
          className={`backdrop ${backdropFormState}`}
          onClick={props.closeLoginForm}
        ></div>,
        document.getElementById("backdrop")
      )}
      {ReactDom.createPortal(
        <form
          onSubmit={onFormSubmit}
          className={`login-form ${loginFormState}`}
        >
          <h5 className="heading-3">Welcome Back To Specs99!</h5>
          <FormInput
            isTouched={emailIsTouched}
            hasError={emailHasError}
            onChangeHandler={emailHandler}
            blurHandler={emailBlurHandler}
            type={"email"}
            lable={"Email"}
            value={emailValue}
            errorMessage="Please Provide A Valid Email."
          />

          <FormInput
            type="password"
            lable="Password"
            onChangeHandler={passwordHandler}
            blurHandler={passwordBlurHandler}
            isTouched={passwordIsTouched}
            hasError={passwordHasError}
            value={passwordValue}
            errorMessage="Please Must Contain 6 Characters."
          />

          <button
            className="form-btn form-btn-valid  mt-small"
            disabled={disableSubmit}
          >
            Submit
          </button>
          <Link
            to="#"
            onClick={props.onLoginToSingupLink}
            className="login-form__link mt-small-1"
          >
            New To Specs99? Singup Here.
          </Link>
          <VsIcons.VscChromeClose
            className="login-form__close-icon"
            onClick={props.closeLoginForm}
          />
        </form>,
        document.getElementById("login-form")
      )}
    </Fragment>
  );
};

export default Login;
