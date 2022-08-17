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
import { homeShapes1, brandDummy } from "../dummyData/sunglassesDummy";
import TopProductSlider from "./TopProductSlider/TopProductSlider";
import Testimonials from "./HomeTestimonials/Testimonials";
import { fetchHomeProducts } from "../../store/HomeProducts/HomeProductsAction";

const Home = (props) => {
  const dispatch = useDispatch();
  const [sidebarState, setSidebarState] = useState(false);

  const {
    computerGlasses,
    computerGlassesIsLoading,
    computerGlassesIsError,
    computerGlassesMessage,

    sunglasses,
    sunglassesIsLoading,
    sunglassesIsError,
    sunglassesMessage,

    eyeglasses,
    eyeglassesIsLoading,
    eyeglassesIsError,
    eyeglassesMessage,

    accessories,
    accessoriesIsLoading,
    accessoriesIsError,
    accessoriesMessage,

    contactLenses,
    contactLensesIsLoading,
    contactLensesIsError,
    contactLensesMessage,
  } = useSelector((state) => state.homeProducts);
  const handleSidebar = () => {
    setSidebarState((prevState) => !prevState);
  };

  useEffect(() => {
    dispatch(fetchHomeProducts());
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
        products={sunglasses}
        loading={sunglassesIsLoading}
        error={sunglassesIsError}
        message={sunglassesMessage}
        heading="Sunglasses"
      />
      <TopProductSlider
        products={eyeglasses}
        loading={eyeglassesIsLoading}
        error={eyeglassesIsError}
        message={eyeglassesMessage}
        heading="Eyeglasses"
      />

      <TopProductSlider
        products={computerGlasses}
        loading={computerGlassesIsLoading}
        error={computerGlassesIsError}
        message={computerGlassesMessage}
        heading="Computer Glasses"
      />

      <TopProductSlider
        products={contactLenses}
        loading={contactLensesIsLoading}
        error={contactLensesIsError}
        message={contactLensesMessage}
        heading="Contact Lenses"
      />
      <TopProductSlider
        products={accessories}
        loading={accessoriesIsLoading}
        error={accessoriesIsError}
        message={accessoriesMessage}
        heading="EYEWEAR ACCESSORIES"
      />
      <Testimonials />
    </div>
  );
};

export default Home;
