import React from "react";
import "./TopProducts.scss";
import { Link } from "react-router-dom";
import ProductCard from "../../UI/Cards/Product/ProductCard";
// import img from "../../../public/img/bs/ra3.jpg";
// import { sunglassesDummy } from "../../dummyData/sunglassesDummy";

const TopProducts = (props) => {
  const { heading, products } = props;
  return (
    <div className="home-element home-top-products">
      <div className="box-center">
        <h2 className="heading-1">{heading}</h2>
      </div>

      <div className="home-top-products__container">
        {products.map((el, i) => (
          <ProductCard key={i} img={el.img} productId={el.id} />
        ))}
      </div>

      <Link to="/" className="box-center text-link-primary mt-bg">
        <span>View More</span>
      </Link>
    </div>
  );
};

export default TopProducts;
