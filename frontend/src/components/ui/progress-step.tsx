import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as React from "react";

import { cn } from "@/lib/utils";

interface ProgressStepProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  stepSize?: number;
}

const ProgressStep = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressStepProps
>(({ className, value, stepSize = 10, ...props }, ref) => {
  const steps = Array.from({ length: 11 }, (_, i) => i * (stepSize || 10));

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden  bg-primary/20",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 bg-primary transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
      {steps.map((step) => (
        <div
          key={step}
          className="absolute top-0 h-full w-2 bg-background"
          style={{ left: `${step}%` }}
        />
      ))}
    </ProgressPrimitive.Root>
  );
});
ProgressStep.displayName = ProgressPrimitive.Root.displayName;

export { ProgressStep };
