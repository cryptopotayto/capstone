import { createContext, useState } from "react";

//acutal value that you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

//actual component that you get that contains the infor
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

