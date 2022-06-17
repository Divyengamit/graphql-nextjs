import { combineReducers } from "redux";
import authReducer from "./auth/loginSlice";
import dashboard from "./dashboardSlice";
import register from "./Slice/registerSlice";
const reducer = combineReducers({
  auth: authReducer,
  dashboard,
  register,
});
export default reducer;
