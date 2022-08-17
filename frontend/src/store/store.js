import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./notificationSlice/notificationSlice";
import userReducer from "./userSlice/userSlice";
import productsReducer from "./productsSlice/productsSlice";
import uiReducer from "./uiSlice/uiSlice";
import cartReducer from "./cartSlice/cartSlice";
import productSliceReducer from "./productSlice/productSlice";
import orderReducer from "./orderSlice/orderSlice";
import HomeProductsSliceReducer from "./HomeProducts/HomeProductsSlice";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    user: userReducer,
    products: productsReducer,
    ui: uiReducer,
    cart: cartReducer,
    product: productSliceReducer,
    order: orderReducer,
    homeProducts: HomeProductsSliceReducer,
  },
});

export default store;
