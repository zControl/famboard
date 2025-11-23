import { AppLogo } from "@/common/layout/AppLogo";
import { HeaderContainer } from "@/common/layout/HeaderContainer";
import { LoginButton } from "@/features/auth/components/LoginButton";

function LandingHeaderActions() {
  return (
    <>
      <LoginButton />
    </>
  );
}

export const LandingHeader = () => {
  return (
    <HeaderContainer logo={<AppLogo />} actions={<LandingHeaderActions />} />
  );
};
