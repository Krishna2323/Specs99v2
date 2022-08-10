import React, { useEffect } from "react";
import "./TopProductSlider.scss";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import Loading from "../../UI/Loading/Loading";
import ProductCard from "./../../UI/Cards/Product/ProductCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 3,
  // autoplay: true,
  speed: 1000,
  autoplaySpeed: 5000,
  cssEase: "linear",
  //   centerPadding: "60px",

  responsive: [
    {
      breakpoint: 1500,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        // autoplay: true,
        speed: 1000,
        autoplaySpeed: 2000,
        dots: true,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 2,
        // rows: 2,
        slidesToScroll: 2,
        // initialSlide: 2,
      },
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 1,
        // rows: 4,
        slidesToScroll: 1,
      },
    },
  ],
};

const div = (e) => {
  return (
    <div key={e._id} className="top-product-slider__container-item">
      <div className="top-product-slider__container-item-inner">
        <ProductCard product={e} />
      </div>
    </div>
  );
};

const TopProductSlider = (props) => {
  // const { products } = useSelector((state) => state.products);
  const { products, heading, loading, error, message } = props;

  return (
    <div className="home-element top-product-slider">
      <h3 className="heading-1">{heading}</h3>

      {loading && (
        <Loading heading={"Loading..."} message={""} type="loading" />
      )}
      {error && !loading && (
        <Loading heading={message} message={""} type="error" />
      )}

      {products && (
        <div className="top-product-slider__container">
          <Slider {...settings}>{products.map((e, i) => div(e))}</Slider>
        </div>
      )}
    </div>
  );
};

export default TopProductSlider;
