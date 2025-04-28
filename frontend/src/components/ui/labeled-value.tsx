import { Badge } from "@/components/ui/badge";
import { DetailListItemProps } from "@/types/common";
import { cn } from "@/utils/classNames";
import React from "react";

export const LabeledValue = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & DetailListItemProps
>(({ className, label, value, units }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-row items-center px-6 py-2 justify-between rounded-lg transition-all",
      className,
    )}
  >
    <div className="flex flex-row items-center justify-between">
      <div className="text-lg font-medium text-foreground">{label}</div>
    </div>
    <div className="text-md flex flex-row items-center justify-end">
      <Badge className="text-lg font-normal rounded-lg">
        {value}
        {units && <div className="ml-2 text-muted-foreground">{units}</div>}
      </Badge>
    </div>
  </div>
));

LabeledValue.displayName = "LabeledValue";
