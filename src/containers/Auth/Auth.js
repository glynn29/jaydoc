import React, {createContext, useEffect, useState} from "react";
import firebase from "../../firebase"
import * as admin from 'firebase-admin';


export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(setCurrentUser);
    }, []);

    return (
        <AuthContext.Provider
            value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    );
};
