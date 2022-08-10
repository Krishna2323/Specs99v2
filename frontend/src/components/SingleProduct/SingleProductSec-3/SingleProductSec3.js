import React from "react";
import "./SingleProductSec3.scss";
import img from "./../../../public/img/shape/shape3.webp";
import ReviewCard from "../../UI/Cards/Review/ReviewCard";
import { Link } from "react-router-dom";
import Testimonials from "../../Home/HomeTestimonials/Testimonials";

const arr = [1, 2, 4, 5];

const SingleProductSec3 = () => {
  return (
    <div className="single-product__section single-product__section-3">
      {/* <h2 className="heading-1 text-center">Reviews</h2> */}
      <Testimonials />

      <div className="box-center">
        <Link to="#" className="text-link-primary--white mt-sm text-center ">
          View All Reviews
        </Link>
      </div>
    </div>
  );
};

export default SingleProductSec3;
