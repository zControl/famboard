import { cn } from "@/common/utils/classNames";
import React from "react";

interface CardSectionProps {
  children: React.ReactNode;
  label?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const CardSection = ({
  label,
  children,
  icon,
  className,
}: CardSectionProps) => {
  return (
    <section className={cn("space-y-2", className)}>
      <div className="flex items-center">
        {icon && <span className="inline mr-2">{icon}</span>}
        <label>{label}</label>
      </div>
      <article className="border border-accent p-4">{children}</article>
    </section>
  );
};
