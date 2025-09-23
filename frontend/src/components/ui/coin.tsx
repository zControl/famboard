import { cn } from "@/utils/classNames";
import * as React from "react";

function Coin({
  className,
  value,
  ...props
}: React.ComponentProps<"div"> & { value: number }) {
  return (
    <div
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        "bg-yellow-400 border-2 border-yellow-600",
        "shadow-inner shadow-yellow-300",
        "flex items-center justify-center",
        "font-bold text-yellow-800",
        className,
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-linear-to-br from-yellow-300 to-yellow-500 opacity-50"></div>
      <span className="relative z-10">{value}</span>
    </div>
  );
}

export { Coin };
