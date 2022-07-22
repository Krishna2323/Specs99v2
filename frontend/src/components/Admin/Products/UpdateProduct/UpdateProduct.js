import React from "react";
import Sidebar from "../../DashBoard/SideBar/Sidebar";
import "./UpdateProduct.scss";

const UpdateProduct = () => {
  return (
    <div className="dashboard-component">
      <Sidebar />
      <div className="update-product-container">
        <span className="heading-3">Update Product</span>
        <form className="update-product-form">
          {/* ROW 1 */}
          <div className="update-product-form-row">
            <label
              className="update-product-form-row__lable"
              htmlFor="product-brand"
            >
              Brand
            </label>
            <input
              className="update-product-form-row__input"
              type="text"
              placeholder="Enter Brand"
              minLength={8}
              defaultValue="Rayban"
              id="product-brand"
            />
          </div>
          {/* ROW 2 */}
          <div className="update-product-form-row">
            <label
              className="update-product-form-row__lable"
              htmlFor="product-model"
            >
              Model
            </label>
            <input
              className="update-product-form-row__input"
              type="text"
              placeholder="Enter Model"
              minLength={8}
              id="product-model"
            />
          </div>{" "}
          {/* ROW 3 */}
          <div className="update-product-form-row">
            <label
              className="update-product-form-row__lable"
              htmlFor="product-mrp"
            >
              Mrp
            </label>
            <input
              className="update-product-form-row__input"
              type="number"
              placeholder="Enter Mrp"
              minLength={8}
              id="product-mrp"
            />
          </div>{" "}
          {/* ROW 4 */}
          <div className="update-product-form-row">
            <label
              className="update-product-form-row__lable"
              htmlFor="product-price"
            >
              Price
            </label>
            <input
              className="update-product-form-row__input"
              type="number"
              placeholder="Enter Price"
              minLength={8}
              id="product-price"
            />
          </div>{" "}
          {/* ROW 5 */}
          <div className="update-product-form-row">
            <label
              className="update-product-form-row__lable"
              htmlFor="product-size"
            >
              Size
            </label>
            <input
              className="update-product-form-row__input"
              type="text"
              placeholder="Enter Size"
              minLength={8}
              id="product-size"
            />
          </div>{" "}
          {/* ROW 6 */}
          <div className="update-product-form-row">
            <label
              className="update-product-form-row__lable"
              htmlFor="product-model-type"
            >
              Model Type
            </label>
            <input
              className="update-product-form-row__input"
              type="text"
              placeholder="Enter Model Type"
              minLength={8}
              id="product-model-type"
            />
          </div>{" "}
          {/* ROW 7 */}
          <div className="update-product-form-row">
            <label
              className="update-product-form-row__lable"
              htmlFor="product-lense-type"
            >
              Lense Type
            </label>
            <input
              className="update-product-form-row__input"
              type="text"
              placeholder="Enter Lense Type"
              minLength={8}
              id="product-lense-type"
            />
          </div>{" "}
          {/* ROW 8 */}
          <div className="update-product-form-row">
            <label
              className="update-product-form-row__lable"
              htmlFor="product-lense-color"
            >
              Lens Color
            </label>
            <input
              className="update-product-form-row__input"
              type="text"
              placeholder="Enter Lens Color"
              minLength={8}
              id="product-lense-color"
            />
          </div>{" "}
          {/* ROW 9 */}
          <div className="update-product-form-row">
            <label
              className="update-product-form-row__lable"
              htmlFor="product-frame-type"
            >
              Enter Frame Type
            </label>
            <input
              className="update-product-form-row__input"
              type="text"
              placeholder="Enter Frame Type"
              minLength={8}
              id="product-frame-type"
            />
          </div>{" "}
          {/* ROW 10 */}
          <div className="update-product-form-row">
            <label
              className="update-product-form-row__lable"
              htmlFor="product-frame-color"
            >
              Frame Color
            </label>
            <input
              className="update-product-form-row__input"
              type="text"
              placeholder="Enter Frame Color"
              minLength={8}
              id="product-frame-color"
            />
          </div>{" "}
          {/* ROW 11 */}
          <div className="update-product-form-row">
            <label
              className="update-product-form-row__lable"
              htmlFor="product-gender"
            >
              Gender
            </label>
            <input
              className="update-product-form-row__input"
              type="text"
              placeholder="Enter Gender"
              minLength={8}
              id="product-gender"
            />
          </div>{" "}
          {/* ROW 12 */}
          <div className="update-product-form-row">
            <label
              className="update-product-form-row__lable"
              htmlFor="product-description"
            >
              Description
            </label>
            <input
              className="update-product-form-row__input"
              type="text"
              placeholder="Enter Description"
              minLength={8}
              id="product-description"
            />
          </div>{" "}
          {/* ROW 13 */}
          <div className="update-product-form-row">
            <label
              className="update-product-form-row__lable"
              htmlFor="product-cover-image"
            >
              Choose Cover Image
            </label>
            <input
              className="update-product-form-row__input"
              type="file"
              placeholder="Enter Cover Image"
              minLength={8}
              id="product-cover-image"
            />
          </div>{" "}
          {/* ROW 14 */}
          <div className="update-product-form-row">
            <label
              className="update-product-form-row__lable"
              htmlFor="product-images"
            >
              Choose Images
            </label>
            <input
              className="update-product-form-row__input"
              type="file"
              placeholder="Choose Images"
              minLength={8}
              id="product-images"
            />
          </div>{" "}
          <div className="update-product-form-btn__container">
            <button className="form-btn">Submit</button>
          </div>
        </form>{" "}
      </div>
    </div>
  );
};

export default UpdateProduct;
