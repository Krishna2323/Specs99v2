import React, { useEffect, useState } from "react";
import * as tiIcons from "react-icons/ti";
import "./SelectInput.scss";

const SelectInput = (props) => {
  console.log(props);
  const { style } = props;
  useState(props.selected);

  useEffect(() => {}, [props.selected]);
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
          <option value={el.toLowerCase()}>{el}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
