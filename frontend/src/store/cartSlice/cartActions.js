import axios from "axios";
import {
  clearNotication,
  notificationActions,
} from "../notificationSlice/notificationSlice";
import { cartSliceAction } from "./cartSlice";

export const addItemToCart = (product, quantity, cart) => {
  return async (dispatch) => {
    const cartCopy = [...cart];
    const itemInCart = cartCopy.findIndex((el) => el._id === product._id);

    if (itemInCart >= 0) {
      const itemCopy = { ...cartCopy[itemInCart] };
      itemCopy.quantity += quantity;
      cartCopy[itemInCart] = itemCopy;

      const res = await axios.post("/api/v1/cart/updateCartItem", {
        _id: itemCopy._id,
        quantity: itemCopy.quantity,
      });
    } else {
      cartCopy.push({
        _id: product._id,
        brand: product.brand,
        model: product.model,
        mrp: product.mrp,
        price: product.price,
        quantity: quantity,
        frameColor: product.frameColor,
        lensColor: product.lensColor,
        imageCover: product.imageCover,
      });

      await axios.post("/api/v1/cart/updateCart", {
        product: {
          _id: product._id,
          brand: product.brand,
          model: product.model,
          mrp: product.mrp,
          price: product.price,
          quantity: quantity,
          frameColor: product.frameColor,
          lensColor: product.lensColor,
          imageCover: product.imageCover,
        },
      });
    }

    dispatch(
      cartSliceAction.addItem({
        products: cartCopy,
      })
    );

    dispatch(
      notificationActions.setNotification({
        type: "success",
        status: "Success",
        message: "Item Added To Cart",
        action: "cart",
      })
    );

    dispatch(clearNotication());
  };
};

export const getCart = () => {
  return async (dispatch) => {
    const res = await axios.get("/api/v1/cart");
    const { data } = res.data;

    console.log(data);

    dispatch(
      cartSliceAction.setCart({
        products: data.products[0].products,
        totalProducts: data.results,
      })
    );
  };
};
