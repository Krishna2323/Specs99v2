import React, { useEffect, useState } from "react";
import { fetchProducts } from "./../../store/productsSlice/productsActions";
import { useSelector, useDispatch } from "react-redux";
import "./Home.scss";
import HomeCarousel from "./HomeCarousel/HomeCarousel";
// import HomeCategory from "./HomeCategory/HomeCategory";
// import HomeOffer from "./HomeOffers/HomeOffer";
import HomeShape from "./HomeShape/HomeShape";
// import HomeTestimonial from "./HomeTestimonial/HomeTestimonial";
// import HomeBrand from "./HomeBrand/HomeBrand";
import HomeSlider from "./HomeSlider/HomeSlider";
import {
  homeShapes1,
  // homeOffer,
  brandDummy,
} from "../dummyData/sunglassesDummy";
import TopProductSlider from "./TopProductSlider/TopProductSlider";
import Testimonials from "./HomeTestimonials/Testimonials";

const Home = (props) => {
  const dispatch = useDispatch();
  const [sidebarState, setSidebarState] = useState(false);
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.products
  );
  const handleSidebar = () => {
    setSidebarState((prevState) => !prevState);
  };

  useEffect(() => {
    dispatch(fetchProducts({}));
  }, [dispatch]);

  return (
    <div className="home-component">
      <HomeCarousel />
      {/* <HomeOffer /> */}
      {/* <HomeSlider heading="Get a new perspective" slides={homeOffer} /> */}
      <HomeSlider heading="Wear The Trend" slides={homeShapes1} />
      <HomeSlider heading="Top Brands" slides={brandDummy} />
      <HomeShape />
      <TopProductSlider
        products={products}
        loading={isLoading}
        error={isError}
        message={message}
        heading="Sunglasses"
      />
      <TopProductSlider
        products={products}
        loading={isLoading}
        error={isError}
        message={message}
        heading="Eyeglasses"
      />

      <TopProductSlider
        products={products}
        loading={isLoading}
        error={isError}
        message={message}
        heading="Contact Lenses"
      />
      <TopProductSlider
        products={products}
        loading={isLoading}
        error={isError}
        message={message}
        heading="EYEWEAR ACCESSORIES"
      />

      <Testimonials />
      {/* <TopProductSlider products={products} heading="Top "/> */}

      {/* <HomeBrand /> */}
      {/* <HomeBanner img={img3}></HomeBanner> */}
      {/* <TopProducts products={specsDummy} heading="Specs" /> */}

      {/* <TopProducts heading="Kids Glasses" products={kidsDummy} /> */}
      {/* <HomeBanner img={img1} />
      <HomeCategory />
      <HomeBanner img={img2}></HomeBanner>

      <HomeTestimonial /> */}
    </div>
  );
};

export default Home;
