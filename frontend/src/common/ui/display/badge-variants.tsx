import { cva } from "class-variance-authority";

const badgeVariants = cva(
  "cursor-default inline-flex items-center rounded-full border border-2 px-6 shadow-md text-foreground",
  {
    variants: {
      variant: {
        default: "border-accent bg-transparent",
        primary: "bg-primary/30 border-primary/90",
        secondary: "bg-secondary/30 border-secondary/90",
        destructive: "bg-destructive/30 border-destructive/90",
        warning: "bg-warning/30 border-warning/90",
        highlight: "bg-highlight/30 border-highlight/90",
        success: "bg-chart-2/30 border-chart-2/90",
        info: "bg-blue-200 border-blue-600 text-black",
        error: "bg-red-200 border-red-600 text-black",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export { badgeVariants };
