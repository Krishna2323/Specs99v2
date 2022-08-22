import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ProductsPage.scss";
import ProductsPageSidebar from "./ProductsPageSidebar/ProductsPageSidebar";
// import { specsDummy } from "../dummyData/sunglassesDummy";
import { fetchProducts } from "./../../store/productsSlice/productsActions";
import ProductCard from "../UI/Cards/Product/ProductCard";
import { useParams } from "react-router-dom";
import Loading from "./../UI/Loading/Loading";
import { useLocation } from "react-router";

const ProductsPage = (props) => {
  let [sidebarFilterChange, setSidebarFilterChange] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const { pathname } = useLocation();
  const { keyword, frameColor } = params;
  const { filter } = props;
  const [initial, setInitial] = useState(true);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [prevKeyword, setPrevKeyword] = useState(keyword);
  const [sidebarFilter, setSidebarFilter] = useState({});
  const [sidebarState, setSidebarState] = useState(false);
  const {
    products = [],
    totalProducts = 0,
    isLoading,
    isError,
    message,
  } = useSelector((state) => state.products);
  const [page, setPage] = useState(1);
  const hasMore = products.length !== totalProducts;

  const handleSidebar = useCallback(() => {
    setSidebarState((prevState) => !prevState);
  }, []);

  const observer = useRef();
  const lastBookElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && products.length !== totalProducts) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, products, totalProducts]
  );

  const handleFilterChange = useCallback(
    (changedFilter) => {
      if (keyword) {
        setPage(1);
        setSidebarFilter(changedFilter);
        setSidebarFilterChange(true);
      } else {
        setPage(1);
        setSidebarFilter(changedFilter);
        setSidebarFilterChange(true);
      }
    },
    [keyword]
  );

  const setPrevs = () => {
    setPrevKeyword(keyword);
    setPrevPathname(pathname);
    setPage(1);
    setInitial(false);
    setSidebarFilterChange(false);
  };

  useEffect(() => {
    let pageFilter = page;
    let productsFilter = products;
    let filterSidebarFilter = sidebarFilter;

    if (isLoading) return;
    if (
      initial ||
      prevPathname !== pathname ||
      prevKeyword !== keyword ||
      sidebarFilterChange
    ) {
      pageFilter = 1;
      productsFilter = [];
      setPrevs();
    }

    if (initial || prevPathname !== pathname || prevKeyword !== keyword) {
      filterSidebarFilter = {};
    }

    if (
      filter &&
      (filter.brand || filter.typeOfGlass || filter.gender || filter.style)
    ) {
      dispatch(
        fetchProducts(
          { ...filterSidebarFilter, ...filter, page: pageFilter },
          productsFilter
        )
      );
      return;
    }
    if (keyword) {
      if (frameColor) {
        dispatch(
          fetchProducts(
            {
              keyword,
              ...filterSidebarFilter,
              ...filter,
              page: pageFilter,
              frameColor,
            },
            productsFilter
          )
        );
      } else {
        dispatch(
          fetchProducts(
            {
              keyword,
              ...filterSidebarFilter,
              ...filter,
              page: pageFilter,
            },
            productsFilter
          )
        );
      }

      return;
    } else if (
      !keyword &&
      filter &&
      !filter.brand &&
      !filter.gender &&
      !frameColor
    ) {
      dispatch(
        fetchProducts(
          { page: pageFilter, ...filterSidebarFilter, ...filter },
          productsFilter
        )
      );
      return;
    }

    //eslint - disable - next - line;
  }, [keyword, pathname, page, dispatch, sidebarFilter]);

  return (
    <div className="products-page">
      <ProductsPageSidebar
        sidebarState={sidebarState}
        handleFilterChange={handleFilterChange}
        filter={filter}
        closeSidebar={handleSidebar}
        handleSidebar={handleSidebar}
      />
      <div className="products-page__products">
        {props.filter?.heading && (
          <h2 className="heading-1 heading-1--sm">{filter.heading}</h2>
        )}
        {keyword && (
          <h2 className="heading-1 heading-1--sm">Results For: {keyword}</h2>
        )}

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
        {!isLoading && totalProducts !== 0 && !hasMore && (
          <Loading heading="End Of Results" emoji={false} error={false} />
        )}
        {!isLoading && totalProducts === 0 && (
          <Loading
            heading={`We Couldn't Find A Match For ${
              keyword ? keyword : "Your Filter"
            }`}
            message="Try Finding Something Else."
            type="error"
          />
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
