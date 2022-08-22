import React, { Fragment, useEffect } from "react";
import ReactDom from "react-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../hooks/useInput";
import "./Login.scss";
import { login } from "../../store/userSlice/userActions";
import FormInput from "../UI/FormInput/FormInput";
import Backdrop from "../UI/Backdrop/Backdrop";
import * as VsIcons from "react-icons/vsc";
import { Transition } from "react-transition-group";
import { uiSliceAction } from "../../store/uiSlice/uiSlice";
import { emailValidator, passwordValidator } from "../helpers/componentHelpers";
// import { useEffect } from "react";
// import { PasswordSharp } from "@mui/icons-material";

const Login = (props) => {
  const { open, closeLoginForm, onLoginToSignupLink } = props;
  const { isLoggedIn } = useSelector((state) => state.user);

  const loginFormState = open
    ? "login-form-outer-open"
    : "login-form-outer-closed";

  const { type: requestInfo, action } = useSelector(
    (state) => state.notification
  );

  const dispatch = useDispatch();

  const {
    value: emailValue,
    inputHandler: emailHandler,
    hasError: emailHasError,
    resetInput: emailInputReset,
    inputBlurHandler: emailBlurHandler,
    error: emailError,
    showErrorHandler: emailShowErrorHandler,
  } = useInput(emailValidator);

  const {
    value: passwordValue,
    inputHandler: passwordHandler,
    hasError: passwordHasError,
    inputBlurHandler: passwordBlurHandler,
    resetInput: passwordInputReset,
    error: passwordError,
    showErrorHandler: passwordShowErrorHandler,
  } = useInput(passwordValidator);

  const disableSubmit = emailError || passwordError;

  const submitBtnModifier = !disableSubmit
    ? "form-btn-valid"
    : "form-btn-invalid";

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!emailValidator(emailValue) || !passwordValidator(passwordValue)) {
      emailShowErrorHandler();
      passwordShowErrorHandler();
      return;
    }
    dispatch(login({ email: emailValue, password: passwordValue }));
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(uiSliceAction.closeLoginForm());
      emailInputReset();
      passwordInputReset();
    }
  }, [isLoggedIn]);

  return (
    <Fragment>
      <Backdrop
        onBackdropClick={closeLoginForm}
        open={open}
        transitionTime=".3s"
      />

      {ReactDom.createPortal(
        <Transition in={open} mountOnEnter unmountOnExit timeout={300}>
          <div className={`login-form-outer ${loginFormState}`}>
            <form onSubmit={onFormSubmit} className={`login-form `}>
              <VsIcons.VscChromeClose
                className="login-form__close-icon"
                onClick={closeLoginForm}
              />
              <h5 className="heading-1  mb-sm">Login</h5>
              <FormInput
                onChange={emailHandler}
                onBlur={emailBlurHandler}
                type={"email"}
                lable={"Email"}
                value={emailValue}
                errorMessage="Please Provide A Valid Email."
                hasError={emailHasError}
                error={emailError}
              />

              <FormInput
                type="password"
                lable="Password"
                onChange={passwordHandler}
                onBlur={passwordBlurHandler}
                hasError={passwordHasError}
                value={passwordValue}
                errorMessage="Please Must Contain 6 Characters."
                error={passwordError}
              />

              <button className={`form-btn mt-small ${submitBtnModifier}`}>
                Submit
              </button>
              <Link
                to="#"
                onClick={onLoginToSignupLink}
                className="login-form__link mt-small-1"
              >
                New To Specs99? Signup Here.
              </Link>
            </form>
          </div>
        </Transition>,
        document.getElementById("login-form")
      )}
    </Fragment>
  );
};

export default Login;
