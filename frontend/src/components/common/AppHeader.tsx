import { AppLogo } from "@/components/common/AppLogo";
import { HeaderContainer } from "@/components/common/HeaderContainer";
import { ButtonLink } from "@/components/composites/ButtonLink";
import { Button } from "@/components/ui/button";
import { Header3 } from "@/components/ui/typography";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ManageUserSheet } from "@/features/user/components/ManageUserSheet";
import { UserGroup } from "@/types/user";
import { BellIcon, MailsIcon, PlusSquareIcon } from "lucide-react";

const AdminNavigation = () => (
  <ul className="flex gap-1">
    <li>
      <ButtonLink href="/admin">Dashboard</ButtonLink>
    </li>
    <li>
      <ButtonLink href="/admin/users">Users</ButtonLink>
    </li>
    <li>
      <ButtonLink href="/admin/analytics">Analytics</ButtonLink>
    </li>
  </ul>
);

const ParentNavigation = () => (
  <ul className="flex gap-1">
    <li>
      <ButtonLink href="/parents">Dashboard</ButtonLink>
    </li>
    <li>
      <ButtonLink href="/parents/manage">Manage</ButtonLink>
    </li>
    <li>
      <ButtonLink href="/parents/tasks">Tasks</ButtonLink>
    </li>
    <li>
      <ButtonLink href="/parents/rewards">Rewards</ButtonLink>
    </li>
  </ul>
);

const KidNavigation = () => (
  <div className="flex flex-col w-full">
    <div className="flex items-center justify-center gap-6 h-24">
      <ButtonLink href="/kids">My Dashboard</ButtonLink>
      <ButtonLink href="/kids/play">Play Games</ButtonLink>
      <ButtonLink href="/kids/help">Do Chores</ButtonLink>
      <ButtonLink href="/kids/fitness">Fitness</ButtonLink>
      <ButtonLink href="/kids/earn">Earn Rewards</ButtonLink>
    </div>
  </div>
);

const GuestNavigation = () => (
  <ul className="flex gap-1">
    <li>
      <ButtonLink href="/about">About</ButtonLink>
    </li>
    <li>
      <ButtonLink href="/login">Login</ButtonLink>
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
