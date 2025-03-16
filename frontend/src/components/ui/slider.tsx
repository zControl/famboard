import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";

import { cn } from "@/lib/utils";

interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  indicator?: React.ReactNode | ((value: number) => React.ReactNode);
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(
  (
    {
      className,
      defaultValue,
      value: controlledValue,
      onValueChange,
      indicator,
      ...props
    },
    ref,
  ) => {
    const [localValue, setLocalValue] = React.useState(defaultValue || [0]);

    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : localValue;

    const handleValueChange = React.useCallback(
      (newValue: number[]) => {
        if (!isControlled) {
          setLocalValue(newValue);
        }
        onValueChange?.(newValue);
      },
      [isControlled, onValueChange],
    );

    const renderIndicator = () => {
      if (indicator) {
        if (typeof indicator === "function") {
          return indicator(currentValue[0]);
        }
        return indicator;
      }
      return (
        <div className="flex h-full w-full items-center justify-center text-sm font-medium">
          {currentValue[0]}
        </div>
      );
    };

    return (
      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className,
        )}
        value={currentValue}
        onValueChange={handleValueChange}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="block rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
          <div className="flex h-full w-full items-center justify-center text-sm font-medium">
            {renderIndicator()}
          </div>
        </SliderPrimitive.Thumb>
      </SliderPrimitive.Root>
    );
  },
);
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
