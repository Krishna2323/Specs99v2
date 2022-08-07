import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../DashBoard/SideBar/Sidebar";
import useInput from "../../../hooks/useInput";
import "./AddUpdateProduct.scss";
import FormInput from "../../../UI/FormInput/FormInput";
import * as MdIcons from "react-icons/md";
import SelectInput from "../../../UI/SelectInput/SelectInput";
import {
  addProduct,
  fetchProduct,
  updateProduct,
} from "../../../../store/productSlice/productActions";
import { useNavigate, useParams } from "react-router-dom";
import MultipleSelectInput from "../../../UI/SelectInput/MultipleSelectInput";
import {
  availabelColors,
  specsTypeOptions,
} from "../../../helpers/componentHelpers";
import Navigation from "../../Navigation/Navigation";

const AddProduct = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const [sidebar, setSidebar] = useState(false);
  const [coverImage, setCoverImage] = useState();
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
    isFocused: isBrandFocused,
    inputFocusHandler: brandFocusHandler,
    isTouched: isBrandTouched,
    hasError: brandHasError,
    resetInput: resetBrand,
  } = useInput(brandNameValidator);

  const {
    value: modelValue,
    inputHandler: modelHandler,
    inputBlurHandler: modelBlurHandler,
    isFocused: isModelFocused,
    inputFocusHandler: modelFocusHandler,
    isTouched: isModelTouched,
    hasError: modelHasError,
    resetInput: resetModel,
  } = useInput(brandNameValidator);

  const {
    value: mrpValue,
    inputHandler: mrpHandler,
    inputBlurHandler: mrpBlurHandler,
    isFocused: isMrpFocused,
    inputFocusHandler: mrpFocusHandler,
    isTouched: isMrpTouched,
    hasError: mrpHasError,
    resetInput: resetMrp,
  } = useInput(brandNameValidator);

  const {
    value: priceValue,
    inputHandler: priceHandler,
    inputBlurHandler: priceBlurHandler,
    isFocused: isPriceFocused,
    inputFocusHandler: priceFocusHandler,
    isTouched: isPriceTouched,
    hasError: priceHasError,
    resetInput: resetPrice,
  } = useInput(brandNameValidator);

  const {
    value: sizeValue,
    inputHandler: sizeHandler,
    inputBlurHandler: sizeBlurHandler,
    isFocused: isSizeFocused,
    inputFocusHandler: sizeFocusHandler,
    isTouched: isSizeTouched,
    hasError: sizeHasError,
    resetInput: resetSize,
  } = useInput(brandNameValidator);

  const {
    value: modelTypeValue,
    inputHandler: modelTypeHandler,
    inputBlurHandler: modelTypeBlurHandler,
    isFocused: isModelTypeFocused,
    inputFocusHandler: modelTypeFocusHandler,
    isTouched: isModelTypeTouched,
    hasError: modelTypeHasError,
    resetInput: resetModelType,
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
    isFocused: isLensTypeFocused,
    inputFocusHandler: lensTypeFocusHandler,
    isTouched: isLensTypeTouched,
    hasError: lensTypeHasError,
    resetInput: resetLensType,
  } = useInput(brandNameValidator);

  const {
    value: lensColorValue,
    inputHandler: lensColorHandler,
    inputBlurHandler: lensColorBlurHandler,
    isFocused: isLensColorFocused,
    inputFocusHandler: lensColorFocusHandler,
    isTouched: isLensColorTouched,
    hasError: lensColorHasError,
    resetInput: resetLensColor,
  } = useInput(brandNameValidator);

  const {
    value: frameColorValue,
    inputHandler: frameColorHandler,
    inputBlurHandler: frameColorBlurHandler,
    isFocused: isFrameColorFocused,
    inputFocusHandler: frameColorFocusHandler,
    isTouched: isFrameColorTouched,
    hasError: frameColorHasError,
    resetInput: resetFrameColor,
  } = useInput(brandNameValidator);

  const {
    value: frameTypeValue,
    inputHandler: frameTypeHandler,
    inputBlurHandler: frameTypeBlurHandler,
    isFocused: isFrameTypeFocused,
    inputFocusHandler: frameTypeFocusHandler,
    isTouched: isFrameTypeTouched,
    hasError: frameTypeHasError,
    resetInput: resetframeType,
  } = useInput(brandNameValidator);

  const {
    value: genderValue,
    inputHandler: genderHandler,
    inputBlurHandler: genderBlurHandler,
    isFocused: isGenderFocused,
    inputFocusHandler: genderFocusHandler,
    isTouched: isGenderTouched,
    hasError: genderHasError,
    resetInput: resetGender,
  } = useInput(brandNameValidator);

  const {
    value: descriptionValue,
    inputHandler: descriptionHandler,
    inputBlurHandler: descriptionBlurHandler,
    isFocused: isDescriptionFocused,
    inputFocusHandler: descriptionFocusHandler,
    isTouched: isDescriptionTouched,
    hasError: descriptionHasError,
    resetInput: resetDescription,
  } = useInput(brandNameValidator);

  const checkIsTouched = () => {
    return (
      !isBrandFocused ||
      !isModelFocused ||
      !isMrpFocused ||
      !isPriceFocused ||
      !isSizeFocused ||
      !isModelTypeFocused ||
      !isLensTypeFocused ||
      !isLensColorFocused ||
      !isFrameColorFocused ||
      !isFrameTypeFocused ||
      !isGenderFocused ||
      !isDescriptionFocused
    );
  };

  const checkError = () => {
    return (
      brandHasError ||
      modelHasError ||
      mrpHasError ||
      priceHasError ||
      sizeHasError ||
      modelTypeHasError ||
      lensTypeHasError ||
      lensColorHasError ||
      frameTypeHasError ||
      frameColorHasError ||
      genderHasError ||
      descriptionHasError
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
  const setAllTouched = () => {
    brandBlurHandler();
    modelBlurHandler();
    mrpBlurHandler();
    priceBlurHandler();
    sizeBlurHandler();
    modelTypeBlurHandler();
    lensTypeBlurHandler();
    lensColorBlurHandler();
    frameTypeBlurHandler();
    frameColorBlurHandler();
    genderBlurHandler();
    descriptionBlurHandler();
  };

  const toggleSidebar = () => {
    setSidebar((side) => !side);
  };

  const submitForm = (e) => {
    console.log("SS");
    e.preventDefault();
    if (checkIsTouched() || checkError()) {
      setAllTouched();
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
    formData.append("imageCover", coverImage);
    style.forEach((el) => formData.append("style", el));

    images.forEach((el) => {
      formData.append("images", el);
    });

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
  }, [product]);

  useEffect(() => {
    if (action === "addProduct" && type === "success") {
      navigate("/allProducts");
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
          {/* ROW 1 */}
          <FormInput
            lable="Brand"
            type={"text"}
            value={brandValue}
            hasError={brandHasError}
            isTouched={isBrandTouched}
            onChange={brandHandler}
            onBlur={brandBlurHandler}
            onFocus={brandFocusHandler}
            errorMessage="Must Contain 3 Characters."
          />
          <FormInput
            value={modelValue}
            onChange={modelHandler}
            onBlur={modelBlurHandler}
            onFocus={modelFocusHandler}
            hasError={modelHasError}
            isTouched={isModelTouched}
            lable="Model"
            type="text"
            errorMessage="Must Contain 3 Characters."
          />
          <FormInput
            value={mrpValue}
            onChange={mrpHandler}
            onBlur={mrpBlurHandler}
            onFocus={mrpFocusHandler}
            isTouched={isMrpTouched}
            hasError={mrpHasError}
            lable="Mrp"
            type="number"
            errorMessage="Please Provide Valid Mrp."
          />
          <FormInput
            value={priceValue}
            onChange={priceHandler}
            onBlur={priceBlurHandler}
            onFocus={priceFocusHandler}
            isTouched={isPriceTouched}
            lable="Selling Price"
            type="number"
            hasError={priceHasError}
            errorMessage="Please Provide Valid Price."
          />
          <SelectInput
            options={["Small", "Medium", "Large"]}
            lable="Size"
            onChange={sizeHandler}
            onBlur={sizeBlurHandler}
            onFocus={sizeFocusHandler}
            value={sizeValue}
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
            onFocus={styleTypeFocusHandler}
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
            onFocus={modelTypeFocusHandler}
            errorMessage="Please Select Model."
            value={modelTypeValue}
          />
          {/* ROW 6 */}
          <FormInput
            lable="Lens Type"
            type="text"
            onChange={lensTypeHandler}
            onBlur={lensTypeBlurHandler}
            onFocus={lensTypeFocusHandler}
            isTouched={isLensTypeTouched}
            hasError={lensTypeHasError}
            errorMessage="Please Select Lens Type."
            value={lensTypeValue}
          />
          <SelectInput
            lable="Lens Color"
            type="text"
            options={availabelColors}
            onChange={lensColorHandler}
            onBlur={lensColorBlurHandler}
            onFocus={lensColorFocusHandler}
            errorMessage="Please Select Lens Color."
            value={lensColorValue}
          />
          {/* ROW 9 */}
          <FormInput
            lable="Frame Type"
            type="text"
            onChange={frameTypeHandler}
            onBlur={frameTypeBlurHandler}
            onFocus={frameTypeFocusHandler}
            isTouched={isFrameTypeTouched}
            hasError={frameTypeHasError}
            errorMessage="Please Frame Frame Type."
            value={frameTypeValue}
          />
          <SelectInput
            lable="Frame Color"
            type="text"
            options={availabelColors}
            onChange={frameColorHandler}
            onBlur={frameColorBlurHandler}
            onFocus={frameColorFocusHandler}
            isTouched={isFrameColorTouched}
            hasError={frameColorHasError}
            errorMessage="Please Frame Frame Color."
            value={frameColorValue}
          />
          <SelectInput
            lable="Gender"
            type="text"
            onChange={genderHandler}
            onBlur={genderBlurHandler}
            onFocus={genderFocusHandler}
            value={genderValue}
            options={["Mens", "Womens", "Kids", "Unisex"]}
          />
          {/* ROW 12 */}
          <FormInput
            lable="Description"
            type="text"
            onChange={descriptionHandler}
            onBlur={descriptionBlurHandler}
            onFocus={descriptionFocusHandler}
            isTouched={isDescriptionTouched}
            hasError={descriptionHasError}
            errorMessage="Please Provide Description."
            value={descriptionValue}
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
        </form>{" "}
      </div>
    </div>
  );
};

export default AddProduct;
