import React, { useState, useEffect } from "react";
import { fetchProducts } from "./../../store/productsSlice/productsActions";
import { useSelector, useDispatch } from "react-redux";
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
  homeShapes1,
} from "../dummyData/sunglassesDummy";

const Home = () => {
  const dispatch = useDispatch();
  const [sidebarState, setSidebarState] = useState(false);
  const { products } = useSelector((state) => state.products);
  const handleSidebar = () => {
    setSidebarState((prevState) => !prevState);
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  return (
    <div className="home-component">
      <HomeCarousel />
      <HomeOffer />
      <HomeBrand />
      <TopProducts heading="Wear The Trend" slides={homeShapes1} />
      <HomeBanner img={img3}></HomeBanner>
      <HomeShape />
      {/* <TopProducts products={specsDummy} heading="Specs" /> */}
      {/* <TopProducts heading="Kids Glasses" products={kidsDummy} /> */}
      <HomeBanner img={img1} />
      <HomeCategory />
      <HomeBanner img={img2}></HomeBanner>

      <HomeTestimonial />
    </div>
  );
};

export default Home;
