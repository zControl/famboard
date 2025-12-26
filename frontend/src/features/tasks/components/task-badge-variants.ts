import { cva } from "class-variance-authority";

export const badgeShellVariants = cva(
  "relative flex items-center justify-center shrink-0 overflow-hidden rounded-full bg-highlight/60 border-2 border-highlight/80",
  {
    variants: {
      size: {
        xs: "size-8",
        sm: "size-11",
        md: "size-14",
        lg: "size-20",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const badgeIconVariants = cva("text-highlight-foreground", {
  variants: {
    size: {
      xs: "size-5",
      sm: "size-7",
      md: "size-9",
      lg: "size-14",
    },
  },
  defaultVariants: {
    size: "md",
  },
});