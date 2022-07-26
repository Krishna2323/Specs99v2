import React, { useEffect, useState } from "react";
import img1 from "../../../public/img/bs/ra2.jpg";
import img2 from "../../../public/img/bs/ra3.jpg";
import img3 from "../../../public/img/bs/ra11.jpeg";

import "./HomeCarousel.scss";
import useCarousel from "../../hooks/useCarousel";

const HomeCarousel = () => {
  const array = [img1, img2, img3];

  const { handlePlusClick, handlePrevClick, handleDotClick } = useCarousel({
    carouselClass: "home-carousel",
    carouselActiveClass: "home-carousel-active",
    dotClass: "home-carousel-container-box-dot__dot",
    dotActiveClass: "home-carousel-container-box-dot-active",
  });

  return (
    <div className=" home-carousel-container mb-bg">
      <div className="home-carousel-container-box ">
        {array.map((el, i) => (
          <div key={i} data-num={i} className="home-carousel ">
            <div className="home-carousel__home-carousel-details">
              <img className="home-carousel-image" src={el} alt="" />

              <div className="home-carousel__home-carousel-details__text"></div>
            </div>
          </div>
        ))}

        <button onClick={handlePlusClick} className=" slider-btn increase-btn">
          {" "}
          &rarr;
        </button>
        <button onClick={handlePrevClick} className="slider-btn decrease-btn">
          {" "}
          &larr;
        </button>

        <div className="home-carousel-container-box-dot">
          {array.map((el, i) => (
            <div
              key={i}
              className="home-carousel-container-box-dot__dot"
              data-num={i}
              onClick={handleDotClick}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeCarousel;
