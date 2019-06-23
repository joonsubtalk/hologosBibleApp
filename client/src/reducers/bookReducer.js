import { BOOK_COMPLETE } from "../actions/types";

const initialState = {
}

export default (state = initialState, action) => {
  switch (action.type) {
    case BOOK_COMPLETE:
      return action.payload;
    default:
      return state;
  }
};
