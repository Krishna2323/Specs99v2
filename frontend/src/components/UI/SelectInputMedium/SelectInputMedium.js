import React from "react";
// import "./SelectInput.scss";
const SelectInput = (props) => {
  return (
    <div className="form-row">
      <label className="form-row-lable">{props.lable}</label>
      <select
        onChange={props.onChange}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
        className="form-row-select"
        value={props.value}
      >
        {props.options.map((el, i) => (
          <option key={el} value={el.toLowerCase()}>
            {el}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
