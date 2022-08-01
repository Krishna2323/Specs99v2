import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ProductsPage.scss";
import ProductsPageSidebar from "./ProductsPageSidebar/ProductsPageSidebar";
// import { specsDummy } from "../dummyData/sunglassesDummy";
import { fetchProducts } from "./../../store/productsSlice/productsActions";
import ProductCard from "../UI/Cards/Product/ProductCard";
import { useParams } from "react-router-dom";
import Loading from "./../UI/Loading/Loading";

const ProductsPage = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  // const location = useLocation();
  // const [paramsChange, setParamsChange] = useState("");
  const { keyword } = params;
  const [sidebarState, setSidebarState] = useState(false);
  const { products, totalProducts, isLoading } = useSelector(
    (state) => state.products
  );
  const handleSidebar = () => {
    setSidebarState((prevState) => !prevState);
  };

  const handleFilterChange = (
    minPrice,
    maxPrice,
    ratingsAverage,
    typeOfGlass,
    frameSize,
    frameColor,
    lensColor,
    gender
  ) => {
    if (keyword) {
      dispatch(
        fetchProducts(
          keyword,
          minPrice,
          maxPrice,
          ratingsAverage,
          typeOfGlass,
          frameSize,
          frameColor,
          lensColor,
          gender
        )
      );
    } else {
      dispatch(
        fetchProducts(
          undefined,
          minPrice,
          maxPrice,
          ratingsAverage,
          typeOfGlass,
          frameSize,
          frameColor,
          lensColor,
          gender
        )
      );
    }
  };

  useEffect(() => {
    console.log("Fetching");

    if (keyword) {
      dispatch(fetchProducts(keyword));
    } else {
      dispatch(fetchProducts());
    }
  }, [dispatch, keyword]);

  return (
    <div onClick={handleSidebar} className="products-page">
      <ProductsPageSidebar
        sidebarState={sidebarState}
        handleFilterChange={handleFilterChange}
      />
      <div className="products-page__products">
        {isLoading && <Loading heading="Loading..." type="loading" />}
        {products &&
          products.map((el, i) => (
            <ProductCard key={i} product={el} keyword={keyword} />
          ))}
        {totalProducts === 0 && (
          <Loading
            heading={`We Couldn't Find A Match For ${
              keyword ? keyword : "Your Filter"
            }`}
            message="Try Finding Something Else."
            type="error"
          />
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
