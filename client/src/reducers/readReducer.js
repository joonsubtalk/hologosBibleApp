import { FETCH_BOOK_CHAPTER_READ } from "../actions/types";

const initialState = {
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOK_CHAPTER_READ:
      return action.payload;
    default:
      return state;
  }
};
