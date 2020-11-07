import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAlYX3KNhmcELwOdf6zgOHtgejo330toc0",
  authDomain: "covid19-tracker-8ec22.firebaseapp.com",
  databaseURL: "https://covid19-tracker-8ec22.firebaseio.com",
  projectId: "covid19-tracker-8ec22",
  storageBucket: "covid19-tracker-8ec22.appspot.com",
  messagingSenderId: "257620092495",
  appId: "1:257620092495:web:38713f0df71125e9146c3a",
  measurementId: "G-WZXTSJYHBH",
});

const db = firebaseApp.firestore();

export default db; //mentioning `default` here can allow us to use it in any of our file
