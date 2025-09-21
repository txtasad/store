import { createSlice } from "@reduxjs/toolkit";
export const blogSlice = createSlice({
  name: "blog",
  initialState: {
    List: [],
    tableData: [],
    deskData: [],
    webAdminData: [],
    editorialData: [],
    smData: [],
    total: 0,
    editBlogData: {},
    currentBlogData: {},
  },
  reducers: {
    setBlogList: (state, action) => {
      state.List = action.payload;
    },

    setBlogListTable: (state, action) => {
      state.tableData = action.payload;
    },
    setDeskData: (state, action) => {
      state.deskData = action.payload;
    },
    setWebAdminData: (state, action) => {
      state.webAdminData = action.payload;
    },
    setEditorData: (state, action) => {
      state.editorialData = action.payload;
    },
    setSMData: (state, action) => {
      state.smData = action.payload;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
    setEditBlogData: (state, action) => {
      state.editBlogData = action.payload;
    },
    setCurrentBlogData: (state, action) => {
      state.currentBlogData = action.payload;
    },
  },
});
export const {
  setBlogList,
  setBlogListTable,
  setTotal,
  setEditBlogData,
  setDeskData,
  setEditorData,
  setSMData,
  setWebAdminData,
  setCurrentBlogData
} = blogSlice.actions;
export default blogSlice.reducer;
