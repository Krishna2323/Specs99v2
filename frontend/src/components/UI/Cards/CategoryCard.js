import React from "react";
import { Link } from "react-router-dom";
import "./CategoryCard.scss";

const CategoryCard = (props) => {
  return (
    <Link to="/" className="category-card">
      <img src={props.img} alt="" />
      <span className="">{props.title}</span>
    </Link>
  );
};

export default CategoryCard;
