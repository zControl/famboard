import { User } from "@/features/user/types";
import React from "react";

export interface AuthContext {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
}

export const AuthContext = React.createContext<AuthContext | null>(null);
