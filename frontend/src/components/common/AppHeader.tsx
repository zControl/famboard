import { AppLogo } from "@/components/common/AppLogo";
import { HeaderContainer } from "@/components/common/HeaderContainer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { UserAvatarDropdown } from "@/features/user/components/UserAvatarDropdown";
import { UserGroup } from "@/types/user";
import { useNavigate } from "@tanstack/react-router";
import {
  AlarmCheckIcon,
  BellIcon,
  MailsIcon,
  PlusSquareIcon,
} from "lucide-react";

const HeaderNavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();

  return (
    <Button
      variant="link"
      className="flex items-center mx-0 p-2 text-lg"
      onClick={() => navigate({ to: href })}
    >
      <AlarmCheckIcon />
      {children}
    </Button>
  );
};

const AdminNavigation = () => (
  <ul className="flex gap-1">
    <li>
      <HeaderNavLink href="/admin">Dashboard</HeaderNavLink>
    </li>
    <li>
      <HeaderNavLink href="/admin/users">Users</HeaderNavLink>
    </li>
    <li>
      <HeaderNavLink href="/admin/analytics">Analytics</HeaderNavLink>
    </li>
  </ul>
);

const ParentNavigation = () => (
  <ul className="flex gap-1">
    <li>
      <HeaderNavLink href="/parents">Dashboard</HeaderNavLink>
    </li>
    <li>
      <HeaderNavLink href="/parents/manage">Manage</HeaderNavLink>
    </li>
    <li>
      <HeaderNavLink href="/parents/tasks">Tasks</HeaderNavLink>
    </li>
    <li>
      <HeaderNavLink href="/parents/rewards">Rewards</HeaderNavLink>
    </li>
  </ul>
);

const KidNavigation = () => (
  <>
    <div></div>
    <ul className="flex gap-1">
      <li>
        <HeaderNavLink href="/kids">My Dashboard</HeaderNavLink>
      </li>
      <li>
        <HeaderNavLink href="/kids/play">Play Games</HeaderNavLink>
      </li>
      <li>
        <HeaderNavLink href="/kids/help">Do Chores</HeaderNavLink>
      </li>
      <li>
        <HeaderNavLink href="/kids/fitness">Fitness</HeaderNavLink>
      </li>
      <li>
        <HeaderNavLink href="/kids/earn">Earn Rewards</HeaderNavLink>
      </li>
    </ul>
  </>
);

const GuestNavigation = () => (
  <ul className="flex gap-1">
    <li>
      <HeaderNavLink href="/about">About</HeaderNavLink>
    </li>
    <li>
      <HeaderNavLink href="/login">Login</HeaderNavLink>
    </li>
  </ul>
);

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
        return <GuestNavigation />;
    }
  };

  return (
    <HeaderContainer
      logo={<AppLogo />}
      mobileMenu={<Button variant={"default"}>Menu</Button>}
      navigation={<div className="flex gap-2">{renderNavigation()}</div>}
      actions={
        <div className="flex items-center gap-4">
          <PlusSquareIcon />
          <MailsIcon />
          <BellIcon />
          <UserAvatarDropdown />
        </div>
      }
    />
  );
};
