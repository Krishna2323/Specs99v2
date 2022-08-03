import "./App.scss";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { Transition } from "react-transition-group";
import Notification from "./components/UI/Notification/Notification";
import { useSelector } from "react-redux";
// import useNotification from "./components/hooks/useNotification";
// import { useCookies } from "react-cookie";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

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
import Checkout from "./components/UI/Checkout/Checkout";
import { loadUser } from "./store/userSlice/userActions";
import UserOrders from "./components/Admin/User/UserOrders";

function App() {
  const dispatch = useDispatch();
  const { display } = useSelector((state) => state.notification);
  const { user } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    if (!user) {
      dispatch(loadUser());
    }

    console.log(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
    console.log(process.env);
  }, [dispatch, user]);

  return (
    <Container>
      <Header />
      <Notification open={display} />

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

        <Route path="/updateProduct/:id" element={<UpdateProduct />} />

        <Route path="/allProduct" element={<AllProduct />} />

        <Route path="/product/:id" element={<ProductPage />} />
        <Route
          path="/checkout"
          element={
            <Elements
              stripe={loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)}
            >
              <Checkout />
            </Elements>
          }
        />
        <Route path="/account/orders" element={<UserOrders />} />
      </Routes>

      <Footer />
    </Container>
  );
}

export default App;
