import { AppLogo } from "@/common/layout/AppLogo";
import { ButtonLink } from "@/common/ui/actions/ButtonLink";
import { LoginButton } from "@/features/auth/components/LoginButton";

const GuestNavigation = () => (
  <ul className="flex gap-1">
    <li>
      <ButtonLink href="/about">About</ButtonLink>
    </li>
  </ul>
);

function LandingHeaderActions() {
  return <LoginButton />;
}

export const LandingHeader = () => {
  return (
    <header className="flex items-center justify-between bg-header border border-b-header-foreground/40 px-4">
      <div className="flex items-center justify-start py-4 md:space-x-10">
        <span className="text-4xl font-bold">
          <AppLogo />
        </span>
        <div className="block md:hidden">
          <span>mobile</span>
        </div>
        <nav className="hidden md:block">
          <GuestNavigation />
        </nav>
      </div>
      <div className="flex items-center justify-end py-4 md:space-x-10">
        <LandingHeaderActions />
      </div>
    </header>
  );
};
