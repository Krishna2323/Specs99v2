import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";
import logo from "./../../../public/img/bs/logo-1.png";
import Sidenav from "./Sidenav";
import Cart from "../../UI/Cart/Cart";
import Login from "../../LoginSigngup/Login";
import Signup from "../../LoginSigngup/Signup";
import * as MdIcons from "react-icons/md";

import * as AiIcons from "react-icons/ai";
import * as HiIcons from "react-icons/hi";
import * as biIcons from "react-icons/bi";

import * as FiIcons from "react-icons/fi";

import Search from "../Search/Search";
import { Transition } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { uiSliceAction } from "../../../store/uiSlice/uiSlice";
// import { signup } from "../../../store/userSlice/userActions";
import {
  navGenderCategory,
  navGlassCategory,
} from "../../dummyData/sunglassesDummy";
import { logoutUser } from "../../../store/userSlice/userActions";

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
  const { cart, loginForm, signupForm, isLoading } = useSelector(
    (state) => state.ui
  );
  const [loginOptions, setLoginOptions] = useState(false);
  const navigate = useNavigate();
  const { totalProducts } = useSelector((state) => state.cart);
  const { isLoggedIn } = useSelector((state) => state.user);

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
            // background: "transparent",
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

  const toggleLoginOptions = () => {
    setLoginOptions((prev) => !prev);
  };

  //////////////////////////SIGNUP FORM START/////////////////////////////////////
  //////////////////////////SIGNUP FORM END/////////////////////////////////////

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

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

  const handleLoginSignupToggle = () => {
    dispatch(uiSliceAction.toggleLoginSignup());
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
          <span className="header-nav__icon-menu" onClick={handleSideNav}>
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

            {/* {navGenderCategory.map((e) => (
              <li className="header-nav__open-item" key={e.link}>
                <Link className="header-nav__open-link" to={e.link}>
                  {e.gender}
                </Link>
              </li>
            ))} */}

            {navGlassCategory.map((e) => (
              <li className="header-nav__open-item" key={e.link}>
                <Link className="header-nav__open-link" to={e.link}>
                  {e.glass}
                </Link>
              </li>
            ))}

            <span onClick={handleSideNav} className="close-btn">
              <MdIcons.MdOutlineClose />
            </span>
          </div>

          <div className="header-nav__cta">
            <span className="header-nav__open-link">
              <AiIcons.AiOutlineSearch
                className="header-nav__cta-icons "
                onClick={openSearchBar}
              />
            </span>
            <span
              className="header-nav__open-link header-nav__cta-cart"
              onClick={handleCartState}
            >
              <span>
                {/* {!totalProducts && <biIcons.BiDotsHorizontalRounded />} */}
                {isLoggedIn && totalProducts ? (
                  totalProducts
                ) : (
                  <biIcons.BiDotsHorizontalRounded />
                )}
              </span>
              <FiIcons.FiShoppingCart className="header-nav__cta-icons "></FiIcons.FiShoppingCart>
            </span>
            <span
              className="header-nav__open-link"
              onClick={toggleLoginOptions}
            >
              <HiIcons.HiDotsVertical className="header-nav__cta-icons " />
              <div
                className={`header-nav__open-link__sub-link ${
                  loginOptions ? "header-nav__open-link__sub-link-open" : ""
                }`}
              >
                {!isLoggedIn && (
                  <>
                    <span onClick={handleLoginFormState}>Login</span>
                    <span onClick={handleSignupFormState}>Signup</span>
                  </>
                )}

                {isLoggedIn && (
                  <Fragment>
                    {" "}
                    <span className="header-nav__open-item">
                      <Link
                        className="header-nav__open-link"
                        to={"/user/account"}
                      >
                        My Account
                      </Link>
                    </span>
                    <span onClick={handleLogout}>Logout</span>
                  </Fragment>
                )}
              </div>
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
        onLoginToSignupLink={handleLoginSignupToggle}
      />

      <Signup
        open={signupForm}
        closeSignupForm={handleSignupFormState}
        onSigupToLoginLink={handleLoginSignupToggle}
      />
    </Fragment>
  );
  // </Fragment>
};

export default Header;
