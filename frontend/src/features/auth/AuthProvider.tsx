import { apiClient } from "@/api/apiClient";
import { sleep } from "@/common/utils/sleep";
import { AuthContext } from "@/features/auth/AuthContext";
import { User } from "@/features/user/types";
import { useMutation } from "@tanstack/react-query";
import React from "react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const loginMutation = useMutation({
    mutationFn: (credentials: { username: string; password: string }) =>
      apiClient.post<{ accessToken: string; user: User }>(
        "/auth/login",
        credentials,
        undefined, // config
        {
          errorContext: "Authentication mutation function",
          showErrorToast: true,
        },
      ),
    onSuccess: (data) => {
      const { accessToken, user } = data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    },
  });

  const login = React.useCallback(
    async (username: string, password: string) => {
      await sleep(500);
      const result = await loginMutation.mutateAsync({ username, password });
      return result.user; // Return the user object
    },
    [loginMutation],
  );

  const logout = React.useCallback(async () => {
    await sleep(250);
    setUser(null);
    localStorage.removeItem("user");
  }, []);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
