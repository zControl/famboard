import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export const LoginButton = () => {
  return (
    <Button variant={"ghost"}>
      <Link to="/login">Login</Link>
    </Button>
  );
};
