import React, { useState, useEffect } from "react";
import firebase from "../firebase";

const useAuth = () => {
  const [authUser, setAuthUser] = useState("none");

  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged((user) => {
      console.log('user change: ', user);
      localStorage.removeItem("notVerified");
      if (user && user.emailVerified) {
        setAuthUser(user);
      } else {
        user && !user.emailVerified && localStorage.setItem("notVerified", true);
        if(user && !localStorage.getItem('firstTimeReg')){
          firebase.logout()
        }
        localStorage.removeItem("firstTimeReg");
        setAuthUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return authUser;
};

export default useAuth;
