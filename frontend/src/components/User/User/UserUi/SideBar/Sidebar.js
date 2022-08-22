import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Sidebar.scss";
import SidebarSubLinks from "./SidebarProduct/SidebarSubLinks";
import logo from "./../../../../../public/img/bs/logo-1.png";
import * as MdIcons from "react-icons/md";
import { uiSliceAction } from "../../../../../store/uiSlice/uiSlice";

const Sidebar = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { adminSidebar } = useSelector((state) => state.ui);

  const closeAdminSidebar = () => {
    dispatch(uiSliceAction.toggleAdminSidebar());
  };

  const productOptions = [
    { name: "Add Product", link: "/admin/addProduct" },
    { name: "Edit Products", link: "/admin/editProducts" },
  ];
  // const userOptions = [
  //   { name: "Update User", link: "/admin/allUser" },
  //   { name: "Delete User", link: "/admindeleteUser" },
  // ];
  const bannerOptions = [
    { name: "Add Banner", link: "/admin/addBanner" },
    { name: "Edit Banners", link: "/admin/editBanner" },
  ];

  return (
    <div
      className={`dashboard-sidebar ${
        adminSidebar ? "dashboard-sidebar-open" : ""
      }`}
    >
      {/* ///////////////////////////////////////////// */}

      <div className="dashboard-sidebar__logo">
        <img src={logo} alt="Specs99_Logo" />
      </div>
      <span
        className="dashboard-sidebar__close-icon"
        onClick={closeAdminSidebar}
      >
        {" "}
        <MdIcons.MdOutlineClose />
      </span>

      {/* ///////////////////////////////////////////// */}

      <nav className="dashboard-sidebar__nav">
        <ul className="dashboard-sidebar__nav-links">
          {user && user.role === "admin" && (
            <Fragment>
              {" "}
              <li className="dashboard-sidebar__nav-links__item">
                <Link
                  to="/admin/dashboard"
                  className="dashboard-sidebar__nav-links__link"
                >
                  Dashboard
                </Link>
              </li>
              <li className="dashboard-sidebar__nav-links__item">
                <span className="dashboard-sidebar__nav-links__link">
                  Products
                </span>
                <SidebarSubLinks links={productOptions}></SidebarSubLinks>
              </li>
              <li className="dashboard-sidebar__nav-links__item">
                <span className="dashboard-sidebar__nav-links__link">
                  Users
                </span>
                {/* <SidebarSubLinks links={userOptions}></SidebarSubLinks> */}
              </li>
              <li className="dashboard-sidebar__nav-links__item">
                <span className="dashboard-sidebar__nav-links__link">
                  Banners
                </span>
                <SidebarSubLinks links={bannerOptions}></SidebarSubLinks>
              </li>
              <li className="dashboard-sidebar__nav-links__item">
                <span className="dashboard-sidebar__nav-links__link">
                  Web Setting
                </span>
                {/* <SidebarSubLinks links={productOptions}></SidebarSubLinks> */}
              </li>
            </Fragment>
          )}
          <li className="dashboard-sidebar__nav-links__item dashboard-sidebar__nav-links__item-user">
            <Link
              to="/user/account"
              className="dashboard-sidebar__nav-links__link"
            >
              My Account
            </Link>
          </li>
          <li className="dashboard-sidebar__nav-links__item dashboard-sidebar__nav-links__item-user">
            <Link
              to="/user/orders"
              className="dashboard-sidebar__nav-links__link"
            >
              My Orders
            </Link>
          </li>
          <li className="dashboard-sidebar__nav-links__item dashboard-sidebar__nav-links__item-user">
            <Link
              to="/user/reviews"
              className="dashboard-sidebar__nav-links__link"
            >
              My Reviews
            </Link>
          </li>
        </ul>
      </nav>

      {/* ///////////////////////////////////////////// */}
    </div>
  );
};

export default Sidebar;
