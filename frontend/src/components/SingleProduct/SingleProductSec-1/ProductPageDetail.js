import { Rating } from "react-simple-star-rating";
import React from "react";
import * as BsIcons from "react-icons/bs";
import * as FiIcons from "react-icons/fi";

const colors = ["#ff6b6b", "#74c0fc", "#40c057"];

const ProductPageDetail = () => {
  return (
    <div className="product-detail-box">
      <span className="product-detail-box__id">#198BCKDH568BDH8890</span>
      <h2 className="product-detail-box__title">
        Rayban Erick Serene Sunglasses (Stone Blue)
      </h2>

      <span className="product-detail-box__price">
        <span className="product-detail-box__price-offer">₹999</span>
        <span className="product-detail-box__price-mrp"> ₹1499</span>
      </span>

      {/* RATING START */}
      <span className="product-detail-box__rating">
        {" "}
        <Rating
          // ratingValue={3.5}
          initialValue={4.6}
          readonly={true}
          allowHalfIcon={true}
          size={"2.4rem"}
          fillColor="#099268"
          // style={{ alingSelf: "flex-start" }}
        ></Rating>{" "}
        <span className="product-detail-box__rating-average">4.6 </span>
        599 Ratings & 122 Reviews
      </span>

      {/* RATING END */}

      <div className="product-detail-box__specs">
        {/* COLORS START */}
        <span className="product-detail-box__specs-color">
          Colors:{" "}
          {colors.map((el) => (
            <span
              style={{ backgroundColor: el }}
              className="product-detail-box__specs-color-box"
            ></span>
          ))}
        </span>
        {/* COLORS END */}
        {/* SPECS START */}
        <span className="product-detail-box__specs-size">Size: Medium</span>
        <span className="product-detail-box__specs-lens">Lens: Polorized</span>

        <span className="product-detail-box__specs-weight">Weight: 18gm</span>
      </div>

      {/* SPECS END */}

      {/* DESCRIPTION START */}
      <div class="product-detail-box__description">
        <span class="product-detail-box__description-heading">
          Description :
        </span>
        <span class="product-detail-box__description-text">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam ullam
          harum non dolorum est, aliquam voluptatem facilis cumque natus quo
          possimus eaque eveniet? Commodi, voluptas? Nulla atque placeat
          corrupti exercitationem!
        </span>
      </div>
      {/* DESCRIPTION END */}

      {/* BUTTONS START */}
      <div className="product-detail-box__btn">
        <button className="product-detail-box__btn-addToCartBtn btn-secondary">
          Add To Cart
          <FiIcons.FiShoppingCart />
        </button>
        <button className="product-detail-box__btn-addToWishlist btn-secondary--red">
          Wishlist
          <BsIcons.BsFillSuitHeartFill />
        </button>
      </div>
      {/* BUTTON END */}
    </div>
  );
};

export default ProductPageDetail;
