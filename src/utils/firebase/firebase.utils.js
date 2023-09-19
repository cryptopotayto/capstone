import { initializeApp } from 'firebase/app';
import { getAuth, signInwithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDwvoJW-J-6o30epdMIz3GBMLnAZbNWwnA",
    authDomain: "port-round-3.firebaseapp.com",
    projectId: "port-round-3",
    storageBucket: "port-round-3.appspot.com",
    messagingSenderId: "612218695438",
    appId: "1:612218695438:web:861d99e4e79645ccb7b15f"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: 'select_account'

  })

  export const auth = getAuth();
  export const signInwithGooglePopup = () => signInWithPopup(auth, provider);