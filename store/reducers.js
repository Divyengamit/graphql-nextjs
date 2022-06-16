import { combineReducers } from "redux";

// import authReducer from "./auth";
import authReducer from "./auth/loginSlice";
import dashboard from "./dashboardSlice";
const reducer = combineReducers({
  auth: authReducer,
  dashboard,
});
export default reducer;
