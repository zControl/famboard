import { cn } from "@/common/utils/classNames";
import {
  Calendar1Icon,
  CalendarCheckIcon,
  CoinsIcon,
  FlameIcon,
  GemIcon,
  LucideIcon,
  PiggyBankIcon,
  TrophyIcon,
} from "lucide-react";

interface StyledIconProps {
  className?: string;
}

// Base styled icon creator
const createStyledIcon = (Icon: LucideIcon, defaultClassName?: string) => {
  return ({ className }: StyledIconProps) => {
    return <Icon className={cn("size-10", defaultClassName, className)} />;
  };
};

// Defined styled icons
export const StyledPiggyBankIcon = createStyledIcon(
  PiggyBankIcon,
  "text-green-600",
);
export const StyledCoinsIcon = createStyledIcon(CoinsIcon, "text-amber-400");
export const StyledGemIcon = createStyledIcon(GemIcon, "text-cyan-600");
export const StyledCalendar1Icon = createStyledIcon(
  Calendar1Icon,
  "text-violet-600",
);
export const StyledCalendarCheckIcon = createStyledIcon(
  CalendarCheckIcon,
  "text-indigo-500",
);
export const StyledTrophyIcon = createStyledIcon(TrophyIcon, "text-yellow-400");
export const StyledFlameIcon = createStyledIcon(FlameIcon, "text-orange-600");
