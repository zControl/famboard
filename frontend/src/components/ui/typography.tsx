import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const headingVariants = cva("m-2", {
  variants: {
    color: {
      default: "text-foreground",
      primary: "text-primary",
      secondary: "text-secondary",
      muted: "text-muted-foreground",
      accent: "text-accent-foreground",
    },
  },
  defaultVariants: {
    color: "default",
  },
});

interface HeadingProps extends VariantProps<typeof headingVariants> {
  children: React.ReactNode;
  className?: string;
}

const Header1 = ({ children, className, color }: HeadingProps) => {
  const baseClasses = "font-extrabold text-5xl";
  return (
    <h1 className={cn(baseClasses, headingVariants({ color, className }))}>
      {children}
    </h1>
  );
};

const Header2 = ({ children, className, color }: HeadingProps) => {
  const baseClasses = "font-extrabold text-4xl";
  return (
    <h2 className={cn(baseClasses, headingVariants({ color, className }))}>
      {children}
    </h2>
  );
};

const Header3 = ({ children, className, color }: HeadingProps) => {
  const baseClasses = "font-bold text-3xl";
  return (
    <h3 className={cn(baseClasses, headingVariants({ color, className }))}>
      {children}
    </h3>
  );
};

const Header4 = ({ children, className, color }: HeadingProps) => {
  const baseClasses = "font-semibold text-2xl";
  return (
    <h4 className={cn(baseClasses, headingVariants({ color, className }))}>
      {children}
    </h4>
  );
};

const SectionTitle = ({ children, className, color }: HeadingProps) => {
  const baseClasses = "pt-2 font-semibold leading-none tracking-tight";
  return (
    <div className={cn(baseClasses, headingVariants({ color, className }))}>
      {children}
    </div>
  );
};

const SectionDescription = ({ children, className, color }: HeadingProps) => {
  const baseClasses = "pb-4 text-sm text-muted-foreground";
  return (
    <div className={cn(baseClasses, headingVariants({ color, className }))}>
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
  TextBlock,
};
