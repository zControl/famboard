import { Button } from "@/common/ui/actions/button";
import { ActionModal } from "@/common/ui/overlay/ActionModal";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { useState } from "react";

export const LogoutButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const auth = useAuth();
  const router = useRouter();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsModalOpen(true);
  };

  const confirmLogout = () => {
    auth.logout().then(() => {
      router.invalidate().finally(() => {
        navigate({ to: "/" });
      });
    });
    setIsModalOpen(false);
  };

  return (
    <>
      <ActionModal
        trigger={<Button onClick={handleLogout}>Logout</Button>}
        title="Are you sure?"
        description="This will log you out and end all active sessions."
        onCancel={() => setIsModalOpen(false)}
        onConfirm={confirmLogout}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
};
