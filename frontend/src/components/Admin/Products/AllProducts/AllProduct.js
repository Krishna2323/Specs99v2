import React from "react";
import Sidebar from "../../DashBoard/SideBar/Sidebar";
import { Link } from "react-router-dom";
import "./AllProduct.scss";
import * as MdIcons from "react-icons/md";
import * as BsIcons from "react-icons/bs";

const arr = [
  11, 3, 33, 4, 5, 5, 5, 5, 6, 7, 8, 9, 5, 5, 3, 23, 2, 32, 32, 323, 3,
];

const AllProduct = () => {
  return (
    <div className="dashboard-component">
      <Sidebar />
      <h1 className="all-product-container">
        <div className="all-product-header">
          <span className="heading-3">Welcome Admin</span>
          <p>Total Products : 99</p>
          <Link className="db-link" to="/addProduct">
            + Add Product
          </Link>
        </div>
        <div className="all-product-info">
          <div className="all-product-info__lable">
            <span>Name</span>
            <span>Id</span>
            <span>Stock</span>
            <span>Action</span>
          </div>

          {arr.map((el) => (
            <div className="all-product-info__row">
              <span className="all-product-info__row-name">
                Specs 99 Avita Linux
              </span>
              <span className="all-product-info__row-id">AD137317GNS00r</span>
              <span className="all-product-info__row-stock">60</span>
              <div className="all-product-info__row-icons">
                <Link to="/updateProduct">
                  <MdIcons.MdModeEditOutline />
                </Link>
                <MdIcons.MdDelete />
              </div>
            </div>
          ))}
        </div>
      </h1>
    </div>
  );
};

export default AllProduct;
