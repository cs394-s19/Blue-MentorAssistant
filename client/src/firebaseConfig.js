const firebase = require('firebase');

const config = {
  apiKey: "AIzaSyAXLIxy2pM0M5q8fp8qGRABIyKwgfctaHA",
  authDomain: "mentorsassistant.firebaseapp.com",
  databaseURL: "https://mentorsassistant.firebaseio.com",
  projectId: "mentorsassistant",
  storageBucket: "mentorsassistant.appspot.com",
  messagingSenderId: "630678371857",
  appId: "1:630678371857:web:edbf4bdde9d27806"
};

firebase.initializeApp(config);

export {firebase};
