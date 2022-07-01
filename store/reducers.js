import { combineReducers } from "redux";
import authReducer from "./auth/loginSlice";
import dashboard from "./dashboardSlice";
import register from "./Slice/registerSlice";
import equipment from "./Slice/equipmentSlice";
import profile from "./Slice/profileSlice";
import admin from "./Slice/adminSlice";

const reducer = combineReducers({
  auth: authReducer,
  dashboard,
  register,
  equipment,
  profile,
  admin,
});
export default reducer;
