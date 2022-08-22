import React from "react";
import { Link } from "react-router-dom";
import img from "../../../public/img/shape/shape1.webp";
import img2 from "../../../public/img/shape/shape2.webp";
import img3 from "../../../public/img/shape/shape3.webp";
import img4 from "../../../public/img/shape/shape4.webp";
import img5 from "../../../public/img/shape/shape5.webp";
import img7 from "../../../public/img/shape/shape8.jpeg";

import "./HomeShape.scss";

const HomeShape = () => {
  return (
    <div className="home-element home-shape">
      <div className="box-center">
        <h2 className="heading-1">FIND THE PERFECT FIT</h2>
      </div>
      <div className="home-shape__div-2">
        <Link
          to="/products/titan"
          className="home-shape__div-2__box home-shape__div-2__box-1"
        >
          <img
            src={
              "https://cdn1.titaneyeplus.com/tep_m2_prod/media/wysiwyg/Bold_DT.webp"
            }
            alt=""
          />
          <div>
            <span>Titan Bold Collection</span>
          </div>
        </Link>
        <Link
          to="products/rayban/silver"
          className="home-shape__div-2__box home-shape__div-2__box-2"
        >
          <img
            src={
              "https://india.ray-ban.com/pub/media/wysiwyg/Rb_home_opti/RB_Website_Titanium_Desktop_Banner_930x600.jpg"
            }
            alt=""
          />
          <div>
            <span>Rayban Titanium Collection</span>
          </div>
        </Link>
        <Link
          to="products/john jacobs"
          className="home-shape__div-2__box home-shape__div-2__box-3"
        >
          <img
            src={
              "https://cdn.shopify.com/s/files/1/1276/5299/files/New-this-week-desktop-01-aug-22_1200x.jpg?v=1659350327"
            }
            alt="john jacobs"
          />
          <div>
            <span>John Jacobs Collection</span>
          </div>
        </Link>
        <Link
          to="products/rayban/golden"
          className="home-shape__div-2__box home-shape__div-2__box-4"
        >
          <img
            src={
              "https://cdn1.titaneyeplus.com/tep_m2_prod/media/wysiwyg/Rayban-DT.webp"
            }
            alt=""
          />
          <div>
            <span>Rayban Gold Collection</span>
          </div>
        </Link>
        <Link
          to="#"
          className="home-shape__div-2__box home-shape__div-2__box-5"
        >
          <img
            src={
              "https://heartland.wisconsinvision.com/Content/files/GenCart/ProductCatImages/CKLadiesApril.jpg"
            }
            alt=""
          />
          <div>
            <span>Calvin Klein Collection</span>
          </div>
        </Link>
        <Link
          to="products/emporio armani"
          className="home-shape__div-2__box home-shape__div-2__box-6"
        >
          <img
            // https://bonton.in/banners/emporio-home-page.jpg
            src={"https://bonton.in/banners/emporio-home-page.jpg"}
            alt=""
          />
          <div>
            <span>Eporio Armani Collection</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomeShape;
