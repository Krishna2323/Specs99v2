import React from "react";
import "./SingleProductSec2.scss";
import * as IoIcons from "react-icons/io";

const arr = [1, 2, 3];
const SingleProductSec2 = () => {
  return (
    <div className="single-product__section single-product__section-2">
      {arr.map((_el) => (
        <div className="product-feature">
          <div className="product-feature__heading">
            {" "}
            Light Weight <IoIcons.IoIosLeaf />
          </div>
          <p className="product-feature__text">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Dignissimos et amet deserunt laborum sequi quam blanditiis! Dolorum
            cupiditate tempore dicta velit inventore assumenda, maxime eos fuga,
            laboriosam a asperiores. Recusandae!
          </p>
        </div>
      ))}
    </div>
  );
};

export default SingleProductSec2;
