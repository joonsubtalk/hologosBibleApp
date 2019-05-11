import { todosRef, authRef, googleProvider, facebookProvider } from "../configs/fire";
import { FETCH_TODOS, FETCH_USER } from "./types";
import { GOOGLE, FACEBOOK } from '../configs/constants';

export const addToDo = (newToDo, uid) => async dispatch => {
  todosRef
    .child(uid)
    .push()
    .set(newToDo);
};

export const completeToDo = (completeToDoId, uid) => async dispatch => {
  todosRef
    .child(uid)
    .child(completeToDoId)
    .remove();
};

export const fetchToDos = uid => async dispatch => {
  todosRef.child(uid).on("value", snapshot => {
    dispatch({
      type: FETCH_TODOS,
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
