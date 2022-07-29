import { useState } from "react";

const useInput = (validationFunction, initialValue) => {
  const [value, setValue] = useState(initialValue ? initialValue : "");
  const [isFocused, setIsFocused] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const valueIsValid = validationFunction(value);
  const hasError = isTouched && !valueIsValid;

  const inputHandler = (e) => {
    setValue(e.target ? e.target.value : e);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const inputFocusHandler = () => {
    setIsFocused(true);
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
    isFocused,
  };
};

export default useInput;
