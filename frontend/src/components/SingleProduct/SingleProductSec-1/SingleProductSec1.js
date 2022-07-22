import React from "react";
import ProductPageImg from "./ProductPageImg";
import ProductPageDetail from "./ProductPageDetail";
import "./SingleProductSec1.scss";

const SingleProductSec1 = () => {
  return (
    <div className="single-product__section single-product__section-1">
      <ProductPageImg />
      <ProductPageDetail />
    </div>
  );
};

export default SingleProductSec1;
