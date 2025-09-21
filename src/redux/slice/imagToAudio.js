import { createSlice } from "@reduxjs/toolkit";
export const imageToAudio = createSlice({
  name: "imageToAudio",
  initialState: {
    imagToAudioData: [],
    total: 0,
  },
  reducers: {
    setImageToAudioTableList: (state, action) => {
      state.imagToAudioData = action.payload;
    },

    setTotalImageToAudio: (state, action) => {
      state.total = action.payload;
    },
  },
});

export const { setImageToAudioTableList, setTotalImageToAudio } =
  imageToAudio.actions;
export default imageToAudio.reducer;
