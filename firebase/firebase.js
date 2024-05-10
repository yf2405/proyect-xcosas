
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, uploadBytes, uploadBytesResumable,getDownloadURL } from "firebase/storage";
import {v4} from 'uuid'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBelbpv9d-SdFpiiG1ORHZ2Qh3i_ZizBC4",
  authDomain: "xcosas-f8cbe.firebaseapp.com",
  projectId: "xcosas-f8cbe",
  storageBucket: "xcosas-f8cbe.appspot.com",
  messagingSenderId: "1075337870029",
  appId: "1:1075337870029:web:a18e430241393377b9c784",
  measurementId: "G-CHNKC6MM4K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export function uploadFile(file){
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, v4())
    uploadBytes(storageRef,file).then(snapshot => {
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
            console.log(downloadURL);
          });
        }
      );
    });
  })}