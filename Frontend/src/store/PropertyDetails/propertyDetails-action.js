import { propertyDetailsAction } from "./propertyDetails-slice";
import { axiosInstance } from "../../utils/axios";

export const getPropertyDetails = (id) => async (dispatch) => {
  try {
    // Start loading
    dispatch(propertyDetailsAction.getListRequest());

    console.log("Property ID:", id);

    // Check whether ID exists
    if (!id) {
      throw new Error("Property ID is missing");
    }

    // Call backend API
    const response = await axiosInstance.get(
      `/api/v1/rent/listing/${id}`
    );

    console.log("API Response:", response);

    // Get property data
    const { data } = response.data;

    // Store property details in Redux
    dispatch(propertyDetailsAction.getPropertyDetails(data));
  } catch (error) {
    console.error("Property Details API Error:", error);

    const errorMessage =
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message ||
      "Could not fetch property details";

    dispatch(propertyDetailsAction.getErrors(errorMessage));
  }
};