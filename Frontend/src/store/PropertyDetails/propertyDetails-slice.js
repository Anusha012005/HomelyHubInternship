import { createSlice } from "@reduxjs/toolkit";

const propertyDetailsSlice = createSlice({
  name: "propertyDetails",

  initialState: {
    propertydetails: null,
    loading: false,
    error: null,
  },

  reducers: {
    getListRequest(state) {
      state.loading = true;
      state.error = null;
    },

    getPropertyDetails(state, action) {
      state.propertydetails = action.payload;
      state.loading = false;
      state.error = null;
    },

    getErrors(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const propertyDetailsAction = propertyDetailsSlice.actions;

export default propertyDetailsSlice;