import { AppLogo } from "@/components/common/AppLogo";
import { HeaderContainer } from "@/components/common/HeaderContainer";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/features/auth/components/LoginButton";

export const LandingHeader = () => {
  return (
    <HeaderContainer
      logo={<AppLogo />}
      mobileMenu={<Button variant={"default"}>Menu</Button>}
      actions={<LoginButton />}
    />
  );
};
