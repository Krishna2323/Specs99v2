import React from "react";
import { Link } from "react-router-dom";
import "./SidebarSubLinks.scss";

const SidebarProduct = (props) => {
  return (
    <ul className="sidebar-product__links">
      {props.links.map((itm) => (
        <li className="sidebar-product__links__item">
          <Link to={itm.link} className="sidebar-product__links__link">
            {itm.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SidebarProduct;
