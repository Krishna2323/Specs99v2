import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ProductsPage.scss";
import ProductsPageSidebar from "./ProductsPageSidebar/ProductsPageSidebar";
// import { specsDummy } from "../dummyData/sunglassesDummy";
import { fetchProducts } from "./../../store/productsSlice/productsActions";
import ProductCard from "../UI/Cards/Product/ProductCard";
import { useParams, useLocation } from "react-router-dom";
import Loading from "./../UI/Loading/Loading";

const ProductsPage = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();
  const { keyword } = params;
  const [sidebarState, setSidebarState] = useState(false);
  const { products, totalProducts } = useSelector((state) => state.products);
  const handleSidebar = () => {
    setSidebarState((prevState) => !prevState);
  };

  console.log(params);
  const handleFilterChange = (price) => {
    if (keyword) {
      dispatch(fetchProducts(keyword, price));
    } else {
      dispatch(fetchProducts(undefined, price));
    }
  };

  useEffect(() => {
    console.log("Fetching");
    if (keyword) {
      dispatch(fetchProducts(keyword));
    } else {
      dispatch(fetchProducts());
    }
  }, [dispatch, params.keyword, keyword, location.pathname]);

  return (
    <div onClick={handleSidebar} className="products-page">
      <ProductsPageSidebar
        sidebarState={sidebarState}
        handleFilterChange={handleFilterChange}
      />
      <div className="products-page__products">
        {products &&
          products.map((el, i) => (
            <ProductCard key={i} product={el} keyword={keyword} />
          ))}
        {totalProducts === 0 && (
          <Loading
            heading={`We Couldn't Find A Match For ${
              keyword ? keyword : "Your Filter"
            } :(`}
            message="Try Finding Something Else."
          />
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
