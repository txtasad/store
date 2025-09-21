import axios from "axios";
import store from "../redux/store/store";
import { toast } from "react-toastify";
import { setToken, getToken, getAffiliate } from "../helper/Session";
import {
  setEmail,
  setOTP,
  setUserDetails,
  setUserDetailsList,
  setAuthTotal,
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
  setUserPaidDetailsList,
  setPaidUserTotal,
  // Current Month Consume Data admin dashboard
  setCurrentMonthApiUsageImage,
  setCurrentMonthApiUseCode,
  setCurrentMonthApiUseArticle,
  setCurrentMonthApiUseChat,
  // Last Month Consume Data admin dashboard
  setLastMonthApiUsageImage,
  setLastMonthApiUseCode,
  setLastMonthApiUseAudio,
  setLastMonthApiUseArticle,
  setLastMonthApiUseChat,
  setLastMonthApiUseAudioToText,

  // Yearly Month Consume Data admin dashboard
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
} from "../redux/slice/authSlice";
import {
  setImage,
  setImageTotal,
  setImageChartData,
  setImageCountUserDashboard,
  setCaptionImageData,
  setImaginationImageData,
} from "../redux/slice/textToImageSlice";
import {
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
} from "../redux/slice/templateSlice";
import {
  setPremiumAssistantListAdmin,
  setVIPAssistantListAdmin,
  setAssistantListAdmin,
  setAssistantTotalAdmin,
  setGetAssistantModelData,
  setCommonAssistantUser,
  setArticleAssistantUser,
  setSocialMediaAssistantUser,
  setEconomicsAssistantUser,
  setEmailAssistantUser,
  setWebsiteAssistantUser,
  setSingleAssistantDataUser,
  setAllFavoriteAssistantUser,
  setAllAssistantUser,
} from "../redux/slice/assistantSlice";

import { setLimitList } from "../redux/slice/limitSlice";
import {
  setImageTotalTable,
  setImageTableList,
} from "../redux/slice/imageTableSlice";
import { setAffiliate } from "../redux/slice/affiliateSlice";
import {
  setBlogList,
  setBlogListTable,
  setTotal,
  setEditBlogData,
  setSMData,
  setDeskData,
  setEditorData,
  setWebAdminData,
  setCurrentBlogData
} from "../redux/slice/blogSlice";
import {
  setProductList,
  setSearchProductList,
  setSearchProductTotal,
  setTotalProduct,
  setEditProductData,
  setProductFeaturedList,
  setProductTournamentList
} from "../redux/slice/productSlice";
import {
  setOrderList,
  setTotalOrderList,
  setConformOrder,
  setTotalOrderCount,
  setOrderChardData,
  setTotalNewOrderNotify,
  setStripeClientKey,
  setAdminAllStripeData,
  setAdminAllStripeTotalData,
} from "../redux/slice/orderListSlice";
import {
  setMonthlyPackageList,
  setYearlyPackageList,
  setLifTimePackageList,
  setMonthlyPackageListAdmin,
  setYearlyPackageListAdmin,
  setLifTimePackageListAdmin,
  setOrderPackage,
  setTotalPackage,
  setEditPackageData,
} from "../redux/slice/packageSlice";
import {
  setTextToArticleDataUser,
  setTotalWordsAllTime,
  setAllArticleTableData,
  setAllArticleTableTotal,
} from "../redux/slice/articleSlice";
import { setFaqData } from "../redux/slice/FaqSlice";
import { setGetAllPageAdmin } from "../redux/slice/PagesSlice";
import { setGetAllSocialMedia } from "../redux/slice/SocialMediaSlice";
import {
  setCartUser,
  setCartOrder,
  setCartTotalBeforeDiscount,
  setCartTotalDiscount,
  setCartNetTotal,
  setCartPurchaseInitiated,
  setCartPlatformPricing,
} from "../redux/slice/cartOrderSlice";

import getBaseUrl from "../helper/BackendConnect";
const BASE_URL = getBaseUrl();
const AxiosHeader = { headers: { token: getToken() } };

export async function updateAssistantPositionInDB(id, newPosition) {
  const URL = BASE_URL + "updateAssistantPosition";
  const reqBody = { id, newPosition };
  try {
    const res = await axios.post(URL, reqBody);
    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
// google login api
export async function postGoogleLoginReq(token) {
  const URL = BASE_URL + "googleLogin";
  const refId = getAffiliate("");
  const postBody = { token, refId };
  try {
    const response = await axios.post(URL, postBody);
    if (response.status === 200) {
      setToken(response.data["token"]);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
//user Reg api
export async function RegisterApi(name, email, auth, password) {
  const URL = BASE_URL + "AuthRegistration";
  const refId = getAffiliate("");
  try {
    const postBody = { name, email, auth, password, refId };
    const res = await axios.post(URL, postBody);
    if (res.status === 200) {
      return res;
    } else {
      return false;
    }
  } catch (error) {
    if (error.response.status === 400) {
      return 400;
    } else {
      console.error(error);
      return false;
    }
  }
}
//user login api
export async function LoginApi(email, password, type) {
  const URL = BASE_URL + "AuthLogin";
  const postBody = { email, password, type };
  try {
    const response = await axios.post(URL, postBody);
    if (response?.status === 200) {
      setToken(response.data.token);
      store.dispatch(setEmail(response.data?.data?.email));
      return true;
    } else {
      console.log('response failed', response);
      toast.error("Failed to login");
      return false;
    }
  } catch (error) {
    console.error("error", error);
    return false;
  }
}
//email verify api
export async function verifyEmail(email) {
  const URL = BASE_URL + "VerifyEmail";
  try {
    const response = await axios.post(URL, email);
    if (response.status === 200) {
      const emailData = email.email;
      store.dispatch(setEmail(emailData));
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
//OTP verify api
export async function OTPVerify(email, OTP) {
  const URL = BASE_URL + "RecoverVerifyOtp/" + email + "/" + OTP;
  try {
    const response = await axios.get(URL);

    if (response.status === 200) {
      store.dispatch(setOTP(OTP));
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
//update account information API
export async function userUpdate(name, email, image, password) {
  const URL = BASE_URL + "AuthUpdate";
  const reqBody = { name, email, image, password };
  try {
    const res = await axios.post(URL, reqBody, AxiosHeader);
    if (res.status === 200) {
      store.dispatch(setUserDetails(res.data["data"]));
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
//delete account api
export async function deleteAccountReq(currentPassword, id) {
  const URL = BASE_URL + "deleteAccount";
  const reqBody = { currentPassword, id };
  try {
    const response = await axios.post(URL, reqBody, AxiosHeader);
    if (response.status === 200) {
      return true;
    } else if (response.status === 401) {
      toast.error("Password not match. Please try again.");
      return false;
    } else if (response.status === 404) {
      toast.error("User not found. Please try again.");
      return false;
    } else {
      toast.error("Something wrong. Please try again.");
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

//password rest api
export async function PasswordReset(email, OTP, password) {
  const URL = BASE_URL + "RecoverRestPassword";
  const postBody = { email, OTP, password };
  try {
    const response = await axios.post(URL, postBody);

    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

//contact api
export async function massageApi(email, name, massage) {
  const URL = BASE_URL + "sendMassage";
  const postBody = { email, name, massage };
  try {
    const res = await axios.post(URL, postBody);
    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
//admin All user api
export async function getAllUserList(pageNo, perPage, searchKeyword) {
  const URL =
    BASE_URL + "getAllUser/" + pageNo + "/" + perPage + "/" + searchKeyword;
  try {
    const res = await axios.get(URL);
    if (res.status === 200) {
      const data = res.data.data.users;
      const TotalUser = res.data.data.totalCount;
      store.dispatch(setUserDetailsList(data));
      store.dispatch(setAuthTotal(TotalUser));
    } else {
      toast.error("Cannot find data.");
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    toast.error("An error occurred while fetching data.");
  }
}
//admin paid user api
export async function getAllPaidUserList(pageNo, perPage, searchKeyword) {
  const URL =
    BASE_URL +
    "totalPaidUserList/" +
    pageNo +
    "/" +
    perPage +
    "/" +
    searchKeyword;
  try {
    const res = await axios.get(URL);
    if (res.status === 200) {
      const data = res.data.data.users;
      const TotalUser = res.data.data.totalCount;
      store.dispatch(setUserPaidDetailsList(data));
      store.dispatch(setPaidUserTotal(TotalUser));
    } else {
      toast.error("Cannot find data.");
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    toast.error("An error occurred while fetching data.");
  }
}
//admin user api
export async function getTotalFreeUserCount() {
  const URL = BASE_URL + "freeUserAdmin";
  try {
    const response = await axios.get(URL);
    if (response.status === 200) {
      store.dispatch(setTotalFreeUser(response.data.totalCount));
      store.dispatch(
        setCountFreeUserCurrentMonth(response.data.currentMonthCount)
      );
      store.dispatch(setCountFreeUserLastMonth(response.data.lastMonthCount));
      store.dispatch(setCountFreeUserDaily(response.data.todayCount));
      store.dispatch(setCountFreeUserYearly(response.data.yearlyCount));
    } else {
      toast.error("Cannot find data.");
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
}
//admin user api
export async function getTotalPaidUserCount() {
  const URL = BASE_URL + "paidUserAdmin";
  try {
    const response = await axios.get(URL);
    if (response.status === 200) {
      store.dispatch(setTotalPaidUser(response.data.totalCount));
      store.dispatch(setCountPaidCurrentMonth(response.data.currentMonthCount));
      store.dispatch(setCountPaidUserLastMonth(response.data.lastMonthCount));
      store.dispatch(setCountPaidUserDaily(response.data.todayCount));
      store.dispatch(setCountPaidUserYearly(response.data.yearlyCount));
      store.dispatch(
        setCurrentMonthTotalPrice(response.data.currentMonthTotalPrice)
      );
      store.dispatch(setLastMonthTotalPrice(response.data.lastMonthTotalPrice));
      store.dispatch(setTodayTotalPrice(response.data.todayTotalPrice));
      store.dispatch(setYearlyTotalPrice(response.data.yearlyTotalPrice));
      store.dispatch(setTotalTotalPrice(response.data.totalTotalPrice));
    } else {
      toast.error("Cannot find data.");
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
}

export async function spendMonyCountForMarketingAdminReq() {
  const URL = BASE_URL + "/spendMonyCountForMarketing";
  try {
    const response = await axios.get(URL);

    if (response.status === 200) {
      store.dispatch(
        setCurrentMonthSpendTotalPrice(response.data.currentMonthPercentage)
      );
      store.dispatch(
        setLastMonthSpendTotalPrice(response.data.lastMonthPercentage)
      );
      store.dispatch(setYearlySpendTotalPrice(response.data.yearlyPercentage));
      store.dispatch(setTotalSpendTotalPrice(response.data.totalPercentage));
    } else {
      toast.error("Cannot find data.");
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
}

export async function getTotalConsumeDataReq() {
  const URL = BASE_URL + "/allConsumeDataAdmin";
  try {
    const response = await axios.get(URL);
    if (response.status === 200) {
      //current month consume  data
      store.dispatch(
        setCurrentMonthApiUsageImage(response.data.currentMonthApiUsageImage)
      );
      store.dispatch(
        setCurrentMonthApiUseCode(response.data.currentMonthApiUseCode)
      );
      store.dispatch(
        setCurrentMonthApiUseArticle(response.data.currentMonthApiUseArticle)
      );
      store.dispatch(
        setCurrentMonthApiUseChat(response.data.currentMonthApiUseChat)
      );
      //Last month consume  data
      store.dispatch(
        setLastMonthApiUsageImage(response.data.lastMonthApiUsageImage)
      );
      store.dispatch(setLastMonthApiUseCode(response.data.lastMonthApiUseCode));
      store.dispatch(
        setLastMonthApiUseAudio(response.data.lastMonthApiUseAudio)
      );
      store.dispatch(
        setLastMonthApiUseArticle(response.data.lastMonthApiUseArticle)
      );
      store.dispatch(setLastMonthApiUseChat(response.data.lastMonthApiUseChat));
      store.dispatch(
        setLastMonthApiUseAudioToText(response.data.lastMonthApiUseAudioToText)
      );
      //Yearly month consume  data
      store.dispatch(setYearlyApiUsageImage(response.data.yearlyApiUsageImage));
      store.dispatch(setYearlyApiUseCode(response.data.yearlyApiUseCode));
      store.dispatch(setYearlyApiUseAudio(response.data.yearlyApiUseAudio));
      store.dispatch(setYearlyApiUseArticle(response.data.yearlyApiUseArticle));
      store.dispatch(setYearlyApiUseChat(response.data.yearlyApiUseChat));
      store.dispatch(
        setYearlyApiUseAudioToText(response.data.yearlyApiUseAudioToText)
      );
      //final total count consume  data
      store.dispatch(setTotalApiUsageImage(response.data.totalApiUsageImage));
      store.dispatch(setTotalApiUseCode(response.data.totalApiUseCode));
      store.dispatch(setTotalApiUseAudio(response.data.totalApiUseAudio));
      store.dispatch(setTotalApiUseArticle(response.data.totalApiUseArticle));
      store.dispatch(setTotalApiUseChat(response.data.totalApiUseChat));
      store.dispatch(
        setTotalApiUseAudioToText(response.data.totalApiUseAudioToText)
      );
    } else {
      toast.error("Cannot find data.");
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
}

//admin user api
export async function getUserDetailsReq() {
  const URL = BASE_URL + "getUserDetails";
  try {
    const response = await axios.get(URL, AxiosHeader);
    if (response.status === 200) {
      store.dispatch(setUserDetails(response.data["data"]));
    } else {
      toast.error("Cannot find data.");
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
}

//user Dashboard Api-limit api
export async function getTotalLimitReq() {
  const URL = BASE_URL + "totalLimit";
  try {
    const packageMatch = await axios.get(URL, AxiosHeader);

    if (packageMatch.status === 200) {
      store.dispatch(setLimitList(packageMatch.data["data"]));
    }
  } catch (error) {
    console.log(error);
  }
}
//admin delete user info API
export async function DeleteUserReq(id) {
  const URL = BASE_URL + "deleteUser/" + id;
  return axios
    .post(URL)
    .then((res) => {
      if (res.status === 200) {
        toast.success("Delete data successfully");
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
}

//user text to article generate api
export async function postTextToArticleReq(apiRequestBody) {
  try {
    const URL = BASE_URL + "createArticle";
    const response = await axios.post(URL, apiRequestBody, {
      headers: {
        ...AxiosHeader.headers,
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    if (error.response.status === 402) {
      return 402;
    } else {
      console.error("Error:", error);
      return null;
    }
  }
}

export async function getTextToArticleDataUser() {
  const URL = BASE_URL + "articleCountUserDashboard";
  try {
    const res = await axios.get(URL, AxiosHeader);
    if (res.status === 200) {
      const mothyCount = res.data.monthlyCounts;
      const totalWordsAllTime = res.data.totalWordsAllTime;
      store.dispatch(setTextToArticleDataUser(mothyCount));
      store.dispatch(setTotalWordsAllTime(totalWordsAllTime));
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getTextToArticleTableDataReq(
  pageNo,
  perPage,
  searchKeyword
) {
  const URL =
    BASE_URL +
    "allArticleTableData/" +
    pageNo +
    "/" +
    perPage +
    "/" +
    searchKeyword;
  try {
    const res = await axios.get(URL, AxiosHeader);
    if (res.status === 200) {
      const articleTableDataList = res.data.data.data;
      const totalCount = res.data.data.totalCount;
      store.dispatch(setAllArticleTableData(articleTableDataList));
      store.dispatch(setAllArticleTableTotal(totalCount));
    }
  } catch (error) {
    console.error(error);
  }
}

//add to cart methods
export async function addToCart(cart) {
  const { cartUser, cartOrder, cartTotalBD, cartTotalDisc, cartNetTotal, cartPurchaseInitiated } = cart
  try {
    if (cartUser)
      store.dispatch(setCartUser(cartUser));
    if (cartOrder)
      store.dispatch(setCartOrder(cartOrder));
    if (cartTotalBD)
      store.dispatch(setCartTotalBeforeDiscount(cartTotalBD));
    if (cartTotalDisc)
      store.dispatch(setCartTotalDiscount(cartTotalDisc));
    if (cartNetTotal)
      store.dispatch(setCartNetTotal(cartNetTotal));
    if (cartPurchaseInitiated)
      store.dispatch(setCartPurchaseInitiated(cartPurchaseInitiated));
  } catch (error) {
    console.error(error);
  }
}

//user text to image generate api
export async function TextToImageReq(
  inputValue,
  selectedResolution,
  selectedAmount,
  imageQuality
) {
  const postBody = {
    inputValue,
    selectedResolution,
    selectedAmount,
    imageQuality,
  };
  const URL = BASE_URL + "ImageController";
  try {
    const res = await axios.post(URL, postBody, {
      headers: {
        ...AxiosHeader.headers,
      },
    });

    if (res.status === 200) {
      return res;
    } else {
      return false;
    }
  } catch (error) {
    if (error.response.status === 402) {
      return 402;
    } else {
      console.error(error);
      return false;
    }
  }
}

//image list api
export async function getImageDataList() {
  const URL = BASE_URL + "AiImageList";
  try {
    const response = await axios.get(URL, AxiosHeader);
    if (response.status === 200 && response.data.status === "success") {
      const imageData = response.data.data || [];
      const countImage = response.data.total || [];
      const countMageChart = response.data.dailyCounts || [];
      store.dispatch(setImage(imageData));
      store.dispatch(setImageTotal(countImage));
      store.dispatch(setImageChartData(countMageChart));
      return true;
    } else {
      toast.error("Something went wrong");
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

//home page show all image list api
export async function getAllImageTableDataList(pageNo, perPage, searchKeyword) {
  const URL =
    BASE_URL +
    "AllImageTableData/" +
    pageNo +
    "/" +
    perPage +
    "/" +
    searchKeyword;
  try {
    const response = await axios.get(URL, AxiosHeader);
    if (response.status === 200 && response.data.status === "success") {
      const imageData = response.data.data.data || [];
      const countImage = response.data.data.totalCount || [];
      store.dispatch(setImageTableList(imageData));
      store.dispatch(setImageTotalTable(countImage));
      return true;
    } else {
      toast.error("Something went wrong");
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getImageCountUserDashboard() {
  const URL = BASE_URL + "imagCountUserDashboard";
  try {
    const response = await axios.get(URL, AxiosHeader);

    if (response.status === 200 && response.data.status === "success") {
      const imageData = response.data.monthlyCounts || [];

      store.dispatch(setImageCountUserDashboard(imageData));
      return true;
    } else {
      toast.error("Something went wrong");
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

//image show for user personally api
export async function getImageDataListReq() {
  const URL = BASE_URL + "AiImageListHomepage";
  try {
    const response = await axios.get(URL);
    if (response.status === 200 && response.data.status === "success") {
      const imageData = response.data.data || [];
      store.dispatch(setImage(imageData));
      return true;
    } else {
      toast.error("Something went wrong");
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function DeleteImage(id) {
  const URL = BASE_URL + "deleteImage/" + id;
  return axios
    .post(URL)
    .then((res) => {
      if (res.status === 200) {
        toast.success("Delete data successfully");
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
}

export async function deleteArticleDocument(id) {
  const URL = BASE_URL + "deleteArticleDocument/" + id;
  return axios
    .post(URL)
    .then((res) => {
      if (res.status === 200) {
        toast.success("Delete data successfully");
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
}

export async function deleteCodeDocument(id) {
  const URL = BASE_URL + "deleteCodeDocument/" + id;
  return axios
    .post(URL)
    .then((res) => {
      if (res.status === 200) {
        toast.success("Delete data successfully");
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
}

export async function deleteYouTubeData(id) {
  const URL = BASE_URL + "deleteYouTubeData/" + id;
  return axios
    .post(URL)
    .then((res) => {
      if (res.status === 200) {
        toast.success("Delete data successfully");
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
}
export async function deleteImageAudioReq(id) {
  const URL = BASE_URL + "deleteImageAudioReq/" + id;
  return axios
    .post(URL)
    .then((res) => {
      if (res.status === 200) {
        toast.success("Delete data successfully");
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
}

export async function templateDataUpdateReq(data) {
  const URL = BASE_URL + "updateTemplate";
  try {
    const res = await axios.post(URL, data);
    if (res.status === 200) {
      return true;
    } else {
      toast.error("Something went wrong");
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
export async function getTemplateListReq(pageNo, perPage, searchKeyword) {
  const URL =
    BASE_URL +
    "templateListAdmin/" +
    pageNo +
    "/" +
    perPage +
    "/" +
    searchKeyword;
  try {
    const res = await axios.get(URL);
    if (res.status === 200) {
      const templateList = res.data.data.users;
      const totalCount = res.data.data.totalCount;
      store.dispatch(setTemplateListAdmin(templateList));
      store.dispatch(setTemplateTotalAdmin(totalCount));
    }
  } catch (error) {
    console.error(error);
  }
}
export async function onOffTemplateReq(id, bullionData) {
  const URL = BASE_URL + "showHideTemplate";
  try {
    const res = await axios.post(URL, id, bullionData);
    if (res.status === 200) {
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
export async function favoriteTemplateReq(id, favoriteData) {
  const URL = BASE_URL + "favoriteData";
  try {
    const res = await axios.post(URL, id, favoriteData);
    if (res.status === 200) {
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

//admin blog delete api
export async function deleteTemplateReq(id) {
  const URL = BASE_URL + "deleteTemplate/" + id;
  return axios
    .post(URL)
    .then((res) => {
      if (res.status === 200) {
        toast.success("Delete data successfully");
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
}
export async function getAllTemplateUserReq() {
  const URL = BASE_URL + "getAllTemplateUser";

  try {
    const res = await axios.get(URL);
    if (res.status === 200) {
      store.dispatch(setCommonTemplateUser(res.data.commonTemplate));
      store.dispatch(setArticleTemplateUser(res.data.articleTemplate));
      store.dispatch(setSocialMediaTemplateUser(res.data.socialMediaTemplate));
      store.dispatch(setEconomicsTemplateUser(res.data.economicsTemplate));
      store.dispatch(setEmailTemplateUser(res.data.emailTemplate));
      store.dispatch(setWebsiteTemplateUser(res.data.websiteTemplate));
      store.dispatch(setBlogPostTemplateUser(res.data.blogPostTemplate));
      store.dispatch(setMarketingTemplateUser(res.data.marketingTemplate));
    }
  } catch (error) {
    console.error(error);
  }
}
export async function sentIdReq(id) {
  const URL = BASE_URL + "getSingleData/" + id;
  return axios
    .post(URL)
    .then((res) => {
      if (res.status === 200) {
        store.dispatch(setSingleTemplateDataUser(res.data.data));
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
}
export async function getAllFavoriteTemplateReq() {
  const URL = BASE_URL + "allFavoriteTemplate";
  try {
    const res = await axios.get(URL);
    if (res.status === 200) {
      const favoriteTemplate = res.data.data;
      store.dispatch(setAllFavoriteTemplateUser(favoriteTemplate));
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function updateAssistantAdvanceSetting(data) {
  const URL = BASE_URL + "updateAssistantSettingModel";
  try {
    const res = await axios.post(URL, data);
    if (res.status === 200) {
      return true;
    } else {
      toast.error("Something went wrong");
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function AssistantAdvanceSetting(data) {
  const URL = BASE_URL + "createAssistantAdvanceSetting";
  try {
    const res = await axios.post(URL, data);
    if (res.status === 200) {
      return true;
    } else {
      toast.error("Something went wrong");
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getPremiumAssistantReq() {
  const URL = BASE_URL + "premiumAssistantListAdmin";
  try {
    const res = await axios.get(URL);
    if (res.status === 200) {
      const assistantList = res.data.data;
      store.dispatch(setPremiumAssistantListAdmin(assistantList));
    }
  } catch (error) {
    console.error(error);
  }
}
export async function getVIPAssistantReq() {
  const URL = BASE_URL + "vipAssistantListAdmin";
  try {
    const res = await axios.get(URL);
    if (res.status === 200) {
      const assistantList = res.data.data;
      store.dispatch(setVIPAssistantListAdmin(assistantList));
    }
  } catch (error) {
    console.error(error);
  }
}
export async function getAssistantListReq(pageNo, perPage, searchKeyword) {
  const URL =
    BASE_URL +
    "assistantListAdmin/" +
    pageNo +
    "/" +
    perPage +
    "/" +
    searchKeyword;
  try {
    const res = await axios.get(URL);
    if (res.status === 200) {
      const assistantList = res.data.data.users;
      const totalCount = res.data.data.totalCount;
      store.dispatch(setAssistantListAdmin(assistantList));
      store.dispatch(setAssistantTotalAdmin(totalCount));
    }
  } catch (error) {
    console.error(error);
  }
}

export async function onOffAssistantReq(id, bullionData) {
  const URL = BASE_URL + "showHideAssistant";
  try {
    const res = await axios.post(URL, id, bullionData);
    if (res.status === 200) {
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function onOffSocialMediaReq(id, bullionData) {
  const URL = BASE_URL + "showHideSocialMedia";
  try {
    const res = await axios.post(URL, id, bullionData);
    if (res.status === 200) {
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function favoriteAssistantReq(id, favoriteData) {
  const URL = BASE_URL + "favoriteAssistantData";
  try {
    const res = await axios.post(URL, id, favoriteData);
    if (res.status === 200) {
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
export async function getAllFavoriteAssistantReq() {
  const URL = BASE_URL + "getAllFavorite";
  try {
    const res = await axios.get(URL);
    if (res.status === 200) {
      const favoriteAssistant = res.data.data;
      store.dispatch(setAllFavoriteAssistantUser(favoriteAssistant));
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getAssistAdvanceModelReq(id) {
  const URL = BASE_URL + "getEditAssistantAdvanceModel";
  try {
    const res = await axios.post(URL, { id });
    if (res.status === 200) {
      const editData = res.data.data;
      store.dispatch(setGetAssistantModelData(editData));
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function deleteSocialMediaReq(id) {
  const URL = BASE_URL + "deleteSocialMedia/" + id;
  return axios
    .post(URL)
    .then((res) => {
      if (res.status === 200) {
        toast.success("Delete data successfully");
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
}

export async function deleteAssistantReq(id) {
  const URL = BASE_URL + "deleteAssistant/" + id;
  return axios
    .post(URL)
    .then((res) => {
      if (res.status === 200) {
        toast.success("Delete data successfully");
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
}

export async function getAllSocialMediaReq() {
  const URL = BASE_URL + "getAllSocialMedia";
  try {
    const res = await axios.get(URL);
    if (res.status === 200) {
      store.dispatch(setGetAllSocialMedia(res.data.data));
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getAllAssistantUserReq() {
  const URL = BASE_URL + "getAllAssistantUser";
  try {
    const res = await axios.get(URL);

    if (res.status === 200) {
      store.dispatch(setCommonAssistantUser(res.data.SpecialistAssistant));
      store.dispatch(setArticleAssistantUser(res.data.EducationAssistant));
      store.dispatch(setSocialMediaAssistantUser(res.data.HealthAssistant));
      store.dispatch(setEconomicsAssistantUser(res.data.BusinessAssistant));
      store.dispatch(setEmailAssistantUser(res.data.InstructorAssistant));
      store.dispatch(setWebsiteAssistantUser(res.data.otherAssistant));
      store.dispatch(setAllAssistantUser(res.data.data));
    }
  } catch (error) {
    console.error(error);
  }
}
export async function sentIdSingleReq(id) {
  const URL = BASE_URL + "getAssistantSingleData/" + id;
  return axios
    .post(URL)
    .then((res) => {
      if (res.status === 200) {
        store.dispatch(setSingleAssistantDataUser(res.data.data));
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
}

// package create API
export async function createPricingPackage(postBody) {
  const URL = BASE_URL + "createPackage";
  try {
    const res = await axios.post(URL, postBody);
    if (res.status === 200) {
      return true;
    } else {
      toast.error("Something went wrong");
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
export async function updatePricingPackageReq(postBody) {
  const URL = BASE_URL + "updatePackage";
  try {
    const res = await axios.post(URL, postBody);
    if (res.status === 200) {
      return true;
    } else {
      toast.error("Something went wrong");
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
//package list api
export async function packageList(packageDuration) {
  const URL = BASE_URL + "createPackageList";
  try {
    const response = await axios.get(URL);
    if (response.status === 200 && response.data.status === "success") {
      const { MonthlyData, YarelyData, lifeTimeData, totalPackage } =
        response.data || [];
      if (packageDuration === "Monthly") {
        store.dispatch(setMonthlyPackageList(MonthlyData));
      } else if (packageDuration === "Yearly") {
        store.dispatch(setYearlyPackageList(YarelyData));
      } else if (packageDuration === "Life-Time") {
        store.dispatch(setLifTimePackageList(lifeTimeData));
      } else {
        store.dispatch(setTotalPackage(totalPackage));
      }
      return true;
    } else {
      toast.error("Something went wrong");
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function packageListAdmin() {
  const URL = BASE_URL + "readPackageListAdmin";
  try {
    const response = await axios.get(URL);

    if (response.status === 200 && response.data.status === "success") {
      const { monthlyData, yarelyData, lifeTimeData } = response.data || {};

      if (monthlyData) {
        store.dispatch(setMonthlyPackageListAdmin(monthlyData));
      }

      if (yarelyData) {
        store.dispatch(setYearlyPackageListAdmin(yarelyData));
      }

      if (lifeTimeData) {
        store.dispatch(setLifTimePackageListAdmin(lifeTimeData));
      }

      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

//delete package
export async function DeletePackage(id) {
  const URL = BASE_URL + "packageDelete/" + id;
  return axios
    .post(URL)
    .then((res) => {
      if (res.status === 200) {
        toast.success("Delete data successfully");
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
}
export async function onOffPackageReq(id, bullionData) {
  const URL = BASE_URL + "showHidePackage";
  try {
    const res = await axios.post(URL, id, bullionData);
    if (res.status === 200) {
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
// get package data for edit
export async function editPackageDataReq(id) {
  const URL = BASE_URL + "editPackage";
  try {
    const res = await axios.post(URL, id);
    if (res.status === 200) {
      const editData = res.data.data;
      store.dispatch(setEditPackageData(editData));
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
//affiliate for admin
export async function saveAffiliateReq(AffiliateData) {
  const URL = BASE_URL + "saveAffiliateData";
  return axios
    .post(URL, AffiliateData)
    .then((res) => {
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
}
//affiliate for user
export async function getAffiliateReq() {
  const URL = BASE_URL + "getAffiliateData";
  try {
    const packageMatch = await axios.get(URL);
    if (packageMatch.status === 200) {
      store.dispatch(setAffiliate(packageMatch.data["data"]));
    }
  } catch (error) {
    console.error(error);
  }
}
//affiliate count api
export async function totalLinkShearCountReq(id) {
  try {
    const URL = BASE_URL + "Affiliate/" + id;
    const response = await axios.post(URL);
    if (response.status === 200) {
      return response.data.count;
    } else {
      return 0;
    }
  } catch (error) {
    console.error(error);
    return 0;
  }
}
//affiliate price
export async function totalPriceCountReq(id) {
  try {
    const URL = BASE_URL + "totalPrice/" + id;
    const response = await axios.post(URL);
    if (response.status === 200) {
      return response.data.totalPrice;
    } else {
      return 0;
    }
  } catch (error) {
    console.error(error);
    return 0;
  }
}
//user select order api
export async function orderPackageReq(selectedPlanId) {
  try {
    const URL = BASE_URL + "orderPackage/" + selectedPlanId;
    const response = await axios.post(URL);
    if (response.status === 200) {
      store.dispatch(setOrderPackage(response.data["data"]));
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return 0;
  }
}
//user Dashboard total order api
export async function totalOrderCount() {
  try {
    const URL = BASE_URL + "totalOrder";
    const response = await axios.get(URL);
    if (response.status === 200) {
      store.dispatch(setTotalOrderCount(response.data.total));
      store.dispatch(setOrderChardData(response.data.monthlyCounts));
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return 0;
  }
}
//user billing api
export async function createBillingReq(allBilling) {
  try {
    const URL = BASE_URL + "createBling";
    const response = await axios.post(URL, allBilling);
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}
export async function createCryptoPaymentReq(allBilling) {
  try {
    const URL = BASE_URL + "initCryptoPayment";
    const response = await axios.post(URL, allBilling);
    if (response.status === 200) {
      return true;
    } else if (response.status === 201) {
      toast.error("A crpto payment is already pending! Use debit card instead!");
      return false;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getFaqDataUserReq() {
  const URL = BASE_URL + "getFaqDataUser";
  try {
    const packageMatch = await axios.get(URL);

    if (packageMatch.status === 200) {
      store.dispatch(setFaqData(packageMatch.data["data"]));
    }
  } catch (error) {
    console.error(error);
  }
}
export async function getFaqDataAdminReq() {
  const URL = BASE_URL + "getFaqDataAdmin";
  try {
    const packageMatch = await axios.get(URL);
    if (packageMatch.status === 200) {
      store.dispatch(setFaqData(packageMatch.data["data"]));
    }
  } catch (error) {
    console.error(error);
  }
}
export async function deleteFaqDataReq(id) {
  const URL = BASE_URL + "deleteFaqData/" + id;
  return axios
    .post(URL)
    .then((res) => {
      if (res.status === 200) {
        toast.success("Delete data successfully");
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
}
//admin create FAQ api
export async function faqDataCreateReq(inputValue) {
  try {
    const URL = BASE_URL + "faqDataCreate";
    const response = await axios.post(URL, inputValue);
    if (response.data.message === "success") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error creating blog post:", error);
    return false;
  }
}
export async function faqUpdateReq(formData) {
  try {
    const URL = BASE_URL + "updateFaqAdmin";
    const response = await axios.post(URL, formData);
    if (response.data.message === "success") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error creating blog post:", error);
    return false;
  }
}
export async function onOffFaqDataReq(id, bullionData) {
  const URL = BASE_URL + "showHideFaq";
  try {
    const res = await axios.post(URL, id, bullionData);
    if (res.status === 200) {
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

//admin create social Media create api
export async function socialMediaCreateReq(inputValue) {
  try {
    const URL = BASE_URL + "socialMediaCreate";
    const response = await axios.post(URL, inputValue);
    if (response.data.message === "success") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error creating blog post:", error);
    return false;
  }
}
//admin social media setting api
export async function socialMediaUpdateReq(formData) {
  try {
    const URL = BASE_URL + "updateSocialMediaAdmin";
    const response = await axios.post(URL, formData);
    if (response.data.message === "success") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error creating blog post:", error);
    return false;
  }
}

export async function readSocialMediaAdminReq(pageNo, perPage, searchKeyword) {
  const URL =
    BASE_URL +
    "readSocialMediaAdmin/" +
    pageNo +
    "/" +
    perPage +
    "/" +
    searchKeyword;
  try {
    const res = await axios.get(URL);
    if (res.status === 200) {
      const assistantList = res.data.data.users;
      const totalCount = res.data.data.totalCount;
      store.dispatch(setAssistantListAdmin(assistantList));
      store.dispatch(setAssistantTotalAdmin(totalCount));
    }
  } catch (error) {
    console.error(error);
  }
}

//admin  SMTP data get api
export async function getSmtpDataReq() {
  const URL = BASE_URL + "getSmtpData";
  try {
    const packageMatch = await axios.post(URL);
    if (packageMatch.status === 200) {
      store.dispatch(setSmtpData(packageMatch.data["data"]));
    }
  } catch (error) {
    console.error(error);
  }
}
//admin create SMTP api
export async function createSmtpInfoReq(formData) {
  try {
    const URL = BASE_URL + "createSmtpInfo";
    const response = await axios.post(URL, formData);
    if (response.data.message === "success") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error creating blog post:", error);
    return false;
  }
}

//admin create blog api
export async function createBlogReq(formData) {
  try {
    const URL = BASE_URL + "crateBlog";
    const response = await axios.post(URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.data.message === "success") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error creating blog post:", error);
    return false;
  }
}
//admin update blog data api
export async function blogDataUpdateReq(formData) {
  try {
    const URL = BASE_URL + "updateBlogData";
    const response = await axios.post(URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.data.message === "success") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error creating blog post:", error);
    return false;
  }
}
//show blog in frontend
export async function readBlogReq() {
  try {
    const URL = BASE_URL + "readBlog";
    const response = await axios.post(URL);
    if (response.status === 200) {
      const BlogData = response.data.data;
      store.dispatch(setBlogList(BlogData));
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}

//show platformblog in frontend
export async function readPlatformNewsReq() {
  try {
    const URL = BASE_URL + "readPlatformNews";
    const response = await axios.post(URL);
    if (response.status === 200) {
      const BlogData = response.data.data;
      store.dispatch(setBlogList(BlogData));
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}
//show blog in getpostbyid
export async function getPostbyID(id) {
  try {
    const URL = BASE_URL + "getPostbyID";
    const response = await axios.post(URL, id);
    if (response.status === 200) {
      const BlogData = response.data.data?.[0];
      store.dispatch(setCurrentBlogData(BlogData));
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}
//admin blog delete api
export async function DeleteBlogReq(id) {
  const URL = BASE_URL + "deleteBlog/" + id;
  return axios
    .post(URL)
    .then((res) => {
      if (res.status === 200) {
        toast.success("Delete data successfully");
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
}
//frontend show blog single page api
export async function getBlogListReq(pageNo, perPage, searchKeyword) {
  const URL =
    BASE_URL + "blogList/" + pageNo + "/" + perPage + "/" + searchKeyword;
  try {
    const res = await axios.get(URL);
    if (res.status === 200) {
      const blogList = res.data.data.all;
      const totalCount = res.data.data.totalCount;
      const wa = res.data.data.wa;
      const desk = res.data.data.desk;
      const ed = res.data.data.ed;
      const smData = res.data.data.smData;
      store.dispatch(setBlogListTable(blogList));
      store.dispatch(setDeskData(desk));
      store.dispatch(setWebAdminData(wa));
      store.dispatch(setEditorData(ed));
      store.dispatch(setSMData(smData));

      store.dispatch(setTotal(smData));
    }
  } catch (error) {
    console.error(error);
  }
}
//admin onOff req api
export async function onOffBlogReq(id, bullionData) {
  const URL = BASE_URL + "showHideBlog";
  try {
    const res = await axios.post(URL, id, bullionData);
    if (res.status === 200) {
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
export async function editBlogDataReq(id) {
  const URL = BASE_URL + "editBlog";
  try {
    const res = await axios.post(URL, id);
    if (res.status === 200) {
      const editData = res.data.data;
      store.dispatch(setEditBlogData(editData));
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

//admin get all order list
export async function getOrderListReq(pageNo, perPage, searchKeyword) {
  const URL =
    BASE_URL + "orderList/" + pageNo + "/" + perPage + "/" + searchKeyword;
  try {
    const res = await axios.get(URL);
    if (res.status === 200) {
      const ol = res.data.data.users;
      const totalCount = res.data.data.totalCount;
      store.dispatch(setOrderList(ol));
      store.dispatch(setTotalOrderList(totalCount));
    }
  } catch (error) {
    console.error("error, list", error);
  }
}


//get order by id
export async function getOrderByIDReq(params) {
  const URL =
    BASE_URL + "getOrderByID";
  const URL2 =
    BASE_URL + "getPlatformData";
  try {
    const res = await axios.post(URL, params);
    const plat = await axios.post(URL2);
    if (res.status === 200) {
      const set = { order: res.data.data?.[0], apiSet: true }
      store.dispatch(setCartPurchaseInitiated(set));
    }
    if (plat.status === 200) {
      const set = { price: plat?.data?.data?.[0], apiSet: true }
      store.dispatch(setCartPlatformPricing(set));
    }
  } catch (error) {
    console.error("error getOrder || platformData", error);
  }
}

//get order by id
export async function getPlatformDataReq(params) {
  const URL =
    BASE_URL + "getPlatformData";
  try {
    const res = await axios.post(URL);
    if (res.status === 200) {
      const set = { price: res?.data?.data?.[0], apiSet: true }
      store.dispatch(setCartPlatformPricing(set));
    }
  } catch (error) {
    console.error("error", error);
  }
}

export async function updateOrderItemReq(data) {
  const URL =
    BASE_URL + "updateOrder/";
  try {
    const res = await axios.post(URL, data);
    if (res.status === 200) {
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
export async function updateCryptoDetailsReq(data) {
  const URL =
    BASE_URL + "updateCryptoDetails/";
  try {
    const res = await axios.post(URL, data);
    let resi = res.data;
    if (res.status === 200 || res.status === 201) {
      resi.valid = true;
      return resi;
    }
    else {
      resi.valid = false;
      return resi;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function sentOrderIdReq() {
  const URL = BASE_URL + "sentOrderId";
  try {
    const res = await axios.get(URL);
    if (res.status === 200) {
      const orderList = res.data.data || [];
      store.dispatch(setConformOrder(orderList));
    }
  } catch (error) {
    console.error(error);
  }
}

//products APIs
//show products in frontend
export async function readProductReq() {
  try {
    const URL = BASE_URL + "readProducts";
    console.log("connecting to the server..")
    const response = await axios.post(URL);
    if (response.status === 200) {
      const ProductDatas = response.data.data;
      const ProductData = ProductDatas.filter((item) => item.tournament != true || (item.tournament && item.tournamentDetailsObject.tournamentProducts != true));
      const FeaturedData = ProductData.filter((item) => item.featured);
      const TournamentData = ProductDatas.filter((item) => item.tournament);
      const total = ProductData.length;
      store.dispatch(setProductList(ProductData));
      store.dispatch(setProductFeaturedList(FeaturedData.slice(0, 3)));
      store.dispatch(setProductTournamentList(TournamentData.slice(0, 3)));
      store.dispatch(setTotalProduct(total));
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}


//admin create blog new tournament record
export async function createTournamentResultReq(formData) {
  try {
    const URL = BASE_URL + "createTournament";
    const response = await axios.post(URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.data.message === "success") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error creating new tournament - API Message:", error);
    return false;
  }
}

//admin create new product
export async function createProductReq(formData) {
  try {
    const URL = BASE_URL + "createProduct";
    const response = await axios.post(URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.data.message === "success") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error creating new product - API Message:", error);
    return false;
  }
}

//products by params pageno, perpage and as per search term
export async function getProductsList(pageNo, perPage, searchKeyword) {
  const URL =
    BASE_URL + "productList/" + pageNo + "/" + perPage + "/" + searchKeyword;
  try {
    const res = await axios.get(URL);
    if (res.status === 200) {
      const data = res.data.data.products;
      const TotalUser = res.data.data.totalCount;
      store.dispatch(setSearchProductList(data));
      store.dispatch(setSearchProductTotal(TotalUser));
    } else {
      toast.error("Cannot find data.");
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    toast.error("An error occurred while fetching data.");
  }
}

//activate or deactivate product
export async function onOffProductReq(id, bullionData) {
  const URL = BASE_URL + "showHideProduct";
  try {
    const res = await axios.post(URL, id, bullionData);
    if (res.status === 200) {
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

//update a product data
export async function updateProductData(updateData) {
  const URL = BASE_URL + "updateProductData";
  try {
    const res = await axios.post(URL, updateData
    );
    if (res.status === 200) {
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
//update a updateTournamentData data
export async function updateTournamentData(updateData) {
  const URL = BASE_URL + "updateTournamentData";
  try {
    const res = await axios.post(URL, updateData
    );
    if (res.status === 200) {
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}


export async function sudoDeleteProduct(id) {
  const URL = BASE_URL + "sudoDeleteProduct";
  try {
    const res = await axios.post(URL, id);
    if (res.status === 200) {
      toast.success("Delete product successful");
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

// no call to server made for edit data setting
export async function editProductDataReq(editData) {
  try {
    store.dispatch(setEditProductData(editData));
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

//admin delete order id
export async function DeleteOrderReq(id) {
  const URL = BASE_URL + "deleteOrder/" + id;
  return axios
    .post(URL)
    .then((res) => {
      if (res.status === 200) {
        toast.success("Delete data successfully");
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
}
// admin notify route
export async function getOrderNotifyReq(email) {
  const URL = BASE_URL + "getOrderNotify/" + email;
  return axios
    .get(URL)
    .then((res) => {
      if (res.status === 200) {
        const totalNewOrder = res.data.totalNewNotify;
        store.dispatch(setTotalNewOrderNotify(totalNewOrder));
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
}

export async function updatedOrderStatusReq(status) {
  const URL = BASE_URL + "updatedOrderStatus";
  try {
    const res = await axios.post(URL, status);
    if (res.status === 200) {
      const orderList = res.data.data || [];
      store.dispatch(setConformOrder(orderList));
      return true;
    }
  } catch (error) {
    console.log(error);
  }
}
//user dashboard delete audio
export async function DeleteAudioReq(id) {
  const URL = BASE_URL + "deleteAudio/" + id;
  return axios
    .post(URL)
    .then((res) => {
      if (res.status === 200) {
        toast.success("Delete data successfully");
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
}

export async function getYouTubeVideoAnalyserCount() {
  const URL = BASE_URL + "youTubeAnalysesCount";
  try {
    const res = await axios.get(URL, AxiosHeader);
    if (res.status === 200) {
      const data = res.data.monthlyCounts;
      store.dispatch(setAiYouTubeAnalysis(data));
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error in :", error);
    return false;
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export async function getAllYouTubeTableDataReq(
  pageNo,
  perPage,
  searchKeyword
) {
  const URL =
    BASE_URL +
    "allYouTubeTableData/" +
    pageNo +
    "/" +
    perPage +
    "/" +
    searchKeyword;
  try {
    const res = await axios.get(URL, AxiosHeader);
    if (res.status === 200) {
      const youTubeList = res.data.data.data;
      const totalCount = res.data.data.totalCount;
      store.dispatch(setYouTubeTableList(youTubeList));
      store.dispatch(setYouTubeTotal(totalCount));
    }
  } catch (error) {
    console.error(error);
  }
}

export async function videoAnalyzerReq(formData) {
  const URL = BASE_URL + "videoToText";
  try {
    const res = await axios.post(URL, formData, {
      headers: {
        ...AxiosHeader.headers,
      },
    });
    if (res.status === 200) {
      return res;
    } else {
      return false;
    }
  } catch (error) {
    if (error.response.status === 402) {
      return 402;
    }
    console.error("Error in :", error);
    return false;
  }
}

export async function AiReWriterReq(apiRequestBody) {
  try {
    const URL = BASE_URL + "aiReWriter";

    const response = await axios.post(URL, apiRequestBody, {
      headers: {
        ...AxiosHeader.headers,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    if (error.response.status === 402) {
      return 402;
    } else {
      console.error("Error:", error);
      return null;
    }
  }
}


//user dashboard show data
export async function getAllCodeTableDataReq(pageNo, perPage, searchKeyword) {
  const URL =
    BASE_URL + "AiCodeList/" + pageNo + "/" + perPage + "/" + searchKeyword;
  try {
    const response = await axios.get(URL, AxiosHeader);
    if (response.status === 200 && response.data.status === "success") {
      const AllCode = response.data.data.data || [];
      const CountTotalCode = response.data.totalCount || [];

      store.dispatch(setAllCodeData(AllCode));
      store.dispatch(setCodeTotal(CountTotalCode));

      return true;
    } else {
      toast.error("Something went wrong");
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

//auto matic call grammarcheck
export async function fixErrorTextReq(text) {
  const URL = BASE_URL + "fixErrorTextReq";
  try {
    const res = await axios.post(URL, text, {
      headers: {
        ...AxiosHeader.headers,
      },
    });
    if (res.status === 200) {
      return res;
    } else {
      return false;
    }
  } catch (error) {
    if (error.response.status === 402) {
      return 402;
    } else {
      console.error("Error:", error);
      return null;
    }
  }
}

//auto matic call grammarcheck
export async function autoCheckTextValueReq(text) {
  const URL = BASE_URL + "autoCheckTextValue";
  try {
    const res = await axios.post(URL, text, {
      headers: {
        ...AxiosHeader.headers,
      },
    });
    if (res.status === 200) {
      return res;
    } else {
      return false;
    }
  } catch (error) {
    if (error.response.status === 402) {
      return 402;
    } else {
      console.error("Error:", error);
      return null;
    }
  }
}
// eslint-disable-next-line
export async function contentDetectReq(text) {
  const URL = BASE_URL + "contentDetect";
  try {
    const res = await axios.post(URL, text, {
      headers: {
        ...AxiosHeader.headers,
      },
    });
    if (res.status === 200) {
      return res;
    } else {
      return false;
    }
  } catch (error) {
    if (error.response.status === 402) {
      return 402;
    } else {
      console.error("Error:", error);
      return null;
    }
  }
}

// payment request api
export async function postPaymentReq(paymentData) {
  const URL = BASE_URL + "pay";
  try {
    const res = await axios.post(URL, paymentData);
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function stripeReq() {
  const URL = BASE_URL + "Webhooks";
  try {
    const res = await axios.post(URL);
    if (res.status === 200) {
      const totalCount = res.data;
      store.dispatch(setGetAllPageAdmin(totalCount));
    }
  } catch (error) {
    console.error(error);
  }
}

//Stripe user payment data get all
export async function getPaymentStipeData() {
  const URL = BASE_URL + "stripeUserData";
  try {
    const res = await axios.get(URL, AxiosHeader);
    if (res.status === 200) {
      const userStripeData = res.data;
      store.dispatch(setUserStripeData(userStripeData));
    }
  } catch (error) {
    console.error(error);
  }
}
//Stripe Admin payment data get all
export async function getStripeAdminAllData(pageNo, perPage, searchKeyword) {
  const URL =
    BASE_URL +
    "getStripeAdminAllData/" +
    pageNo +
    "/" +
    perPage +
    "/" +
    searchKeyword;
  try {
    const res = await axios.get(URL);
    if (res.status === 200) {
      const userStripeData = res.data.data.users;
      const total = res.data.data.totalCount;
      store.dispatch(setAdminAllStripeData(userStripeData));
      store.dispatch(setAdminAllStripeTotalData(total));
    }
  } catch (error) {
    console.error(error);
  }
}
export async function getStripeClientKey() {
  const URL = BASE_URL + "getStripeDataAdmin";
  try {
    const res = await axios.get(URL);
    if (res.status === 200) {
      const userStripeData = res.data.data;
      store.dispatch(setStripeClientKey(userStripeData));
    }
  } catch (error) {
    console.error(error);
  }
}

//admin create stripe payment setting api
export async function createStripeSettingDataReq(formData) {
  try {
    const URL = BASE_URL + "createStripeData";
    const response = await axios.post(URL, formData);
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error creating blog post:", error);
    return false;
  }
}

//admin create paypal payment setting api
export async function createPaypalSettingDataReq(formData) {
  try {
    const URL = BASE_URL + "createPaypalData";
    const response = await axios.post(URL, formData);
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error creating blog post:", error);
    return false;
  }
}
// google login client key
export async function createGoogleClientReq(formData) {
  try {
    const URL = BASE_URL + "createGoogleClientKey";
    const response = await axios.post(URL, formData);
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error creating blog post:", error);
    return false;
  }
}
