import { AppLogo } from "@/common/layout/AppLogo";
import { HeaderContainer } from "@/common/layout/HeaderContainer";
import {
  StyledGemIcon,
  StyledPiggyBankIcon,
} from "@/common/ui/display/styled-icons";
import { NavigationLink } from "@/common/ui/navigation/navigation-link";
import { Header3 } from "@/common/ui/typography/typography";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ManageUserSheet } from "@/features/user/components/ManageUserSheet";
import { useProfile } from "@/features/user/hooks/useProfile";
import { UserGroup } from "@/features/user/types";
import { useLocation } from "@tanstack/react-router";
import {
  BellIcon,
  ChartLineIcon,
  Gamepad2Icon,
  HandCoinsIcon,
  HomeIcon,
  ListCheckIcon,
  ListTodoIcon,
  LucideIcon,
  MailsIcon,
  PersonStandingIcon,
  PlusSquareIcon,
  ShieldCheckIcon,
  TrophyIcon,
  Users2Icon,
} from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon?: LucideIcon;
}

function isActivePrefix(href: string, pathname: string) {
  return pathname === href || pathname.startsWith(href + "/");
}

function getActiveHref(items: NavItem[], pathname: string) {
  return (
    items
      .map((i) => i.href)
      .filter((href) => isActivePrefix(href, pathname))
      .sort((a, b) => b.length - a.length)[0] ?? null
  );
}

const adminNavItems: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: HomeIcon },
  { href: "/admin/users", label: "Users", icon: Users2Icon },
  { href: "/parents/tasks", label: "Tasks", icon: ListTodoIcon },
  { href: "/parents/rewards", label: "Rewards", icon: HandCoinsIcon },
  { href: "/admin/analytics", label: "Analytics", icon: ChartLineIcon },
];

const parentNavItems: NavItem[] = [
  { href: "/parents", label: "Dashboard", icon: HomeIcon },
  { href: "/parents/tasks", label: "Tasks", icon: ListTodoIcon },
  { href: "/parents/routines", label: "Routines", icon: ListCheckIcon },
  { href: "/parents/approvals", label: "Approvals", icon: ShieldCheckIcon },
  { href: "/parents/achievements", label: "Achievements", icon: TrophyIcon },
  { href: "/parents/rewards", label: "Rewards", icon: HandCoinsIcon },
];

const kidNavItems: NavItem[] = [
  { href: "/kids", label: "My Dashboard", icon: HomeIcon },
  { href: "/kids/play", label: "Play Games", icon: Gamepad2Icon },
  { href: "/kids/help", label: "Do Chores", icon: ListTodoIcon },
  { href: "/kids/fitness", label: "Fitness", icon: PersonStandingIcon },
  { href: "/kids/earn", label: "Earn Rewards", icon: HandCoinsIcon },
];

const AdminNavigation = () => {
  const { pathname } = useLocation();
  const activeHref = getActiveHref(adminNavItems, pathname);

  return (
    <div className="flex gap-1">
      {adminNavItems.map((item) => (
        <NavigationLink
          key={item.href}
          href={item.href}
          active={item.href === activeHref}
          icon={item.icon}
        >
          {item.label}
        </NavigationLink>
      ))}
    </div>
  );
};

const ParentNavigation = () => {
  const { pathname } = useLocation();
  const activeHref = getActiveHref(parentNavItems, pathname);

  return (
    <div className="flex gap-2 justify-center">
      {parentNavItems.map((item) => (
        <NavigationLink
          key={item.href}
          href={item.href}
          active={item.href === activeHref}
          icon={item.icon}
        >
          {item.label}
        </NavigationLink>
      ))}
    </div>
  );
};

const KidNavigation = () => {
  const { pathname } = useLocation();
  const activeHref = getActiveHref(kidNavItems, pathname);

  return (
    <div className="flex justify-center gap-2">
      {kidNavItems.map((item) => (
        <NavigationLink
          key={item.href}
          href={item.href}
          active={item.href === activeHref}
          icon={item.icon}
        >
          {item.label}
        </NavigationLink>
      ))}
    </div>
  );
};

const AdminActions = () => <div>Admin Actions</div>;

const ParentActions = () => (
  <div className="flex items-center gap-2">
    <MailsIcon />
    <BellIcon />
    <PlusSquareIcon />
  </div>
);

const KidActions = () => {
  const { profile } = useProfile();
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        <StyledPiggyBankIcon />
        <Header3>{profile?.pointTotal || 0}</Header3>
      </div>
      <div className="flex items-center">
        <StyledGemIcon />
        <Header3>{profile?.pointTotal || 0}</Header3>
      </div>
    </div>
  );
};

const MobileMenu = () => {
  return (
    <div className="flex gap-1 items-center">
      <div>Mobile Menu</div>
      <ManageUserSheet />
    </div>
  );
};

export const AppHeader = () => {
  const { user } = useAuth();

  const renderNavigation = () => {
    switch (user?.group) {
      case UserGroup.ADMIN:
        return <AdminNavigation />;
      case UserGroup.PARENT:
        return <ParentNavigation />;
      case UserGroup.KID:
        return <KidNavigation />;
      default:
        return null;
    }
  };

  const renderActions = () => {
    switch (user?.group) {
      case UserGroup.ADMIN:
        return <AdminActions />;
      case UserGroup.PARENT:
        return <ParentActions />;
      case UserGroup.KID:
        return <KidActions />;
      default:
        return null;
    }
  };

  return (
    <HeaderContainer
      logo={<AppLogo />}
      mobileMenu={<MobileMenu />}
      navigation={renderNavigation()}
      actions={
        <div className="flex items-center gap-4">
          {renderActions()}
          <ManageUserSheet />
        </div>
      }
    />
  );
};
