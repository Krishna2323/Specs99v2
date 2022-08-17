import React, { useEffect, useState } from "react";
import "./UserAccount.scss";
import Sidebar from "../../User/UserUi/SideBar/Sidebar";
import FormInput from "../../../UI/FormInput/FormInput";
import useInput from "../../../hooks/useInput";
import {
  NameValidator,
  EmailValidator,
  passwordValidator,
  confirmPasswordValidator,
  emailValidator,
} from "../../../helpers/componentHelpers";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../../store/userSlice/userActions";
import Navigation from "../../User/UserUi/Navigation/Navigation";
import useNotification from "../../../hooks/useNotification";

const UserAccount = () => {
  const [detailToChange, setDetailToChange] = useState("user-detail");

  const { user } = useSelector((state) => state.user);
  const { notify } = useNotification();
  const dispatch = useDispatch();

  const {
    value: nameValue,
    inputHandler: nameHandler,
    inputBlurHandler: nameBlurHandler,
    hasError: nameHasError,
    resetInput: nameReset,
    error: nameError,
    showErrorHandler: nameShowErrorHandler,
  } = useInput(NameValidator);

  const {
    value: emailValue,

    inputHandler: emailHandler,
    inputBlurHandler: emailBlurHandler,
    hasError: emailHasError,
    resetInput: emailReset,
    error: emailError,
    showErrorHandler: emailShowErrorHandler,
  } = useInput(emailValidator);

  const {
    value: oldPasswordValue,

    inputHandler: oldPasswordHandler,
    inputBlurHandler: oldPasswordBlurHandler,
    hasError: oldPasswordHasError,
    resetInput: oldPasswordReset,
    error: oldPasswordError,
    showErrorHandler: oldPasswordShowErrorHandler,
  } = useInput(passwordValidator);

  const {
    value: newPasswordValue,
    inputHandler: newPasswordHandler,
    inputBlurHandler: newPasswordBlurHandler,
    hasError: newPasswordHasError,
    resetInput: newPasswordReset,
    error: newPasswordError,
    showErrorHandler: newPasswordShowErrorHandler,
  } = useInput(passwordValidator);

  const { value: confirmPasswordValue, inputHandler: confirmPasswordHandler } =
    useInput(confirmPasswordValidator);

  const [confirmPasswordError, setConfirmPasswordError] = useState(
    confirmPasswordValidator(newPasswordValue, confirmPasswordValue)
  );
  const [confirmPasswordShowError, setConfirmPasswordShowError] =
    useState(false);

  const confirmPasswordHasError =
    confirmPasswordError && confirmPasswordShowError;

  const confirmPasswordBlurHandler = (e) => {
    setConfirmPasswordShowError(true);
  };

  const setPasswordShowError = () => {
    oldPasswordShowErrorHandler();
    newPasswordShowErrorHandler();
    setConfirmPasswordShowError(true);
  };

  const setDetailShowError = () => {
    emailShowErrorHandler();
    nameShowErrorHandler();
  };

  const setPasswordToChange = () => {
    setDetailToChange("user-password");
  };
  const setUserDetailToChange = () => {
    setDetailToChange("user-detail");
  };

  const checkPasswordError = () => {
    return oldPasswordError || newPasswordError || confirmPasswordError;
  };

  const checkDetailError = () => {
    return emailError || nameError;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (detailToChange === "user-detail") {
      if (checkDetailError()) {
        setDetailShowError();
        return;
      } else {
        dispatch(updateUser({ name: nameValue, email: emailValue }));
      }
    }
    if (detailToChange === "user-password") {
      if (checkPasswordError()) {
        setPasswordShowError();
      } else {
        notify("loading", "Action", "Not Implemented Yet.", "ChnagePassword");
      }
    }
  };

  useEffect(() => {
    if (user) {
      nameHandler(user.name);
      emailHandler(user.email);
    }
    setConfirmPasswordError(
      (state) => confirmPasswordValue !== newPasswordValue
    );
  }, [confirmPasswordValue, newPasswordValue, newPasswordError, user]);

  return (
    <div className="user-account-page">
      <Sidebar />
      <Navigation />
      <div className="user-account-container">
        <div className="user-account-container__details">
          <h5 className="heading-1">Account</h5>
          <form
            onSubmit={handleSubmit}
            className="user-account-container__details__form"
          >
            {detailToChange === "user-detail" && (
              <>
                <FormInput
                  hasError={nameHasError}
                  onChange={nameHandler}
                  onBlur={nameBlurHandler}
                  type="text"
                  lable="Name"
                  value={nameValue}
                  errorMessage="Provide Name To Updated. "
                  labelColor="white"
                  error={nameError}
                />
                <FormInput
                  hasError={emailHasError}
                  onChange={emailHandler}
                  onBlur={emailBlurHandler}
                  type="email"
                  lable="Email"
                  value={emailValue}
                  errorMessage="Provide Email To Update."
                  onFocus={() => {}}
                  labelColor="white"
                  error={emailError}
                />
              </>
            )}
            {detailToChange === "user-password" && (
              <>
                <FormInput
                  hasError={oldPasswordHasError}
                  onChange={oldPasswordHandler}
                  onBlur={oldPasswordBlurHandler}
                  type="password"
                  lable="Old Password"
                  value={oldPasswordValue}
                  errorMessage="Provide Old Password."
                  labelColor="white"
                  error={oldPasswordError}
                />
                <FormInput
                  hasError={newPasswordHasError}
                  onChange={newPasswordHandler}
                  onBlur={newPasswordBlurHandler}
                  type="password"
                  lable="New Password"
                  value={newPasswordValue}
                  errorMessage="Provide New Password."
                  labelColor="white"
                  error={newPasswordError}
                />
                <FormInput
                  hasError={confirmPasswordHasError}
                  onChange={confirmPasswordHandler}
                  onBlur={confirmPasswordBlurHandler}
                  type="password"
                  lable="Confirm Password"
                  value={confirmPasswordValue}
                  errorMessage="Does Not Match With New Password."
                  labelColor="white"
                  error={confirmPasswordError}
                />
              </>
            )}

            <button className="form-btn">Update</button>
            {detailToChange === "user-detail" && (
              <button
                onClick={setPasswordToChange}
                className="user-account-container__details__form__pass-link"
              >
                {" "}
                Change Password
              </button>
            )}
            {detailToChange === "user-password" && (
              <button
                onClick={setUserDetailToChange}
                className="user-account-container__details__form__pass-link"
              >
                {" "}
                Change Details
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
