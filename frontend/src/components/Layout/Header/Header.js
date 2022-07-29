import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import logo from "./../../../public/img/bs/logo-1.png";
import Sidenav from "./Sidenav";
import Cart from "../../UI/Cart/Cart";
import Login from "../../LoginSinggup/Login";
import Singup from "../../LoginSinggup/Singup";
import * as MdIcons from "react-icons/md";

import * as AiIcons from "react-icons/ai";
import * as HiIcons from "react-icons/hi";

import * as FiIcons from "react-icons/fi";

import Search from "../Search/Search";
import { Transition } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { uiSliceAction } from "../../../store/uiSlice/uiSlice";
// import { signup } from "../../../store/userSlice/userActions";

const setStyleOnNodelist = (thisKey, elements, targetLink) => {
  elements.forEach((el) => {
    if (el !== targetLink) {
      el.style.opacity = thisKey.opacity;
      el.style.color = thisKey.color2;
    } else {
      el.style.color = thisKey.color;
      el.style.opacity = thisKey.opacity;
    }
  });
};

const Header = (props) => {
  const { cart, loginForm, singupForm } = useSelector((state) => state.ui);

  const dispatch = useDispatch();

  const handleHover = function (e) {
    if (
      e.target.classList.contains("header-nav__open-link") ||
      e.target.classList.contains("header-nav__cta-icons") ||
      e.target.nodeName === "path" ||
      (e.target.nodeName === "circle" &&
        !e.target.classList.contains("header-nav__cta"))
    ) {
      const link = e.target;
      const siblings = link
        .closest(".header-nav__open-links")
        ?.querySelectorAll(".header-nav__open-link");
      const iconSiblings = link
        .closest(".header-nav__cta")
        ?.querySelectorAll(".header-nav__cta-icons");

      const navbar = link.closest(".header-component");
      navbar.style.background = this.background;

      if (iconSiblings) {
        setStyleOnNodelist(this, iconSiblings, link);
      }
      if (siblings) setStyleOnNodelist(this, siblings, link);
    }
  };

  useEffect(() => {
    const nav = document.querySelector(".header-component");

    const mouseOver = (...el) => {
      el.forEach((ele) => {
        ele.addEventListener(
          "mouseover",
          handleHover.bind({
            opacity: 1,
            // background: "#343a40",
            background: "var(--bg-image-grad-purple)",

            color: "#fff",
            color2: "#999",
          })
        );
      });
    };

    const mouseOut = (...el) => {
      el.forEach((ele) => {
        ele.addEventListener(
          "mouseout",
          handleHover.bind({
            opacity: 1,
            background: "var(--bg-image-grad-purple)",
            color: "#fff",
            color2: "#fff",
          })
        );
      });
    };
    // mouseOver(document.querySelector(".header-nav__cta"));

    mouseOver(nav);
    mouseOut(nav);
  }, []);

  const [sidebar, setSidebar] = useState(false);
  const [searchBar, setSearchBar] = useState(false);

  //////////////////////////SINGUP FORM START/////////////////////////////////////
  //////////////////////////SINGUP FORM END/////////////////////////////////////

  const handleLogout = () => {};
  const closeAskModal = () => {
    setSearchBar(false);
  };
  const openSearchBar = () => {
    setSearchBar(true);
  };

  const handleSideNav = () => {
    setSidebar(!sidebar);
  };

  const handleCartState = () => {
    dispatch(uiSliceAction.setCart());
  };

  const handleLoginFormState = () => {
    dispatch(uiSliceAction.setLoginForm());
  };

  const handleSignupFormState = () => {
    dispatch(uiSliceAction.setSignUpForm());
  };

  const handleLoginSingupToggle = () => {
    dispatch(uiSliceAction.toggleLoginSingup());
  };
  return (
    <Fragment>
      <Transition in={searchBar} mountOnEnter unmountOnExit timeout={300}>
        <Search
          text="Are You Sure To Logout?"
          onClick={handleLogout}
          closeModal={closeAskModal}
          open={searchBar}
        />
      </Transition>
      <div className="header-component">
        <nav className="header-nav">
          <span class="header-nav__icon-menu" onClick={handleSideNav}>
            <FiIcons.FiMenu />
          </span>
          {/* CONTAINER 2 */}
          <Link to="/" className="header-nav__logo">
            <img src={logo} alt="Specs99_Logo" />
          </Link>
          {/* CONTAINER 3 */}
          <div
            className={`header-nav__open-links ${
              sidebar ? "header-nav__open-links-open" : ""
            }`}
            onClick={handleSideNav}
          >
            <Link to="/" className="header-nav__open-links-logo">
              <img src={logo} alt="Specs99_Logo" />
            </Link>
            <li className="header-nav__open-item">
              {" "}
              <Link className="header-nav__open-link" to="/">
                Men{" "}
              </Link>
            </li>
            <li className="header-nav__open-item">
              <Link
                to="/"
                className="header-nav__open-link"
                onClick={handleSignupFormState}
              >
                Women{" "}
              </Link>
            </li>
            <li className="header-nav__open-item">
              {" "}
              <Link to="/products" className="header-nav__open-link">
                Kids{" "}
              </Link>
            </li>
            <li className="header-nav__open-item">
              {" "}
              <Link to="/dashboard" className="header-nav__open-link">
                Sports{" "}
              </Link>
            </li>
            <li className="header-nav__open-item">
              {" "}
              <Link to="/dashboard" className="header-nav__open-link">
                Eye Lenses{" "}
              </Link>
            </li>
            <li className="header-nav__open-item">
              {" "}
              <Link to="/dashboard" className="header-nav__open-link">
                Brands{" "}
              </Link>
            </li>

            <span onClick={handleSideNav} className="close-btn">
              <MdIcons.MdOutlineClose />
            </span>
          </div>
          {/* CONTAINER 4 */}

          {/* <div className="header-nav__search-box">
            <input onClick={openSearchBar} type="search" placeholder="Search" />
          </div> */}
          {/* CONTAINER 5 */}

          <div className="header-nav__cta">
            <span className="header-nav__open-link">
              <AiIcons.AiOutlineSearch
                className="header-nav__cta-icons "
                onClick={openSearchBar}
              />
            </span>
            <span className="header-nav__open-link" onClick={handleCartState}>
              <FiIcons.FiShoppingCart className="header-nav__cta-icons " />
            </span>
            <span
              className="header-nav__open-link"
              onClick={handleLoginFormState}
            >
              <HiIcons.HiDotsVertical className="header-nav__cta-icons " />
            </span>
          </div>

          {/* CONTAINER 4 */}
        </nav>

        {/* <Sidenav toggleNav={handleSideNav} open={open} /> */}
      </div>
      <Cart open={cart} onBackdropClick={handleCartState} />

      <Login
        open={loginForm}
        closeLoginForm={handleLoginFormState}
        onLoginToSingupLink={handleLoginSingupToggle}
      />

      <Singup
        open={singupForm}
        closeSingupForm={handleSignupFormState}
        onSigupToLoginLink={handleLoginSingupToggle}
      />
    </Fragment>
  );
  // </Fragment>
};

export default Header;
