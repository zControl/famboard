import { cn } from "@/common/utils/classNames";

interface ColumnTitleProps {
  title: string;
  className?: string;
}

export const ColumnTitle = ({ title, className }: ColumnTitleProps) => {
  return <div className={cn("font-semibold px-2", className)}>{title}</div>;
};
