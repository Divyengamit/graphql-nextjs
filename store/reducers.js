import { combineReducers } from "redux";
import authReducer from "./auth/loginSlice";
import dashboard from "./dashboardSlice";
import register from "./Slice/registerSlice";
import equipment from "./Slice/equipmentSlice";
import profile from "./Slice/profileSlice";
import companyRegister from "./Slice/companySignupSlice";

const reducer = combineReducers({
  auth: authReducer,
  dashboard,
  register,
  equipment,
  profile,
  companyRegister,
});
export default reducer;
