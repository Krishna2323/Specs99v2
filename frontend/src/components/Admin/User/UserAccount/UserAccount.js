import React, { useEffect, useState } from "react";
import "./UserAccount.scss";
import Sidebar from "../../DashBoard/SideBar/Sidebar";
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

const UserAccount = () => {
  const [detailToChange, setDetailToChange] = useState("user-detail");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const {
    value: nameValue,
    isTouched: nameIsTouched,
    isFocused: nameIsFocused,
    inputHandler: nameHandler,
    inputBlurHandler: nameBlurHandler,
    hasError: nameHasError,
    resetInput: nameReset,
    inputFocusHandler: nameFocusHandler,
  } = useInput(NameValidator);

  const {
    value: emailValue,
    isTouched: emailIsTouched,
    isFocused: emailIsFocused,
    inputHandler: emailHandler,
    inputBlurHandler: emailBlurHandler,
    hasError: emailHasError,
    resetInput: emailReset,
    inputFocusHandler: emailFocusHandler,
  } = useInput(emailValidator);

  const {
    value: oldPasswordValue,
    isTouched: oldPasswordIsTouched,
    isFocused: oldPasswordIsFocused,
    inputHandler: oldPasswordHandler,
    inputBlurHandler: oldPasswordBlurHandler,
    hasError: oldPasswordHasError,
    resetInput: oldPasswordReset,
    inputFocusHandler: oldPasswordFocusHandler,
  } = useInput(passwordValidator);

  const {
    value: newPasswordValue,
    isTouched: newPasswordIsTouched,
    isFocused: newPasswordIsFocused,
    inputHandler: newPasswordHandler,
    inputBlurHandler: newPasswordBlurHandler,
    hasError: newPasswordHasError,
    resetInput: newPasswordReset,
    inputFocusHandler: newPasswordFocusHandler,
  } = useInput(passwordValidator);
  const {
    value: confirmPasswordValue,
    isTouched: confirmPasswordIsTouched,
    isFocused: confirmPasswordIsFocused,
    inputHandler: confirmPasswordHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    hasError: confirmPasswordHasError,
    resetInput: confirmPasswordReset,
    inputFocusHandler: confirmPasswordFocusHandler,
  } = useInput(passwordValidator);

  const setPasswordBlured = () => {
    newPasswordBlurHandler();
    oldPasswordBlurHandler();
    confirmPasswordBlurHandler();
  };

  const setDetailBlured = () => {
    nameBlurHandler();
    emailBlurHandler();
  };

  const setPasswordToChange = () => {
    setDetailToChange("user-password");
  };
  const setUserDetailToChange = () => {
    setDetailToChange("user-detail");
  };

  const checkIsPasswordTouched = () => {
    return (
      newPasswordIsFocused && oldPasswordIsFocused && confirmPasswordIsFocused
    );
  };
  const checkPasswordError = () => {
    return oldPasswordHasError || newPasswordHasError || confirmPasswordError;
  };

  const checkIsDetailTouched = () => {
    return nameIsFocused || emailIsFocused;
  };
  const checkDetailError = () => {
    return emailHasError || nameHasError;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (detailToChange === "user-detail") {
      if (!checkIsDetailTouched() || checkDetailError()) {
        setDetailBlured();
        return;
      } else {
        dispatch(updateUser({ name: nameValue, email: emailValue }));
      }
    }
    if (detailToChange === "user-password") {
      if (!checkIsPasswordTouched() || checkPasswordError()) {
        setPasswordBlured();
        console.log("Returning");
      } else {
      }

      console.log(
        oldPasswordHasError,
        newPasswordHasError,
        checkPasswordError(),
        checkIsPasswordTouched()
      );
    }
  };

  useEffect(() => {
    setConfirmPasswordError(
      (state) =>
        confirmPasswordIsTouched && confirmPasswordValue !== newPasswordValue
    );
  }, [
    confirmPasswordValue,
    newPasswordValue,
    setConfirmPasswordError,
    confirmPasswordIsTouched,
  ]);

  useState(() => {
    if (user) {
      nameHandler(user.name);
      emailHandler(user.email);
    }
  }, [user]);

  return (
    <div className="user-account-page">
      <Sidebar />
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
                  isTouched={nameIsTouched}
                  hasError={nameHasError}
                  onChange={nameHandler}
                  onBlur={nameBlurHandler}
                  type="text"
                  lable="Name"
                  value={nameValue}
                  errorMessage="Provide Name To Updated. "
                  onFocus={nameFocusHandler}
                  labelColor="white"
                />
                <FormInput
                  isTouched={emailIsTouched}
                  hasError={emailHasError}
                  onChange={emailHandler}
                  onBlur={emailBlurHandler}
                  type="email"
                  lable="Email"
                  value={emailValue}
                  errorMessage="Provide Email To Update."
                  onFocus={() => {}}
                  labelColor="white"
                />
              </>
            )}
            {detailToChange === "user-password" && (
              <>
                <FormInput
                  isTouched={oldPasswordIsTouched}
                  hasError={oldPasswordHasError}
                  onChange={oldPasswordHandler}
                  onBlur={oldPasswordBlurHandler}
                  onFocus={oldPasswordFocusHandler}
                  type="password"
                  lable="Old Password"
                  value={oldPasswordValue}
                  errorMessage="Provide Old Password."
                  labelColor="white"
                />
                <FormInput
                  isTouched={newPasswordIsTouched}
                  hasError={newPasswordHasError}
                  onChange={newPasswordHandler}
                  onBlur={newPasswordBlurHandler}
                  type="password"
                  lable="New Password"
                  value={newPasswordValue}
                  errorMessage="Provide New Password."
                  onFocus={newPasswordFocusHandler}
                  labelColor="white"
                />
                <FormInput
                  isTouched={confirmPasswordIsTouched}
                  hasError={confirmPasswordError}
                  onChange={confirmPasswordHandler}
                  onBlur={confirmPasswordBlurHandler}
                  type="password"
                  lable="Confirm Password"
                  value={confirmPasswordValue}
                  errorMessage="Does Not Match With New Password."
                  onFocus={confirmPasswordFocusHandler}
                  labelColor="white"
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
