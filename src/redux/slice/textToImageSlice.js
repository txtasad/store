import { createSlice } from "@reduxjs/toolkit";
export const textToImage = createSlice({
  name: "social",
  initialState: {
    image: [],
    total: 0,
    imageChart: [],
    imageCharDataUser: [],
    captionImageData:[],
    imaginationImageData:[],
  
  },
  reducers: {
    setImage: (state, action) => {
      state.image = action.payload;
    },
    setImageTotal: (state, action) => {
      state.total = action.payload;
    },
    setImageChartData: (state, action) => {
      state.imageChart = action.payload;
    },
    setImageCountUserDashboard: (state, action) => {
      state.imageCharDataUser = action.payload;
    },
    setCaptionImageData: (state, action) => {
      state.captionImageData = action.payload;
    },
    setImaginationImageData: (state, action) => {
      state.imaginationImageData = action.payload;
    },
 
    
  },
});

export const {
  setImage,
  setImageTotal,
  setImageChartData,
  setImageCountUserDashboard,
  setCaptionImageData,
  setImaginationImageData,

} = textToImage.actions;
export default textToImage.reducer;
