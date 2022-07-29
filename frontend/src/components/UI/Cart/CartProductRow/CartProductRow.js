import React from "react";

const CartProductRow = (props) => {
  const { product } = props;

  return (
    <div className="cart-container__div">
      <img
        src={require(`../../../assests/products/${product.imageCover}`)}
        alt="img"
      />
      <div className="cart-container__div-info-1">
        <div>{/* <aiIcons.AiFillPlusCircle /> */}+</div>
        <span>{product.quantity}</span>
        <div>{/* <aiIcons.AiFillMinusCircle /> */}-</div>
      </div>

      <div className="cart-container__div-info-2">
        <span className="cart-container__div-info-2-brand">
          {product.brand}
        </span>
        <span className="cart-container__div-info-2-model">
          {product.model}
        </span>
      </div>

      <div className="cart-container__div-info-3">
        <span className="cart-container__div-info-3-price">
          ₹{product.price}
        </span>
        <span className="cart-container__div-info-3-mrp">₹{product.mrp}</span>
      </div>

      <div className="cart-container__div-info-4">
        <span className="cart-container__div-info-4-multiply">x</span>
        <span className="cart-container__div-info-4-quantity">
          {product.quantity}
        </span>
      </div>

      <div className="cart-container__div-info-6">
        <span className="cart-container__div-info-6-frame">
          Frame Color: {product.frameColor}
        </span>

        <span className="cart-container__div-info-6-lens">
          Lens Color: {product.lensColor}
        </span>
      </div>

      <div className="cart-container__div-info-5">
        <span>Subtotal</span>
        <div>
          <span className="cart-container__div-info-5-total">
            ₹{product.price * product.quantity}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartProductRow;
