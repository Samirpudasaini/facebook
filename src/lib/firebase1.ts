import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, set } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCCPSpcWeTHcnpsHHl36bNEZ5phtYQgW0Q",
  authDomain: "fb123-5c9a4.firebaseapp.com",
  databaseURL: "https://fb123-5c9a4-default-rtdb.firebaseio.com",
  projectId: "fb123-5c9a4",
  storageBucket: "fb123-5c9a4.firebasestorage.app",
  messagingSenderId: "455276233930",
  appId: "1:455276233930:web:1549b12edb83348777a033",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);