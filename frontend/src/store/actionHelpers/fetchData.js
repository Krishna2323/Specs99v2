import axios from "axios";

export const fecthData = async (
  dispatch,
  modelType,
  slice,
  actionName,
  url
) => {
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
      slice[actionName]({
        [modelTypeModified + "IsLoading"]: true,
        [modelTypeModified + "Message"]: "Fetching Products",
        [modelTypeModified + "IsError"]: false,
      })
    );

    const { data: sunglassesData } = await axios.get(url);
    console.log(sunglassesData.data);

    dispatch(
      slice[actionName]({
        [modelTypeModified + "IsLoading"]: false,
        [modelTypeModified]: sunglassesData.data.data,
      })
    );
  };

  try {
    await fetchProductsFunc();
  } catch (error) {
    console.log(error);
    const errorMessage = error.response.data.message || "Something Went Wrong!";
    dispatch(
      slice[actionName]({
        [modelTypeModified + "IsLoading"]: false,
        [modelTypeModified + "Message"]: errorMessage,
        [modelTypeModified + "IsError"]: true,
      })
    );
  }
};
