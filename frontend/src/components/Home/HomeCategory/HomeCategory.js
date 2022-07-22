import React from "react";
import CategoryCard from "../../UI/Cards/CategoryCard";
import "./HomeCategory.scss";
import img from "../../../public/img/category_Banner/category1.webp";
import img2 from "../../../public/img/category_Banner/category2.webp";
import img3 from "../../../public/img/category_Banner/category3.webp";
import img4 from "../../../public/img/category_Banner/category4.webp";

const arrImg = [img, img2, img3, img4];
const arr = [1, 2, 3, 4];
const HomeCategory = () => {
  return (
    <div className="home-element home-category">
      <div className="box-center">
        <h2 className="heading-1">Shop By Category</h2>
      </div>

      <div className="home-category__categories">
        {arrImg.map((el) => (
          <CategoryCard img={el} title="Category" />
        ))}
      </div>
    </div>
  );
};

export default HomeCategory;
