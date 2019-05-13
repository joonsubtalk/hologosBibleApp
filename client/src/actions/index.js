import { readRef, authRef, googleProvider, facebookProvider } from "../configs/fire";
import {
  FETCH_USER,
  FETCH_BOOK_CHAPTER_READ,
} from "./types";
import { GOOGLE, FACEBOOK } from '../configs/constants';

/* Read */
export const upsertChapterRead = (newRead, book, chapter, uid) => async dispatch => {
  readRef
    .child(uid)
    .child(book)
    .child(chapter)
    .update(newRead);
};

export const removeChapterRead = (book, chapter, uid) => async dispatch => {
  readRef
    .child(uid)
    .child(book)
    .child(chapter)
    .remove();
};

export const fetchBookChapterRead = (uid) => async dispatch => {
  readRef.child(uid).on("value", snapshot => {
    dispatch({
      type: FETCH_BOOK_CHAPTER_READ,
      payload: snapshot.val()
    });
  });
};

export const fetchUser = () => dispatch => {
  authRef.onAuthStateChanged(user => {
    if (user) {
      dispatch({
        type: FETCH_USER,
        payload: user
      });
    } else {
      dispatch({
        type: FETCH_USER,
        payload: null
      });
    }
  });
};

export const signIn = (provider) => dispatch => {
  const providerStrategy = (provider === FACEBOOK)
    ? facebookProvider
    : (provider === GOOGLE)
      ? googleProvider
      : googleProvider; //todo

  authRef
    .signInWithPopup(providerStrategy)
    .then(result => {})
    .catch(error => {
      console.log(error);
    });
};

export const signOut = () => dispatch => {
  authRef
    .signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch(error => {
      console.log(error);
    });
};
