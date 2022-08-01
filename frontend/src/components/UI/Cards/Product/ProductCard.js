import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";

import "./ProductCard.scss";
import * as biIcons from "react-icons/bi";
import * as bsIcons from "react-icons/bs";
import * as faIcons from "react-icons/fa";
import * as fiIcons from "react-icons/fi";
// import img from "../../../../public/img/products";
import { useState } from "react";
import { addItemToCart } from "../../../../store/cartSlice/cartActions";

const ProductCard = (props) => {
  const { product } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products: cart } = useSelector((state) => state.cart);

  const [inCart, setInCart] = useState(false);

  const onCardCLick = (e) => {
    if (e.target.dataset.cart || e.target.parentNode.dataset.cart) {
      dispatch(addItemToCart(product, 1, cart));
      return;
    } else {
      navigate(`/product/${product._id}`);
    }
  };

  return (
    <div className="product-card" onClick={onCardCLick}>
      <div className="product-card__header">
        <img
          // src={`./src/public/img/products/${product.imageCover}`}
          src={require(`../../../assests/products/${product.imageCover}`)}
          alt=""
        />
      </div>
      {/* ///////////////////////////////////////// */}
      <div className="product-card__product-details">
        <span className="product-card__brand">{product.brand}</span>
        <span className="product-card__title">{product.model}</span>

        <div className="product-card__info--2">
          <span>
            <biIcons.BiRupee></biIcons.BiRupee>
            {product.price}
          </span>
          <span>
            <biIcons.BiRupee></biIcons.BiRupee>
            {product.mrp}
          </span>
        </div>
        <div className="product-card__info--1">
          <span>Color: {product.frameColor}</span>
          <span>
            Size:{" "}
            {product.size.replace(
              product.size[0],
              product.size[0].toUpperCase()
            )}
          </span>
          {/* <span>
          <RiIcons.RiLeafFill></RiIcons.RiLeafFill> 9.8gm
        </span>
        <span>Lense: Polarized</span> */}
        </div>
        <div className="product-card__info--3">
          <div>
            <Rating
              // ratingValue={3.5}
              initialValue={product.ratingsAverage}
              readonly={true}
              allowHalfIcon={true}
              size={"1.6rem"}
              fillColor="#ff922b"
              style={{ alingItems: "flex-end" }}
            ></Rating>
            <span>
              ({product.ratingsAverage.toString().padEnd(3, ".0")}){" "}
              {product.ratingsQuantity}{" "}
            </span>
          </div>
          {/* ///// */}
          {/* <div>
          <faIcons.FaRegEye></faIcons.FaRegEye>
          <span>Preview</span>
        </div> */}
        </div>
      </div>

      <div className="product-card__product-cta">
        {/* <span className="product-card__product-cta">
          <faIcons.FaHeart className={favStyle} />
        </span> */}

        <span data-cart="add">
          {inCart ? (
            <bsIcons.BsFillCartCheckFill
              data-cart="add"
              className="filled--green"
            />
          ) : (
            <bsIcons.BsFillCartPlusFill data-cart="add" />
          )}
        </span>
      </div>

      {/* ///////////////////////////////////////// */}
      {/* <div className="product-card__footer">
  <button className="product-card__footer__btn">View Product</button>
</div> */}
    </div>
  );
};

export default ProductCard;
