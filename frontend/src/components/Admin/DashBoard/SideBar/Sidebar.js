import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.scss";
import SidebarSubLinks from "./SidebarProduct/SidebarSubLinks";
import logo from "./../../../../public/img/bs/logo-1.png";

const Sidebar = (props) => {
  const productOptions = [
    { name: "Add Product", link: "/addProduct" },
    { name: "Update Product", link: "/allProduct" },
    { name: "Delete Product", link: "/deleteProduct" },
  ];
  const userOptions = [
    { name: "Add User", link: "/addUser" },
    { name: "Update User", link: "/updateUser" },
    { name: "Delete User", link: "/deleteUser" },
  ];
  const bannerOptions = [
    { name: "Add Banner", link: "/addBanner" },
    { name: "Update Banner", link: "/updateBanner" },
    { name: "Delete Banner", link: "/deleteBanner" },
  ];

  return (
    <div
      className={`dashboard-sidebar ${
        props.open ? "dashboard-sidebar-open" : ""
      }`}
    >
      {/* ///////////////////////////////////////////// */}

      <div className="dashboard-sidebar__logo">
        <img src={logo} alt="Specs99_Logo" />
      </div>

      {/* ///////////////////////////////////////////// */}

      <nav className="dashboard-sidebar__nav">
        <ul className="dashboard-sidebar__nav-links">
          <li className="dashboard-sidebar__nav-links__item">
            <Link
              to="/dashboard"
              className="dashboard-sidebar__nav-links__link"
            >
              Dashboard
            </Link>
          </li>
          <li className="dashboard-sidebar__nav-links__item">
            <Link
              to="/allProduct"
              className="dashboard-sidebar__nav-links__link"
            >
              Products
            </Link>
            <SidebarSubLinks links={productOptions}></SidebarSubLinks>
          </li>
          <li className="dashboard-sidebar__nav-links__item">
            <Link to="/allUser" className="dashboard-sidebar__nav-links__link">
              Users
            </Link>
            <SidebarSubLinks links={userOptions}></SidebarSubLinks>
          </li>
          <li className="dashboard-sidebar__nav-links__item">
            <Link
              to="/account/orders"
              className="dashboard-sidebar__nav-links__link"
            >
              Orders
            </Link>
          </li>
          <li className="dashboard-sidebar__nav-links__item">
            <span className="dashboard-sidebar__nav-links__link">Banners</span>
            <SidebarSubLinks links={bannerOptions}></SidebarSubLinks>
          </li>
          <li className="dashboard-sidebar__nav-links__item">
            <span className="dashboard-sidebar__nav-links__link">Setting</span>
            <SidebarSubLinks links={productOptions}></SidebarSubLinks>
          </li>
        </ul>
      </nav>

      {/* ///////////////////////////////////////////// */}
    </div>
  );
};

export default Sidebar;
