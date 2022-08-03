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

  const stripe = useStripe();

  const [paymentChange, setPaymentChange] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  const cart = useSelector((state) => state.cart);
  const { status } = useSelector((state) => state.order);
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

  const {
    value: lastName,
    inputHandler: lastNameHandler,
    inputBlurHandler: lastNameBlurHandler,
    isTouched: isLastNameTouched,
    isFocused: isLastNameFocused,
    inputFocusHandler: lastNameFocusHandler,
    hasError: lastNameHasError,
    resetInput: resetLastName,
  } = useInput(NameValidator);

  const {
    value: email,
    inputHandler: emailHandler,
    inputBlurHandler: emailBlurHandler,
    isTouched: isEmailTouched,
    isFocused: isEmailFocused,
    inputFocusHandler: emailFocusHandler,
    hasError: emailHasError,
    resetInput: resetEmail,
  } = useInput(NameValidator);

  const {
    value: contact,
    inputHandler: contactHandler,
    inputBlurHandler: contactBlurHandler,
    isTouched: isContactTouched,
    isFocused: isContactFocused,
    inputFocusHandler: contactFocusHandler,
    hasError: contactHasError,
    resetInput: resetContact,
  } = useInput(NameValidator);

  const {
    value: altContact,
    inputHandler: altContactHandler,
    inputBlurHandler: altContactBlurHandler,
    isTouched: isAltContactTouched,
    isFocused: isAltContactFocused,
    inputFocusHandler: altContactFocusHandler,
    hasError: altContactHasError,
    resetInput: resetaltContact,
  } = useInput(NameValidator);

  const {
    value: address,
    inputHandler: addressHandler,
    inputBlurHandler: addressBlurHandler,
    isTouched: isAddressTouched,
    isFocused: isAddressFocused,
    inputFocusHandler: addressFocusHandler,
    hasError: addressHasError,
    resetInput: resetaddress,
  } = useInput(NameValidator);

  const {
    value: street,
    inputHandler: streetHandler,
    inputBlurHandler: streetBlurHandler,
    isTouched: isStreetTouched,
    isFocused: isStreetFocused,
    inputFocusHandler: streetFocusHandler,
    hasError: streetHasError,
    resetInput: resetstreet,
  } = useInput(NameValidator);

  const {
    value: city,
    inputHandler: cityHandler,
    inputBlurHandler: cityBlurHandler,
    isTouched: isCityTouched,
    isFocused: isCityFocused,
    inputFocusHandler: cityFocusHandler,
    hasError: cityHasError,
    resetInput: resetcity,
  } = useInput(NameValidator);

  const {
    value: state,
    inputHandler: stateHandler,
    inputBlurHandler: stateBlurHandler,
    isTouched: isStateTouched,
    isFocused: isStateFocused,
    inputFocusHandler: stateFocusHandler,
    hasError: stateHasError,
    resetInput: resetstate,
  } = useInput(NameValidator);

  const {
    value: country,
    inputHandler: countryHandler,
    inputBlurHandler: countryBlurHandler,
    isTouched: isCountryTouched,
    isFocused: isCountryFocused,
    inputFocusHandler: countryFocusHandler,
    hasError: countryHasError,
    resetInput: resetcountry,
  } = useInput(NameValidator);

  const {
    value: postalCode,
    inputHandler: postalCodeHandler,
    inputBlurHandler: postalCodeBlurHandler,
    isTouched: isPostalCodeTouched,
    isFocused: isPostalCodeFocused,
    inputFocusHandler: postalCodeFocusHandler,
    hasError: postalCodeHasError,
    resetInput: resetpostalCode,
  } = useInput(NameValidator);

  const {
    value: payment,
    inputHandler: paymentHandler,
    inputBlurHandler: paymentBlurHandler,
    isTouched: isPaymentTouched,
    isFocused: isPaymentFocused,
    inputFocusHandler: paymentFocusHandler,
    hasError: paymentHasError,
    resetInput: resetpayment,
  } = useInput(NameValidator);

  const handlePaymentChange = (e) => {
    paymentHandler(e);
    setPaymentChange(true);
  };

  const checkIsAllFocused = () => {
    return (
      !isFirstNameFocused ||
      !isLastNameFocused ||
      !isContactFocused ||
      !isAltContactFocused ||
      !isAddressFocused ||
      !isStreetFocused ||
      !isCityFocused ||
      !isStateFocused ||
      !isCountryFocused ||
      !paymentChange ||
      !isPostalCodeFocused
    );
  };

  const blurAll = () => {
    firstNameBlurHandler();
    lastNameBlurHandler();
    contactBlurHandler();
    altContactBlurHandler();
    addressBlurHandler();
    streetBlurHandler();
    cityBlurHandler();
    stateBlurHandler();
    countryBlurHandler();
    postalCodeBlurHandler();
  };

  const dispatchCodFunc = () => {
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

    if (checkIsAllFocused()) {
      blurAll();
      return;
    }

    console.log("dispatching");

    setCheckOutConfirmation(true);
  };

  useEffect(() => {
    if (status === "placed") {
      navigate("/");
    }
    if (cart.products.length === 0 && status !== "placed" && !cart.isLoading) {
      notify("loading", "Can't Checkout", "Cart Is Empty", "checkout");
      navigate("/");
    }
  }, [status]);

  return (
    <Fragment>
      <OrderConfirmation
        open={checkOutConfirmation}
        onConfrimationClick={
          payment === "cod" ? dispatchCodFunc : stripeCheckout
        }
        confirmationBtnDisable={confirmationBtnDisable}
      />
      {/* <Backdrop open={true} transitionTime=".3s" onBackdropClick={() => {}} /> */}
      <div className="checkout">
        <div>
          <form onSubmit={submitForm} className="checkout-form-address">
            <h3 className="heading-3 text-center mb-md">Shipping Info</h3>
            <FormInput
              value={firstName}
              onChange={firstNameHandler}
              onBlur={firstNameBlurHandler}
              onFocus={firstNameFocusHandler}
              isTouched={isFirstNameTouched}
              hasError={firstNameHasError}
              lable="First Name"
              errorMessage="Must Contain 3 Characters."
              labelColor="white"
              type="text"
            />
            <FormInput
              value={lastName}
              onChange={lastNameHandler}
              onBlur={lastNameBlurHandler}
              onFocus={lastNameFocusHandler}
              lable="Last Name"
              errorMessage="Must Contain 3 Characters."
              isTouched={isLastNameTouched}
              type="text"
              labelColor="white"
              hasError={lastNameHasError}
            />
            <FormInput
              value={email}
              onChange={emailHandler}
              onBlur={emailBlurHandler}
              onFocus={emailFocusHandler}
              lable="Email"
              errorMessage="Provide A Valid Email."
              isTouched={isEmailTouched}
              type="text"
              labelColor="white"
              hasError={emailHasError}
            />

            <FormInput
              value={contact}
              onChange={contactHandler}
              onBlur={contactBlurHandler}
              onFocus={contactFocusHandler}
              lable="Contact"
              errorMessage="Provide A Valid Contact."
              isTouched={isContactTouched}
              type="number"
              labelColor="white"
              hasError={contactHasError}
            />

            <FormInput
              value={altContact}
              onChange={altContactHandler}
              onBlur={altContactBlurHandler}
              onFocus={altContactFocusHandler}
              lable="Alternative Contact"
              errorMessage="Provide A Valid Alternative Contact."
              isTouched={isAltContactTouched}
              type="text"
              labelColor="white"
              hasError={altContactHasError}
            />

            <FormInput
              value={address}
              onChange={addressHandler}
              onBlur={addressBlurHandler}
              onFocus={addressFocusHandler}
              lable="Address"
              errorMessage="Provide A  address ."
              isTouched={isAddressTouched}
              type="text"
              labelColor="white"
              hasError={addressHasError}
            />

            <FormInput
              value={street}
              onChange={streetHandler}
              onBlur={streetBlurHandler}
              onFocus={streetFocusHandler}
              lable="Apartment / Street / House.No"
              errorMessage="Provide A  Street ."
              isTouched={isStreetTouched}
              type="text"
              labelColor="white"
              hasError={streetHasError}
            />

            <FormInput
              value={city}
              onChange={cityHandler}
              onBlur={cityBlurHandler}
              onFocus={cityFocusHandler}
              lable="City"
              errorMessage="Provide A  city ."
              isTouched={isCityTouched}
              type="text"
              labelColor="white"
              hasError={cityHasError}
            />

            <FormInput
              value={state}
              onChange={stateHandler}
              onBlur={stateBlurHandler}
              onFocus={stateFocusHandler}
              lable="State"
              errorMessage="Provide A  state ."
              isTouched={isStateTouched}
              type="text"
              labelColor="white"
              hasError={stateHasError}
            />

            <FormInput
              value={country}
              onChange={countryHandler}
              onBlur={countryBlurHandler}
              onFocus={countryFocusHandler}
              lable="Country"
              errorMessage="Provide A  country ."
              isTouched={isCountryTouched}
              type="text"
              labelColor="white"
              hasError={countryHasError}
            />

            <FormInput
              value={postalCode}
              onChange={postalCodeHandler}
              onBlur={postalCodeBlurHandler}
              onFocus={postalCodeFocusHandler}
              lable="Postal Code"
              errorMessage="Provide A Postal Code ."
              isTouched={isPostalCodeTouched}
              type="text"
              labelColor="white"
              hasError={postalCodeHasError}
            />

            <div className="checkout-form-payment">
              <h4 className="heading-3 text-center mb-sm">Payment Method</h4>
              <span className="checkout-form-payment__error">
                {paymentError}
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
