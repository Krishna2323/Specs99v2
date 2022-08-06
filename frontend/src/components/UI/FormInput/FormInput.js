import React, { useState } from "react";
import "./FormInput.scss";
import * as faIcons from "react-icons/fa";

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
    labelColor,
  } = props;

  const labelModifier = labelColor ? labelColor : "white";
  const [inititalType, setInitialType] = useState(type);

  const toggleTypeToText = () => {
    setInitialType((prev) => (prev === "text" ? "password" : "text"));
  };

  return (
    <div className="form-row">
      <div className={`form-row-info`}>
        <label
          htmlFor={`form-${lable.toLowerCase().split(" ").join("-")}`}
          style={{ color: labelModifier }}
        >
          {lable}
        </label>

        {hasError && (
          <span className="form-row-info__error">{errorMessage}</span>
        )}
      </div>

      {/* console.log */}
      <div className="form-input">
        <input
          className={`form-row-input ${
            isTouched && hasError
              ? "form-row-input--invalid"
              : value.length > 0 && "form-row-input--valid"
          }`}
          onFocus={onFocus}
          type={inititalType}
          id={`form-${lable?.toLowerCase().split(" ").join("-")}`}
          onBlur={onBlur}
          onChange={onChange}
          value={value}
          hidden={false}
        />
        {type === "password" && (
          <faIcons.FaRegEye
            className={`form-input-svg ${
              inititalType === "password" ? "" : "form-input-svg--open"
            }`}
            onClick={toggleTypeToText}
          />
        )}
      </div>
    </div>
  );
};

export default FormInput;
