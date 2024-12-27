import { AppLogo } from "@/components/common/AppLogo";
import { HeaderContainer } from "@/components/common/HeaderContainer";
import { ThemeToggle } from "@/components/common/theme/ThemeToggle";
import { LoginButton } from "@/features/auth/components/LoginButton";

function LandingHeaderActions() {
  return (
    <>
      <LoginButton />
      <ThemeToggle />
    </>
  );
}

export const LandingHeader = () => {
  return (
    <HeaderContainer logo={<AppLogo />} actions={<LandingHeaderActions />} />
  );
};
