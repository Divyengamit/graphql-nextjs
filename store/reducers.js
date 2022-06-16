import { combineReducers } from "redux";

import authReducer from "./auth/loginSlice";
import register from "./Slice/registerSlice";

const reducer = combineReducers({
  auth: authReducer,
  register,
});
export default reducer;
