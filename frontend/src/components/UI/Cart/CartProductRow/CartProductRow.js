import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../../../store/cartSlice/cartActions";
const CartProductRow = (props) => {
  const { product } = props;
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(product.quantity);
  const { products: cartProducts } = useSelector((state) => state.cart);

  const onAddQuantity = () => {
    setQuantity((qty) => qty++);
    dispatch(addItemToCart(product, 1, cartProducts));
  };

  const onSubtractQuantity = () => {
    setQuantity((qty) => qty++);
    dispatch(addItemToCart(product, -1, cartProducts));
  };

  return (
    <div className="cart-container__div">
      <div className="cart-container__div-info-image">
        <img
          src={require(`../../../assests/products/${product.imageCover}`)}
          alt="img"
        />
      </div>
      <div className="cart-container__div-info-1">
        <div onClick={onAddQuantity}>{/* <aiIcons.AiFillPlusCircle /> */}+</div>
        <span>{props.quantity}</span>
        <div onClick={onSubtractQuantity}>
          {/* <aiIcons.AiFillMinusCircle /> */}-
        </div>
      </div>

      <div className="cart-container__div-info-2">
        <span className="cart-container__div-info-2-brand">
          {product.brand}
        </span>
        <span className="cart-container__div-info-2-model">
          {product.model}
        </span>

        {/* <div className="cart-container__div-info-6"> */}
        <span className="cart-container__div-info-2-frame">
          Frame Color: {product.frameColor}
        </span>

        <span className="cart-container__div-info-2-lens">
          Lens Color: {product.lensColor}
        </span>
        {/* </div> */}
      </div>

      <div className="cart-container__div-info-price">
        <div className="cart-container__div-info-3">
          <span className="cart-container__div-info-3-price">
            ₹{product.price}
          </span>
          <span className="cart-container__div-info-3-mrp">₹{product.mrp}</span>
        </div>

        <div className="cart-container__div-info-4">
          <span className="cart-container__div-info-4-multiply">x</span>
          <span className="cart-container__div-info-4-quantity">
            {props.quantity}
          </span>
        </div>

        <div className="cart-container__div-info-5">
          <span>Subtotal</span>
          <div>
            <span className="cart-container__div-info-5-total">
              ₹{product.price * props.quantity}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProductRow;
