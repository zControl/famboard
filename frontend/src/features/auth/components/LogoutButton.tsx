import { ActionModal } from "@/components/composites/ActionModal";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useNavigate, useRouter } from "@tanstack/react-router";

export const LogoutButton = () => {
  const auth = useAuth();
  const router = useRouter();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout().then(() => {
      router.invalidate().finally(() => {
        navigate({ to: "/" });
      });
    });
  };

  return (
    <ActionModal
      trigger="Logout"
      title="Are you sure you want to logout?"
      description="This will log you out of your account."
      onCancel={() => console.log("Cancel")}
      onConfirm={handleLogout}
    />
  );
};
