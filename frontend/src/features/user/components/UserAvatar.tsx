import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/features/auth/hooks/useAuth";
import mockAvatar from "/avatars/avatar-1.png";

export const UserAvatar = () => {
  const auth = useAuth();
  const { user } = auth;

  if (!user) {
    return null;
  }
  const initials = user.name
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  return (
    // TODO: get the image from user profile
    <Avatar>
      <AvatarImage src={mockAvatar} alt="Avatar" />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
};
