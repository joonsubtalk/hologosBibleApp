import { combineReducers } from "redux";

import auth from "./authReducer";
import profile from "./profileReducer";
import read from "./readReducer";
import group from "./groupReducer";
import book from "./bookReducer";

export default combineReducers({
  auth,
  profile,
  read,
  book,
  group,
});
