import { cn } from "@/utils/classNames";

interface ColumnTitleProps {
  title: string;
  className?: string;
}

export const ColumnTitle = ({ title, className }: ColumnTitleProps) => {
  return (
    <div className={cn("font-semibold px-2 underline", className)}>{title}</div>
  );
};
