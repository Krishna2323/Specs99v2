import { dispatchNotification } from "../helper/helper";
import axios from "axios";
import { clearNotication } from "../notificationSlice/notificationSlice";
import orderSlice, { orderSliceAction } from "./orderSlice";
import { getCart } from "../cartSlice/cartActions";
// import { getCart } from "../../../../backend/controllers/cartController";

export const createCodOrder = (cart, shippingInfo) => {
  const products = cart.products.map((el) => {
    return {
      product: el.product._id,
      quantity: el.quantity,
      price: el.product.price,
    };
  });
  return async (dispatch) => {
    const orderObj = {
      products,
      shippingInfo,
      totalPrice: cart.totalCost,
      paymentMethod: shippingInfo.paymentMethod,
      paymentStatus: "unpaid",
    };

    const sendReq = async () => {
      dispatchNotification(
        dispatch,
        "loading",
        "Processing",
        "Placing Order",
        "newOrder"
      );

      dispatch(
        orderSliceAction.createOrder({
          isLoading: true,
          message: "Placing Order",
          status: "processing",
        })
      );
      await axios.post("/api/v1/order/codOrder", orderObj);
      await axios.delete("/api/v1/cart/clearCart");

      dispatch(getCart());

      dispatch(
        orderSliceAction.createOrder({
          isLoading: false,
          message: "Order Placed",
          status: "placed",
        })
      );

      setTimeout(() => {
        dispatch(
          orderSliceAction.createOrder({
            isLoading: false,
            message: "",
            status: "",
          })
        );
      }, 3000);

      dispatchNotification(
        dispatch,
        "success",
        "Success",
        "Order Placed",
        "newOrder"
      );
    };

    try {
      await sendReq();
    } catch (error) {
      const errorMessage =
        error.resonse?.data?.messags || "Something Went Wrong";
      console.log(error);
      dispatchNotification(
        dispatch,
        "error",
        "Error",
        errorMessage,
        "newOrder"
      );
    }

    dispatch(clearNotication());
  };
};

export const createStripeOrder = async (cartProducts) => {
  try {
    const res = await axios.post("/api/v1/order/check-out-session", {
      products: cartProducts,
    });

    return res.data.session.id;
  } catch (error) {
    console.log(error);
  }
};

export const getOrders = () => {
  return async (dispatch) => {
    const fetchOrders = async () => {
      dispatch(
        orderSliceAction.setOrder({
          isLoading: true,
          isError: false,
          message: "Fetching Orders",
        })
      );

      const res = await axios.get("/api/v1/order");

      const { orders } = res.data.data;

      console.log(orders);
      dispatch(
        orderSliceAction.setOrder({
          orders,
          isLoading: false,
          message: "",
        })
      );
    };

    try {
      await fetchOrders();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something Went Wrong!";

      dispatch(
        orderSliceAction.setOrder({
          isError: true,
          isLoading: false,
          message: errorMessage,
        })
      );
    }
  };
};
