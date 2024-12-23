import { AppLogo } from "@/components/common/AppLogo";
import { HeaderContainer } from "@/components/common/HeaderContainer";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

const LandingHeader = () => {
  return (
    <>
      <HeaderContainer
        logo={<AppLogo />}
        mobileMenu={<Button variant={"default"}>Menu</Button>}
        actions={
          <Button variant={"ghost"}>
            <Link to="/login">Login</Link>
          </Button>
        }
      />
    </>
  );
};

export { LandingHeader };
