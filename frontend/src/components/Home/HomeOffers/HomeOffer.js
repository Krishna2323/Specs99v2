import React from "react";
import "./HomeOffer.scss";
import { Link } from "react-router-dom";
import { homeOffer } from "../../dummyData/sunglassesDummy";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const arr = ["Eyeglasses", 25, 50, 45, 20, 60, 70, 90];

const settings = {
  // dots: true,
  // infinite:s,
  slidesToShow: 8,
  slidesToScroll: 0,
  // autoplay: true,
  // speed: 3000,
  // autoplaySpeed: 3000,
  // cssEase: "linear",
  // centerPadding: "60px";

  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 2,
        autoplay: true,
        speed: 3000,
        autoplaySpeed: 3000,
        infinite: true,
        // speed: 3000,
        // autoplaySpeed: 3000,
      },
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 2,
        autoplay: true,
        speed: 3000,
        autoplaySpeed: 3000,
      },
    },
    {
      breakpoint: 320,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        speed: 3000,
        autoplaySpeed: 3000,
        dots: true,
      },
    },
  ],
};

const HomeOffer = () => {
  return (
    <div className="home-element home-offer">
      <Slider {...settings} dots={false}>
        {homeOffer.map((e) => (
          <Link to="/" className="home-offer__box">
            <img src={e.img} alt="" />
            <span>{e.name}</span>
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default HomeOffer;
