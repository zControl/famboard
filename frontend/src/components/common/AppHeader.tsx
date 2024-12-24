import { AppLogo } from "@/components/common/AppLogo";
import { HeaderContainer } from "@/components/common/HeaderContainer";
import { Button } from "@/components/ui/button";
import { CustomLink } from "@/components/ui/custom-link";
import { UserAvatarDropdown } from "@/features/user/components/UserAvatarDropdown";
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
export const AppHeader = () => {
  return (
    <HeaderContainer
      logo={<AppLogo />}
      mobileMenu={<Button variant={"default"}>Menu</Button>}
      navigation={
        <div className="p-2 w-full">
          <ul className="py-2 flex gap-2">
            <li>
              <HeaderNavLink to="/dashboard">Dashboard</HeaderNavLink>
            </li>
            <li>
              <HeaderNavLink to="/profile">Profile</HeaderNavLink>
            </li>
          </ul>
        </div>
      }
      actions={
        <>
          <AlarmCheckIcon />
          <UserAvatarDropdown />
        </>
      }
    />
  );
};
