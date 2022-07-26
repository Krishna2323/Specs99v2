import { Fragment, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Transition } from "react-transition-group";
import Notification from "./components/UI/Notification/Notification";
import { useSelector } from "react-redux";
import useNotification from "./components/hooks/useNotification";
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
// import { signup } from "./store/userSlice/userActions";
// import { login } from "./store/userSlice/userActions";

function App() {
  const dispatch = useDispatch();
  const notify = useNotification();
  const [loginForm, setLoginForm] = useState(false);
  const [singupForm, setSingupForm] = useState(false);
  const { display } = useSelector((state) => state.notification);
  const { isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    notify("success", "Welcome", "Thanks For Visiting", "Welcome");

    setTimeout(() => {
      dispatch(clearNotication());
    }, 3000);
  }, [dispatch]);

  const openLoginForm = () => {
    setLoginForm(true);
  };
  const closeLoginForm = () => {
    setLoginForm(false);
  };

  const openSingupForm = () => {
    setSingupForm(true);
  };

  const closeSingupForm = () => {
    setSingupForm(false);
  };

  const onSigupToLoginLink = () => {
    setSingupForm(false);
    setLoginForm(true);
  };

  const onLoginToSingupLink = () => {
    setSingupForm(true);
    setLoginForm(false);
  };

  return (
    <Container>
      <Header openLoginForm={openLoginForm} openSingupForm={openSingupForm} />

      <Transition in={display} unmountOnExit mountOnEnter timeout={300}>
        <Notification open={display} />
      </Transition>

      <Routes>
        {/* <Route path="/" element={<Header />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/products/">
          <Route path=":keyword" element={<ProductsPage />} />
          <Route path="" element={<ProductsPage />} />
        </Route>
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/updateProduct" element={<UpdateProduct />} />
        <Route path="/allProduct" element={<AllProduct />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>

      {!isLoggedIn && (
        <Fragment>
          <Transition in={loginForm} unmountOnExit mountOnEnter timeout={300}>
            {(state) => (
              <Login
                open={loginForm}
                closeLoginForm={closeLoginForm}
                onLoginToSingupLink={onLoginToSingupLink}
              />
            )}
          </Transition>

          <Transition in={singupForm} unmountOnExit mountOnEnter timeout={300}>
            {(state) => (
              <Singup
                open={singupForm}
                closeSingupForm={closeSingupForm}
                onSigupToLoginLink={onSigupToLoginLink}
              />
            )}
          </Transition>
        </Fragment>
      )}

      <Footer />
    </Container>
  );
}

export default App;
