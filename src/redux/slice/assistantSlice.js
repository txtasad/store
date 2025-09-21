import { createSlice } from "@reduxjs/toolkit";

export const assistantSlice = createSlice({
  name: "Assistant",
  initialState: {
    assistantTableAdmin: [],
    assistantTotal: 0,
    totalBlog: 0,
    // editAssistantData: {},
    getAssistantModelData: {},
    commonAssistant: [],
    articleAssistant: [],
    socialMediaAssistant: [],
    economicsAssistant: [],
    emailAssistant: [],
    websiteAssistant: [],
    // blogPostAssistant: [],
    // marketingAssistant: [],
    singleAssistantDataUser: {},
    allFavoriteAssistant: [],
    allAssistant: [],
    allAssistantChatList: [],
    allAssistantChatTotal: 0,
    allImageAssistant: [],
    vipAssistantAdmin:[],
    premiumAssistantAdmin:[],
  },
  reducers: {
    
    setPremiumAssistantListAdmin:(state, action) => {
      state.premiumAssistantAdmin = action.payload;
    },
    setVIPAssistantListAdmin:(state, action) => {
      state.vipAssistantAdmin = action.payload;
    },
    setAssistantListAdmin: (state, action) => {
      state.assistantTableAdmin = action.payload;
    },
    setAssistantTotalAdmin: (state, action) => {
      state.assistantTotal = action.payload;
    },
    // setEditAssistantData: (state, action) => {
    //   state.editAssistantData = action.payload;
    // },
    setGetAssistantModelData:(state, action) => {
      state.getAssistantModelData = action.payload;
    },
    setCommonAssistantUser: (state, action) => {
      state.commonAssistant = action.payload;
    },
    setArticleAssistantUser: (state, action) => {
      state.articleAssistant = action.payload;
    },
    setSocialMediaAssistantUser: (state, action) => {
      state.socialMediaAssistant = action.payload;
    },
    setEconomicsAssistantUser: (state, action) => {
      state.economicsAssistant = action.payload;
    },
    setEmailAssistantUser: (state, action) => {
      state.emailAssistant = action.payload;
    },
    setWebsiteAssistantUser: (state, action) => {
      state.websiteAssistant = action.payload;
    },
    // setBlogPostAssistantUser: (state, action) => {
    //   state.blogPostAssistant = action.payload;
    // },
    // setMarketingAssistantUser: (state, action) => {
    //   state.marketingAssistant = action.payload;
    // },
    setSingleAssistantDataUser: (state, action) => {
      state.singleAssistantDataUser = action.payload;
    },
    setAllFavoriteAssistantUser: (state, action) => {
      state.allFavoriteAssistant = action.payload;
    },
    setAllAssistantUser: (state, action) => {
      state.allAssistant = action.payload;
    },
    setAllAssistantChatList: (state, action) => {
      state.allAssistantChatList = action.payload;
    },
    setAllAssistantChatTotal: (state, action) => {
      state.allAssistantChatTotal = action.payload;
    },
    setAllImageAssistantUser: (state, action) => {
      state.allImageAssistant = action.payload;
    },
  
  },
});

export const {
  setPremiumAssistantListAdmin,
  setVIPAssistantListAdmin,
  setAssistantListAdmin,
  setAssistantTotalAdmin,
  // setEditAssistantData,
  setGetAssistantModelData,
  setCommonAssistantUser,
  setArticleAssistantUser,
  setSocialMediaAssistantUser,
  setEconomicsAssistantUser,
  setEmailAssistantUser,
  setWebsiteAssistantUser,
  // setBlogPostAssistantUser,
  // setMarketingAssistantUser,
  setSingleAssistantDataUser,
  setAllFavoriteAssistantUser,
  setAllAssistantUser,
  setAllAssistantChatList,
  setAllAssistantChatTotal,
  setAllImageAssistantUser,
} = assistantSlice.actions;

export default assistantSlice.reducer;
