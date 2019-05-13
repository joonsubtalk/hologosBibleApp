// import * as firebase from "firebase";

import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';

const config = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "hologosapp.firebaseapp.com",
  databaseURL: "https://hologosapp.firebaseio.com",
  projectId: "hologosapp",
  storageBucket: "hologosapp.appspot.com",
  messagingSenderId: "740616619070",
  appId: "1:740616619070:web:f75de5e454d4815d"
};

firebase.initializeApp(config);

const databaseRef = firebase.database().ref();
export const readRef = databaseRef.child("read");
export const authRef = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
