import { Header3 } from "@/common/ui/typography/typography";
import { useUserProfile } from "@/features/user/hooks/useUserProfile";

export const AssignedUserName = ({ userId }: { userId: string }) => {
  if (!userId) {
    console.warn("AssignedUserName received undefined userId");
  }
  const { data: userProfile, isLoading, error } = useUserProfile(userId);
  if (isLoading) return <div>Loading...</div>;
  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return <Header3>{userProfile?.username || "Unknown User"}</Header3>;
};
