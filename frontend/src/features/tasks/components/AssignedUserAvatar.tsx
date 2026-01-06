import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/common/ui/display/avatar";
import { useUserProfile } from "@/features/user/hooks/useUserProfile";

export const AssignedUserAvatar = ({ userId }: { userId: string }) => {
  if (!userId) {
    console.warn("AssignedUserAvatar received undefined userId");
  }
  const { data: userProfile, isLoading, error } = useUserProfile(userId);
  if (isLoading) return <div>Loading...</div>;
  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <Avatar className="inline-block h-8 w-8 rounded-full ring-2">
      <AvatarImage src={userProfile?.avatarUrl} alt={userProfile?.username} />
      <AvatarFallback>{userProfile?.username?.charAt(0)}</AvatarFallback>
    </Avatar>
  );
};
