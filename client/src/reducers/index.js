import { combineReducers } from "redux";

import auth from "./authReducer";
import profile from "./profileReducer";
import read from "./readReducer";

export default combineReducers({
  auth,
  profile,
  read,
});
