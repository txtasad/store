import { createSlice } from "@reduxjs/toolkit";
export const templateSlice = createSlice({
  name: "template",
  initialState: {
    templateTableAdmin: [],
    templateTotal: 0,
    totalBlog: 0,
    commonTemplate: [],
    articleTemplate: [],
    socialMediaTemplate: [],
    economicsTemplate: [],
    emailTemplate: [],
    websiteTemplate: [],
    blogPostTemplate: [],
    marketingTemplate: [],
    singleTemplateDataUser: {},
    allFavoriteTemplateUser: [],
  },
  reducers: {
    setTemplateListAdmin: (state, action) => {
      state.templateTableAdmin = action.payload;
    },
    setTemplateTotalAdmin: (state, action) => {
      state.templateTotal = action.payload;
    },
    setCommonTemplateUser: (state, action) => {
      state.commonTemplate = action.payload;
    },
    setArticleTemplateUser: (state, action) => {
      state.articleTemplate = action.payload;
    },
    setSocialMediaTemplateUser: (state, action) => {
      state.socialMediaTemplate = action.payload;
    },
    setEconomicsTemplateUser: (state, action) => {
      state.economicsTemplate = action.payload;
    },
    setEmailTemplateUser: (state, action) => {
      state.emailTemplate = action.payload;
    },
    setWebsiteTemplateUser: (state, action) => {
      state.websiteTemplate = action.payload;
    },
    setBlogPostTemplateUser: (state, action) => {
      state.blogPostTemplate = action.payload;
    },
    setMarketingTemplateUser: (state, action) => {
      state.marketingTemplate = action.payload;
    },
    setSingleTemplateDataUser: (state, action) => {
      state.singleTemplateDataUser = action.payload;
    },
    setAllFavoriteTemplateUser: (state, action) => {
      state.allFavoriteTemplateUser = action.payload;
    },
  },
});

export const {
  setTemplateListAdmin,
  setTemplateTotalAdmin,
  setCommonTemplateUser,
  setArticleTemplateUser,
  setSocialMediaTemplateUser,
  setEconomicsTemplateUser,
  setEmailTemplateUser,
  setWebsiteTemplateUser,
  setBlogPostTemplateUser,
  setMarketingTemplateUser,
  setSingleTemplateDataUser,
  setAllFavoriteTemplateUser,
} = templateSlice.actions;

export default templateSlice.reducer;
