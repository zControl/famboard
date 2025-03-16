import { AppLogo } from "@/components/common/AppLogo";
import { HeaderContainer } from "@/components/common/HeaderContainer";
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
