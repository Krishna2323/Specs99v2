import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ProductsPage.scss";
import ProductsPageSidebar from "./ProductsPageSidebar/ProductsPageSidebar";
// import { specsDummy } from "../dummyData/sunglassesDummy";
import { fetchProducts } from "./../../store/productsSlice/productsActions";
import ProductCard from "../UI/Cards/Product/ProductCard";
import { Link, useParams } from "react-router-dom";
import Loading from "./../UI/Loading/Loading";
import { useLocation } from "react-router";
import * as FaIcons from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";
import { productsSliceAction } from "../../store/productsSlice/productsSlice";

let initial = true;

const ProductsPage = (props) => {
  const arr = [1, 2, 3, 4];
  const [initial, setInitial] = useState(true);
  const params = useParams();
  const { pathname } = useLocation();
  const { keyword, brandName } = params;
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [prevKeyword, setPrevKeyword] = useState(keyword);

  const dispatch = useDispatch();
  const { filter } = props;
  const [sidebarState, setSidebarState] = useState(false);
  const { products, totalProducts, isLoading, isError, message } = useSelector(
    (state) => state.products
  );
  const [page, setPage] = useState(1);
  const hasMore = page < 2;
  const handleSidebar = () => {
    setSidebarState((prevState) => !prevState);
  };

  const observer = useRef();
  const lastBookElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log("visible");
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  const handleFilterChange = ({
    minPrice,
    maxPrice,
    ratingsAverage,
    typeOfGlass,
    frameSize,
    frameColor,
    lensColor,
    gender,
  }) => {
    console.log("Sidebar CHnage");
    if (keyword) {
      dispatch(
        fetchProducts(
          {
            keyword,
            minPrice,
            maxPrice,
            ratingsAverage,
            typeOfGlass,
            frameSize,
            frameColor,
            lensColor,
            gender,
            ...filter,
            page,
          },
          []
        )
      );
    } else {
      dispatch(
        fetchProducts(
          {
            keyword: filter.brand ? filter.brand : undefined,
            minPrice,
            maxPrice,
            ratingsAverage,
            typeOfGlass,
            frameSize,
            frameColor,
            lensColor,
            gender,
            ...filter,
            page,
          },
          []
        )
      );
    }
  };

  const setPrevs = () => {
    setPrevKeyword(keyword);
    setPrevPathname(pathname);
    setPage(1);
    setInitial(false);
    console.log("CHANGUBS");
  };

  useEffect(() => {
    let pageFilter = page;
    let productsFilter = products;
    if (initial || prevPathname !== pathname || prevKeyword !== keyword) {
      pageFilter = 1;
      productsFilter = [];
      setPrevs();
    }

    if (
      filter &&
      (filter.brand || filter.typeOfGlass || filter.gender || filter.style)
    ) {
      dispatch(fetchProducts({ ...filter, page: pageFilter }, productsFilter));
      return;
    }
    if (keyword) {
      dispatch(
        fetchProducts({ keyword, ...filter, page: pageFilter }, productsFilter)
      );
      return;
    }
    if (brandName) {
      dispatch(
        fetchProducts(
          { ...filter, keyword: brandName, page: pageFilter },
          productsFilter
        )
      );
      return;
    } else if (
      !keyword &&
      !brandName &&
      filter &&
      !filter.brand &&
      !filter.gender
    ) {
      dispatch(fetchProducts({ page: pageFilter, ...filter }, productsFilter));
      return;
    }
  }, [keyword, pathname, brandName, page]);

  return (
    <div className="products-page">
      <ProductsPageSidebar
        sidebarState={sidebarState}
        handleFilterChange={handleFilterChange}
        filter={filter}
        closeSidebar={handleSidebar}
        initial={initial}
      />
      <div className="products-page__products">
        {props.filter?.heading && (
          <h2 className="heading-1">{filter.heading}</h2>
        )}
        {keyword && <h2 className="heading-1">Results For: {keyword}</h2>}

        {products &&
          products.map((el, i) => {
            if (products.length === i + 1) {
              return (
                <ProductCard
                  ref={lastBookElementRef}
                  key={i}
                  product={el}
                  keyword={keyword}
                />
              );
            }
            return <ProductCard key={i} product={el} keyword={keyword} />;
          })}
        {isLoading && <Loading heading="" type="loading" />}
        {isError && <Loading heading={message} />}
        {totalProducts === 0 && (
          <Loading
            heading={`We Couldn't Find A Match For ${
              keyword ? keyword : "Your Filter"
            }`}
            message="Try Finding Something Else."
            type="error"
          />
        )}
      </div>

      <button className="products-page__filter-btn" onClick={handleSidebar}>
        <FaIcons.FaFilter />
      </button>
    </div>
  );
};

export default ProductsPage;
