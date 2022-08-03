import axios from "axios";
import { clearNotication } from "../notificationSlice/notificationSlice";
import { cartSliceAction } from "./cartSlice";
import { dispatchNotification } from "../helper/helper";

const calculateAndSetSummary = (cart) => {
  let summary = cart.reduce(
    (prevValue, currentValue) =>
      prevValue + currentValue.product.price * currentValue.quantity,
    0
  );

  return summary;
};

export const addItemToCart = (product, quantity, cart) => {
  return async (dispatch) => {
    const filterAndSet = async () => {
      dispatch(
        cartSliceAction.setCart({
          isLoading: true,
        })
      );
      const cartCopy = [...cart];
      const itemInCart = cartCopy.findIndex(
        (el) => el.product._id === product._id
      );

      if (itemInCart >= 0) {
        const itemCopy = { ...cartCopy[itemInCart] };
        itemCopy.quantity += quantity;

        await axios.put("/api/v1/cart/updateCartItem", {
          _id: product._id,
          quantity: itemCopy.quantity,
        });

        dispatchNotification(
          dispatch,
          "success",
          "Success",
          quantity >= 1 ? " Quantity Increased" : "Quantity Decreased",
          "cart"
        );

        if (itemCopy.quantity <= 0) {
          dispatchNotification(
            dispatch,
            "success",
            "Success",
            "Item Removed From Cart",
            "cart"
          );
        }
      } else {
        const newProduct = {
          product: product._id,
          quantity: quantity,
        };

        await axios.put("/api/v1/cart/updateCart", {
          product: newProduct,
        });
        dispatchNotification(
          dispatch,
          "success",
          "Success",
          "Item Added To Cart",
          "cart"
        );
      }

      dispatch(getCart());
    };

    try {
      await filterAndSet();
    } catch (error) {
      const errorMessage =
        error.response?.data.message || "Something Went Wrong";

      dispatch(
        cartSliceAction.setCart({
          isLoading: false,
          isError: true,
          message: errorMessage,
        })
      );

      dispatchNotification(dispatch, "error", "Error", errorMessage, "cart");
    }

    dispatch(clearNotication());
  };
};

export const getCart = () => {
  return async (dispatch) => {
    try {
      dispatch(
        cartSliceAction.setCart({
          isLoading: true,
          products: [],
        })
      );
      const res = await axios.get("/api/v1/cart");
      const {
        data: { cart },
      } = res.data;
      console.log(cart[0].products);

      dispatch(
        cartSliceAction.setCart({
          products: cart[0].products,
          totalProducts: cart[0].products.length,
          isLoading: false,
          totalCost: calculateAndSetSummary(cart[0].products),
        })
      );
    } catch (error) {
      const errorMessage =
        error.response?.data.message || "Something Went Wrong";

      dispatch(
        cartSliceAction.setCart({
          isLoading: false,
          isError: true,
          message: errorMessage,
        })
      );

      dispatchNotification(dispatch, "error", "Error", errorMessage, "cart");
    }
  };
};
