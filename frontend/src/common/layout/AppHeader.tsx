import { AppLogo } from "@/common/layout/AppLogo";
import { HeaderContainer } from "@/common/layout/HeaderContainer";
import { MobileMenu } from "@/common/layout/MobileMenu";
import {
  type NavItem,
  adminNavItems,
  kidNavItems,
  parentNavItems,
} from "@/common/layout/headerNavigation";
import { Coin } from "@/common/ui/display/coin";
import { NavigationLink } from "@/common/ui/navigation/navigation-link";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ManageUserSheet } from "@/features/user/components/ManageUserSheet";
import { useProfile } from "@/features/user/hooks/useProfile";
import { UserGroup } from "@/features/user/types";
import { useLocation } from "@tanstack/react-router";
import { BellIcon, MailsIcon, PlusSquareIcon } from "lucide-react";
import type { ReactNode } from "react";

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

const NavigationBar = ({
  items,
  className,
}: {
  items: NavItem[];
  className?: string;
}) => {
  const { pathname } = useLocation();
  const activeHref = getActiveHref(items, pathname);

  return (
    <div className={className}>
      {items.map((item) => (
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
const AdminNavigation = () => {
  return <NavigationBar items={adminNavItems} className="flex gap-1" />;
};
const AdminActions = () => <div>Admin Actions</div>;
const ParentNavigation = () => {
  return (
    <NavigationBar
      items={parentNavItems}
      className="flex gap-2 justify-center"
    />
  );
};
const ParentActions = () => (
  <div className="flex items-center gap-2">
    <MailsIcon />
    <BellIcon />
    <PlusSquareIcon />
  </div>
);

const KidNavigation = () => {
  return (
    <NavigationBar items={kidNavItems} className="flex justify-center gap-2" />
  );
};

const KidActions = () => {
  const { profile } = useProfile();
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        <Coin value={profile?.pointTotal || 0} />
      </div>
    </div>
  );
};

const NAVIGATION_BY_GROUP: Record<UserGroup, ReactNode> = {
  [UserGroup.ADMIN]: <AdminNavigation />,
  [UserGroup.PARENT]: <ParentNavigation />,
  [UserGroup.KID]: <KidNavigation />,
  [UserGroup.GUEST]: null,
};

const ACTIONS_BY_GROUP: Record<UserGroup, ReactNode> = {
  [UserGroup.ADMIN]: <AdminActions />,
  [UserGroup.PARENT]: <ParentActions />,
  [UserGroup.KID]: <KidActions />,
  [UserGroup.GUEST]: null,
};

export const AppHeader = () => {
  const { user } = useAuth();

  const navigation = user?.group ? NAVIGATION_BY_GROUP[user.group] : null;
  const actions = user?.group ? ACTIONS_BY_GROUP[user.group] : null;

  return (
    <HeaderContainer
      logo={<AppLogo />}
      mobileMenu={<MobileMenu />}
      navigation={navigation}
      actions={
        <div className="flex items-center gap-4">
          {actions}
          <ManageUserSheet />
        </div>
      }
    />
  );
};
