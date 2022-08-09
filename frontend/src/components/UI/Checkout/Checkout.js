import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import reactDom from "react-dom";
import "./Checkout.scss";
import Backdrop from "../Backdrop/Backdrop";
import FormInput from "../FormInput/FormInput";
import useInput from "../../hooks/useInput";
import useNotification from "../../hooks/useNotification";
import { NameValidator } from "../../helpers/componentHelpers";
import {
  createCodOrder,
  createOrder,
  createStripeOrder,
} from "../../../store/orderSlice/orderActions";
import { useStripe } from "@stripe/react-stripe-js";
import OrderConfirmation from "../OrderConfirmation/OrderConfirmation";

const Checkout = () => {
  const dispacth = useDispatch();
  const navigate = useNavigate();
  const { notify } = useNotification();
  const [checkOutConfirmation, setCheckOutConfirmation] = useState(false);
  const [confirmationBtnDisable, setConfirmationBtnDisable] = useState(false);

  const closeConfirmation = () => {
    setCheckOutConfirmation(false);
  };
  const stripe = useStripe();

  const [paymentChange, setPaymentChange] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  const cart = useSelector((state) => state.cart);
  const { status } = useSelector((state) => state.order);
  const {
    value: firstName,
    inputHandler: firstNameHandler,
    inputBlurHandler: firstNameBlurHandler,
    hasError: firstNameHasError,
    resetInput: resetFirstName,
    error: firstNameError,
    showErrorHandler: firstNameShowErrorHandler,
  } = useInput(NameValidator);

  const {
    value: lastName,
    inputHandler: lastNameHandler,
    inputBlurHandler: lastNameBlurHandler,
    hasError: lastNameHasError,
    resetInput: resetLastName,
    error: lastNameError,
    showErrorHandler: lastNameShowErrorHandler,
  } = useInput(NameValidator);

  const {
    value: email,
    inputHandler: emailHandler,
    inputBlurHandler: emailBlurHandler,
    hasError: emailHasError,
    resetInput: resetEmail,
    error: emailError,
    showErrorHandler: emailShowErrorHandler,
  } = useInput(NameValidator);

  const {
    value: contact,
    inputHandler: contactHandler,
    inputBlurHandler: contactBlurHandler,
    hasError: contactHasError,
    resetInput: resetContact,
    error: contactError,
    showErrorHandler: contactShowErrorHandler,
  } = useInput(NameValidator);

  const {
    value: altContact,
    inputHandler: altContactHandler,
    inputBlurHandler: altContactBlurHandler,
    hasError: altContactHasError,
    resetInput: resetaltContact,
    error: altContactError,
    showErrorHandler: altContactShowErrorHandler,
  } = useInput(NameValidator);

  const {
    value: address,
    inputHandler: addressHandler,
    inputBlurHandler: addressBlurHandler,
    hasError: addressHasError,
    resetInput: resetaddress,
    error: addressError,
    showErrorHandler: addressShowErrorHandler,
  } = useInput(NameValidator);

  const {
    value: street,
    inputHandler: streetHandler,
    inputBlurHandler: streetBlurHandler,
    hasError: streetHasError,
    resetInput: resetStreet,
    error: streetError,
    showErrorHandler: streetShowErrorHandler,
  } = useInput(NameValidator);

  const {
    value: city,
    inputHandler: cityHandler,
    inputBlurHandler: cityBlurHandler,
    hasError: cityHasError,
    resetInput: resetcity,
    error: cityError,
    showErrorHandler: cityShowErrorHandler,
  } = useInput(NameValidator);

  const {
    value: state,
    inputHandler: stateHandler,
    inputBlurHandler: stateBlurHandler,
    hasError: stateHasError,
    resetInput: resetstate,
    error: stateError,
    showErrorHandler: stateShowErrorHandler,
  } = useInput(NameValidator);

  const {
    value: country,
    inputHandler: countryHandler,
    inputBlurHandler: countryBlurHandler,
    hasError: countryHasError,
    resetInput: resetcountry,
    error: countryError,
    showErrorHandler: countryShowErrorHandler,
  } = useInput(NameValidator);

  const {
    value: postalCode,
    inputHandler: postalCodeHandler,
    inputBlurHandler: postalCodeBlurHandler,
    hasError: postalCodeHasError,
    resetInput: resetpostalCode,
    error: postalCodeError,
    showErrorHandler: postalCodeShowErrorHandler,
  } = useInput(NameValidator);

  const {
    value: payment,
    inputHandler: paymentHandler,
    inputBlurHandler: paymentBlurHandler,
    hasError: paymentHasError,
    resetInput: resetpayment,
    // error:paymentError,
    showErrorHandler: paymentShowErrorHandler,
  } = useInput(NameValidator);

  const handlePaymentChange = (e) => {
    paymentHandler(e);
    setPaymentChange(true);
  };

  const checkIsAllValid = () => {
    return (
      firstNameError ||
      lastNameError ||
      contactError ||
      altContactError ||
      addressError ||
      streetError ||
      cityError ||
      stateError ||
      countryError
    );
  };

  const showAllError = () => {
    firstNameShowErrorHandler();
    lastNameShowErrorHandler();
    emailShowErrorHandler();
    contactShowErrorHandler();
    altContactShowErrorHandler();
    addressShowErrorHandler();
    streetShowErrorHandler();
    cityShowErrorHandler();
    stateShowErrorHandler();
    countryShowErrorHandler();
    postalCodeShowErrorHandler();
  };

  const dispatchCodFunc = async () => {
    setConfirmationBtnDisable(true);
    dispacth(
      createCodOrder(cart, {
        firstName,
        lastName,
        email,
        contactNumber: contact,
        altContactNumber: altContact,
        address,
        street,
        city,
        state,
        country,
        postalCode,
        paymentMethod: payment,
      })
    );
    setCheckOutConfirmation(false);
    setConfirmationBtnDisable(false);
  };

  const stripeCheckout = async () => {
    try {
      setConfirmationBtnDisable(true);
      const session = await createStripeOrder(cart.products);
      await stripe.redirectToCheckout({
        sessionId: session,
      });
    } catch (error) {
      console.log(error);
      setConfirmationBtnDisable(true);
    }
    setCheckOutConfirmation(false);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (checkIsAllValid()) {
      showAllError();
      if (!paymentChange) {
        setPaymentError("Select Payment Method.");
      }
      return;
    }

    console.log("dispatching");

    setCheckOutConfirmation(true);
  };

  useEffect(() => {
    if (status === "placed" || status === "failed") {
      navigate("/");
    }
  }, [status]);

  return (
    <Fragment>
      <OrderConfirmation
        open={checkOutConfirmation}
        onBackdropClick={closeConfirmation}
        onConfrimationClick={
          payment === "cod" ? dispatchCodFunc : stripeCheckout
        }
        confirmationBtnDisable={confirmationBtnDisable}
      />
      {/* <Backdrop open={true} transitionTime=".3s" onBackdropClick={() => {}} /> */}
      <div className="checkout">
        <div>
          <form onSubmit={submitForm} className="checkout-form-address">
            <h3 className="heading-1 text-center mb-md">Shipping Info</h3>
            <FormInput
              value={firstName}
              onChange={firstNameHandler}
              onBlur={firstNameBlurHandler}
              hasError={firstNameHasError}
              lable="First Name"
              errorMessage="Must Contain 3 Characters."
              labelColor="white"
              type="text"
              error={firstNameError}
            />
            <FormInput
              value={lastName}
              onChange={lastNameHandler}
              onBlur={lastNameBlurHandler}
              lable="Last Name"
              errorMessage="Must Contain 3 Characters."
              type="text"
              labelColor="white"
              hasError={lastNameHasError}
              error={lastNameError}
            />
            <FormInput
              value={email}
              onChange={emailHandler}
              onBlur={emailBlurHandler}
              lable="Email"
              errorMessage="Provide A Valid Email."
              type="text"
              labelColor="white"
              hasError={emailHasError}
              error={emailError}
            />

            <FormInput
              value={contact}
              onChange={contactHandler}
              onBlur={contactBlurHandler}
              lable="Contact"
              errorMessage="Provide A Valid Contact."
              type="number"
              labelColor="white"
              hasError={contactHasError}
              error={contactError}
            />

            <FormInput
              value={altContact}
              onChange={altContactHandler}
              onBlur={altContactBlurHandler}
              lable="Alternative Contact"
              errorMessage="Provide A Valid Alternative Contact."
              type="number"
              labelColor="white"
              hasError={altContactHasError}
              error={altContactError}
            />

            <FormInput
              value={address}
              onChange={addressHandler}
              onBlur={addressBlurHandler}
              lable="Address"
              errorMessage="Provide A  address ."
              type="text"
              labelColor="white"
              hasError={addressHasError}
              error={addressError}
            />

            <FormInput
              value={street}
              onChange={streetHandler}
              onBlur={streetBlurHandler}
              lable="Apartment / Street / House.No"
              errorMessage="Provide A  Street ."
              type="text"
              labelColor="white"
              hasError={streetHasError}
              error={streetError}
            />

            <FormInput
              value={city}
              onChange={cityHandler}
              onBlur={cityBlurHandler}
              lable="City"
              errorMessage="Provide A  city ."
              type="text"
              labelColor="white"
              hasError={cityHasError}
              error={cityError}
            />

            <FormInput
              value={state}
              onChange={stateHandler}
              onBlur={stateBlurHandler}
              lable="State"
              errorMessage="Provide A  state ."
              type="text"
              labelColor="white"
              hasError={stateHasError}
              error={stateError}
            />

            <FormInput
              value={country}
              onChange={countryHandler}
              onBlur={countryBlurHandler}
              lable="Country"
              errorMessage="Provide A  country ."
              type="text"
              labelColor="white"
              hasError={countryHasError}
              error={countryError}
            />

            <FormInput
              value={postalCode}
              onChange={postalCodeHandler}
              onBlur={postalCodeBlurHandler}
              lable="Postal Code"
              errorMessage="Provide A Postal Code ."
              type="text"
              labelColor="white"
              hasError={postalCodeHasError}
              error={postalCodeError}
            />

            <div className="checkout-form-payment">
              <h4 className="heading-3 text-center mb-sm">Payment Method</h4>
              <span className="checkout-form-payment__error">
                {paymentError} {""}
              </span>
              <div className="checkout-form-payment__methods">
                <div className="checkout-form-payment__methods-row">
                  <input
                    type="radio"
                    id="cashOnDelivery"
                    className="radio-input"
                    value={"cod"}
                    name="payment"
                    onChange={handlePaymentChange}
                  />
                  <label htmlFor="cashOnDelivery" className="radio-label">
                    <span className="radio-btn"></span>
                    Cash On Delivery
                  </label>
                </div>
                <div className="checkout-form-payment__methods-row">
                  <input
                    type="radio"
                    id="credit-debit-card"
                    className="radio-input"
                    value={"online"}
                    name="payment"
                    onChange={handlePaymentChange}
                  />
                  <label htmlFor="credit-debit-card" className="radio-label">
                    <span className="radio-btn"></span>
                    Credit/Debit Card
                  </label>
                </div>
              </div>
            </div>
            <div className="checkout-form__submit-btn">
              <button className="btn-primary btn-small--primary ">
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Checkout;
