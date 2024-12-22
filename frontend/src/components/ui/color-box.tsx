import { cn } from "@/lib/utils";

interface colorBoxProps {
  bgColor: string;
  label: string;
  textColor: string;
}
const ColorBox = ({ label, bgColor, textColor }: colorBoxProps) => {
  return (
    <div
      className={cn(
        "h-12 px-4 flex items-center justify-center text-lg font-semibold",
        bgColor,
        textColor,
      )}
    >
      {label}
    </div>
  );
};

export { ColorBox };
