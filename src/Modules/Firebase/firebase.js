import { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { firebaseConfig } from "./firebase.config";

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export const getCollection = path => db.collection(path);

export const getDocData = (path, docId) =>
  getCollection(path)
    .doc(docId)
    .get()
    .then(doc => doc.data());

export const getDocsAndSubscribeOnChanges = (path, callback, orderBy) => {
  const collection = orderBy
    ? getCollection(path).orderBy(orderBy)
    : getCollection(path);
  return collection.onSnapshot(snapshot => callback(snapshot.docs));
};

export const signUp = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return await firebase.auth().signInWithPopup(provider);
};

export const logOut = () => firebase.auth().signOut();

export const getCurrentUser = async () => {
  const { currentUser } = await firebase.auth();
  return currentUser;
};

export const subscribeOnAuth = callback => {
  firebase.auth().onAuthStateChanged(result => {
    if (result) {
      getCollection("users")
        .doc(result.uid)
        .set({ displayName: result.displayName, photoURL: result.photoURL });
    }

    callback(result);
  });
};

export const sendMessage = (user, channelName, text) =>
  getCollection(`channels/${channelName}/messages`).add({
    user: getCollection("users").doc(user.uid),
    text,
    createdAt: new Date()
  });
