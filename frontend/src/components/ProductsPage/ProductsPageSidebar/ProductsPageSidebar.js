import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductsPageSidebar.scss";
import Slider from "@mui/material/Slider";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
// import FormLabel from "@mui/material/FormLabel";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
// import { fetchProducts } from "../../store/products-slice";
// import { useDispatch } from "react-redux";
import StarIcon from "@mui/icons-material/Star";
import SelectInput from "../../UI/SelectInput/SelectInput";
import { fetchProducts } from "../../../store/productsSlice/productsActions";
import { useDispatch } from "react-redux";

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

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(20000);
  const [minGroupSize, setMinGroupSize] = useState(0);
  const [maxGroupSize, setMaxGroupSize] = useState(25);
  const [minTourDuration, setMinTourDuration] = useState(0);
  const [maxTourDuration, setMaxTourDuration] = useState(15);
  const [minRating, setMinRating] = useState(0);
  const [difficulty, setDifficulty] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);

  const handlePriceChange = (e) => {
    setMinPrice(e.target.value[0]);
    setMaxPrice(e.target.value[1]);
    console.log(e.target.value);
  };

  const handleGroupSizeChange = (e) => {
    setMinGroupSize(e.target.value[0]);
    setMaxGroupSize(e.target.value[1]);
  };

  const handleRatingChange = (e) => {
    setMinRating(e.target.value);
  };

  const handleTourDurationChange = (e) => {
    setMinTourDuration(e.target.value[0]);
    setMaxTourDuration(e.target.value[1]);
  };

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };

  const handleFilterChange = () => {
    props.handleFilterChange(minPrice);

    // dispatch(fetchProducts)
  };
  const keyword = { params };

  useDispatch(() => {}, [keyword]);
  return (
    <ThemeProvider theme={theme}>
      <div className={`products-page-sidebar ${sidebarModifier}`}>
        <h3 className="heading-5">Filter:</h3>

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
            <p>Min : ${minPrice}</p>
            <p>Max : ${maxPrice}</p>
          </div>
        </div>

        {/* DAYS SORTING */}

        <SelectInput
          onChange={handleDifficultyChange}
          onBlur={handleDifficultyChange}
          onFocus={handleDifficultyChange}
          lable="Colors"
          options={["All", "Red", "Green", "Golden", "Silver"]}
          // value="All"
        />

        <div className="products-page-sidebar__slider products-page-sidebar__slider__price">
          <h4>By Group Size:</h4>
          <Slider
            getAriaLabel={(index) =>
              index === 0 ? "Minimum price" : "Maximum price"
            }
            min={0}
            max={25}
            defaultValue={[0, 25]}
            color={"white"}
            onChange={handleGroupSizeChange}
            disableSwap
            step={1}
          />
          <div className="products-page-sidebar__slider__price-lable">
            <p>Min : {minGroupSize}</p>
            <p>Max : {maxGroupSize}</p>
          </div>
        </div>

        {/* RATING SORTING */}

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
        {/* TOUR DURATION SORTING */}

        <div className="products-page-sidebar__slider products-page-sidebar__slider__price">
          <h4>By Tour Duration:</h4>
          <Slider
            getAriaLabel={(index) =>
              index === 0 ? "Minimum price" : "Maximum price"
            }
            min={0}
            max={25}
            defaultValue={[0, 25]}
            color={"white"}
            onChange={handleTourDurationChange}
            disableSwap
            step={1}
          />
          <div className="products-page-sidebar__slider__price-lable">
            <p>Min : {minTourDuration}</p>
            <p>Max : {maxTourDuration}</p>
          </div>
        </div>

        {/* Difficulty SORTING */}

        <div className="products-page-sidebar__slider products-page-sidebar__slider__difficulty">
          <h4>By Difficulty:</h4>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              color="white"
              onChange={handleDifficultyChange}
              defaultValue=""
            >
              <FormControlLabel
                value=""
                control={<Radio color="white" size="medium" />}
                label="All"
              />
              <FormControlLabel
                value="easy"
                control={<Radio color="white" size="medium" />}
                label="Easy"
              />
              <FormControlLabel
                value="medium"
                control={<Radio color="white" size="medium" />}
                label="Medium"
              />

              <FormControlLabel
                value="difficult"
                control={<Radio color="white" size="medium" />}
                label="Difficult"
              />
            </RadioGroup>
          </FormControl>
        </div>
        {/* <div className="products-page-sidebar__slider products-page-sidebar__slider__submit-btn__box"> */}
        <button onClick={handleFilterChange} className="form-btn">
          {" "}
          Save Changes
        </button>
        {/* </div> */}
      </div>
    </ThemeProvider>
  );
};

export default ProductsPageSidebar;
// products-page-sidebar__slider products-page-sidebar__slider__submit-btn__box
