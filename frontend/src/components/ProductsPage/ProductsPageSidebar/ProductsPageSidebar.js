import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductsPageSidebar.scss";
import Slider from "@mui/material/Slider";
import * as aiIcons from "react-icons/ai";
import * as biIcons from "react-icons/bi";
import * as FaIcons from "react-icons/fa";

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
  const params = useParams();
  const sidebarSelectStyle = {
    fontSize: "2rem",
    padding: ".3rem 1rem",
  };
  const sidebarModifier = props.sidebarState
    ? "products-page-sidebar-open"
    : "";
  const { pathname } = useLocation();
  const { handleFilterChange: propsHandleFilterChange } = props;

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(20000);
  const [frameColor, setFrameColor] = useState("");
  const [gender, setGender] = useState("");
  const [lensColor, setLensColor] = useState("");
  const [frameSize, setFrameSize] = useState("");
  const [typeOfGlass, setTypeOfGlass] = useState("");

  ///////////////////////

  const [minRating, setMinRating] = useState(0);

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
    propsHandleFilterChange({
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
  const resetAll = () => {
    setMinPrice(0);
    setMaxPrice(20000);
    setFrameColor("");
    setFrameSize("");
    setGender("");
    setLensColor("");
    setTypeOfGlass("");
    setMinRating(0);
  };

  // if (props.initial) {
  //
  // }

  useEffect(() => {
    resetAll();
    propsHandleFilterChange({});
    console.log(params);
  }, [pathname, propsHandleFilterChange]);

  return (
    <ThemeProvider theme={theme}>
      <div className={`products-page-sidebar ${sidebarModifier}`}>
        {/* <button
          className="products-page-sidebar__close-btn"
          onClick={props.closeSidebar}
        >
          <aiIcons.AiOutlineClose />
        </button> */}
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
            defaultValue={[minPrice, maxPrice]}
            color={"white"}
            onChange={handlePriceChange}
            disableSwap
            step={100}
            value={[minPrice, maxPrice]}
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
            style={sidebarSelectStyle}
          />
        )}

        <SelectInput
          onChange={handleFrameSizeChange}
          value={frameSize}
          lable="Frame Size"
          options={sizeOptions}
          allOption={true}
          style={sidebarSelectStyle}
        />
        {!params.frameColor && (
          <SelectInput
            onChange={handleFrameColorChange}
            value={frameColor}
            allOption={true}
            lable="Frame Color"
            options={availabelColors}
            style={sidebarSelectStyle}
          />
        )}

        <SelectInput
          onChange={handleLensColorChange}
          value={lensColor}
          allOption={true}
          lable="Lens Color"
          options={availabelColors}
          style={sidebarSelectStyle}
        />

        {!props.filter?.gender && (
          <SelectInput
            onChange={handleGenderChange}
            value={gender}
            allOption={true}
            lable="Gender"
            options={genderOptions}
            style={{
              fontSize: "1.8rem",
              padding: ".3rem 1rem",
            }}
          />
        )}

        <button
          onClick={handleFilterChange}
          className="btn-small products-page-sidebar__apply-btn"
        >
          {" "}
          Apply
        </button>
        <button
          className="products-page-sidebar__filter-btn"
          onClick={props.closeSidebar}
        >
          {!props.sidebarState ? (
            <FaIcons.FaFilter />
          ) : (
            <aiIcons.AiOutlineClose />
          )}
        </button>
      </div>
    </ThemeProvider>
  );
};

export default React.memo(ProductsPageSidebar);
