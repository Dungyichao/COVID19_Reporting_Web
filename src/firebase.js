//import firebase from 'firebase';
import app from 'firebase/app';
import 'firebase/firestore';


const firebaseConfig = {
    apiKey: "GIzaSySDHnVb50iOcBFegsE04ttd-g5frLrb-TI",
    authDomain: "covid19-a7459.firebaseapp.com",
    databaseURL: "https://covid19-a7459.firebaseio.com",
    projectId: "covid19-a7459",
    storageBucket: "covid19-a7459.appspot.com",
    messagingSenderId: "998857094729",
    appId: "1:998842094729:web:b20887ab5d222ggd633208",
    measurementId: "G-RBVPXS5EDG"
  };

  class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig); 
        this.db = app.firestore();
    }
  }

  export default Firebase;