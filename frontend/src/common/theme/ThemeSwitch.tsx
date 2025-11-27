import { useTheme } from "@/common/theme/useTheme";
import { Switch } from "@/common/ui/fields/switch";
import { Paragraph } from "@/common/ui/typography/typography";
import { MoonIcon, SunIcon } from "lucide-react";

export const ThemeSwitch = () => {
  const { setTheme, theme } = useTheme();

  return (
    <>
      <Paragraph className="text-center mb-2 underline">Theme</Paragraph>
      <div className="w-full flex items-center justify-center space-x-8">
        <SunIcon className="size-8" />
        <Switch
          aria-label="Toggle theme"
          checked={theme === "dark"}
          onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        />
        <MoonIcon className="size-8" />
      </div>
    </>
  );
};
