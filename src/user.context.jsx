import { createContext, useEffect, useState } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "./utils/firebase/firebase.utils";
//acutal value that you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

//actual component that you get that contains the infor
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };
    
    useEffect(
        ()=>{
           const unsubscribe = onAuthStateChangedListener((user) =>{
            if(user){
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
           });
            return unsubscribe;
        },[]);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

