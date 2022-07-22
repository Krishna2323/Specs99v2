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
        <h2 className="heading-1">Shop By Shapes</h2>
      </div>
      <div className="home-shape__div-2">
        <Link
          to="#"
          className="home-shape__div-2__box home-shape__div-2__box-1"
        >
          <img src={img2} alt="" />
        </Link>
        <Link
          to="#"
          className="home-shape__div-2__box home-shape__div-2__box-2"
        >
          <img src={img5} alt="" />
        </Link>
        <Link
          to="#"
          className="home-shape__div-2__box home-shape__div-2__box-3"
        >
          <img src={img4} alt="" />
        </Link>
        <Link
          to="#"
          className="home-shape__div-2__box home-shape__div-2__box-4"
        >
          <img src={img} alt="" />
        </Link>
        <Link
          to="#"
          className="home-shape__div-2__box home-shape__div-2__box-5"
        >
          <img src={img3} alt="" />
        </Link>
        <Link
          to="#"
          className="home-shape__div-2__box home-shape__div-2__box-6"
        >
          <img src={img7} alt="" />
        </Link>
      </div>
    </div>
  );
};

export default HomeShape;
