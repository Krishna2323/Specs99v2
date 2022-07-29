import { Fragment, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Transition } from "react-transition-group";
import Notification from "./components/UI/Notification/Notification";
import { useSelector } from "react-redux";
import useNotification from "./components/hooks/useNotification";
import { useCookies } from "react-cookie";
import "./App.scss";

// Layout Imports
import Home from "./components/Home/Home";
import Header from "./components/Layout/Header/Header";
import Container from "./components/UI/Container/Container";
import DashBoard from "./components/Admin/DashBoard/DashBoard";
import AddProduct from "./components/Admin/Products/AddProduct/AddProduct";
import UpdateProduct from "./components/Admin/Products/UpdateProduct/UpdateProduct";
import AllProduct from "./components/Admin/Products/AllProducts/AllProduct";
import ProductPage from "./components/SingleProduct/ProductPage";
import ProductsPage from "./components/ProductsPage/ProductsPage";
import Footer from "./components/Layout/Footer/Footer";
import Login from "./components/LoginSinggup/Login";
import Singup from "./components/LoginSinggup/Singup";

// Actions Imports
import {
  notificationActions,
  clearNotication,
} from "./store/notificationSlice/notificationSlice";
import Cart from "./components/UI/Cart/Cart";
import { loadUser } from "./store/userSlice/userActions";
import { fetchProducts } from "./store/productsSlice/productsActions";
// import { signup } from "./store/userSlice/userActions";
// import { login } from "./store/userSlice/userActions";

function App() {
  const dispatch = useDispatch();
  const { notify, clearNotification } = useNotification();
  const { display } = useSelector((state) => state.notification);
  const { user } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    notify("success", "Welcome", "Thanks For Visiting", "Welcome");

    if (!user) {
      dispatch(loadUser());
    }

    dispatch(fetchProducts());

    clearNotification();
  }, [dispatch]);

  return (
    <Container>
      <Header />

      <Transition in={display} unmountOnExit mountOnEnter timeout={300}>
        <Notification open={display} />
      </Transition>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/">
          <Route path=":keyword" element={<ProductsPage />} />
          <Route path="" element={<ProductsPage />} />
        </Route>
        <Route path="/dashboard" element={<DashBoard />} />
        <Route
          path="/addProduct"
          element={<AddProduct product={products ? products[0] : undefined} />}
        />
        <Route path="/updateProduct" element={<UpdateProduct />} />
        <Route path="/allProduct" element={<AllProduct />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>

      <Footer />
    </Container>
  );
}

export default App;
