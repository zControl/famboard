import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/common/utils/classNames";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      color: {
        default: "text-foreground",
        primary: "text-primary",
        secondary: "text-secondary",
        destructive: "text-destructive",
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-lg",
        xl: "text-xl",
      },
      fontStyle: {
        normal: "font-normal",
        italic: "italic",
      },
      justify: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
    },
    defaultVariants: {
      color: "default",
      size: "md",
      fontStyle: "normal",
      justify: "left",
    },
  },
);

function Label({
  color,
  size,
  fontStyle,
  justify,
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root> &
  VariantProps<typeof labelVariants>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        labelVariants({ color, size, fontStyle, justify }),
        className,
      )}
      {...props}
    />
  );
}

export { Label };
