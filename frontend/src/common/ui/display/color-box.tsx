import { useTheme } from "@/common/theme/useTheme";
import { CopyButton } from "@/common/ui/actions/copy-button";
import { cn } from "@/common/utils/classNames";
import { useEffect, useState } from "react";

interface colorBoxProps {
  bgColor: string;
  label: string;
  textColor: string;
}
const ColorBox = ({ label, bgColor, textColor }: colorBoxProps) => {
  const [oklchValue, setOklchValue] = useState("");
  const { theme } = useTheme(); // Get the current theme

  useEffect(() => {
    const updateOklchValue = () => {
      // Extract the color name from the bgColor class (e.g., "bg-sidebar-accent" -> "sidebar-accent")
      const colorName = bgColor.replace(/^bg-/, "");

      // Get the CSS variable value
      const cssVarName = `--${colorName}`;
      const computedStyle = getComputedStyle(document.documentElement);
      const colorValue = computedStyle.getPropertyValue(cssVarName).trim();

      if (colorValue) {
        setOklchValue(colorValue);
      } else {
        setOklchValue("N/A");
      }
    };

    // Update immediately
    updateOklchValue();

    // Catch theme changes applied to the HTML element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          updateOklchValue();
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });

    // Clean up the observer when component unmounts
    return () => observer.disconnect();
  }, [bgColor, theme]);

  return (
    <div className={cn("h-16", bgColor)}>
      <div className="h-full flex flex-col items-center justify-center">
        <div className={cn("font-semibold text-center text-lg", textColor)}>
          {label}
        </div>
        <div className={cn("text-xs -mt-3", textColor)}>
          <div className="flex items-center justify-center p-0">
            {oklchValue}
            <CopyButton content={oklchValue} />
          </div>
        </div>
      </div>
    </div>
  );
};

export { ColorBox };
