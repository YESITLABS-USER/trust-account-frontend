import React, { createContext, useContext, useEffect, useState } from "react";

// Create Context
const SidebarContext = createContext();

// Context Provider Component
export const SidebarProvider = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLogedinData, setIsLogedinData] = useState();
  
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("trust-account"))?.token;
    if (token) {
      const userData = { id: 1, role: "admin" };
      setUser(userData);
    }
  }, []);
  return (
    <SidebarContext.Provider value={{ isSidebarOpen, setSidebarOpen, user, setUser, isLogedinData, setIsLogedinData }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Custom hook to access the auth context
export const useAuth = () => {
  return useContext(SidebarContext);
};