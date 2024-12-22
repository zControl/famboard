import { cva } from "class-variance-authority";

const badgeVariants = cva(
  "cursor-default inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-background text-foreground shadow",
        primary: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow",
        warning: "border-transparent bg-warning text-warning-foreground shadow",
        highlight:
          "border-transparent bg-highlight text-highlight-foreground shadow",
        success: "border-transparent bg-green-500 text-white shadow",
        info: "border-transparent bg-blue-500 text-white shadow",
        error: "border-transparent bg-red-500 text-white shadow",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export { badgeVariants };
