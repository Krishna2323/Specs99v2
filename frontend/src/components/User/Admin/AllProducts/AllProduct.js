import React, { useState } from "react";
import Sidebar from "../../User/UserUi/SideBar/Sidebar";
import { Link } from "react-router-dom";
import "./AllProduct.scss";
// import * as MdIcons from "react-icons/md";
// import * as BsIcons from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../../../../store/productsSlice/productsActions";
import ProductInfoRow from "../AdminUi/ProductInfoRow/ProductInfoRow";
import Loading from "../../../UI/Loading/Loading";
import Navigation from "../../User/UserUi/Navigation/Navigation";

const AllProduct = () => {
  const [sidebar, setSidebar] = useState(false);
  const dispatch = useDispatch();
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.products
  );

  const toggleSidebar = () => {
    setSidebar((prev) => !prev);
  };

  useEffect(() => {
    dispatch(fetchProducts({ limit: 100 }, []));
  }, [dispatch]);
  return (
    <div className="dashboard-component">
      <Navigation onClick={toggleSidebar} />
      <Sidebar open={sidebar} />
      <div className="all-product-container">
        <div className="all-product-info">
          <h3 className="heading-1 heading-1--white">Products</h3>
          <Link
            to="/addProduct"
            className="btn-small all-product-info__add-product-link"
          >
            Add Product
          </Link>
          {products &&
            products.map((el) => <ProductInfoRow key={el._id} product={el} />)}
          {isLoading && <Loading type="loading" heading="Loading..." />}
          {isError && !isLoading && <Loading type="error" heading={message} />}
        </div>
      </div>
    </div>
  );
};

export default AllProduct;
