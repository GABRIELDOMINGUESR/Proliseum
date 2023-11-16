import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage" 



const firebaseConfig = {
  apiKey: "AIzaSyDH4QtYgIQdOssGDm_3ctHQS7AGeaV32gs",
  authDomain: "proliseum-f06a1.firebaseapp.com",
  projectId: "proliseum-f06a1",
  storageBucket: "proliseum-f06a1.appspot.com",
  messagingSenderId: "204060115325",
  appId: "1:204060115325:web:66ac831458a39016e8cc14",
  measurementId: "G-665KFZBV77"
};

const app = initializeApp(firebaseConfig)


export default getStorage(app)