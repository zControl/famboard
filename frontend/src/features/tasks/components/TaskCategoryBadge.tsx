import { TaskCategory } from "@/types/task";
import { cn } from "@/utils/classNames";
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

interface TaskCategoryBadgeProps {
  category: TaskCategory;
  className?: string;
}

const iconClassName = "size-9 text-highlight-foreground";
const categoryIconMap: Record<TaskCategory, React.ReactNode> = {
  [TaskCategory.Personal]: <UserStarIcon className={iconClassName} />,
  [TaskCategory.Academic]: <GraduationCapIcon className={iconClassName} />,
  [TaskCategory.Household]: <HomeIcon className={iconClassName} />,
  [TaskCategory.Friendly]: <HeartHandshakeIcon className={iconClassName} />,
  [TaskCategory.Helpful]: <HandMetalIcon className={iconClassName} />,
  [TaskCategory.Improvement]: <TrendingUpIcon className={iconClassName} />,
  [TaskCategory.Fitness]: <ActivityIcon className={iconClassName} />,
  [TaskCategory.Other]: <ShieldQuestionIcon className={iconClassName} />,
};

function TaskCategoryBadge({ category, className }: TaskCategoryBadgeProps) {
  const icon = categoryIconMap[category];
  return (
    <div
      className={cn(
        "relative flex items-center justify-center size-14 shrink-0 overflow-hidden",
        "rounded-full bg-highlight/60 border-2 border-highlight/80",
        className,
      )}
    >
      {icon}
    </div>
  );
}

export default TaskCategoryBadge;
