import { FETCH_GROUP_FEED} from "../actions/types";

const initialState = {
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GROUP_FEED:
      return action.payload;
    default:
      return state;
  }
};
