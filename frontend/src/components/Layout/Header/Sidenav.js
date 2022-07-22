import React from "react";
import { Link } from "react-router-dom";
import * as MdIcons from "react-icons/md";

const Sidenav = (props) => {
  const links = ["About", "Products", "Careers", "Contact", "About Us"];
  return (
    <ul
      // onClick={props.toggleNav}
      className={!props.open ? "header-nav__links" : "header-nav__links open"}
    >
      <div className="header-nav__links-content">
        <span onClick={props.toggleNav} className="close-btn">
          <MdIcons.MdOutlineClose />
        </span>
        <div className="header-nav__links-content__form">
          <input type="text" placeholder="Rayban" />
        </div>

        {links.map((el, i) => (
          <li onClick={props.toggleNav}>
            <Link to="/">{el} </Link>
          </li>
        ))}

        <span className="footer">Specs99 @bch</span>
      </div>
    </ul>
  );
};

export default Sidenav;
