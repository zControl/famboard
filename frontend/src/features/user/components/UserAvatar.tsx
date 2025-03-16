import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useProfile } from "@/features/user/hooks/useProfile";

export const UserAvatar = () => {
  const { user } = useAuth();
  const { profile } = useProfile();

  if (!user) {
    return null;
  }
  const initials = user.username
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  return (
    <Avatar>
      <AvatarImage src={profile?.avatarUrl} alt="Avatar" />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
};
