import { combineReducers } from "redux";
import CartReducer from "./CartReducer";
import LoginReducer from "./LoginReducer";
import wishListReducer from "./WishListReducer";

const allReducers = combineReducers({
  LoginReducer,
  wishListReducer,
  CartReducer,
});

export default allReducers;
