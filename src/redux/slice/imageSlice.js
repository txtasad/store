import { createSlice } from "@reduxjs/toolkit";
export const imageSlice = createSlice({
  name: "image",
  initialState: {
    List: [],
    Total: {},
  },
  reducers: {
    SetImageList: (state, action) => {
      state.List = action.payload;
    },
    SetImageTotal: (state, action) => {
      state.Total = action.payload;
    },
  },
});

export const { SetImageList, SetImageTotal } = imageSlice.actions;
export default imageSlice.reducer;
