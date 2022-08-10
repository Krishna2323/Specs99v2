import React from "react";
import "./Testimonials.scss";
import ReviewCard from "../../UI/Cards/Review/ReviewCard";
import { dummyTestimonialsImage } from "../../dummyData/dummyTestimonials";
import Slider from "react-slick";

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,

    cssEase: "linear",
    centerPadding: "60px",

    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="testimonials">
      <h4 className="heading-1">Testimonials</h4>

      <div className="testimonials__reviews">
        {/* <h4 className="heading-1 heading-1--sm heading-1--white">
          Crystal Clear Happiness
        </h4> */}
        <Slider {...settings} pauseOnHover={true}>
          {dummyTestimonialsImage.map((el) => (
            <div>
              <div className="testimonials__reviews__review">
                <img
                  src={el.image}
                  alt="testimonials__images"
                  className="testimonials__reviews__review-image"
                />
                <div className="testimonials__reviews__review-comment">
                  <ReviewCard />
                </div>{" "}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonials;
