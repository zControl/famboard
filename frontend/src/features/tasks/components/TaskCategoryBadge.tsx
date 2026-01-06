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
import { TaskCategory } from "@/features/tasks/types";
import { type VariantProps } from "class-variance-authority";
import {
  ActivityIcon,
  GraduationCapIcon,
  HandMetalIcon,
  HeartHandshakeIcon,
  HomeIcon,
  ShieldQuestionIcon,
  TrendingUpIcon,
  UserStarIcon,
} from "lucide-react";

interface TaskCategoryBadgeProps
  extends VariantProps<typeof badgeShellVariants> {
  category: TaskCategory;
  className?: string;
}

function TaskCategoryBadge({
  category,
  className,
  size,
}: TaskCategoryBadgeProps) {
  // Create a map of icons with the appropriate size class
  const categoryIconMap: Record<TaskCategory, React.ReactNode> = {
    [TaskCategory.Personal]: (
      <UserStarIcon className={badgeIconVariants({ size })} />
    ),
    [TaskCategory.Academic]: (
      <GraduationCapIcon className={badgeIconVariants({ size })} />
    ),
    [TaskCategory.Household]: (
      <HomeIcon className={badgeIconVariants({ size })} />
    ),
    [TaskCategory.Friendly]: (
      <HeartHandshakeIcon className={badgeIconVariants({ size })} />
    ),
    [TaskCategory.Helpful]: (
      <HandMetalIcon className={badgeIconVariants({ size })} />
    ),
    [TaskCategory.Improvement]: (
      <TrendingUpIcon className={badgeIconVariants({ size })} />
    ),
    [TaskCategory.Fitness]: (
      <ActivityIcon className={badgeIconVariants({ size })} />
    ),
    [TaskCategory.Other]: (
      <ShieldQuestionIcon className={badgeIconVariants({ size })} />
    ),
  };

  const icon = categoryIconMap[category];

  return (
    <Tooltip>
      <TooltipTrigger>
        <div className={cn(badgeShellVariants({ size }), className)}>
          {icon}
        </div>
      </TooltipTrigger>
      <TooltipContent>{category}</TooltipContent>
    </Tooltip>
  );
}

export default TaskCategoryBadge;
