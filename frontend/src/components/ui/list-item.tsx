import { Badge } from "@/components/ui/badge";
import { DetailListItemProps } from "@/types/common";
import { cn } from "@/utils/classNames";
import React from "react";

function DetailListItem({
  className,
  icon,
  label,
  value,
  ...props
}: React.ComponentProps<"div"> & DetailListItemProps) {
  return (
    <div
      {...props}
      className={cn(
        "flex flex-row items-center py-4 px-6 justify-between rounded-lg transition-all",
        "bg-background border border-border shadow-xs",
        className,
      )}
    >
      <div className="flex flex-row items-center space-x-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-highlight/10">
          {React.cloneElement(icon as React.ReactElement, {
            className: "w-5 h-5 text-highlight",
          })}
        </div>
        <div className="flex flex-col">
          <div className="text-lg font-medium text-foreground">{label}</div>
        </div>
      </div>
      <div className="ml-2 text-md">
        <Badge
          variant="highlight"
          className="ml-2 px-2 py-0.5 text-sm font-normal"
        >
          {value}
        </Badge>
      </div>
    </div>
  );
}

export { DetailListItem };
