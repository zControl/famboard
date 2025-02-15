import { cva } from "class-variance-authority";

const badgeVariants = cva(
  "cursor-default inline-flex items-center rounded-full border border-4 px-3 py-1 text-xs font-medium font-mono text-spacing-smtransition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-background text-foreground shadow",
        primary: "border-blue-200 bg-blue-100 text-blue-800",
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
