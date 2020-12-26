import React, { useContext, useState, useEffect } from 'react';
import { auth, uiConfig } from '../../firebase';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signUp(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function logOut() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function login(email, password) {
    return auth.signinwithEmailAndPassword(email, password);
  }
  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

 var uiFireBase = <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signUp,
    login,
    logOut,
    resetPassword,
    updateEmail,
    updatePassword,
    uiFireBase,
    
  };

  return (
   
      <AuthContext.Provider value={value}>
        {!loading && children } 
      </AuthContext.Provider>
   
  );
}
