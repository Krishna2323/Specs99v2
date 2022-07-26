import React, { Fragment, useEffect } from "react";
import ReactDom from "react-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useInput from "./../hooks/useInput";
import "./Login.scss";
import { login } from "../../store/userSlice/userActions";
import FormInput from "../UI/FormInput/FormInput";
import Backdrop from "../UI/Backdrop/Backdrop";
import * as VsIcons from "react-icons/vsc";
// import { useEffect } from "react";
// import { PasswordSharp } from "@mui/icons-material";

const Login = (props) => {
  const { open, closeLoginForm, onLoginToSingupLink } = props;
  const loginFormState = open
    ? "login-form-outer-open"
    : "login-form-outer-closed";

  const { type: requestInfo, action } = useSelector(
    (state) => state.notification
  );

  const dispatch = useDispatch();
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
    // resetInput: emailInputReset,
    isTouched: emailIsTouched,
    inputBlurHandler: emailBlurHandler,
    inputFocusHandler: emailFocusHandler,
    isFocused: isEmailFocused,
  } = useInput(emailValidator);

  const {
    value: passwordValue,
    inputHandler: passwordHandler,
    hasError: passwordHasError,
    inputBlurHandler: passwordBlurHandler,
    // resetInput: passwordInputReset,
    isTouched: passwordIsTouched,
    inputFocusHandler: passwordlFocusHandler,
    isFocused: isPasswordFocused,
  } = useInput(passwordValidator);

  const disableSubmit =
    passwordHasError ||
    emailHasError ||
    !isEmailFocused ||
    !isPasswordFocused ||
    !passwordValidator(passwordValue) ||
    !emailValidator(emailValue);

  const submitBtnModifier = !disableSubmit
    ? "form-btn-valid"
    : "form-btn-invalid";

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!emailValidator(emailValue) || !passwordValidator(passwordValue)) {
      passwordBlurHandler();
      emailBlurHandler();
      return;
    }
    dispatch(login({ email: emailValue, password: passwordValue }));
    if (requestInfo === "success") {
      closeLoginForm();
    }
  };

  useEffect(() => {
    if (action === "login" && requestInfo === "success") {
      closeLoginForm();
    }
  }, [action, requestInfo, closeLoginForm]);

  return (
    <Fragment>
      <Backdrop
        onBackdropClick={closeLoginForm}
        open={open}
        transitionTime=".3s"
      />

      {ReactDom.createPortal(
        <div className={`login-form-outer ${loginFormState}`}>
          <form onSubmit={onFormSubmit} className={`login-form `}>
            <VsIcons.VscChromeClose
              className="login-form__close-icon"
              onClick={closeLoginForm}
            />
            <h5 className="heading-3 mb-sm">Welcome Back To Specs99!</h5>
            <FormInput
              isTouched={emailIsTouched}
              hasError={emailHasError}
              onChange={emailHandler}
              onBlur={emailBlurHandler}
              type={"email"}
              lable={"Email"}
              value={emailValue}
              errorMessage="Please Provide A Valid Email."
              onFocus={emailFocusHandler}
            />

            <FormInput
              type="password"
              lable="Password"
              onChange={passwordHandler}
              onBlur={passwordBlurHandler}
              isTouched={passwordIsTouched}
              hasError={passwordHasError}
              value={passwordValue}
              errorMessage="Please Must Contain 6 Characters."
              onFocus={passwordlFocusHandler}
            />

            <button className={`form-btn mt-small ${submitBtnModifier}`}>
              Submit
            </button>
            <Link
              to="#"
              onClick={onLoginToSingupLink}
              className="login-form__link mt-small-1"
            >
              New To Specs99? Singup Here.
            </Link>
          </form>
        </div>,
        document.getElementById("login-form")
      )}
    </Fragment>
  );
};

export default Login;
