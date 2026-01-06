import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/common/ui/display/avatar";

export const UserAvatar = ({ url }: { url: string }) => {
  const initials = "?";

  return (
    <Avatar>
      <AvatarImage src={url} alt="Avatar" />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
};
