import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ProductsPage.scss";
import ProductsPageSidebar from "./ProductsPageSidebar/ProductsPageSidebar";
// import { specsDummy } from "../dummyData/sunglassesDummy";
import { fetchProducts } from "./../../store/productsSlice/productsActions";
import ProductCard from "../UI/Cards/Product/ProductCard";
import { useParams } from "react-router-dom";
import Loading from "./../UI/Loading/Loading";
import { useLocation } from "react-router";
import * as FaIcons from "react-icons/fa";

const ProductsPage = (props) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { filter } = props;
  const params = useParams();
  const { keyword } = params;
  const [sidebarState, setSidebarState] = useState(false);
  const { products, totalProducts, isLoading, isError, message } = useSelector(
    (state) => state.products
  );
  const handleSidebar = () => {
    setSidebarState((prevState) => !prevState);
  };

  const handleFilterChange = ({
    minPrice,
    maxPrice,
    ratingsAverage,
    typeOfGlass,
    frameSize,
    frameColor,
    lensColor,
    gender,
  }) => {
    if (keyword) {
      dispatch(
        fetchProducts({
          keyword,
          minPrice,
          maxPrice,
          ratingsAverage,
          typeOfGlass,
          frameSize,
          frameColor,
          lensColor,
          gender,
          ...filter,
        })
      );
    } else {
      dispatch(
        fetchProducts({
          keyword: filter.brand ? filter.brand : undefined,
          minPrice,
          maxPrice,
          ratingsAverage,
          typeOfGlass,
          frameSize,
          frameColor,
          lensColor,
          gender,
          ...filter,
        })
      );
    }
  };

  useEffect(() => {
    if (
      filter &&
      (filter.brand || filter.typeOfGlass || filter.gender || filter.style)
    ) {
      dispatch(fetchProducts({ ...filter }));
    }
    if (keyword) {
      dispatch(fetchProducts({ keyword, ...filter }));
    } else if (!keyword && filter && !filter.brand) {
      dispatch(fetchProducts(filter));
    }
  }, [dispatch, keyword, pathname]);

  return (
    <div className="products-page">
      <ProductsPageSidebar
        sidebarState={sidebarState}
        handleFilterChange={handleFilterChange}
        filter={filter}
        closeSidebar={handleSidebar}
      />
      <div className="products-page__products">
        {props.filter?.heading && (
          <h2 className="heading-1">{filter.heading}</h2>
        )}
        {keyword && <h2 className="heading-1">Results For: {keyword}</h2>}
        {isLoading && <Loading heading="Loading..." type="loading" />}
        {isError && <Loading heading={message} />}
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

      <button className="products-page__filter-btn" onClick={handleSidebar}>
        <FaIcons.FaFilter />
      </button>
    </div>
  );
};

export default ProductsPage;
