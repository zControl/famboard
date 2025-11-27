import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";

import { cn } from "@/common/utils/classNames";

interface SliderProps
  extends React.ComponentProps<typeof SliderPrimitive.Root> {
  indicator?: React.ReactNode | ((value: number) => React.ReactNode);
}

function Slider({
  className,
  defaultValue,
  value,
  onValueChange,
  min = 0,
  max = 100,
  indicator,
  ...props
}: SliderProps) {
  const [localValue, setLocalValue] = React.useState(defaultValue || [0]);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : localValue;

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
      data-slot="slider"
      defaultValue={defaultValue}
      value={currentValue}
      onValueChange={handleValueChange}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5",
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            "bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
          )}
        />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block rounded-full border border-primary/50 bg-background shadow-sm transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
        <div className="flex h-full w-full items-center justify-center text-sm font-medium">
          {renderIndicator()}
        </div>
      </SliderPrimitive.Thumb>
    </SliderPrimitive.Root>
  );
}

export { Slider };
