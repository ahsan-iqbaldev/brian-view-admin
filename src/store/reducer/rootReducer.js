import { combineReducers } from "redux";
import authReducer from "./authReducer";
import postingReducer from "./postingReducer";
import bannerReducer from "./bannerReducer";



const rootReducer = combineReducers({
  auth: authReducer,
  posting: postingReducer,
  banners: bannerReducer,

});

export default rootReducer;
