import React, { Fragment } from "react";
import reactDom from "react-dom";
import "./Checkout.scss";
import Backdrop from "../Backdrop/Backdrop";
import FormInput from "../FormInput/FormInput";
import useInput from "../../hooks/useInput";
import { NameValidator } from "../../helpers/componentHelpers";

const Checkout = () => {
  const {
    value: firstName,
    inputHandler: firstNameHandler,
    inputBlurHandler: firstNameBlurHandler,
    isTouched: isFirstNameTouched,
    isFocused: isFirstNameFocused,
    inputFocusHandler: firstNameFocusHandler,
    hasError: firstNameHasError,
    resetInput: resetFirstName,
  } = useInput(NameValidator);

  return (
    <Fragment>
      <Backdrop open={true} transitionTime=".3s" onBackdropClick={() => {}} />
      {reactDom.createPortal(
        <div className="checkout">
          <h3 className="heading-3 text-center mb-md">Shipping Info</h3>

          <form className="checkout-form">
            <FormInput
              value={firstName}
              onChange={firstNameHandler}
              onBlur={firstNameBlurHandler}
              onFocus={firstNameFocusHandler}
              isTouched={isFirstNameTouched}
              hasError={firstNameHasError}
              lable="First Name"
              errorMessage="First Name Should Contain 3 Characters."
              labelColor="white"
            />
            <FormInput
              value="Last Name"
              onChange={() => {}}
              onBlur={() => {}}
              lable="Last Name"
              labelColor="white"
            />

            <div className="checkout-form-row">
              <label className="checkout-form-row__input-lable">
                Address 1
              </label>
              <textarea
                className="checkout-form-row__input checkout-form-row__input-address-1"
                type="tes"
                rows={2}
              />
            </div>
            <div className="checkout-form-row">
              <label className="checkout-form-row__input-lable">
                Address 2
              </label>
              <textarea
                className="checkout-form-row__input checkout-form-row__input-address-2"
                type="tes"
                rows={2}
              />
            </div>

            <FormInput
              value="Contact Number"
              onChange={() => {}}
              onBlur={() => {}}
              lable="Contact Number"
              labelColor="white"
              type="Number"
            />
            <FormInput
              value="Alternative Contact Number"
              onChange={() => {}}
              onBlur={() => {}}
              lable="Alternative Contact Number"
              labelColor="white"
              type="Number"
            />

            <FormInput
              value="City"
              onChange={() => {}}
              onBlur={() => {}}
              lable="City"
              labelColor="white"
            />
            <FormInput
              value="State"
              onChange={() => {}}
              onBlur={() => {}}
              lable="State"
              labelColor="white"
            />
            <FormInput
              value="Country"
              onChange={() => {}}
              onBlur={() => {}}
              lable="Country"
              labelColor="white"
            />
            <FormInput
              value="Zip Code"
              onChange={() => {}}
              onBlur={() => {}}
              lable="Zip Code"
              labelColor="white"
            />
          </form>
        </div>,
        document.getElementById("checkout")
      )}
    </Fragment>
  );
};

export default Checkout;
