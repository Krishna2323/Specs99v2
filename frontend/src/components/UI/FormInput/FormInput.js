import React from "react";
import "./FormInput.scss";

const FormInput = (props) => {
  const {
    isTouched,
    hasError,
    onChangeHandler,
    blurHandler,
    type,
    lable,
    value,
    errorMessage,
  } = props;

  return (
    <div className="form-row">
      <div className="form-row-info">
        <label htmlFor={`form-${lable?.toLowerCase()}`}>{lable}</label>

        {hasError && (
          <span className="form-row-info__error">{errorMessage}</span>
        )}
      </div>

      <input
        className={`form-row-input ${
          //   isTouched &&
          hasError
            ? "form-row-input--invalid"
            : value !== "" && "form-row-input--valid"
        }`}
        type={type}
        id={`form-${lable?.toLowerCase()}`}
        onBlur={blurHandler}
        onChange={onChangeHandler}
        value={value}
      />
    </div>
  );
};

export default FormInput;
