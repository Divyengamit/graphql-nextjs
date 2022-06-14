import { combineReducers } from "redux";

// import authReducer from "./auth";
import authReducer from "./auth/loginSlice";
const reducer = combineReducers({
  auth: authReducer,
});
export default reducer;
