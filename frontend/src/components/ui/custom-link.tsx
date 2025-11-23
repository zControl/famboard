import { cn } from "@/common/utils/classNames";
import { createLink } from "@tanstack/react-router";
import * as React from "react";

interface BasicLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  size?: "default" | "sm" | "lg" | "huge";
  hoverColor?: "default" | "primary" | "secondary";
  inline?: boolean;
}

function BasicLinkComponent({
  size = "default",
  inline = false,
  hoverColor = "default",
  className,
  ...props
}: BasicLinkProps) {
  const textSizeClass = {
    default: "text-base",
    sm: "text-xs",
    lg: "text-lg",
    huge: "text-3xl",
  }[size];

  const hoverColorClass = {
    default: "hover:text-highlight",
    primary: "hover:text-primary",
    secondary: "hover:text-secondary",
  }[hoverColor];

  const combined = cn(
    textSizeClass,
    hoverColorClass,
    "hover:tracking-wide",
    inline
      ? "text-primary hover:tracking-wide text-lg hover:tracking-normal hover:underline"
      : "px-2",
    className,
  );

  return <a {...props} className={combined} />;
}

const CreatedLinkComponent = createLink(BasicLinkComponent);

export function CustomLink(
  props: React.ComponentProps<typeof CreatedLinkComponent>,
) {
  const { size, ...rest } = props;
  return <CreatedLinkComponent preload="intent" size={size} {...rest} />;
}
