import React, { useEffect, useState } from "react";
import * as tiIcons from "react-icons/ti";
import "./SelectInput.scss";

const SelectInput = (props) => {
  const { style, labelModifier, lable, hasError, errorMessage } = props;
  useState(props.selected);

  useEffect(() => {}, [props.selected]);
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
      <select
        style={style}
        onChange={props.onChange}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
        className={`form-row-select ${
          props.hasError
            ? "form-row-select--invalid"
            : !props.error && "form-row-select--valid"
        }`}
        // value={props.value}
        defaultValue=""
        placeholder="Select"
      >
        {props.allOption && <option value={""}>All</option>}
        {props.options.map((el, i) => (
          <option value={el.toLowerCase()}>{el}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
