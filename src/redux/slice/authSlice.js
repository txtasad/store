import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "profile",
  initialState: {
    value: [],
    Email: "",
    OTP: 0,
    Token: "",
    userData: [],
    userDataList: [],
    API_Db: [],
    total: 0,
    userStripeData:[],
   
    //free or new user for admin dashboard
    totalFreeUser: 0,
    totalFreeUserCurrentMonth: 0,
    totalFreeUserLastMonth: 0,
    totalFreeUserDaily: 0,
    totalFreeUserYearly: 0,
    //paid or order user for admin dashboard
    totalPaidUser: 0,
    totalPaidUserCurrentMonth: 0,
    totalPaidUserLastMonth: 0,
    totalPaidUserDaily: 0,
    totalPaidUserYearly: 0,
    //income count admin dashboard
    currentMonthTotalPrice: 0,
    lastMonthTotalPrice: 0,
    todayTotalPrice: 0,
    yearlyTotalPrice: 0,
    totalTotalPrice: 0,
    // order table
    TotalPaidUser: 0,
    paidUserList: [],
    // Current Month Consume Data
    currentMonthApiUsageImage: 0,
    currentMonthApiUseCode: 0,
    currentMonthApiUseAudio: 0,
    currentMonthApiUseArticle: 0,
    currentMonthApiUseChat: 0,
    currentMonthApiUseAudioToText: 0,
    // Last Month Consume Data
    lastMonthApiUsageImage: 0,
    lastMonthApiUseCode: 0,
    lastMonthApiUseAudio: 0,
    lastMonthApiUseArticle: 0,
    lastMonthApiUseChat: 0,
    lastMonthApiUseAudioToText: 0,
    // Yearly Month Consume Data
    yearlyApiUsageImage: 0,
    yearlyApiUseCode: 0,
    yearlyApiUseAudio: 0,
    yearlyApiUseArticle: 0,
    yearlyApiUseChat: 0,
    yearlyApiUseAudioToText: 0,
    // Final Total Count Consume Data
    totalApiUsageImage: 0,
    totalApiUseCode: 0,
    totalApiUseAudio: 0,
    totalApiUseArticle: 0,
    totalApiUseChat: 0,
    totalApiUseAudioToText: 0,

    //total spend money count for marketing
    currentMonthSpendTotalPrice: 0,
    lastMonthSpendTotalPrice: 0,
    yearlySpendTotalPrice: 0,
    totalSpendTotalPrice: 0,
    // SMTP
    smtpDataAll:{},
  },
  reducers: {
    setProfile: (state, action) => {
      state.value = action.payload;
    },
    setEmail: (state, action) => {
      state.Email = action.payload;
    },
    setOTP: (state, action) => {
      state.OTP = action.payload;
    },
    setToken: (state, action) => {
      state.Token = action.payload;
    },
    setUserDetails: (state, action) => {
      state.userData = action.payload;
    },
    setUserDetailsList: (state, action) => {
      state.userDataList = action.payload;
    },
    setApi: (state, action) => {
      state.API_Db = action.payload;
    },
    setAuthTotal: (state, action) => {
      state.total = action.payload;
    },
    //free user count
    setTotalFreeUser: (state, action) => {
      state.totalFreeUser = action.payload;
    },
    setCountFreeUserCurrentMonth: (state, action) => {
      state.totalFreeUserCurrentMonth = action.payload;
    },
    setCountFreeUserLastMonth: (state, action) => {
      state.totalFreeUserLastMonth = action.payload;
    },
    setCountFreeUserDaily: (state, action) => {
      state.totalFreeUserDaily = action.payload;
    },
    setCountFreeUserYearly: (state, action) => {
      state.totalFreeUserYearly = action.payload;
    },

    //paid user count
    setTotalPaidUser: (state, action) => {
      state.totalPaidUser = action.payload;
    },
    setCountPaidCurrentMonth: (state, action) => {
      state.totalPaidUserCurrentMonth = action.payload;
    },
    setCountPaidUserLastMonth: (state, action) => {
      state.totalPaidUserLastMonth = action.payload;
    },
    setCountPaidUserDaily: (state, action) => {
      state.totalPaidUserDaily = action.payload;
    },
    setCountPaidUserYearly: (state, action) => {
      state.totalPaidUserYearly = action.payload;
    },

    //order count
    setCurrentMonthTotalPrice: (state, action) => {
      state.currentMonthTotalPrice = action.payload;
    },
    setLastMonthTotalPrice: (state, action) => {
      state.lastMonthTotalPrice = action.payload;
    },
    setTodayTotalPrice: (state, action) => {
      state.todayTotalPrice = action.payload;
    },
    setYearlyTotalPrice: (state, action) => {
      state.yearlyTotalPrice = action.payload;
    },
    setTotalTotalPrice: (state, action) => {
      state.totalTotalPrice = action.payload;
    },

    //paid user table
    setUserPaidDetailsList: (state, action) => {
      state.paidUserList = action.payload;
    },
    setPaidUserTotal: (state, action) => {
      state.totalPaidUser = action.payload;
    },
    // Current Month Consume Data
    setCurrentMonthApiUsageImage: (state, action) => {
      state.currentMonthApiUsageImage = action.payload;
    },
    setCurrentMonthApiUseCode: (state, action) => {
      state.currentMonthApiUseCode = action.payload;
    },
    setCurrentMonthApiUseAudio: (state, action) => {
      state.currentMonthApiUseAudio = action.payload;
    },
    setCurrentMonthApiUseArticle: (state, action) => {
      state.currentMonthApiUseArticle = action.payload;
    },
    setCurrentMonthApiUseChat: (state, action) => {
      state.currentMonthApiUseChat = action.payload;
    },
    setCurrentMonthApiUseAudioToText: (state, action) => {
      state.currentMonthApiUseAudioToText = action.payload;
    },
    // Last Month Consume Data
    setLastMonthApiUsageImage: (state, action) => {
      state.lastMonthApiUsageImage = action.payload;
    },
    setLastMonthApiUseCode: (state, action) => {
      state.lastMonthApiUseCode = action.payload;
    },
    setLastMonthApiUseAudio: (state, action) => {
      state.lastMonthApiUseAudio = action.payload;
    },
    setLastMonthApiUseArticle: (state, action) => {
      state.lastMonthApiUseArticle = action.payload;
    },
    setLastMonthApiUseChat: (state, action) => {
      state.lastMonthApiUseChat = action.payload;
    },
    setLastMonthApiUseAudioToText: (state, action) => {
      state.lastMonthApiUseAudioToText = action.payload;
    },

    // Yearly Month Consume Data
    setYearlyApiUsageImage: (state, action) => {
      state.yearlyApiUsageImage = action.payload;
    },
    setYearlyApiUseCode: (state, action) => {
      state.yearlyApiUseCode = action.payload;
    },
    setYearlyApiUseAudio: (state, action) => {
      state.yearlyApiUseAudio = action.payload;
    },
    setYearlyApiUseArticle: (state, action) => {
      state.yearlyApiUseArticle = action.payload;
    },
    setYearlyApiUseChat: (state, action) => {
      state.yearlyApiUseChat = action.payload;
    },
    setYearlyApiUseAudioToText: (state, action) => {
      state.yearlyApiUseAudioToText = action.payload;
    },
    // Final Total Count Consume Data
    setTotalApiUsageImage: (state, action) => {
      state.totalApiUsageImage = action.payload;
    },
    setTotalApiUseCode: (state, action) => {
      state.totalApiUseCode = action.payload;
    },
    setTotalApiUseAudio: (state, action) => {
      state.totalApiUseAudio = action.payload;
    },
    setTotalApiUseArticle: (state, action) => {
      state.totalApiUseArticle = action.payload;
    },
    setTotalApiUseChat: (state, action) => {
      state.totalApiUseChat = action.payload;
    },
    setTotalApiUseAudioToText: (state, action) => {
      state.totalApiUseAudioToText = action.payload;
    },

    setCurrentMonthSpendTotalPrice: (state, action) => {
      state.currentMonthSpendTotalPrice = action.payload;
    },
    setLastMonthSpendTotalPrice: (state, action) => {
      state.lastMonthSpendTotalPrice = action.payload;
    },
    setYearlySpendTotalPrice: (state, action) => {
      state.yearlySpendTotalPrice = action.payload;
    },
    setTotalSpendTotalPrice: (state, action) => {
      state.totalSpendTotalPrice = action.payload;
    },
    setSmtpData: (state, action) => {
      state.smtpDataAll = action.payload;
    },
    setUserStripeData: (state, action) => {
      state.userStripeData = action.payload;
    },
   
  },
});

export const {
  setProfile,
  setEmail,
  setOTP,
  setToken,
  setUserDetails,
  setUserDetailsList,
  setApi,
  setAuthTotal,
  // paid user table admin dashboard
  setUserPaidDetailsList,
  setPaidUserTotal,
  // free or new user count for admin dashboard
  setTotalFreeUser,
  setCountFreeUserCurrentMonth,
  setCountFreeUserLastMonth,
  setCountFreeUserDaily,
  setCountFreeUserYearly,
  // paid or Order count for admin dashboard
  setTotalPaidUser,
  setCountPaidCurrentMonth,
  setCountPaidUserLastMonth,
  setCountPaidUserDaily,
  setCountPaidUserYearly,
  //Income count for admin dashboard
  setCurrentMonthTotalPrice,
  setLastMonthTotalPrice,
  setTodayTotalPrice,
  setYearlyTotalPrice,
  setTotalTotalPrice,

  setCurrentMonthApiUsageImage,
  setCurrentMonthApiUseCode,
  setCurrentMonthApiUseAudio,
  setCurrentMonthApiUseArticle,
  setCurrentMonthApiUseChat,
  setCurrentMonthApiUseAudioToText,

  setLastMonthApiUsageImage,
  setLastMonthApiUseCode,
  setLastMonthApiUseAudio,
  setLastMonthApiUseArticle,
  setLastMonthApiUseChat,
  setLastMonthApiUseAudioToText,

  setYearlyApiUsageImage,
  setYearlyApiUseCode,
  setYearlyApiUseAudio,
  setYearlyApiUseArticle,
  setYearlyApiUseChat,
  setYearlyApiUseAudioToText,
  // Final Total Count Consume Data admin dashboard
  setTotalApiUsageImage,
  setTotalApiUseCode,
  setTotalApiUseAudio,
  setTotalApiUseArticle,
  setTotalApiUseChat,
  setTotalApiUseAudioToText,
  //total spend money count for marketing
  setCurrentMonthSpendTotalPrice,
  setLastMonthSpendTotalPrice,
  setYearlySpendTotalPrice,
  setTotalSpendTotalPrice,
  // SMTP
  setSmtpData,
  setUserStripeData,

} = authSlice.actions;
export default authSlice.reducer;
