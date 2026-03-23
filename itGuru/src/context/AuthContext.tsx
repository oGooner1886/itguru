import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
  token: string | null;
  login: (token: string, remember: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState(
    localStorage.getItem("token") || sessionStorage.getItem("token"),
  );

  const login = (newToken: string, remember: boolean) => {
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem("token", newToken);
    setToken(newToken);
  };

  return (
    <AuthContext.Provider value={{ token, login }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
