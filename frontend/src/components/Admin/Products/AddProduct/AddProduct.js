import React, { useState } from "react";
import Sidebar from "../../DashBoard/SideBar/Sidebar";
import "./AddProduct.scss";
// import Data from "./AddProduct.json";
// import AdminForm from "../../AdminForm/AdminFormRow";
import * as MdIcons from "react-icons/md";

const AddProduct = (props) => {
  // const el = "";
  const [sidebar, setSidebar] = useState(false);

  const toggleSidebar = () => {
    setSidebar((side) => !side);
  };
  return (
    <div className="dashboard-component">
      <Sidebar isOpen={sidebar} />

      <div className="add-product-container">
        <span className="sidebar-toggle-icon">
          <MdIcons.MdMenu onClick={toggleSidebar} />
        </span>
        <span className="heading-3">Add Product</span>
        <form className="add-product-form">
          {/* ROW 1 */}
          <div className="add-product-form-row">
            <label
              className="add-product-form-row__lable"
              htmlFor="product-brand"
            >
              Brand
            </label>
            <input
              className="add-product-form-row__input"
              type="text"
              placeholder="Enter Brand"
              minLength={8}
              defaultValue="Rayban"
              id="product-brand"
            />
          </div>
          {/* ROW 2 */}
          <div className="add-product-form-row">
            <label
              className="add-product-form-row__lable"
              htmlFor="product-model"
            >
              Model
            </label>
            <input
              className="add-product-form-row__input"
              type="text"
              placeholder="Enter Model"
              minLength={8}
              id="product-model"
            />
          </div>{" "}
          {/* ROW 3 */}
          <div className="add-product-form-row">
            <label
              className="add-product-form-row__lable"
              htmlFor="product-mrp"
            >
              Mrp
            </label>
            <input
              className="add-product-form-row__input"
              type="number"
              placeholder="Enter Mrp"
              minLength={8}
              id="product-mrp"
            />
          </div>{" "}
          {/* ROW 4 */}
          <div className="add-product-form-row">
            <label
              className="add-product-form-row__lable"
              htmlFor="product-price"
            >
              Price
            </label>
            <input
              className="add-product-form-row__input"
              type="number"
              placeholder="Enter Price"
              minLength={8}
              id="product-price"
            />
          </div>{" "}
          {/* ROW 5 */}
          <div className="add-product-form-row">
            <label
              className="add-product-form-row__lable"
              htmlFor="product-size"
            >
              Size
            </label>
            <input
              className="add-product-form-row__input"
              type="text"
              placeholder="Enter Size"
              minLength={8}
              id="product-size"
            />
          </div>{" "}
          {/* ROW 6 */}
          <div className="add-product-form-row">
            <label
              className="add-product-form-row__lable"
              htmlFor="product-model-type"
            >
              Model Type
            </label>
            <input
              className="add-product-form-row__input"
              type="text"
              placeholder="Enter Model Type"
              minLength={8}
              id="product-model-type"
            />
          </div>{" "}
          {/* ROW 7 */}
          <div className="add-product-form-row">
            <label
              className="add-product-form-row__lable"
              htmlFor="product-lense-type"
            >
              Lense Type
            </label>
            <input
              className="add-product-form-row__input"
              type="text"
              placeholder="Enter Lense Type"
              minLength={8}
              id="product-lense-type"
            />
          </div>{" "}
          {/* ROW 8 */}
          <div className="add-product-form-row">
            <label
              className="add-product-form-row__lable"
              htmlFor="product-lense-color"
            >
              Lens Color
            </label>
            <input
              className="add-product-form-row__input"
              type="text"
              placeholder="Enter Lens Color"
              minLength={8}
              id="product-lense-color"
            />
          </div>{" "}
          {/* ROW 9 */}
          <div className="add-product-form-row">
            <label
              className="add-product-form-row__lable"
              htmlFor="product-frame-type"
            >
              Enter Frame Type
            </label>
            <input
              className="add-product-form-row__input"
              type="text"
              placeholder="Enter Frame Type"
              minLength={8}
              id="product-frame-type"
            />
          </div>{" "}
          {/* ROW 10 */}
          <div className="add-product-form-row">
            <label
              className="add-product-form-row__lable"
              htmlFor="product-frame-color"
            >
              Frame Color
            </label>
            <input
              className="add-product-form-row__input"
              type="text"
              placeholder="Enter Frame Color"
              minLength={8}
              id="product-frame-color"
            />
          </div>{" "}
          {/* ROW 11 */}
          <div className="add-product-form-row">
            <label
              className="add-product-form-row__lable"
              htmlFor="product-gender"
            >
              Gender
            </label>
            <input
              className="add-product-form-row__input"
              type="text"
              placeholder="Enter Gender"
              minLength={8}
              id="product-gender"
            />
          </div>{" "}
          {/* ROW 12 */}
          <div className="add-product-form-row">
            <label
              className="add-product-form-row__lable"
              htmlFor="product-description"
            >
              Description
            </label>
            <input
              className="add-product-form-row__input"
              type="text"
              placeholder="Enter Description"
              minLength={8}
              id="product-description"
            />
          </div>{" "}
          {/* ROW 13 */}
          <div className="add-product-form-row">
            <label
              className="add-product-form-row__lable"
              htmlFor="product-cover-image"
            >
              Choose Cover Image
            </label>
            <input
              className="add-product-form-row__input"
              type="file"
              placeholder="Enter Cover Image"
              minLength={8}
              id="product-cover-image"
            />
          </div>{" "}
          {/* ROW 14 */}
          <div className="add-product-form-row">
            <label
              className="add-product-form-row__lable"
              htmlFor="product-images"
            >
              Choose Images
            </label>
            <input
              className="add-product-form-row__input"
              type="file"
              placeholder="Choose Images"
              minLength={8}
              id="product-images"
            />
          </div>{" "}
          <div className="add-product-form-btn__container">
            <button className="form-btn">Submit</button>
          </div>
        </form>{" "}
      </div>
    </div>
  );
};

export default AddProduct;
