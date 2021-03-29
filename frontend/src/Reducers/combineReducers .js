import { combineReducers } from "redux";
import HomeReducer from "./homeReducers";
import ListReducer from "./listReducer";
import details from "./detailsReducers";
import logindata from "./loginSignupProfileReducers";
import orders from "./ordersReducers";
import SearchReducer from "./searchReducer";
import SellerReducer from "./sellerReducer";
import SellerUserslogindata from "./sellerLoginRegisterReducer" 

const reducer = combineReducers({
  HomeReducer,
  ListReducer,
  details,
  logindata,
  orders,
  SellerReducer,
  SearchReducer,
  SellerUserslogindata
});

export default reducer;
