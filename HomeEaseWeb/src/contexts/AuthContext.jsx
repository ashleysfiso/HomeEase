import React, { createContext, useState, useEffect, useContext } from "react";
import axiosInstance from "@/axiosInstance";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await axiosInstance.get("Auth/me");
        setUser(res.data);
      } catch (err) {
        setUser(null);
        setIsLoggedIn(false);
        console.error("Auth error:", err);
      }
    };
    loadUser();
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user from localStorage:", e);
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem("user");
      setIsLoggedIn(false);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}
