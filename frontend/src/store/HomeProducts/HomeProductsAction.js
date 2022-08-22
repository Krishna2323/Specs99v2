import {
  camelCaseText,
  firstUpperWithNoSpace,
} from "../actionHelpers/camelCaseText";
import { fecthData } from "../actionHelpers/fetchData";
import { homeProductsSliceActions } from "./HomeProductsSlice";

export const fetchHomeProducts = () => {
  return async (dispatch) => {
    let models = [
      "sunglasses",
      "eyeglasses",
      "contact lenses",
      "computer glasses",
      "accessories",
    ];

    models.forEach(async (el) => {
      const functionModifiedName = firstUpperWithNoSpace(el);

      await fecthData(
        dispatch,
        el,
        homeProductsSliceActions,
        `setHome${functionModifiedName}`,
        `/api/v1/products/?limit=6&sort=-ratingsAverage&modelType=${el}`
      );
    });
  };
};
