import { AppLogo } from "@/components/common/AppLogo";
import { HeaderContainer } from "@/components/common/HeaderContainer";
import { Button } from "@/components/ui/button";
import { CustomLink } from "@/components/ui/custom-link";
import { Link } from "@tanstack/react-router";

const LandingHeader = () => {
  return (
    <>
      <HeaderContainer
        logo={<AppLogo />}
        mobileMenu={<Button variant={"default"}>Menu</Button>}
        navigation={
          <>
            <CustomLink to="/demo" hoverColor="default">
              Examples
            </CustomLink>
          </>
        }
        actions={
          <>
            <Button variant={"ghost"}>
              <Link to="/login">Sign in</Link>
            </Button>
            <Button variant={"outline"}>Sign up</Button>
          </>
        }
      />
    </>
  );
};

export { LandingHeader };
