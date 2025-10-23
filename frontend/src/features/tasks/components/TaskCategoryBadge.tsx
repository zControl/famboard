import { TaskCategory } from "@/types/task";
import { cn } from "@/utils/classNames";
import { cva, type VariantProps } from "class-variance-authority";
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

const badgeVariants = cva(
  "relative flex items-center justify-center shrink-0 overflow-hidden rounded-full bg-highlight/60 border-2 border-highlight/80",
  {
    variants: {
      size: {
        sm: "size-11",
        md: "size-14",
        lg: "size-20",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const iconVariants = cva("text-highlight-foreground", {
  variants: {
    size: {
      sm: "size-7",
      md: "size-9",
      lg: "size-14",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface TaskCategoryBadgeProps extends VariantProps<typeof badgeVariants> {
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
      <UserStarIcon className={iconVariants({ size })} />
    ),
    [TaskCategory.Academic]: (
      <GraduationCapIcon className={iconVariants({ size })} />
    ),
    [TaskCategory.Household]: <HomeIcon className={iconVariants({ size })} />,
    [TaskCategory.Friendly]: (
      <HeartHandshakeIcon className={iconVariants({ size })} />
    ),
    [TaskCategory.Helpful]: (
      <HandMetalIcon className={iconVariants({ size })} />
    ),
    [TaskCategory.Improvement]: (
      <TrendingUpIcon className={iconVariants({ size })} />
    ),
    [TaskCategory.Fitness]: <ActivityIcon className={iconVariants({ size })} />,
    [TaskCategory.Other]: (
      <ShieldQuestionIcon className={iconVariants({ size })} />
    ),
  };

  const icon = categoryIconMap[category];

  return <div className={cn(badgeVariants({ size }), className)}>{icon}</div>;
}

export default TaskCategoryBadge;
