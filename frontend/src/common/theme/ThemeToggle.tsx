import { useTheme } from "@/common/theme/useTheme";
import { Button } from "@/common/ui/actions/button";
import { MoonIcon, SunIcon } from "lucide-react";

export const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();

  return (
    <>
      {theme === "light" ? (
        <Button size="icon" variant="ghost" onClick={() => setTheme("dark")}>
          <MoonIcon />
        </Button>
      ) : (
        <Button size="icon" variant="ghost" onClick={() => setTheme("light")}>
          <SunIcon />
        </Button>
      )}
    </>
  );
};
