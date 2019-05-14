import { FETCH_USER_PROFILE } from "../actions/types";

const initialState = {
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_PROFILE:
      return action.payload;
    default:
      return state;
  }
};
