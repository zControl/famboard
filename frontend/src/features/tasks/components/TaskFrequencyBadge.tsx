import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/common/ui/feedback/tooltip";
import { cn } from "@/common/utils/classNames";
import {
  badgeIconVariants,
  badgeShellVariants,
} from "@/features/tasks/components/task-badge-variants";
import { TaskFrequency } from "@/features/tasks/types";
import { type VariantProps } from "class-variance-authority";
import {
  Calendar1Icon,
  CalendarDaysIcon,
  CalendarRangeIcon,
  CalendarSyncIcon,
  Repeat2Icon,
} from "lucide-react";

interface TaskFrequencyBadgeProps
  extends VariantProps<typeof badgeShellVariants> {
  frequency: TaskFrequency;
  className?: string;
}

function TaskFrequencyBadge({
  frequency,
  className,
  size,
}: TaskFrequencyBadgeProps) {
  // Create a map of icons with the appropriate size class
  const frequencyIconMap: Record<TaskFrequency, React.ReactNode> = {
    [TaskFrequency.Once]: (
      <Calendar1Icon className={badgeIconVariants({ size })} />
    ),
    [TaskFrequency.Daily]: (
      <CalendarDaysIcon className={badgeIconVariants({ size })} />
    ),
    [TaskFrequency.Weekly]: (
      <CalendarRangeIcon className={badgeIconVariants({ size })} />
    ),
    [TaskFrequency.Monthly]: (
      <CalendarSyncIcon className={badgeIconVariants({ size })} />
    ),
    [TaskFrequency.Repeat]: (
      <Repeat2Icon className={badgeIconVariants({ size })} />
    ),
  };

  const icon = frequencyIconMap[frequency];

  return (
    <Tooltip>
      <TooltipTrigger>
        <div className={cn(badgeShellVariants({ size }), className)}>
          {icon}
        </div>
      </TooltipTrigger>
      <TooltipContent>{frequency}</TooltipContent>
    </Tooltip>
  );
}

export default TaskFrequencyBadge;
