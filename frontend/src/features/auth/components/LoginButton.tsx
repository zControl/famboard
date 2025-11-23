import { Button } from "@/common/ui/actions/button";
import { Link } from "@tanstack/react-router";

export const LoginButton = () => {
  return (
    <Button variant={"ghost"}>
      <Link to="/login">Login</Link>
    </Button>
  );
};
