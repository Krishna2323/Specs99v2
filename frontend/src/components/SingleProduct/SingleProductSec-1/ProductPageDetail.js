import { Rating } from "react-simple-star-rating";
import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as BsIcons from "react-icons/bs";
import * as FiIcons from "react-icons/fi";
import { addItemToCart } from "../../../store/cartSlice/cartActions";
import useNotification from "../../hooks/useNotification";
import { firstLetterCap } from "../../helpers/textModifiers";

const colors = ["#ff6b6b", "#74c0fc", "#40c057"];

const ProductPageDetail = () => {
  const { product } = useSelector((state) => state.product);
  const { products: cart } = useSelector((state) => state.cart);
  const { isLoggedIn } = useSelector((state) => state.user);
  const { notify, clearNotification } = useNotification();

  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      notify("loading", "🤓", "Login To Use Cart");
      clearNotification();
      return;
    }
    dispatch(addItemToCart(product, quantity, cart));
  };
  const addQuantity = () => {
    if (quantity < 10) {
      setQuantity((qty) => qty + 1);
    }
  };
  const subtractQuantity = () => {
    if (quantity > 1) {
      setQuantity((qty) => qty - 1);
    }
  };

  return (
    <div className="product-detail-box">
      <span className="product-detail-box__id">{product._id}</span>
      <h2 className="product-detail-box__brand">{product.brand}</h2>
      <h2 className="product-detail-box__title">
        {firstLetterCap(product.model)}
      </h2>

      <span className="product-detail-box__price">
        <span className="product-detail-box__price-offer">
          ₹{product.price}
        </span>
        <span className="product-detail-box__price-mrp">₹{product.mrp}</span>
      </span>

      {/* RATING START */}
      <span className="product-detail-box__rating">
        {" "}
        <Rating
          // ratingValue={3.5}
          initialValue={product.ratingsAverage}
          readonly={true}
          allowHalfIcon={true}
          size={"2.4rem"}
          fillColor="#099268"
        ></Rating>{" "}
        <span className="product-detail-box__rating-average">
          {product.ratingsAverage}
        </span>
        {product.ratingsQuantity} Ratings
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
        <span className="product-detail-box__specs-size">
          Size: {firstLetterCap(product.size)}
        </span>
        {product.modelType !== "accessories" && (
          <span className="product-detail-box__specs-weight">
            Lens Color: {firstLetterCap(product.lensColor)}
          </span>
        )}
        {product.modelType !== ("contact lenses" || "accessories") && (
          <Fragment>
            <span className="product-detail-box__specs-lens">
              Lens: {firstLetterCap(product.lensType)}
            </span>
            <span className="product-detail-box__specs-weight">
              Frame Color: {firstLetterCap(product.frameColor)}
            </span>
            <span className="product-detail-box__specs-weight">
              Frame Body: {firstLetterCap(product.frameType)}
            </span>{" "}
          </Fragment>
        )}
      </div>

      {/* SPECS END */}

      {/* DESCRIPTION START */}
      <div class="product-detail-box__description">
        <span class="product-detail-box__description-heading">
          Description :
        </span>
        <span class="product-detail-box__description-text">
          {" "}
          {product.description}
        </span>
      </div>
      {/* DESCRIPTION END */}

      {/* QTY START */}
      {/* <div className="product-detail-box__quantity">
        <span>Quantity: </span>
        <button onClick={subtractQuantity}>-</button>
        <span>{quantity}</span>
        <button onClick={addQuantity}>+</button>
      </div> */}
      {/* QTY END */}

      {/* BUTTONS START */}
      <div className="product-detail-box__btn">
        <div className="product-detail-box__quantity">
          <span>Quantity: </span>
          <button onClick={subtractQuantity}>-</button>
          <span>{quantity}</span>
          <button onClick={addQuantity}>+</button>
        </div>
        <button
          className="product-detail-box__btn-addToCartBtn btn-secondary"
          onClick={handleAddToCart}
        >
          Add To Cart
          <FiIcons.FiShoppingCart />
        </button>
        {/* <button className="product-detail-box__btn-addToWishlist btn-secondary--red">
          Wishlist
          <BsIcons.BsFillSuitHeartFill />
        </button> */}
      </div>
      {/* BUTTON END */}
    </div>
  );
};

export default ProductPageDetail;
