import { useState } from "react";

const useInput = (validationFunction) => {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const valueIsValid = validationFunction(value);
  const hasError = isTouched && !valueIsValid;

  const inputHandler = (e) => {
    setValue(e.target.value);
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
