import React from "react";
import "./HomeBrand.scss";
import CategoryCard from "../../UI/Cards/CategoryCard";
import { brandDummy } from "../../dummyData/sunglassesDummy";

const HomeBrand = () => {
  return (
    <div className="home-element home-brand">
      <h3 className="heading-1 home-brand__heading ">Top Brands </h3>

      <div className="home-brand__brands">
        {brandDummy.map((el) => (
          <CategoryCard img={el.img} title="Category" />
        ))}
      </div>
    </div>
  );
};

export default HomeBrand;
