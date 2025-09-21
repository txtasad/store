import { createSlice } from "@reduxjs/toolkit";
export const socialMediaSlice = createSlice({
  name: "MediaSlice",
  initialState: {
    getAllMedia:[]
  },
  reducers: {
    setGetAllSocialMedia: (state, action) => {
        
      state.getAllMedia = action.payload;
    },
  },
});
export const {setGetAllSocialMedia } = socialMediaSlice.actions;
export default socialMediaSlice.reducer