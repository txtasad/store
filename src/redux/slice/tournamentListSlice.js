import { createSlice } from "@reduxjs/toolkit";
export const tournamentsSlice = createSlice({
  name: "tournaments",
  initialState: {
    list: [],
    codm:[],
    bgmi:[],
    pubg: [],
    total: 0,
    year:[]
  },
  reducers: {
    setTournamentsList: (state, action) => {
      state.list = action.payload;
    },
    setTournamentsCODM: (state, action) =>{
      state.codm = action.payload;
    },
    setTournamentsBGMI: (state, action) =>{
      state.bgmi = action.payload;
    },
    setTournamentsPUBG: (state, action) => {
      state.pubg = action.payload;
    },
    setTotalTournaments: (state, action) => {
      state.total = action.payload;
    },
    setTournamentsYearList: (state, action) => {
      state.searchProductList = action.payload;
    },
  },
});
export const {
  setTournamentsList,
  setTournamentsCODM,
  setTournamentsBGMI,
  setEditProductData,
  setTournamentsPUBG,
  setTotalTournaments,
  setSearchProductTotal,
  setTournamentsYearList
} = tournamentsSlice.actions;
export default tournamentsSlice.reducer;
