import { combineReducers } from "redux";
import authReducer from "./auth/loginSlice";
import dashboard from "./dashboardSlice";
import register from "./Slice/registerSlice";
import equipment from "./Slice/equipmentSlice";
const reducer = combineReducers({
  auth: authReducer,
  dashboard,
  register,
  equipment,
});
export default reducer;
