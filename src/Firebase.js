/// this is the configuration for the firebase connection

import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: "AIzaSyC2oqcfYvyMeQ1hNndmz4SznDC-RCBC71M",
    authDomain: "react-firebase-fd71f.firebaseapp.com",
    databaseURL: "https://react-firebase-fd71f.firebaseio.com",
    projectId: "react-firebase-fd71f",
    storageBucket: "react-firebase-fd71f.appspot.com",
    messagingSenderId: "637553616332"
  };

firebase.initializeApp(config);
firebase.firestore().settings(settings);

export default firebase;
