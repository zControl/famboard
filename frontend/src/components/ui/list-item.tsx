import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { DetailListItemProps } from "@/types/common";
import React from "react";

export const DetailListItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & DetailListItemProps
>(({ className, icon, label, value }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-row items-center py-4 px-8 justify-between",
      className,
    )}
  >
    <div className="flex flex-row items-center space-x-2">
      <div>{icon}</div>
      <div>{label}</div>
    </div>
    <div className="ml-2 text-sm">
      <Badge variant="success">{value}</Badge>
    </div>
  </div>
));

DetailListItem.displayName = "DetailListItem";
