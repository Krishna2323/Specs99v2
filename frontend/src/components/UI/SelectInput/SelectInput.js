import React from "react";
import "./SelectInput.scss";
const SelectInput = (props) => {
  return (
    <div className="form-row">
      <lable className="form-row-lable">{props.lable}</lable>
      <select
        onChange={props.onChange}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
        className="form-row-select"
        value={props.value}
      >
        {props.options.map((el, i) => (
          <option value={el.toLowerCase()}>{el}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
