import React from "react";
import "./TopProducts.scss";
import { Link } from "react-router-dom";
import ProductCard from "../../UI/Cards/Product/ProductCard";
// import img from "../../../public/img/bs/ra3.jpg";
// import { sunglassesDummy } from "../../dummyData/sunglassesDummy";
import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 6,
  autoplay: true,
  speed: 3000,
  autoplaySpeed: 2000,
  cssEase: "linear",
  centerPadding: "60px",

  responsive: [
    {
      breakpoint: 1500,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 2,
        infinite: true,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 2000,
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
        slidesToScroll: 3,
        // initialSlide: 2,
      },
    },
    {
      breakpoint: 400,
      settings: {
        slidesToShow: 2,
        // rows: 4,
        slidesToScroll: 2,
      },
    },
  ],
};

const TopProducts = (props) => {
  const { heading, slides } = props;
  return (
    <div className="home-element home-top-products">
      <div className="box-center">
        <h2 className="heading-1">{heading}</h2>
      </div>
      <div className="home-top-products__container">
        <Slider {...settings}>
          {slides.map((el) => (
            <Link to="#">
              <img src={el.img} alt="" />
              <span>{el.name}</span>
            </Link>
          ))}
        </Slider>
      </div>

      {/* <Link to="/" className="box-center text-link-primary mt-bg">
        <span>View More</span>
      </Link> */}
    </div>
  );
};

export default TopProducts;
