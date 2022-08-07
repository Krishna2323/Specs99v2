import React from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";

const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 4000,
  cssEase: "linear",
};

const SingleProductImg = () => {
  const { product } = useSelector((state) => state.product);
  const images = [product.imageCover, ...product.images];
  return (
    <div className="product-img-box">
      <Slider {...settings} swipe={true}>
        {images.map((e, i) => (
          <img key={e} src={images[i]} alt="" />
        ))}
      </Slider>
    </div>
  );
};

{
  /* <img key={e} src={require(`../../assests/products/${e}`)} alt="" /> */
}
export default SingleProductImg;
