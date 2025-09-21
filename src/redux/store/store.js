import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "../slice/blogSlice";
import productReducer from "../slice/productSlice";
import tournamentsReducer from "../slice/tournamentListSlice";
import imageReducer from "../slice/imageSlice";
import authReducer from "../slice/authSlice";
import cardDataReducer from "../slice/cardSlice";
import sidebarReducer from "../slice/naveSlice";
import textToImagReducer from "../slice/textToImageSlice";
import textToAudioReducer from "../slice/textToAudioSlice";
import packageReducer from "../slice/packageSlice";
import limitReducer from "../slice/limitSlice";
import affiliateReducer from "../slice/affiliateSlice";
import orderListReducer from "../slice/orderListSlice";
import codeReducer from "../slice/codeSlice";
import imageTableReducer from "../slice/imageTableSlice";
import templateTableReducer from "../slice/templateSlice";
import assistantReducer from "../slice/assistantSlice";
import imageToAudioReducer from "../slice/imagToAudio";
import youTubeSliceReducer from "../slice/youTubeSlice";
import textToArticleReducer from "../slice/articleSlice";
import faqReducer from "../slice/FaqSlice";
import PagesSliceReducer from "../slice/PagesSlice";
import SocialMediaReducer from "../slice/SocialMediaSlice";
import cartOrderReducer from "../slice/cartOrderSlice";
import thunkMiddleware from "redux-thunk";

export default configureStore({
  reducer: {
    profile: authReducer,
    blog: blogReducer,
    product:productReducer,
    tournaments:tournamentsReducer,
    image: imageReducer,
    card: cardDataReducer,
    sidebar: sidebarReducer,
    textImage: textToImagReducer,
    textAudio: textToAudioReducer,
    packageSlice: packageReducer,
    packageLimit: limitReducer,
    affiliateStor: affiliateReducer,
    OrderList: orderListReducer,
    TextToCode: codeReducer,
    imageTable: imageTableReducer,
    templateTable: templateTableReducer,
    assistantStore: assistantReducer,
    imageToAudioList: imageToAudioReducer,
    youtubeAnalysis: youTubeSliceReducer,
    textToArticle: textToArticleReducer,
    faqData:faqReducer,
    AllPages:PagesSliceReducer,
    SocialMediaData:SocialMediaReducer,
    myCart:cartOrderReducer,
    middleware: [thunkMiddleware],
  },
});
