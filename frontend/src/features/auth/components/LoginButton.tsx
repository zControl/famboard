import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export function LoginButton() {
  return (
    <Button variant={"ghost"}>
      <Link to="/login">Login</Link>
    </Button>
  );
}
