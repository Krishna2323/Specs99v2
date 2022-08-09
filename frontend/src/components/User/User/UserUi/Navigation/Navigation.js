import React from "react";
import "./Navigation.scss";
import * as mdIcons from "react-icons/md";
import * as cgIcons from "react-icons/cg";
import * as faIcons from "react-icons/fa";
import * as riIcons from "react-icons/ri";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { uiSliceAction } from "../../../../../store/uiSlice/uiSlice";

const Navigation = (props) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const toggleAdminSidebar = () => {
    dispatch(uiSliceAction.toggleAdminSidebar());
  };

  return (
    <div className="account-navigation">
      <Link to="/user/account" className="account-navigation__row">
        <cgIcons.CgProfile />
        <span className="info">My Profile</span>
      </Link>
      <Link to="/user/orders" className="account-navigation__row">
        <faIcons.FaClipboardList />
        <span className="info">My Orders</span>
      </Link>
      <Link to="/user/account" className="account-navigation__row">
        <mdIcons.MdRateReview />
        <span className="info">My Reviews</span>
      </Link>
      {user && user.role === "admin" && (
        <div
          to="/user/account"
          onClick={toggleAdminSidebar}
          className="account-navigation__row"
        >
          <riIcons.RiAdminLine />
          <span className="info">Admin Routes</span>
        </div>
      )}
    </div>
  );
};

export default Navigation;
