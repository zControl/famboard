import { cn } from "@/common/utils/classNames";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const typographyVariants = cva("m-2", {
  variants: {
    color: {
      default: "text-foreground",
      primary: "text-primary",
      secondary: "text-secondary",
      muted: "text-muted-foreground",
      accent: "text-accent-foreground",
      highlight: "text-highlight-foreground",
      chart1: "text-chart-1",
      chart2: "text-chart-2",
      chart3: "text-chart-3",
      chart4: "text-chart-4",
      chart5: "text-chart-5",
      gradient:
        "bg-linear-to-r from-primary to-secondary text-transparent bg-clip-text",
    },
  },
  defaultVariants: {
    color: "default",
  },
});

interface TypographyProps extends VariantProps<typeof typographyVariants> {
  children: React.ReactNode;
  className?: string;
}

const Header1 = ({ children, className, color }: TypographyProps) => {
  const baseClasses = "font-extrabold text-5xl";
  return (
    <h1 className={cn(baseClasses, typographyVariants({ color, className }))}>
      {children}
    </h1>
  );
};

const Header2 = ({ children, className, color }: TypographyProps) => {
  const baseClasses = "font-extrabold text-4xl";
  return (
    <h2 className={cn(baseClasses, typographyVariants({ color, className }))}>
      {children}
    </h2>
  );
};

const Header3 = ({ children, className, color }: TypographyProps) => {
  const baseClasses = "font-bold text-3xl";
  return (
    <h3 className={cn(baseClasses, typographyVariants({ color, className }))}>
      {children}
    </h3>
  );
};

const Header4 = ({ children, className, color }: TypographyProps) => {
  const baseClasses = "font-semibold text-2xl";
  return (
    <h4 className={cn(baseClasses, typographyVariants({ color, className }))}>
      {children}
    </h4>
  );
};

const SectionTitle = ({ children, className, color }: TypographyProps) => {
  const baseClasses = "pt-2 font-semibold leading-none tracking-tight";
  return (
    <div className={cn(baseClasses, typographyVariants({ color, className }))}>
      {children}
    </div>
  );
};

const SectionDescription = ({
  children,
  className,
  color,
}: TypographyProps) => {
  const baseClasses = "pb-4 text-sm text-muted-foreground";
  return (
    <div className={cn(baseClasses, typographyVariants({ color, className }))}>
      {children}
    </div>
  );
};

const StatLabel = ({ children, className, color }: TypographyProps) => {
  const baseClasses = "text-xl font-bold text-muted-foreground";
  return (
    <div className={cn(baseClasses, typographyVariants({ color, className }))}>
      {children}
    </div>
  );
};

const StatValue = ({ children, className, color }: TypographyProps) => {
  const baseClasses = "text-lg font-medium tracking-tight text-foreground";
  return (
    <div className={cn(baseClasses, typographyVariants({ color, className }))}>
      {children}
    </div>
  );
};

type LinkTextProps = {
  children: React.ReactNode;
  className?: string;
};

const LinkText = ({ children, className }: LinkTextProps) => {
  const baseClasses = "hover:underline hover:tracking-wide";
  return <span className={cn(baseClasses, className)}>{children}</span>;
};

type ParagraphProps = {
  children: React.ReactNode;
  className?: string;
};

const Paragraph = ({ children, className }: ParagraphProps) => {
  const baseClasses =
    "mx-2 mt-2 text-lg text-left rtl:text-right text-foreground";
  return <p className={cn(baseClasses, className)}>{children}</p>;
};

const BlockQuote = ({ children, className }: ParagraphProps) => {
  const baseClasses =
    "p-4 my-4 border-s-4 border bg-accent/80 text-accent-foreground max-w-2xl flex text-left overflow-auto items-center";
  return (
    <blockquote className={cn(baseClasses, className)}>{children}</blockquote>
  );
};

const TextBlock = ({ children, className }: ParagraphProps) => {
  const baseClasses =
    "p-4 m-2 border-2 border max-w-2xl text-center rounded-lg bg-accent";
  return (
    <div className="flex justify-around w-full">
      <p className={cn(baseClasses, className)}>{children}</p>
    </div>
  );
};

export {
  BlockQuote,
  Header1,
  Header2,
  Header3,
  Header4,
  LinkText,
  Paragraph,
  SectionDescription,
  SectionTitle,
  StatLabel,
  StatValue,
  TextBlock,
};
