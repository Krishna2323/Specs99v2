import React from "react";
import "./HomeBrand.scss";
import CategoryCard from "../../UI/Cards/CategoryCard";
import { brandDummy } from "../../dummyData/sunglassesDummy";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeBrand = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 2,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    centerPadding: "60px",
    // dots: false,

    row: 1,

    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 3,
          // rows: 2,
          slidesToScroll: 2,
          // initialSlide: 2,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 2,
          // rows: 4,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="home-element home-brand">
      <h3 className="heading-1 home-brand__heading ">Top Brands </h3>

      <div className="home-brand__brands">
        <Slider {...settings} pauseOnHover={true}>
          {brandDummy.map((el, i) => (
            <div className="home-brand__brands-brand">
              <CategoryCard key={i} img={el.img} title="Category" />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default HomeBrand;
