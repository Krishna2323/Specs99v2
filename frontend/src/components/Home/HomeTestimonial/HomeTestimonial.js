import React, { useEffect, useState } from "react";
import "./HomeTestimonial.scss";
import img1 from "./../../../public/img/bs/ra9.jpg";
import { Reviews } from "@mui/icons-material";
// import { useSelector } from "react-redux";

const HomeTestimonial = () => {
  const arr = [1, 1, 1];
  const [current, setCurrent] = useState(0);

  //   const { product } = useSelector((state) => state.product);
  //   const { reviews } = product;

  const handlePlusClick = () => {
    const reviews = document.querySelectorAll(".review");
    if (current === reviews.length - 1) {
      setCurrent((cur) => 0 + 0);
    } else {
      setCurrent((cur) => Number(cur) + 1);
    }
  };

  const handlePrevClick = () => {
    const reviews = document.querySelectorAll(".review");

    if (current <= 0) {
      setCurrent((cur) => reviews.length - 1);
    } else {
      setCurrent((cur) => cur - 1);
    }
  };

  const handleDotClick = (e) => {
    setCurrent((ehhh) => Number(e.target.dataset.num));
  };

  useEffect(() => {
    const reviews = document.querySelectorAll(".review");

    let timer;
    const moveCarousel = () => {
      timer = setTimeout(() => {
        if (current === reviews.length - 1) {
          setCurrent((current) => 0);
        } else if (current <= 0) {
          setCurrent(current + 1);
        }
        if (current === 1) {
          setCurrent((current) => current + 1);
        }
      }, 6000);
    };
    moveCarousel();

    reviews.forEach((el, i) => {
      if (+el.dataset.num === +current) {
        el.style.transform = `translateX(${(i - current) * 100}%) scale(1.05)`;
        el.style.zIndex = "4";
        el.classList.add("active-review");
        el.style.opacity = 1;
      } else {
        el.style.transform = `translateX(${(i - current) * 100}%) scale(.70) `;
        el.classList.remove("active-review");
        el.style.opacity = 0.5;
        el.style.zIndex = "1";
      }
    });

    const dots = document.querySelectorAll(".dot");

    dots.forEach((el) => {
      if (parseInt(el.dataset.num) === current) {
        el.classList.add("dot-active");
      } else {
        el.classList.remove("dot-active");
      }
    });

    return () => {
      clearTimeout(timer);
    };
  }, [current]);

  return (
    <div
      className="product-review home-element"
      //  style={{ backgroundImage: `url(${img1})` }}
    >
      <div className="box-center">
        <h3 className="heading-1 box-center">Happy Customers </h3>
      </div>
      <div className="product-review-box ">
        {arr.map((el, i) => (
          <div
            key={i}
            data-num={i}
            className="review review-active"
            // onClick={handleDotClick}
          >
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
            <button
              onClick={handlePlusClick}
              className=" slider-btn increase-btn"
            >
              {" "}
              &rarr;
            </button>
            <button
              onClick={handlePrevClick}
              className="slider-btn decrease-btn"
            >
              {" "}
              &larr;
            </button>
          </div>
        ))}

        <div className="product-review-box-dot">
          {arr.map((el, i) => (
            <div
              key={i}
              className="dot"
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
