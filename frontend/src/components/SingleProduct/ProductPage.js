import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../store/productSlice/productActions";
import { useParams } from "react-router-dom";
import "./ProductPage.scss";
import SingleProductSec1 from "./SingleProductSec-1/SingleProductSec1";
import SingleProductSec2 from "./SingleProductSec-2/SingleProductSec2";
import SingleProductSec3 from "./SingleProductSec-3/SingleProductSec3";
import { Fragment } from "react";
import Loading from "../UI/Loading/Loading";

const ProductPage = () => {
  const { product, isLoading, isError, message } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id));
    }
  }, [dispatch, id]);
  return (
    <Fragment>
      <div className="single-product-container">
        {isLoading && <Loading heading="Loading..." message="" />}

        {!isLoading && isError && <Loading heading={message} message="" />}
        {product && (
          <Fragment>
            <SingleProductSec1 product={product} />
            <SingleProductSec2 product={product} />
            <SingleProductSec3 product={product} />
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default ProductPage;
