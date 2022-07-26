import React from "react";
import "./FormInput.scss";

const FormInput = (props) => {
  const {
    isTouched,
    hasError,
    onChange,
    onBlur,
    type,
    lable,
    value,
    errorMessage,
    onFocus,
  } = props;

  return (
    <div className="form-row">
      <div className="form-row-info">
        <label htmlFor={`form-${lable.toLowerCase().split(" ").join("-")}`}>
          {lable}
        </label>

        {hasError && (
          <span className="form-row-info__error">{errorMessage}</span>
        )}
      </div>

      {/* console.log */}
      <input
        className={`form-row-input ${
          isTouched && hasError
            ? "form-row-input--invalid"
            : value.length > 0 && "form-row-input--valid"
        }`}
        onFocus={onFocus}
        type={type}
        id={`form-${lable?.toLowerCase().split(" ").join("-")}`}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default FormInput;
