import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import Backdrop from "../Backdrop/Backdrop";
import { useSelector } from "react-redux";
import "./Cart.scss";
// import * as aiIcons from "react-icons/ai";
import { Transition } from "react-transition-group";
import CartProductRow from "./CartProductRow/CartProductRow";
import Loading from "../Loading/Loading";
import * as aiIcons from "react-icons/ai";

const Cart = (props) => {
  const navigate = useNavigate();
  const { open, onBackdropClick } = props;
  const { products, totalCost, totalProducts, isLoading, isError } =
    useSelector((state) => state.cart);
  const { isLoggedIn } = useSelector((state) => state.user);

  const handleCheckout = () => {
    navigate("/checkout");
    props.onBackdropClick();
  };

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
              <h3 className="heading-1">Cart</h3>
              {isLoading && <Loading heading="loading" type="loading" />}

              {isLoggedIn && !isLoading && !isError && totalProducts === 0 && (
                <Loading heading="Your Cart Is Empty :" type="error" />
              )}

              {!isLoggedIn && (
                <Loading heading="Login To Get Access" type="error" />
              )}
              {!isLoading && isLoggedIn && (
                <div className="cart-container">
                  {products &&
                    products.map((e) => (
                      <CartProductRow
                        key={e.product._id}
                        product={e.product}
                        quantity={e.quantity}
                        imageLocation="../../../assests/products/"
                      />
                    ))}
                  <div className="cart-container-summary">
                    <div className="cart-container-summary__div-1">
                      <span>Order Total:</span>
                      <span>₹{totalCost}</span>
                    </div>
                    <div className="cart-container-summary__div-2">
                      <button
                        disabled={products && products.length === 0}
                        onClick={handleCheckout}
                        className="btn-primary"
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <span onClick={onBackdropClick} className="cart-close-icon">
                {" "}
                <aiIcons.AiOutlineClose />
              </span>
            </div>,
            document.getElementById("cart")
          )
        }
      </Transition>
    </Fragment>
  );
};

export default Cart;
