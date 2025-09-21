import { createSlice } from "@reduxjs/toolkit";
export const affiliateSlice = createSlice({
  name: "Affiliate",
  initialState: {
    List: {},
  },
  reducers: {
    setAffiliate: (state, action) => {
      state.List = action.payload;
    },
  },
});

export const { setAffiliate } = affiliateSlice.actions;
export default affiliateSlice.reducer;
