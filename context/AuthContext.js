import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import app from "../firebase";
import { navigationRef } from "../navigation/RootNavigation";
import api from "../services/api/axiosInstance";
import { getFirebaseToken } from "../services/firebase/firebaseServices";

const auth = getAuth(app);

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {      
      if (!currentUser) {
        setIsAuthenticated(false);
        navigationRef.current?.navigate("Login");
        return;
      }
  
      await currentUser.reload(); // 🔹 Ensure Firebase updates user info
      const updatedUser = getAuth().currentUser; // Get fresh user data
  

  
      if (!updatedUser.emailVerified) {
        console.log("Email not verified. Redirecting to login.");
        setIsAuthenticated(false);
        setUser(null);
        return;
      }
  
      const token = await getFirebaseToken();
      if (!token) {
        console.log("No token found. Redirecting to login.");
        setIsAuthenticated(false);
        navigationRef.current?.navigate("Login");
        return;
      }
  
      try {
        const response = await api.post(
          "/api/auth/validate-UserToken",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
  
        if (response.status === 200) {
          setIsAuthenticated(true);
          setUser(updatedUser); 
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    });
  
    return () => unsubscribe();
  }, []);
  
  
  

  return (
    <AuthContext.Provider value={{ setUser,user, auth, isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
