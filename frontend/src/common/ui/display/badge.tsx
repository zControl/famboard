import { type VariantProps } from "class-variance-authority";
import * as React from "react";

import { badgeVariants } from "@/common/ui/display/badge-variants";
import { cn } from "@/common/utils/classNames";
import { Slot } from "@radix-ui/react-slot";

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge };
