import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";
import logo from "./../../../public/img/bs/logo-1.png";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
// import * as

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__logo">
        <img src={logo} alt="" />
        <div className="footer__logo-links">
          <TwitterIcon />
          <FacebookRoundedIcon />
          <InstagramIcon />
          <YouTubeIcon />
        </div>
      </div>

      <div className="footer__links">
        <div className="footer__link">
          <h2 className="footer__link-heading"> Customer Care</h2>
          <ul className="footer__link__sub-links">
            <li>
              <Link to="#">help@specs99.com</Link>
            </li>
            <li>
              <span>Conatct No: 9889665599</span>
            </li>
            <li>
              <Link to="#">help@specs99.com</Link>
            </li>
          </ul>
        </div>
        <div className="footer__link">
          <h2 className="footer__link-heading"> About Us</h2>
          <ul className="footer__link__sub-links">
            <li>
              <Link to="#">Company</Link>
            </li>
            <li>
              <Link to="#">Terms & Condition</Link>
            </li>
            <li>
              <Link to="#">Delivery And Return Policy</Link>
            </li>
            <li>
              <Link to="#">Tardemark</Link>
            </li>
          </ul>
        </div>
        <div className="footer__link">
          <h2 className="footer__link-heading"> Follow Us </h2>
          <ul className="footer__link__sub-links">
            <li>
              <Link to="#">Twiter</Link>
            </li>
            <li>
              <Link to="#">Facebook</Link>
            </li>
            <li>
              <Link to="#">Instagram</Link>
            </li>
            <li>
              <Link to="#">Youtube</Link>
            </li>
          </ul>
        </div>
        <div className="footer__link footer__link-address">
          <h2 className="footer__link-heading"> Address</h2>
          <ul className="footer__link__sub-links">
            <li>
              <span>35, Defence Colony, Block A, Defence Colony</span>
            </li>
            <li>
              <span>Ghazipur, Uttar Pradesh</span>
            </li>
            <li>
              <span> 110024 - India</span>
            </li>
          </ul>
        </div>{" "}
      </div>
    </div>
  );
};

export default Footer;
