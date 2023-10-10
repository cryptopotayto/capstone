import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider, 
    signInWithRedirect, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,

} from 'firebase/auth';
import {getFirestore,
        doc,
        getDoc,
        setDoc, 
        collection, 
        writeBatch,
        query,
        getDocs, } from 'firebase/firestore';
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

  //create one-time call to upload category data from front end

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    //locate the folder within the database using collectionKey
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);
    //for each object
    objectsToAdd.forEach((object) => {
        //locate the file within each folder using the title
        const docRef = doc(collectionRef, object.title.toLowerCase());
        //set the data on that page equal to the value of the object
        batch.set(docRef, object);
        console.log('done');
    });

    await batch.commit();
  };

  export const getCategoriesAndDocuments = async () => {
    //step one, get the collection reference (pointing at the correct folder)
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    //snapshot is just checking to see what data exists at a ref point and
    //flashes back a exact copy at the moment it is created
    //think, polaroid picture of the db

    const querySnapshot = await getDocs(q);
    //creates an array of all individual and snapshots inside

    //honestly I don't have a fucking clue the finer mechanics of this
    //at this point I'm just following the docs
    //this method is going to suck up the data from the snapshots and create
    //objects in a structure that I want and is functional to read on the FE
    //its stupid and convuluted but at least its centralized
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const { title, items } = docSnapshot.data(); 
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});

    return categoryMap;
  };

  /*
  object structure 
  {
    categoryTitleInDB: {
        title: refTitle,
        items: [
            {},
            {},
            {}
        ]
    }
  }
  */

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

//returns back whatever you get from onauthstatechanged 
//whenever you instantiate this function you must give it a function
export const onAuthStateChangedListener = (callback) => 
    
    onAuthStateChanged(auth, callback);


