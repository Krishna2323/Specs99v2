import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Layout/Header/Header";
import Container from "./components/UI/Container/Container";
import DashBoard from "./components/Admin/DashBoard/DashBoard";
import AddProduct from "./components/Admin/Products/AddProduct/AddProduct";
import UpdateProduct from "./components/Admin/Products/UpdateProduct/UpdateProduct";
import AllProduct from "./components/Admin/Products/AllProducts/AllProduct";
import ProductPage from "./components/SingleProduct/ProductPage";
import Footer from "./components/Layout/Footer/Footer";
import Login from "./components/LoginSinggup/Login";
import { useState } from "react";
import Singup from "./components/LoginSinggup/Singup";
import { Transition } from "react-transition-group";

function App() {
  const [loginForm, setLoginForm] = useState(false);
  const [singupForm, setSingupForm] = useState(false);

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
      <Routes>
        {/* <Route path="/" element={<Header />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/updateProduct" element={<UpdateProduct />} />
        <Route path="/allProduct" element={<AllProduct />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>

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

      <Footer />
    </Container>
  );
}

export default App;
