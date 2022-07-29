import React from "react";
import Sidebar from "../../DashBoard/SideBar/Sidebar";
import { Link } from "react-router-dom";
import "./AllProduct.scss";
import * as MdIcons from "react-icons/md";
import * as BsIcons from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../../../../store/productsSlice/productsActions";

const AllProduct = () => {
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  return (
    <div className="dashboard-component">
      <Sidebar />
      <div className="all-product-container">
        {/* <div className="all-product-header">
          <span className="heading-3">Welcome Admin</span>
          <p>Total Products : 99</p>
          <Link className="db-link" to="/addProduct">
            + Add Product
          </Link>
        </div> */}
        <div className="all-product-info">
          <h3 className="heading-1 heading-1--white">Products</h3>
          {products &&
            products.map((el) => (
              <div className="all-product-info__row">
                <div className="all-product-info__row-details">
                  <span className="all-product-info__row-name">
                    Brand: {el.brand}
                  </span>

                  <span className="all-product-info__row-name">
                    Model :{el.model}
                  </span>
                  <span className="all-product-info__row-id">Id: {el._id}</span>
                  <span className="all-product-info__row-stock">
                    Stock :200
                  </span>
                </div>

                <div className="all-product-info__row-icons">
                  <Link to="/updateProduct">
                    <MdIcons.MdModeEditOutline />
                  </Link>
                  <MdIcons.MdDelete />
                </div>
              </div>
            ))}
          {products &&
            products.map((el) => (
              <div className="all-product-info__row">
                <div className="all-product-info__row-details">
                  <span className="all-product-info__row-name">
                    Brand: {el.brand}
                  </span>

                  <span className="all-product-info__row-name">
                    Model :{el.model}
                  </span>
                  <span className="all-product-info__row-id">Id: {el._id}</span>
                  <span className="all-product-info__row-stock">
                    Stock :200
                  </span>
                </div>

                <div className="all-product-info__row-icons">
                  <Link to="/updateProduct">
                    <MdIcons.MdModeEditOutline />
                  </Link>
                  <MdIcons.MdDelete />
                </div>
              </div>
            ))}
          {products &&
            products.map((el) => (
              <div className="all-product-info__row">
                <div className="all-product-info__row-details">
                  <span className="all-product-info__row-name">
                    Brand: {el.brand}
                  </span>

                  <span className="all-product-info__row-name">
                    Model :{el.model}
                  </span>
                  <span className="all-product-info__row-id">Id: {el._id}</span>
                  <span className="all-product-info__row-stock">
                    Stock :200
                  </span>
                </div>

                <div className="all-product-info__row-icons">
                  <Link to="/updateProduct">
                    <MdIcons.MdModeEditOutline />
                  </Link>
                  <MdIcons.MdDelete />
                </div>
              </div>
            ))}
          {products &&
            products.map((el) => (
              <div className="all-product-info__row">
                <div className="all-product-info__row-details">
                  <span className="all-product-info__row-name">
                    Brand: {el.brand}
                  </span>

                  <span className="all-product-info__row-name">
                    Model :{el.model}
                  </span>
                  <span className="all-product-info__row-id">Id: {el._id}</span>
                  <span className="all-product-info__row-stock">
                    Stock :200
                  </span>
                </div>

                <div className="all-product-info__row-icons">
                  <Link to="/updateProduct">
                    <MdIcons.MdModeEditOutline />
                  </Link>
                  <MdIcons.MdDelete />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AllProduct;
