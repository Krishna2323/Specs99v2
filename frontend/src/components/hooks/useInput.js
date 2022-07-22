import react, { useState } from "react";

const useInput = (validationFunction) => {
  const [value, setValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const valueIsValid = validationFunction(value);
  const hasError = (isTouched || value.length > 0) && !valueIsValid;
  console.log(hasError);

  const inputHandler = (e) => {
    setValue(e.target.value);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
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
    inputHandler,
    resetInput,
    hasError,
  };
};

export default useInput;
