import React from "react";
import "./SingleProductSec3.scss";
import img from "./../../../public/img/shape/shape3.webp";
import ReviewCard from "../../UI/Cards/Review/ReviewCard";
import { Link } from "react-router-dom";

const arr = [1, 2, 4, 5];

const SingleProductSec3 = () => {
  return (
    <div className="single-product__section single-product__section-3">
      <h2 className="heading-1 text-center">Reviews</h2>
      <div className="user-reviews">
        {arr.map((_el) => (
          <ReviewCard img={img} />
        ))}
      </div>
      <Link to="#" className="text-link-primary mt-sm">
        View All Reviews
      </Link>
    </div>
  );
};

export default SingleProductSec3;
