import { TaskCategory } from "@/types/task";
import { cn } from "@/utils/classNames";
import {
  ActivityIcon,
  HandHeartIcon,
  HandshakeIcon,
  HomeIcon,
  NotebookPenIcon,
  ShieldQuestionIcon,
  TrendingUpIcon,
  UsersIcon,
} from "lucide-react";

interface TaskCategoryBadgeProps {
  category: TaskCategory;
  className?: string;
}

const iconClassName = "h-6 w-6 text-highlight-foreground";
const categoryIconMap: Record<TaskCategory, React.ReactNode> = {
  [TaskCategory.Personal]: <HandHeartIcon className={iconClassName} />,
  [TaskCategory.Academic]: <NotebookPenIcon className={iconClassName} />,
  [TaskCategory.Household]: <HomeIcon className={iconClassName} />,
  [TaskCategory.Friendly]: <UsersIcon className={iconClassName} />,
  [TaskCategory.Helpful]: <HandshakeIcon className={iconClassName} />,
  [TaskCategory.Improvement]: <TrendingUpIcon className={iconClassName} />,
  [TaskCategory.Fitness]: <ActivityIcon className={iconClassName} />,
  [TaskCategory.Other]: <ShieldQuestionIcon className={iconClassName} />,
};

function TaskCategoryBadge({ category, className }: TaskCategoryBadgeProps) {
  const icon = categoryIconMap[category];
  return (
    <div
      className={cn(
        "relative flex items-center justify-center h-14 w-14 shrink-0 overflow-hidden",
        "rounded-full bg-highlight/80 border-2 border-highlight-foreground/60",
        "shadow-inner shadow-foreground/20",
        className,
      )}
    >
      {icon}
    </div>
  );
}

export default TaskCategoryBadge;
