import React, { useEffect, useState } from "react";
import img1 from "../../../public/img/bs/ra2.jpg";
import img2 from "../../../public/img/bs/ra3.jpg";
import img3 from "../../../public/img/bs/ra11.jpeg";

import "./HomeCarousel.scss";
// import img2 from "../../../public/img/bs/ra3.jpg";

const HomeCarousel = () => {
  const array = [img1, img2, img3];
  const [current, setCurrent] = useState(0);

  // const { product } = useSelector((state) => state.product);
  // const { reviews } = product;
  // const carousel = document.querySelectorAll(".home-carousel");

  const handlePlusClick = () => {
    const carousel = document.querySelectorAll(".home-carousel");
    if (current === carousel.length - 1) {
      setCurrent((current) => 0 + 0);
    } else {
      setCurrent((current) => Number(current) + 1);
    }
  };

  const handlePrevClick = () => {
    const carousel = document.querySelectorAll(".home-carousel");

    if (current <= 0) {
      setCurrent((current) => carousel.length - 1);
    } else {
      setCurrent((current) => current - 1);
    }
  };

  const handleDotClick = (e) => {
    setCurrent((ehhh) => Number(e.target.dataset.num));
  };

  useEffect(() => {
    let timer;
    const moveCarousel = () => {
      timer = setTimeout(() => {
        if (current === carousel.length - 1) {
          setCurrent((current) => 0);
        } else if (current <= 0) {
          setCurrent(current + 1);
        }
        if (current === 1) {
          setCurrent((current) => current + 1);
        }
      }, 4000);
    };
    moveCarousel();

    console.log(current);
    const carousel = document.querySelectorAll(".home-carousel");

    carousel.forEach((el, i) => {
      if (+el.dataset.num === +current) {
        // el.style.transform = `translateX(${(i - current) * 100}%) scale(1)`;
        el.style.transform = `scale(1)`;
        el.style.pointerEvents = "all";
        // el.style.zIndex = "4";
        // el.classList.add("active-home-carousel");
        el.style.opacity = 1;
      } else {
        // el.style.transform = `translateX(${(i - current) * 100}%) `;
        // el.style.transform = `scale(.98)`;
        el.style.pointerEvents = "none";
        // el.classList.remove("active-home-carousel");
        el.style.opacity = 0;
        // el.style.zIndex = "0";
      }
    });

    const dots = document.querySelectorAll(
      ".home-carousel-container-box-dot__dot"
    );

    dots.forEach((el) => {
      if (parseInt(el.dataset.num) === current) {
        el.classList.add("home-carousel-container-box-dot-active");
      } else {
        el.classList.remove("home-carousel-container-box-dot-active");
      }
    });

    return () => {
      clearTimeout(timer);
    };
  }, [current]);

  // useEffect(() => {}, [current, carousel]);

  return (
    <div className=" home-carousel-container mb-bg">
      <div className="home-carousel-container-box ">
        {array.map((el, i) => (
          <div key={i} data-num={i} className="home-carousel ">
            <div className="home-carousel__home-carousel-details">
              <img className="home-carousel-image" src={el} alt="" />

              <div className="home-carousel__home-carousel-details__text">
                {/* <span className="home-carousel-title">
                  TITANIUM COLLECTION MADE IN JAPAN.{" "}
                </span>
                <p className="home-carousel-text">
                  Even lighter,even stronger,equally timeless. Discover our
                  collection made in Japan. Lorem ipsum dolor sit amet
                  consectetur adipisicing elit.
                </p> */}
                {/* <div className="home-carousel__user-details">
                  <img
                    className="home-carousel__user-img"
                    // src={require(`./../../assests/users/${el.user.photo}`)}
                    src={img1}
                    alt="User Profile Pic"
                  ></img>
                  <h2 className="home-carousel__user-name"> - Krishna Gupta</h2>
                </div> */}
                {/* <button className="btn-primary">
                  <p className="">View All By Rayban</p>
                </button> */}
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
