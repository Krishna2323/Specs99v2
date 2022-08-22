import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProduct,
  fetchSimilarProducts,
} from "../../store/productSlice/productActions";
import { useParams } from "react-router-dom";
import "./ProductPage.scss";
import SingleProductSec1 from "./SingleProductSec-1/SingleProductSec1";
import SingleProductSec2 from "./SingleProductSec-2/SingleProductSec2";
import SingleProductSec3 from "./SingleProductSec-3/SingleProductSec3";
import TopProductSlider from "../Home/TopProductSlider/TopProductSlider";
import { Fragment } from "react";
import Loading from "../UI/Loading/Loading";
import { fetchProducts } from "../../store/productsSlice/productsActions";

const ProductPage = () => {
  const {
    product,
    isLoading,
    isError,
    message,
    similarProducts,
    similarProductsIsLoading,
    similarProductsIsError,
    similarProductsMessage,
    similarBrand,
    similarBrandIsLoading,
    similarBrandIsError,
    similarBrandMessage,
  } = useSelector((state) => state.product);
  const {
    products,
    isLoading: topProductsLoading,
    isError: topProductsIsError,
    message: topProductsMessage,
  } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (product) {
      dispatch(fetchSimilarProducts(product.brand, product.modelType));
    }
  }, [dispatch, product]);

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, []);

  return (
    <Fragment>
      <div className="single-product-container">
        {isLoading && (
          <Loading heading="Loading..." message="" type="loading" />
        )}

        {!isLoading && isError && (
          <Loading heading={message} message="" type="error" />
        )}
        {product && (
          <Fragment>
            <SingleProductSec1 product={product} />
            {/* <SingleProductSec2 product={product} /> */}
            <SingleProductSec3 product={product} />
            <TopProductSlider
              products={similarProducts}
              loading={similarProductsIsLoading}
              error={similarProductsIsError}
              message={similarProductsMessage}
              heading={`Similar Products`}
              viewMore={`/${product.modelType.split(" ").join("-")}`}
            />
            <TopProductSlider
              products={similarBrand}
              loading={similarBrandIsLoading}
              error={similarBrandIsError}
              message={similarBrandMessage}
              heading={`More From ${product.brand}`}
              viewMore={`/products/${product.brand.split(" ").join("-")}`}
            />
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default ProductPage;
