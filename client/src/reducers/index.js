import { combineReducers } from "redux";

import auth from "./authReducer";
import read from "./readReducer";

export default combineReducers({
  auth,
  read,
});
