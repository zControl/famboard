import { AppLogo } from "@/components/common/AppLogo";
import { HeaderContainer } from "@/components/common/HeaderContainer";
import { Button } from "@/components/ui/button";
import { CustomLink } from "@/components/ui/custom-link";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { UserAvatarDropdown } from "@/features/user/components/UserAvatarDropdown";
import { UserGroup } from "@/types/user";
import { AlarmCheckIcon } from "lucide-react";

const HeaderNavLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => {
  return (
    <CustomLink to={to} size="lg" hoverColor="primary">
      {children}
    </CustomLink>
  );
};

const AdminNavigation = () => (
  <ul className="py-2 flex gap-2">
    <li>
      <HeaderNavLink to="/admin-dashboard">Admin Dashboard</HeaderNavLink>
    </li>
    <li>
      <HeaderNavLink to="/user-management">User Management</HeaderNavLink>
    </li>
    {/* More admin-specific links */}
  </ul>
);

const ParentNavigation = () => (
  <ul className="py-2 flex gap-2">
    <li>
      <HeaderNavLink to="/parent-dashboard">Parent Dashboard</HeaderNavLink>
    </li>
    <li>
      <HeaderNavLink to="/child-progress">Child Progress</HeaderNavLink>
    </li>
    {/* More parent-specific links */}
  </ul>
);

const KidNavigation = () => (
  <ul className="py-2 flex gap-2">
    <li>
      <HeaderNavLink to="/kid-dashboard">My Dashboard</HeaderNavLink>
    </li>
    <li>
      <HeaderNavLink to="/games">Games</HeaderNavLink>
    </li>
    {/* More kid-specific links */}
  </ul>
);

const GuestNavigation = () => (
  <ul className="py-2 flex gap-2">
    <li>
      <HeaderNavLink to="/about">About</HeaderNavLink>
    </li>
    <li>
      <HeaderNavLink to="/login">Login</HeaderNavLink>
    </li>
    {/* More guest-specific links */}
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

  console.log("user from app header");
  console.log("user", user);

  return (
    <HeaderContainer
      logo={<AppLogo />}
      mobileMenu={<Button variant={"default"}>Menu</Button>}
      navigation={
        <div className="p-2 w-full">
          <ul className="py-2 flex gap-2">{renderNavigation()}</ul>
        </div>
      }
      actions={
        <>
          {user?.group}
          <AlarmCheckIcon />
          <UserAvatarDropdown />
        </>
      }
    />
  );
};
