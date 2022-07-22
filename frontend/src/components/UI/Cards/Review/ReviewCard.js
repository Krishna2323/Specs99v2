import React from "react";
import "./ReviewCard.scss";

const ReviewCard = (props) => {
  return (
    <div className="review-card">
      <div className="review-card__inner">
        <h3 className="review-card__title">Best Sunglasses</h3>
        <p className="review-card__text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto
          ea ipsam id blanditiis alias, molestias mollitia tenetur facere
          debitis nam similique amet ut, aliquam nisi officia repellat odit
          laboriosam ex.
        </p>
        <div className="review-card__user-details">
          <img
            src={props.img}
            alt=""
            className="review-card__user-details__img"
          />
          <span className="review-card__user-details__name">- Jhon Wick</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
