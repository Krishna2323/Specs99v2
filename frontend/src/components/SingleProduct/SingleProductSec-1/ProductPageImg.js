import React from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";

const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  speed: 2000,
  autoplaySpeed: 4000,
  cssEase: "linear",
};

const SingleProductImg = () => {
  const { product } = useSelector((state) => state.product);
  const images = [product.imageCover, ...product.images];
  return (
    <div className="product-img-box">
      <Slider {...settings}>
        {images.map((e) => (
          <img key={e} src={require(`../../assests/products/${e}`)} alt="" />
        ))}
      </Slider>
    </div>
  );
};

export default SingleProductImg;
