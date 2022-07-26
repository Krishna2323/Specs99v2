import React, { useEffect, useState } from "react";
import "./HomeTestimonial.scss";
import useCarousel from "./../../hooks/useCarousel";
import img1 from "./../../../public/img/bs/ra9.jpg";
import { Reviews } from "@mui/icons-material";
// import { useSelector } from "react-redux";

const HomeTestimonial = () => {
  const arr = [1, 1, 1];

  const { handleDotClick, handlePlusClick, handlePrevClick } = useCarousel({
    carouselClass: "review ",
    carouselActiveClass: "review-active",
    dotClass: "product-review-box-dot__dot",
    dotActiveClass: "product-review-box-dot__dot-active",
    tarnsformationType: "slider",
  });

  return (
    <div className="product-review home-element">
      <div className="box-center">
        <h3 className="heading-1 box-center">Happy Customers </h3>
      </div>
      <div className="product-review-box ">
        {arr.map((el, i) => (
          <div key={i} data-num={i} className="review ">
            <div className="review__review-details">
              <img className="review-image" src={img1} alt="" />

              <div className="review__review-details__text">
                <span className="review-title">Outstanding Sunglasses!</span>
                <p className="review-text">
                  {""} Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nisi repudiandae autem quaerat ea explicabo deserunt, magnam
                  dolore nobis optio excepturi. Lorem ipsum dolor, sit amet
                  consectetur adipisicing elit. At velit cum asperiores enim
                  neque.
                </p>
                <div className="review__user-details">
                  <img
                    className="review__user-img"
                    // src={require(`./../../assests/users/${el.user.photo}`)}
                    src={img1}
                    alt="User Profile Pic"
                  ></img>
                  <h2 className="review-name"> - Krishna Gupta</h2>
                </div>
              </div>
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

        <div className="product-review-box-dot">
          {arr.map((el, i) => (
            <div
              key={i}
              className="product-review-box-dot__dot "
              data-num={i}
              onClick={handleDotClick}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeTestimonial;
