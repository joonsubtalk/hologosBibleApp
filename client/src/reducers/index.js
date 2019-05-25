import { combineReducers } from "redux";

import auth from "./authReducer";
import profile from "./profileReducer";
import read from "./readReducer";
import group from "./groupReducer";

export default combineReducers({
  auth,
  profile,
  read,
  group,
});
