import { createContext } from "react";

export interface AuthContextType {
  token: string | null;
  login: (token: string, remember: boolean) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
