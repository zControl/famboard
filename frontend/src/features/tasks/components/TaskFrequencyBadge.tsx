import {
  badgeIconVariants,
  badgeShellVariants,
} from "@/features/tasks/components/badge-variants";
import { TaskFrequency } from "@/types/task";
import { cn } from "@/utils/classNames";
import { type VariantProps } from "class-variance-authority";
import {
  Calendar1Icon,
  CalendarDaysIcon,
  CalendarHeartIcon,
  CalendarRangeIcon,
  CalendarSyncIcon,
} from "lucide-react";

interface TaskFrequencyBadgeProps
  extends VariantProps<typeof badgeShellVariants> {
  category: TaskFrequency;
  className?: string;
}

function TaskFrequencyBadge({
  category,
  className,
  size,
}: TaskFrequencyBadgeProps) {
  // Create a map of icons with the appropriate size class
  const categoryIconMap: Record<TaskFrequency, React.ReactNode> = {
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
    [TaskFrequency.Special]: (
      <CalendarHeartIcon className={badgeIconVariants({ size })} />
    ),
  };

  const icon = categoryIconMap[category];

  return (
    <div className={cn(badgeShellVariants({ size }), className)}>{icon}</div>
  );
}

export default TaskFrequencyBadge;
