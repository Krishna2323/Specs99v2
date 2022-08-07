import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductsPageSidebar.scss";
import Slider from "@mui/material/Slider";
import * as aiIcons from "react-icons/ai";
import * as biIcons from "react-icons/bi";

// import FormLabel from "@mui/material/FormLabel";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
// import { fetchProducts } from "../../store/products-slice";
// import { useDispatch } from "react-redux";
import StarIcon from "@mui/icons-material/Star";
import SelectInput from "../../UI/SelectInput/SelectInput";
// import { fetchProducts } from "../../../store/productsSlice/productsActions";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import {
  availabelColors,
  genderOptions,
  sizeOptions,
  specsTypeOptions,
} from "../../helpers/componentHelpers";

const theme = createTheme({
  palette: {
    primary: {
      main: purple[100],
    },
    secondary: {
      main: "#fce4ec",
    },
    white: {
      main: "#FFFFFF",
    },
  },
});

const ProductsPageSidebar = (props) => {
  const sidebarModifier = props.sidebarState
    ? "products-page-sidebar-open"
    : "";
  const params = useParams();
  const { pathname } = useLocation();

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(20000);
  const [frameColor, setFrameColor] = useState("");
  const [gender, setGender] = useState("");
  const [lensColor, setLensColor] = useState("");
  const [frameSize, setFrameSize] = useState("");
  const [typeOfGlass, setTypeOfGlass] = useState("");

  ///////////////////////

  const [minRating, setMinRating] = useState(0);
  // const [page, setPage] = useState(1);
  // const [limit, setLimit] = useState(6);

  const handlePriceChange = (e) => {
    setMinPrice(e.target.value[0]);
    setMaxPrice(e.target.value[1]);
  };

  const handleFrameColorChange = (e) => {
    setFrameColor(e.target.value);
  };

  const handleRatingChange = (e) => {
    setMinRating(e.target.value);
  };

  const handleFrameSizeChange = (e) => {
    setFrameSize(e.target.value);
  };

  const handleLensColorChange = (e) => {
    setLensColor(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleTypeOfGlassChange = (e) => {
    setTypeOfGlass(e.target.value);
  };

  const handleFilterChange = () => {
    props.handleFilterChange({
      minPrice,
      maxPrice,
      ratingsAverage: minRating,
      typeOfGlass,
      frameSize,
      frameColor,
      lensColor,
      gender,
    });
    props.closeSidebar();
  };

  // useDispatch(() => {
  //   console.log();
  // }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className={`products-page-sidebar ${sidebarModifier}`}>
        <button
          className="products-page-sidebar__close-btn"
          onClick={props.closeSidebar}
        >
          <aiIcons.AiOutlineClose />
        </button>
        <h3 className="heading-5 products-page-sidebar__heading">Filter:</h3>

        {/* PRICE SORTING */}
        <div className="products-page-sidebar__slider products-page-sidebar__slider__price">
          <h4>By Price:</h4>
          <Slider
            getAriaLabel={(index) =>
              index === 0 ? "Minimum price" : "Maximum price"
            }
            min={0}
            max={20000}
            defaultValue={[0, 20000]}
            color={"white"}
            onChange={handlePriceChange}
            disableSwap
            step={100}
          />
          <div className="products-page-sidebar__slider__price-lable">
            <p>
              Min : <biIcons.BiRupee></biIcons.BiRupee>
              {minPrice}
            </p>
            <p>
              Max : <biIcons.BiRupee></biIcons.BiRupee>
              {maxPrice}
            </p>
          </div>
        </div>

        <div className="products-page-sidebar__slider products-page-sidebar__slider__rating">
          <h4>By Ratings:</h4>
          <Slider
            min={0}
            max={5}
            defaultValue={0}
            color={"white"}
            onChange={handleRatingChange}
            step={0.1}
          />
          <div className="products-page-sidebar__slider__rating-lable">
            <p>
              Min : {minRating}
              <StarIcon />
            </p>
          </div>
        </div>

        {/* DAYS SORTING */}

        {!props.filter?.typeOfGlass && (
          <SelectInput
            onChange={handleTypeOfGlassChange}
            value={typeOfGlass}
            lable="Glass Type"
            options={specsTypeOptions}
            allOption={true}
            style={{ fontSize: "1.8rem", padding: ".3rem 1rem" }}
          />
        )}

        <SelectInput
          onChange={handleFrameSizeChange}
          value={frameSize}
          lable="Frame Size"
          options={sizeOptions}
          allOption={true}
          style={{ fontSize: "1.8rem", padding: ".3rem 1rem" }}
        />

        <SelectInput
          onChange={handleFrameColorChange}
          value={frameColor}
          allOption={true}
          lable="Frame Color"
          options={availabelColors}
          style={{ fontSize: "1.8rem", padding: ".3rem 1rem" }}
        />

        <SelectInput
          onChange={handleLensColorChange}
          value={lensColor}
          allOption={true}
          lable="Lens Color"
          options={availabelColors}
          style={{ fontSize: "1.8rem", padding: ".3rem 1rem" }}
        />

        {!props.filter?.gender && (
          <SelectInput
            onChange={handleGenderChange}
            value={gender}
            allOption={true}
            lable="Gender"
            options={genderOptions}
            style={{ fontSize: "1.8rem", padding: ".3rem 1rem" }}
          />
        )}

        <button
          onClick={handleFilterChange}
          className="btn-small products-page-sidebar__apply-btn"
        >
          {" "}
          Apply
        </button>
      </div>
    </ThemeProvider>
  );
};

export default ProductsPageSidebar;
// products-page-sidebar__slider products-page-sidebar__slider__submit-btn__box
