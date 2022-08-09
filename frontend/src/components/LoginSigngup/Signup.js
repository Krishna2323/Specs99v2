import React, { Fragment } from "react";
import ReactDom from "react-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../hooks/useInput";
import "./Signup.scss";
import { signup } from "../../store/userSlice/userActions";
import Backdrop from "../UI/Backdrop/Backdrop";
import FormInput from "../UI/FormInput/FormInput";
import * as VsIcons from "react-icons/vsc";
import { Transition } from "react-transition-group";
// import img1 from "./../../public/img/bs/ra4.jpg";
// import * as AiIcons from "react-icons/ai";

const Signup = (props) => {
  const dispatch = useDispatch();
  const signupAnimation = props.open
    ? "signup-form-outer-open"
    : "signup-form-outer-closed";

  const { type } = useSelector((state) => state.notification);

  const emailValidator = (value) => {
    return value.length > 3 && value.includes("@") && value.includes(".");
  };

  const nameValidator = (value) => {
    return value.trim().length > 3;
  };

  const passwordValidator = (value) => {
    return value.trim().length >= 6;
  };

  const {
    value: nameValue,
    inputHandler: nameHandler,
    inputBlurHandler: nameBlurHandler,
    hasError: nameHasError,
    error: nameError,
    showErrorHandler: nameShowErrorHandler,
  } = useInput(nameValidator);

  const {
    value: emailValue,
    inputHandler: emailHandler,
    inputBlurHandler: emailBlurHandler,
    hasError: emailHasError,
    error: emailError,
    showErrorHandler: emailShowErrorHandler,
  } = useInput(emailValidator);

  const {
    value: passwordValue,
    inputHandler: passwordHandler,
    inputBlurHandler: passwordBlurHandler,
    hasError: passwordHasError,
    error: passwordError,
    showErrorHandler: passwordShowErrorHandler,
  } = useInput(passwordValidator);

  const confrimPasswordValidator = (value) => {
    return value === passwordValue && value !== "";
  };

  const {
    value: confirmPasswordValue,
    inputHandler: confirmPasswordHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    hasError: confirmPasswordHasError,
    error: confirmPasswordError,
    showErrorHandler: confirmPasswordShowErrorHandler,
  } = useInput(confrimPasswordValidator);

  const disableSubmitBtn =
    passwordError || nameError || emailError || confirmPasswordError;

  const btnModifier = disableSubmitBtn ? "form-btn-invalid" : "form-btn-valid";

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (disableSubmitBtn) {
      passwordShowErrorHandler();
      nameShowErrorHandler();
      emailShowErrorHandler();
      confirmPasswordShowErrorHandler();
      return;
    }

    dispatch(
      signup({
        name: nameValue,
        email: emailValue,
        password: passwordValue,
        passwordConfirm: confirmPasswordValue,
      })
    );
    if (type === "success") {
      props.closeSingupForm();
    }
  };

  return (
    <Fragment>
      <Backdrop
        open={props.open}
        onBackdropClick={props.closeSignupForm}
        transitionTime=".3s"
      />

      <Transition in={props.open} mountOnEnter unmountOnExit timeout={300}>
        {(state) =>
          ReactDom.createPortal(
            <div className={`signup-form-outer ${signupAnimation}`}>
              <form onSubmit={onFormSubmit} className={`signup-form `}>
                <h5 className="heading-1  mb-sm">Signup</h5>
                <FormInput
                  lable="Name"
                  value={nameValue}
                  onBlur={nameBlurHandler}
                  onChange={nameHandler}
                  type="text"
                  hasError={nameHasError}
                  errorMessage="Name Must Contain 3 Characters."
                  error={nameError}
                />

                <FormInput
                  lable="Email"
                  value={emailValue}
                  onBlur={emailBlurHandler}
                  onChange={emailHandler}
                  type="email"
                  hasError={emailHasError}
                  errorMessage="Please Provide A Valid Email !"
                  error={emailError}
                />

                <FormInput
                  value={passwordValue}
                  lable="Password"
                  type="password"
                  onChange={passwordHandler}
                  onBlur={passwordBlurHandler}
                  hasError={passwordHasError}
                  errorMessage="Password Must Contain 6 Characters."
                  error={passwordError}
                />

                <FormInput
                  value={confirmPasswordValue}
                  lable="Confirm Password"
                  type="password"
                  onChange={confirmPasswordHandler}
                  onBlur={confirmPasswordBlurHandler}
                  hasError={confirmPasswordHasError}
                  errorMessage="Confirm Password Must Be Same As Password."
                  error={confirmPasswordError}
                />

                <button className={`form-btn mt-small ${btnModifier}`}>
                  Submit
                </button>
                <Link
                  to="#"
                  onClick={props.onSigupToLoginLink}
                  className="signup-form__link mt-small-1"
                >
                  Already A User? Login Here.
                </Link>
                <VsIcons.VscChromeClose
                  className="signup-form__close-icon"
                  onClick={props.closeSignupForm}
                />
              </form>
            </div>,
            document.getElementById("signup-form")
          )
        }
      </Transition>
    </Fragment>
  );
};

export default Signup;
