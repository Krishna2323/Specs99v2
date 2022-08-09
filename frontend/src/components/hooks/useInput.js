import { useState } from "react";

const useInput = (validationFunction, initialValue) => {
  const [value, setValue] = useState(initialValue ? initialValue : "");
  const [isFocused, setIsFocused] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const valueIsValid = validationFunction(value);
  const error = !valueIsValid;
  const [showError, setShowError] = useState(false);
  // const hasError = (isTouched && error) || (showError && error);
  const hasError = showError && error;

  const inputHandler = (e) => {
    setValue(e.target ? e.target.value : e);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
    setShowError(true);
  };

  const inputFocusHandler = (e) => {
    setIsFocused(true);
    console.log(e);
  };

  const showErrorHandler = () => {
    setShowError(true);
  };

  const resetInput = () => {
    setValue("");
    valueIsValid(false);
    setIsTouched(false);
  };

  return {
    value,
    isTouched,
    inputBlurHandler,
    inputFocusHandler,
    inputHandler,
    resetInput,
    hasError,
    error,
    isFocused,
    showError,
    showErrorHandler,
  };
};

export default useInput;
