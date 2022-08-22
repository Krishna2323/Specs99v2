import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../User/UserUi/SideBar/Sidebar";
import useInput from "../../../hooks/useInput";
import "./AddUpdateProduct.scss";
import FormInput from "../../../UI/FormInput/FormInput";
import SelectInput from "../../../UI/SelectInput/SelectInput";
import Loading from "../../../UI/Loading/Loading";
import {
  addProduct,
  fetchProduct,
  updateProduct,
} from "../../../../store/productSlice/productActions";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MultipleSelectInput from "../../../UI/SelectInput/MultipleSelectInput";
import {
  availabelColors,
  specsTypeOptions,
} from "../../../helpers/componentHelpers";
import Navigation from "../../User/UserUi/Navigation/Navigation";

const AddProduct = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const { pathname } = useLocation();
  const [sidebar, setSidebar] = useState(false);
  const [coverImage, setCoverImage] = useState(null);
  const [images, setImages] = useState([]);
  const [style, setStyle] = useState([]);
  const { type, action } = useSelector((state) => state.notification);
  const navigate = useNavigate();
  const { product, isLoading } = useSelector((state) => state.product);

  const handleStyleChange = (event) => {
    const {
      target: { value },
    } = event;
    setStyle(typeof value === "string" ? value.split(",") : value);
    // setStyle(prev=>prev.includes(value)?":[...prev,value])

    console.log(style);
  };

  const coverImageHandler = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const imagesHandler = (e) => {
    setImages([...e.target.files]);
    console.log(e.target.files);
  };

  const brandNameValidator = (val) => {
    return val.trim().length >= 3;
  };

  const {
    value: brandValue,
    inputHandler: brandHandler,
    inputBlurHandler: brandBlurHandler,
    hasError: brandHasError,
    resetInput: resetBrand,
    error: brandError,
    showErrorHandler: brandShowErrorHandler,
  } = useInput(brandNameValidator);

  const {
    value: modelValue,
    inputHandler: modelHandler,
    inputBlurHandler: modelBlurHandler,
    hasError: modelHasError,
    resetInput: resetModel,
    error: modelError,
    showErrorHandler: modelShowErrorHandler,
  } = useInput(brandNameValidator);

  const {
    value: mrpValue,
    inputHandler: mrpHandler,
    inputBlurHandler: mrpBlurHandler,
    hasError: mrpHasError,
    resetInput: resetMrp,
    error: mrpError,
    showErrorHandler: mrpShowErrorHandler,
  } = useInput(brandNameValidator);

  const {
    value: priceValue,
    inputHandler: priceHandler,
    inputBlurHandler: priceBlurHandler,
    hasError: priceHasError,
    resetInput: resetPrice,
    error: priceError,
    showErrorHandler: priceShowErrorHandler,
  } = useInput(brandNameValidator);

  const {
    value: sizeValue,
    inputHandler: sizeHandler,
    inputBlurHandler: sizeBlurHandler,
    hasError: sizeHasError,
    resetInput: resetSize,
    error: sizeError,
    showErrorHandler: sizeShowErrorHandler,
  } = useInput(brandNameValidator);

  const {
    value: modelTypeValue,
    inputHandler: modelTypeHandler,
    inputBlurHandler: modelTypeBlurHandler,
    hasError: modelTypeHasError,
    resetInput: resetModelType,
    error: modelTypeError,
    showErrorHandler: modelTypeShowErrorHandler,
  } = useInput(brandNameValidator);

  const {
    value: styleTypeValue,
    inputHandler: styleTypeHandler,
    inputBlurHandler: styleTypeBlurHandler,
    isFocused: isStyleTypeFocused,
    inputFocusHandler: styleTypeFocusHandler,
    isTouched: isStyleTypeTouched,
    hasError: styleTypeHasError,
    resetInput: resetStyleType,
  } = useInput(brandNameValidator);

  const {
    value: lensTypeValue,
    inputHandler: lensTypeHandler,
    inputBlurHandler: lensTypeBlurHandler,
    hasError: lensTypeHasError,
    resetInput: resetLensType,
    error: lensTypeError,
    showErrorHandler: lensTypeShowErrorHandler,
  } = useInput(brandNameValidator);

  const {
    value: lensColorValue,
    inputHandler: lensColorHandler,
    inputBlurHandler: lensColorBlurHandler,
    hasError: lensColorHasError,
    resetInput: resetLensColor,
    error: lensColorError,
    showErrorHandler: lensColorShowErrorHandler,
  } = useInput(brandNameValidator);

  const {
    value: frameColorValue,
    inputHandler: frameColorHandler,
    inputBlurHandler: frameColorBlurHandler,
    hasError: frameColorHasError,
    resetInput: resetFrameColor,
    error: frameColorError,
    showErrorHandler: frameColorShowErrorHandler,
  } = useInput(brandNameValidator);

  const {
    value: frameTypeValue,
    inputHandler: frameTypeHandler,
    inputBlurHandler: frameTypeBlurHandler,
    hasError: frameTypeHasError,
    resetInput: resetframeType,
    error: frameTypeError,
    showErrorHandler: frameTypeShowErrorHandler,
  } = useInput(brandNameValidator);

  const {
    value: genderValue,
    inputHandler: genderHandler,
    inputBlurHandler: genderBlurHandler,
    hasError: genderHasError,
    resetInput: resetGender,
    error: genderError,
    showErrorHandler: genderShowErrorHandler,
  } = useInput(brandNameValidator);

  const {
    value: descriptionValue,
    inputHandler: descriptionHandler,
    inputBlurHandler: descriptionBlurHandler,
    hasError: descriptionHasError,
    resetInput: resetDescription,
    error: descriptionError,
    showErrorHandler: descriptionShowErrorHandler,
  } = useInput(brandNameValidator);

  const checkError = () => {
    return (
      brandError ||
      modelError ||
      mrpError ||
      priceError ||
      sizeError ||
      modelTypeError ||
      lensTypeError ||
      lensColorError ||
      frameTypeError ||
      frameColorError ||
      genderError ||
      descriptionError
    );
  };

  const resetAllInput = () => {
    resetBrand();
    resetModel();
    resetMrp();
    resetPrice();
    resetSize();
    resetModelType();
    resetLensType();
    resetLensColor();
    resetDescription();
    resetFrameColor();
    resetGender();
  };
  const setAllShowError = () => {
    brandShowErrorHandler();
    modelShowErrorHandler();
    mrpShowErrorHandler();
    priceShowErrorHandler();
    sizeShowErrorHandler();
    modelTypeShowErrorHandler();
    lensTypeShowErrorHandler();
    lensColorShowErrorHandler();
    frameTypeShowErrorHandler();
    frameColorShowErrorHandler();
    genderShowErrorHandler();
    descriptionShowErrorHandler();
  };

  const toggleSidebar = () => {
    setSidebar((side) => !side);
  };

  const submitForm = (e) => {
    console.log("SS");
    e.preventDefault();
    if (checkError()) {
      setAllShowError();
      return;
    }

    const formData = new FormData();
    formData.append("brand", brandValue);
    formData.append("model", modelValue);
    formData.append("mrp", mrpValue);
    formData.append("price", priceValue);
    formData.append("size", sizeValue.toLowerCase());
    formData.append("modelType", modelTypeValue.toLowerCase());
    formData.append("lensType", lensTypeValue.toLowerCase());
    formData.append("lensColor", lensColorValue.toLowerCase());
    formData.append("gender", genderValue);
    formData.append("description", descriptionValue);
    formData.append("frameType", frameTypeValue.toLowerCase());
    formData.append("frameColor", frameColorValue.toLowerCase());

    if (action === "updateProduct" && coverImage) {
      formData.append("imageCover", coverImage);
    } else {
      formData.append("imageCover", coverImage);
    }
    if (action === "updateProduct" && images.length > 0) {
      images.forEach((el) => {
        formData.append("images", el);
      });
    } else {
      images.forEach((el) => {
        formData.append("images", el);
      });
    }
    style.forEach((el) => formData.append("style", el));

    if (props.action === "updateProduct") {
      dispatch(updateProduct(product._id, formData));
    } else {
      dispatch(addProduct(formData));
    }

    // resetAllInput();
  };

  useEffect(() => {
    if (props.action === "updateProduct" && product) {
      brandHandler(product.brand);
      modelHandler(product.model);
      mrpHandler(product.mrp.toString());
      priceHandler(product.price.toString());
      sizeHandler(product.size);
      modelTypeHandler(product.modelType);
      lensTypeHandler(product.lensType);
      lensColorHandler(product.lensColor);
      genderHandler(product.gender);
      descriptionHandler(product.description);
      frameTypeHandler(product.frameType);
      frameColorHandler(product.frameColor);
      setStyle(product.style);
    }
  }, [product, pathname, props.action]);

  useEffect(() => {
    if (action === "addProduct" && type === "success") {
      navigate("/admin/editProducts");
    }
    if (props.action === "updateProduct") {
      dispatch(fetchProduct(params.id));
    }
  }, [action, type, navigate]);

  return (
    <div className="dashboard-component">
      <Sidebar />
      <Navigation />

      <div className="add-product-container">
        <form onSubmit={submitForm} className="add-product-form">
          <span className="heading-1">{props.heading}</span>
          {isLoading && <Loading heading="Loading..." type="loading" />}
          {/* ROW 1 */}
          {!isLoading && (
            <>
              <FormInput
                lable="Brand"
                type={"text"}
                value={brandValue}
                hasError={brandHasError}
                onChange={brandHandler}
                onBlur={brandBlurHandler}
                errorMessage="Must Contain 3 Characters"
                error={brandError}
              />
              <FormInput
                value={modelValue}
                onChange={modelHandler}
                onBlur={modelBlurHandler}
                hasError={modelHasError}
                lable="Model"
                type="text"
                errorMessage="Must Contain 3 Characters"
                error={modelError}
              />
              <FormInput
                value={mrpValue}
                onChange={mrpHandler}
                onBlur={mrpBlurHandler}
                hasError={mrpHasError}
                lable="Mrp"
                type="number"
                errorMessage="Please Provide Valid Mrp"
                error={mrpError}
              />
              <FormInput
                value={priceValue}
                onChange={priceHandler}
                onBlur={priceBlurHandler}
                lable="Selling Price"
                type="number"
                hasError={priceHasError}
                errorMessage="Please Provide Valid Price"
                error={priceError}
              />
              <SelectInput
                options={["Small", "Medium", "Large"]}
                lable="Size"
                onChange={sizeHandler}
                onBlur={sizeBlurHandler}
                value={sizeValue}
                error={sizeError}
                hasError={sizeHasError}
                errorMessage="Please Select Lens Size"
              />
              {/* MUltiple Select */}
              <MultipleSelectInput
                selected={style}
                options={[
                  "Transparent",
                  "Aviator",
                  "Clubmaster",
                  "Cat-Eye",
                  "Round",
                  "Square",
                  "Rectangle",
                ]}
                lable="Style"
                onChange={handleStyleChange}
                onBlur={styleTypeBlurHandler}
                value={style}
              />
              {/* <h2>{style}</h2> */}
              {/* ROW 5 */}
              <SelectInput
                lable="Model Type"
                type="text"
                options={specsTypeOptions}
                onChange={modelTypeHandler}
                onBlur={modelTypeBlurHandler}
                errorMessage="Please Select Model"
                value={modelTypeValue}
                error={modelTypeError}
                hasError={modelTypeHasError}
              />
              {/* ROW 6 */}
              <FormInput
                lable="Lens Type"
                type="text"
                onChange={lensTypeHandler}
                onBlur={lensTypeBlurHandler}
                hasError={lensTypeHasError}
                errorMessage="Please Select Lens Type"
                value={lensTypeValue}
                error={lensTypeError}
              />
              <SelectInput
                lable="Lens Color"
                type="text"
                options={availabelColors}
                onChange={lensColorHandler}
                onBlur={lensColorBlurHandler}
                errorMessage="Please Select Lens Color"
                value={lensColorValue}
                error={lensColorError}
                hasError={lensColorHasError}
              />
              {/* ROW 9 */}
              <FormInput
                lable="Frame Type"
                type="text"
                onChange={frameTypeHandler}
                onBlur={frameTypeBlurHandler}
                hasError={frameTypeHasError}
                errorMessage="Please Frame Frame Type"
                value={frameTypeValue}
                error={frameTypeError}
              />
              <SelectInput
                lable="Frame Color"
                type="text"
                options={availabelColors}
                onChange={frameColorHandler}
                onBlur={frameColorBlurHandler}
                hasError={frameColorHasError}
                errorMessage="Please Frame Frame Color"
                value={frameColorValue}
                error={frameColorError}
              />
              <SelectInput
                lable="Gender"
                type="text"
                onChange={genderHandler}
                onBlur={genderBlurHandler}
                value={genderValue}
                options={["Mens", "Womens", "Kids", "Unisex"]}
                error={genderError}
                hasError={genderHasError}
                errorMessage="Please Select Ideal Gender"
              />
              {/* ROW 12 */}
              <FormInput
                lable="Description"
                type="text"
                onChange={descriptionHandler}
                onBlur={descriptionBlurHandler}
                hasError={descriptionHasError}
                errorMessage="Please Provide Description."
                value={descriptionValue}
                error={descriptionError}
              />
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
                  onChange={coverImageHandler}
                  name="coverImage"
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
                  name="images"
                  className="add-product-form-row__input"
                  type="file"
                  multiple
                  onChange={imagesHandler}
                  placeholder="Choose Images"
                  id="product-images"
                />
              </div>{" "}
              <div className="add-product-form-btn__container">
                <button className="form-btn">Submit</button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
