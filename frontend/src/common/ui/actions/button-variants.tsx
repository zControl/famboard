import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "border border-accent text-card-foreground hover:bg-accent",
        primary:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        warning: "bg-warning text-warning-foreground hover:bg-warning/80",
        highlight: "hover:bg-highlight/60",
        destructive:
          "bg-destructive/60 text-destructive-foreground hover:bg-destructive",
        outline:
          "border border-ring bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:text-highlight",
      },
      size: {
        default: "h-9 px-4 py-2",
        tight: "p-0",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        huge: "h-20 rounded-mx px-12",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export { buttonVariants };
