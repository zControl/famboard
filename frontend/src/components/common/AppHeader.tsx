import { AppLogo } from "@/components/common/AppLogo";
import { HeaderContainer } from "@/components/common/HeaderContainer";
import { ButtonLink } from "@/components/composites/ButtonLink";
import { Header3 } from "@/components/ui/typography";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ManageUserSheet } from "@/features/user/components/ManageUserSheet";
import { UserGroup } from "@/types/user";
import { BellIcon, MailsIcon, PlusSquareIcon } from "lucide-react";

const AdminNavigation = () => (
  <div className="flex gap-1">
    <ButtonLink href="/admin">Dashboard</ButtonLink>
    <ButtonLink href="/admin/users">Users</ButtonLink>
    <ButtonLink href="/admin/analytics">Analytics</ButtonLink>
  </div>
);

const ParentNavigation = () => (
  <div className="flex gap-2 justify-center">
    <ButtonLink href="/parents">Dashboard</ButtonLink>
    <ButtonLink href="/parents/manage">Manage</ButtonLink>
    <ButtonLink href="/parents/tasks">Tasks</ButtonLink>
    <ButtonLink href="/parents/rewards">Rewards</ButtonLink>
  </div>
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
    <MailsIcon />
    <BellIcon />
    <PlusSquareIcon />
  </div>
);

const KidActions = () => {
  return (
    <div className="flex items-center gap-2">
      <Header3 className="text-highlight">Points: 72</Header3>
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
