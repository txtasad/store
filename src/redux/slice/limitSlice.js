import { createSlice } from "@reduxjs/toolkit";
export const limitSlice = createSlice({
  name: "Limit",
  initialState: {
    list: {},
  },
  reducers: {
    setLimitList: (state, action) => {
      state.list = action.payload;
    },
  },
});
export const { setLimitList } = limitSlice.actions;
export default limitSlice.reducer;
