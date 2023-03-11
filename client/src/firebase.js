import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDbdrYS0TH5bzQxhLjHiq2Cgvbfk77E6Ao",
  authDomain: "imagegallery-c1f6d.firebaseapp.com",
  projectId: "imagegallery-c1f6d",
  storageBucket: "imagegallery-c1f6d.appspot.com",
  messagingSenderId: "771235861720",
  appId: "1:771235861720:web:3b52f923790dd8d81433ad",
  measurementId: "G-2CG1TMLNPJ"
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export default storage;
