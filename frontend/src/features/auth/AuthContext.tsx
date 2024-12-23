import React from "react";
import { User } from "./AuthProvider";

export interface AuthContext {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = React.createContext<AuthContext | null>(null);