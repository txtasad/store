import { createSlice } from "@reduxjs/toolkit";
export const imageTableSlice = createSlice({
  name: "imageTable",
  initialState: {
    imageList: [],
    total: {},
  },
  reducers: {
    setImageTableList: (state, action) => {
      state.imageList = action.payload;
    },
    setImageTotalTable: (state, action) => {
      state.total = action.payload;
    },
  },
});

export const { setImageTableList, setImageTotalTable } =
  imageTableSlice.actions;
export default imageTableSlice.reducer;
