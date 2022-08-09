import React from "react";
import "./AdminFormRow.scss";

const AdminForm = (props) => {
  //   const eleName = props.data[0].for;
  const el = props.data;
  return (
    <div className="add-element__form-row">
      <label className="add-element__form-row__lable" htmlFor={el.id}>
        {el.lable}
      </label>
      <input
        className="add-element__form-row__input"
        type={el.type}
        placeholder={el.placeholder}
        minLength={8}
        id={el.id}
      />{" "}
    </div>
  );
};

export default AdminForm;
