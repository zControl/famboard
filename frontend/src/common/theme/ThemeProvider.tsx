import { Theme, ThemeProviderContext } from "@/common/theme/ThemeContext";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useProfile } from "@/features/user/hooks/useProfile";
import { useEffect, useMemo } from "react";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
};

const DEFAULT_THEME = "system";

export const ThemeProvider = ({
  children,
  defaultTheme = DEFAULT_THEME,
  ...props
}: ThemeProviderProps) => {
  const { user } = useAuth();
  const { profile, updateProfileMutation } = useProfile();

  const theme = profile?.theme || defaultTheme;

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme: theme as Theme,
      setTheme: (newTheme: Theme) => {
        if (user && profile) {
          updateProfileMutation.mutate(
            { theme: newTheme },
            {
              onSuccess: () => {
                console.log("Theme updated");
              },
              onError: () => {
                console.error("Failed to update theme");
              },
            },
          );
        }
      },
    }),
    [theme, user, profile, updateProfileMutation],
  );

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
};
