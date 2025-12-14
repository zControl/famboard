import { Button } from "@/common/ui/actions/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/common/ui/feedback/tooltip";
import { Column } from "@tanstack/react-table";
import {
  CheckCircleIcon,
  ClockIcon,
  FilterXIcon,
  LucideIcon,
  XCircleIcon,
} from "lucide-react";

interface ApprovalStatusFilterButtonsProps<TData> {
  column: Column<TData, unknown>;
}

interface FilterButtonConfig {
  status: string;
  icon: LucideIcon;
  className: string;
}

export function ApprovalStatusFilterButtons<TData>({
  column,
}: ApprovalStatusFilterButtonsProps<TData>) {
  const setFilter = (status: string) => {
    column.setFilterValue(status);
  };

  const clearFilter = () => {
    column.setFilterValue(undefined);
  };

  const currentFilter = column.getFilterValue() as string | undefined;
  const hasActiveFilter = currentFilter !== undefined;

  const filterButtons: FilterButtonConfig[] = [
    {
      status: "APPROVED",
      icon: CheckCircleIcon,
      className: "text-secondary",
    },
    {
      status: "REJECTED",
      icon: XCircleIcon,
      className: "text-destructive",
    },
    {
      status: "PENDING_APPROVAL",
      icon: ClockIcon,
      className: "text-warning",
    },
  ];

  return (
    <div className="flex justify-center items-center">
      {filterButtons.map((button) => {
        const isActive = currentFilter === button.status;

        return (
          <TooltipProvider key={button.status}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant={"ghost"}
                  onClick={() => setFilter(button.status)}
                  className={`flex items-center p-1 ${isActive ? "border-b-2 border-primary" : ""}`}
                >
                  <button.icon className={`h-4 w-4 ${button.className}`} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{button.status}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
      {hasActiveFilter && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                onClick={clearFilter}
                className="flex items-center p-1"
              >
                <FilterXIcon className="h-4 w-4 text-highlight" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>CLEAR</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}
