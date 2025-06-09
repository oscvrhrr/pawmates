import React, { createContext, useState, useEffect } from "react";


interface IAuthContext {
  isAuthenticated: boolean, 
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
}


// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<IAuthContext>({ isAuthenticated: false, setIsAuthenticated: () => {} });



export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
     localStorage.getItem("authenticated") === "true"
  );

  useEffect(() => {
    localStorage.setItem("authenticated", isAuthenticated.toString());
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}