import React from "react";
import "./HomeSlider.scss";
import { Link } from "react-router-dom";

import Slider from "react-slick";

const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 4,
  // autoplay: true,
  speed: 500,
  autoplaySpeed: 1000,
  cssEase: "linear",
  centerPadding: "60px",

  responsive: [
    {
      breakpoint: 1500,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        speed: 1000,
        dots: true,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 3,
        // rows: 2,
        slidesToScroll: 3,
        // initialSlide: 2,
      },
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 2,
        rows: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 400,
      settings: {
        slidesToShow: 2,
        rows: 2,
        slidesToScroll: 2,
      },
    },
  ],
};

const HomeSlider = (props) => {
  const { heading, slides } = props;
  return (
    <div className="home-element home-slider">
      <div className="box-center">
        <h2 className="heading-1">{heading}</h2>
      </div>
      <div className="home-slider__container">
        <Slider {...settings}>
          {slides.map((el) => (
            <div key={el.name} className="home-slider__container-box">
              <div className="home-slider__container-box-card" to="#">
                <img src={el.img} alt="" />
                <span>{el.name}</span>
                <Link to={el.link} className="btn-small btn-small--primary">
                  Explore
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default HomeSlider;
