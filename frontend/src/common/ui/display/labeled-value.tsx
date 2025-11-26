import { DetailListItemProps } from "@/common/types";
import { cn } from "@/common/utils/classNames";
import React from "react";

function LabeledValue({
  className,
  title,
  value,
  units,
  ...props
}: React.ComponentProps<"div"> & DetailListItemProps) {
  return (
    <div
      {...props}
      className={cn(
        "flex flex-row items-center justify-between rounded-lg transition-all",
        className,
      )}
    >
      <div className="text-lg font-medium text-foreground">{title}</div>
      <div className="text-lg flex flex-row items-center justify-end">
        {value}
        {units && <div className="ml-2 text-muted-foreground">{units}</div>}
      </div>
    </div>
  );
}

export { LabeledValue };
