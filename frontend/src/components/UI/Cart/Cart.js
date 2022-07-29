import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import Backdrop from "../Backdrop/Backdrop";
import { useSelector } from "react-redux";
import "./Cart.scss";
// import * as aiIcons from "react-icons/ai";
import { Transition } from "react-transition-group";
import CartProductRow from "./CartProductRow/CartProductRow";

const Cart = (props) => {
  const { open, onBackdropClick } = props;
  const { products } = useSelector((state) => state.cart);

  const cartAnimationClass = open ? "cart-open" : "cart-close";
  return (
    <Fragment>
      <Backdrop
        open={open}
        onBackdropClick={onBackdropClick}
        transitionTime=".3s"
      ></Backdrop>

      <Transition in={open} mountOnEnter unmountOnExit timeout={300}>
        {(state) =>
          ReactDOM.createPortal(
            <div className={`cart ${cartAnimationClass}`}>
              <div className="cart-container">
                <h3 className="heading-1">Cart</h3>
                {products &&
                  products.map((e) => (
                    <CartProductRow key={e._id} product={e} />
                  ))}
              </div>
            </div>,
            document.getElementById("cart")
          )
        }
      </Transition>
    </Fragment>
  );
};

export default Cart;
