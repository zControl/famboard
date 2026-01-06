import { UserGroup } from "@/features/user/types";
import {
  ChartLineIcon,
  Gamepad2Icon,
  HandCoinsIcon,
  HomeIcon,
  ListTodoIcon,
  LucideIcon,
  PersonStandingIcon,
  ShieldCheckIcon,
  TrophyIcon,
  Users2Icon
} from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon?: LucideIcon;
}

export const adminNavItems: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: HomeIcon },
  { href: "/admin/users", label: "Users", icon: Users2Icon },
  { href: "/admin/analytics", label: "Analytics", icon: ChartLineIcon },
  { href: "/parents/tasks", label: "Tasks", icon: ListTodoIcon },
  { href: "/parents/rewards", label: "Rewards", icon: HandCoinsIcon },
];

export const parentNavItems: NavItem[] = [
  { href: "/parents", label: "Dashboard", icon: HomeIcon },
  { href: "/parents/tasks", label: "Tasks", icon: ListTodoIcon },
  { href: "/parents/approvals", label: "Approvals", icon: ShieldCheckIcon },
  { href: "/parents/achievements", label: "Achievements", icon: TrophyIcon },
  { href: "/parents/rewards", label: "Rewards", icon: HandCoinsIcon },
];

export const kidNavItems: NavItem[] = [
  { href: "/kids", label: "My Dashboard", icon: HomeIcon },
  { href: "/kids/play", label: "Play Games", icon: Gamepad2Icon },
  { href: "/kids/help", label: "Do Chores", icon: ListTodoIcon },
  { href: "/kids/fitness", label: "Fitness", icon: PersonStandingIcon },
  { href: "/kids/earn", label: "Earn Rewards", icon: HandCoinsIcon },
];

export const NAV_ITEMS_BY_GROUP: Record<UserGroup, NavItem[]> = {
  [UserGroup.ADMIN]: adminNavItems,
  [UserGroup.PARENT]: parentNavItems,
  [UserGroup.KID]: kidNavItems,
  [UserGroup.GUEST]: [],
};
