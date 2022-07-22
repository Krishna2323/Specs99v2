import React from "react";
import "./Home.scss";
import HomeCarousel from "./HomeCarousel/HomeCarousel";
import HomeCategory from "./HomeCategory/HomeCategory";
import HomeOffer from "./HomeOffers/HomeOffer";
import HomeShape from "./HomeShape/HomeShape";
import HomeTestimonial from "./HomeTestimonial/HomeTestimonial";
import HomeBrand from "./HomeBrand/HomeBrand";
import TopProducts from "./TopProducts/TopProducts";
import HomeBanner from "./HomeBanner/HomeBanner";
import img1 from "./../../public/img/home/home1.webp";
import img3 from "./../../public/img/home/home3.jpeg";
import img2 from "./../../public/img/home/home4.jpeg";
import {
  kidsDummy,
  specsDummy,
  sunglassesDummy,
} from "../dummyData/sunglassesDummy";

const Home = () => {
  return (
    <div className="home-component">
      <HomeCarousel />
      {/* <HomeOffer /> */}
      <HomeBrand />
      <TopProducts products={specsDummy} heading="Specs" />
      <TopProducts heading="Sunglasses" products={sunglassesDummy} />
      <TopProducts heading="Kids Glasses" products={kidsDummy} />
      <HomeBanner img={img1} />
      <HomeCategory />
      <HomeShape />
      <HomeBanner img={img3}></HomeBanner>
      <HomeBanner img={img2}></HomeBanner>

      <HomeTestimonial />
    </div>
  );
};

export default Home;
