import { AppLogo } from "@/components/common/AppLogo";
import { HeaderContainer } from "@/components/common/HeaderContainer";
import { Button } from "@/components/ui/button";
import { Header3 } from "@/components/ui/typography";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ManageUserSheet } from "@/features/user/components/ManageUserSheet";
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
  <div className="flex flex-col w-full">
    <div className="flex items-center justify-center gap-6 h-24 border border-red-500">
      <HeaderNavLink href="/kids">My Dashboard</HeaderNavLink>
      <HeaderNavLink href="/kids/play">Play Games</HeaderNavLink>
      <HeaderNavLink href="/kids/help">Do Chores</HeaderNavLink>
      <HeaderNavLink href="/kids/fitness">Fitness</HeaderNavLink>
      <HeaderNavLink href="/kids/earn">Earn Rewards</HeaderNavLink>
    </div>
  </div>
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

const AdminActions = () => <div>Admin Actions</div>;

const ParentActions = () => (
  <div className="flex items-center gap-2">
    <Button variant="outline" className="h-10 w-10 rounded-full">
      <MailsIcon />
    </Button>
    <Button variant="outline" className="h-10 w-10 rounded-full">
      <PlusSquareIcon />
    </Button>
    <Button variant="outline" className="h-10 w-10 rounded-full">
      <BellIcon />
    </Button>
  </div>
);

const KidActions = () => {
  return (
    <div className="flex items-center gap-2">
      <Header3 className="text-highlight">Points: 72</Header3>
      <Button variant="outline">
        <MailsIcon />
      </Button>
      <Button variant="outline">
        <PlusSquareIcon />
      </Button>
    </div>
  );
};

const KidMobileMenu = () => {
  return (
    <div>
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
        return <GuestNavigation />;
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
      mobileMenu={<KidMobileMenu />}
      navigation={<div className="flex gap-2">{renderNavigation()}</div>}
      actions={
        <div className="flex items-center gap-4">
          {renderActions()}
          <ManageUserSheet />
        </div>
      }
    />
  );
};
