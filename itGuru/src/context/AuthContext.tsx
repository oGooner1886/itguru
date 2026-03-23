import { useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContextInstance";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => {
    const saved =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    return saved;
  });

  const login = (newToken: string, remember: boolean) => {
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
