import React from "react";
import "./ProductPage.scss";
import SingleProductSec1 from "./SingleProductSec-1/SingleProductSec1";
import SingleProductSec2 from "./SingleProductSec-2/SingleProductSec2";
import SingleProductSec3 from "./SingleProductSec-3/SingleProductSec3";

const ProductPage = () => {
  return (
    <div className="single-product-container">
      <SingleProductSec1 />
      <SingleProductSec2 />
      <SingleProductSec3 />
    </div>
  );
};

export default ProductPage;
