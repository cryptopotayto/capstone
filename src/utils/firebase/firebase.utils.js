import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider, 
    signInWithRedirect, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc  } from 'firebase/firestore';
// doc gets the doc, getdoc gets doc data, setdoc sets doc data


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
  //initialize provider with google
  //you can have different providers ie discord, github, etc 
  const provider = new GoogleAuthProvider();
  //set login in paramaters
  provider.setCustomParameters({
    prompt: 'select_account'

  })
  //create auth method (shouldn't change)
  export const auth = getAuth();
  //create method that you leverage in the application to utilize auth functions
  export const signInwithGooglePopup = () => signInWithPopup(auth, provider);
  export const signInwithGoogleRedirect =  () =>  signInWithRedirect(auth, provider);
 
  //create db link
 
  export const db = getFirestore();
  
  //create async call that stores login info
  //take information we are getting from auth service and store in fs
  
  export const createUserDocumentFromAuth = async (userAuth, additionalInfo={}) => {
    if(!userAuth) return;
    //doc method which is checking if document exists
    //takes args database, collection name, and then document ID
    //function will be passed user object, check for google UID
    
    const userDocRef = doc(db, 'users', userAuth.uid);
    
    //snapshot uses get doc to see what data exists at the location pointed at by userdocref
    
    const userSnapshot = await getDoc(userDocRef);
    
    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo
            });
        } catch (error) {
            alert(error);
        }

    }
    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => signOut(auth);