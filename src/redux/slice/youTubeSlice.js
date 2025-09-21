import { createSlice } from "@reduxjs/toolkit";
export const youTubeAnalyser = createSlice({
  name: "youTube",
  initialState: {
    aiYouTubeAnalysis: [],
    youTubeTableData: [],
    youTubeTableTotal: 0,
  },
  reducers: {
    setAiYouTubeAnalysis: (state, action) => {
      state.aiYouTubeAnalysis = action.payload;
    },
    setYouTubeTableList: (state, action) => {
      state.youTubeTableData = action.payload;
    },
    setYouTubeTotal: (state, action) => {
      state.youTubeTableTotal = action.payload;
    },
  },
});

export const { setAiYouTubeAnalysis, setYouTubeTableList, setYouTubeTotal } =
  youTubeAnalyser.actions;
export default youTubeAnalyser.reducer;
