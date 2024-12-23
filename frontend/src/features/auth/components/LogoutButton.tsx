import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useNavigate, useRouter } from "@tanstack/react-router";

export function LogoutButton() {
  const auth = useAuth();
  const router = useRouter();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      auth.logout().then(() => {
        router.invalidate().finally(() => {
          navigate({ to: "/" });
        });
      });
    }
  };
  return (
    <Button variant={"ghost"} onClick={handleLogout}>
      Logout
    </Button>
  );
}
