import "./App.scss";
import { Fragment, useEffect } from "react";
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
import DashBoard from "./components/User/Admin/DashBoard/DashBoard";
import AddUpdateProduct from "./components/User/Admin/AddUpdateProduct/AddUpdateProduct";
// import UpdateProduct from "./components/User/Products/UpdateProduct/UpdateProduct";
import AllProduct from "./components/User/Admin/AllProducts/AllProduct";
import ProductPage from "./components/SingleProduct/ProductPage";
import ProductsPage from "./components/ProductsPage/ProductsPage";
import Footer from "./components/Layout/Footer/Footer";
import Checkout from "./components/UI/Checkout/Checkout";
import { loadUser } from "./store/userSlice/userActions";
import UserOrders from "./components/User/User/UserOrders/UserOrders";
import WithDefaultFilter from "./components/ProductsPage/ProductsHOC/withDefaultFilter";
import { Navigate } from "react-router-dom";

import {
  brandDummy,
  homeShapes1,
  navGenderCategory,
  navGlassCategory,
} from "./components/dummyData/sunglassesDummy";
import UserAccount from "./components/User/User/UserAccount/UserAccount";
import ScrollToTop from "./components/UI/Container/ScrollToTop";
import NotFound from "./components/UI/NotFound/NotFound";
import { getCart } from "./store/cartSlice/cartActions";
import ProtectRoute from "./components/HOC/ProtectRoute";

function App() {
  const dispatch = useDispatch();
  const { display } = useSelector((state) => state.notification);
  const { user, isLoggedIn } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    if (!user) {
      dispatch(loadUser());
    }
  }, [dispatch]);

  return (
    <Container>
      <Header />
      <Notification open={display} />
      <ScrollToTop>
        <Routes>
          {/* ROUTES FOR ALL USERS */}

          {/* HOME PAGE */}
          <Route path="/" element={<Home />} />

          {/* PRODUCTS PAGE */}
          <Route path="/products/">
            <Route
              path=":keyword/"
              element={WithDefaultFilter({})(ProductsPage)}
            />
            <Route
              path=":keyword/:frameColor"
              element={WithDefaultFilter({})(ProductsPage)}
            />

            <Route path="" element={WithDefaultFilter({})(ProductsPage)} />
          </Route>

          <Route
            path="/brand/:brandName"
            element={<ProductsPage open={false} />}
          />

          {/* PRODUCTS DETAIL PAGE */}
          <Route path="/product/:id" element={<ProductPage />} />

          {/* PRODUCTS PAGE WITH DEFAULT FILTERS START*/}
          {homeShapes1.map((e) => (
            <Route
              key={e.name}
              path={`/style/${e.name.split(" ").join("-")}`}
              element={WithDefaultFilter({
                style: e.name.toLocaleLowerCase(),
                heading: `${e.name} `,
              })(ProductsPage)}
            />
          ))}

          {navGenderCategory.map((e) => (
            <Route
              key={e.link}
              path={`/category/${e.gender.split(" ").join("-")}`}
              element={WithDefaultFilter({
                gender: e.gender.toLocaleLowerCase(),
                heading: `${e.gender} Sections`,
              })(ProductsPage)}
            />
          ))}

          {navGlassCategory.map((e) => (
            <Route
              key={e.link}
              path={`/${e.glass.split(" ").join("-")}`}
              element={WithDefaultFilter({
                typeOfGlass: e.glass.toLocaleLowerCase(),
                heading: `${e.glass}`,
              })(ProductsPage)}
            />
          ))}

          {/* ROUTES FOR ALL USERS END */}

          {/* LOGGED IN USER PAGES */}
          <Route path="/user/account" element={ProtectRoute(UserAccount)} />

          <Route path="/user/orders" element={ProtectRoute(UserOrders)} />

          <Route
            path="/checkout"
            element={
              <Elements
                stripe={loadStripe(
                  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
                )}
              >
                <Checkout />
              </Elements>
            }
          />

          {/* {LOGGED IN USER PAGES END} */}

          {/* ADMIN ROUTES */}
          <Route
            path="/admin/editProducts"
            element={ProtectRoute(AllProduct)}
          />
          <Route path="/admin/dashboard" element={ProtectRoute(DashBoard)} />
          {/* <Route
        /> */}
          <Route path="/admin/addProduct/">
            <Route
              path=""
              element={ProtectRoute(AddUpdateProduct, {
                product: products ? products[0] : undefined,
                heading: "Add Product",
              })}
            />
            <Route
              path=":id"
              element={ProtectRoute(AddUpdateProduct, {
                action: "updateProduct",
                heading: "Update Product",
              })}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
          {/* ADMIN ROUTES END */}
        </Routes>
      </ScrollToTop>

      <Footer />
    </Container>
  );
}

export default App;
