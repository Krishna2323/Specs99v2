import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import "./ProductCard.scss";
import * as biIcons from "react-icons/bi";
import * as bsIcons from "react-icons/bs";
import * as faIcons from "react-icons/fa";
import * as fiIcons from "react-icons/fi";
import { useState } from "react";

const dummyUserCart = [1, 6, 7];
const dummyUserFav = [2, 3, 5];

const ProductCard = (props) => {
  const { productId, img } = props;

  const [inCart, setInCart] = useState(false);
  const [favStyle, setFavStyle] = useState("");

  useEffect(() => {
    if (dummyUserCart.includes(productId)) {
      setInCart(true);
    }
    if (dummyUserFav.includes(productId)) {
      setFavStyle("filled--red");
    }
  }, [productId]);

  return (
    <Link to="/product/rayban" className="product-card">
      <div className="product-card__header">
        <img src={img} alt="" />
      </div>
      {/* ///////////////////////////////////////// */}
      <div className="product-card__product-details">
        <span className="product-card__title">Rayban Erika v2 Funk Arvit</span>
        <div className="product-card__info--1">
          <span>Color: Red</span>
          <span>Size: Medium</span>
          {/* <span>
                <RiIcons.RiLeafFill></RiIcons.RiLeafFill> 9.8gm
              </span>
              <span>Lense: Polarized</span> */}
        </div>
        <div className="product-card__info--2">
          <span>
            <biIcons.BiRupee></biIcons.BiRupee>3999
          </span>
          <span>
            <biIcons.BiRupee></biIcons.BiRupee>4999
          </span>
        </div>
        <div className="product-card__info--3">
          <div>
            <Rating
              // ratingValue={3.5}
              initialValue={4.6}
              readonly={true}
              allowHalfIcon={true}
              size={"2rem"}
              fillColor="#ff922b"
              style={{ alingItems: "flex-end" }}
            ></Rating>
            <span>(359) Ratings</span>
          </div>
          {/* ///// */}
          {/* <div>
                <faIcons.FaRegEye></faIcons.FaRegEye>
                <span>Preview</span>
              </div> */}
        </div>
      </div>

      <div className="product-card__product-cta">
        <Link to="#">
          <faIcons.FaHeart className={favStyle} />
        </Link>

        <Link to="#">
          {inCart ? (
            <bsIcons.BsFillCartCheckFill className="filled--green" />
          ) : (
            <bsIcons.BsFillCartPlusFill />
          )}
        </Link>
      </div>

      {/* ///////////////////////////////////////// */}
      {/* <div className="product-card__footer">
        <button className="product-card__footer__btn">View Product</button>
      </div> */}
    </Link>
  );
};

export default ProductCard;
