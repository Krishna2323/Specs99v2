import axios from "axios";
import { homeProductsSliceActions } from "./HomeProductsSlice";

export const getTop6 = async (dispatch, modelType) => {
  let url = `/api/v1/products/?limit=6&sort=-ratingsAverage&modelType=${modelType}`;

  let modelTypeModified = modelType
    .split(" ")
    .map((el, i) => {
      if (i === 0) {
        return el;
      } else {
        return el.replace(el[0], el[0].toUpperCase());
      }
    })
    .join("");

  const fetchProductsFunc = async () => {
    dispatch(
      homeProductsSliceActions.setHomeProducts({
        [modelTypeModified + "IsLoading"]: true,
        [modelTypeModified + "Message"]: "Fetching Products",
        [modelTypeModified + "IsError"]: false,
      })
    );

    const { data: sunglassesData } = await axios.get(url);

    dispatch(
      homeProductsSliceActions.setHomeProducts({
        [modelTypeModified + "IsLoading"]: false,
        [modelTypeModified]: sunglassesData.data.data,
      })
    );
  };

  try {
    await fetchProductsFunc();
  } catch (error) {
    const errorMessage = error.response.data.message || "Something Went Wrong!";
    dispatch(
      homeProductsSliceActions.setHomeProducts({
        [modelTypeModified + "IsLoading"]: false,
        [modelTypeModified + "Message"]: errorMessage,
        [modelTypeModified + "IsError"]: true,
      })
    );
  }
};

export const fetchHomeProducts = () => {
  return async (dispatch) => {
    let models = [
      "sunglasses",
      "eyeglasses",
      "contact lenses",
      "computer glasses",
    ];

    models.forEach(async (el) => {
      await getTop6(dispatch, el);
    });
  };
};
