import { Column } from "@tanstack/react-table";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronsUpDown,
  EyeOff,
  LucideIcon,
} from "lucide-react";

import { Button } from "@/common/ui/actions/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/common/ui/overlay/dropdown-menu";
import { cn } from "@/common/utils/classNames";

export interface AscDescSortHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  ascIcon?: LucideIcon;
  ascText?: string;
  descIcon?: LucideIcon;
  descText?: string;
}

export const AscDescSortHeader = <TData, TValue>({
  column,
  className,
  ascIcon: AscIcon = ArrowUpIcon,
  ascText = "Asc",
  descIcon: DescIcon = ArrowDownIcon,
  descText = "Desc",
}: AscDescSortHeaderProps<TData, TValue>) => {
  if (!column.getCanSort()) {
    return null;
  }

  return (
    <div className={cn("flex items-center", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="tight">
            {column.getIsSorted() === "desc" ? (
              <DescIcon />
            ) : column.getIsSorted() === "asc" ? (
              <AscIcon />
            ) : (
              <ChevronsUpDown />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <AscIcon />
            {ascText}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <DescIcon />
            {descText}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeOff />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
