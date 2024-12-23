import { AuthContext } from "@/features/auth/AuthContext";
import { createApiClient } from "@/utils/apiClient";
import { sleep } from "@/utils/utils";
import { useMutation } from "@tanstack/react-query";
import React from "react";

enum UserGroup {
  ADMIN = "admin",
  PARENT = "parent",
  KID = "kid",
  GUEST = "guest",
}

export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  isActive: boolean;
  group: UserGroup;
}

const apiClient = createApiClient("http://localhost:3000/v1");

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const loginMutation = useMutation({
    mutationFn: (credentials: { username: string; password: string }) =>
      apiClient.post<{ accessToken: string; user: User }>(
        "/auth/login",
        credentials,
      ),
    onSuccess: (data) => {
      const { accessToken, user } = data;
      console.log("Access token:", accessToken);
      console.log("User:", user);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    },
    onError: (error) => {
      console.error("Login error:", error);
      // Handle login error (e.g., show an error message to the user)
    },
  });

  const login = React.useCallback(
    async (username: string, password: string) => {
      await sleep(500);
      await loginMutation.mutateAsync({ username, password });
    },
    [loginMutation],
  );

  const logout = React.useCallback(async () => {
    await sleep(250);
    console.log("Logging out...");
    setUser(null);
    localStorage.removeItem("user");
  }, []);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
