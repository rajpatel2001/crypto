// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDRHL2PWDlakjXy59J6emvpYVPRNDpuBqc",
    authDomain: "cryptowall-b8bcd.firebaseapp.com",
    projectId: "cryptowall-b8bcd",
    storageBucket: "cryptowall-b8bcd.appspot.com",
    messagingSenderId: "622615140056",
    appId: "1:622615140056:web:259f36b51484a8cc07a9ad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;