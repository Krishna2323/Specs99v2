import React from "react";
import "./SelectInput.scss";
const SelectInput = (props) => {
  const { style } = props;
  return (
    <div className="form-row">
      <label className="form-row-lable">{props.lable}</label>
      <select
        style={style}
        onChange={props.onChange}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
        className="form-row-select"
        value={props.value}
      >
        {props.allOption && <option value={""}>All</option>}
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
