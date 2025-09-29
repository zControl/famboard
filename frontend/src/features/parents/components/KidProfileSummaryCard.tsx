import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserProfile } from "@/features/user/hooks/useUserProfile";
import { firstInitial } from "@/utils/firstInitial";

export const KidProfileSummaryCard = ({ id }: { id: string }) => {
  const { data: userProfile } = useUserProfile(id);
  return (
    <div className="mx-auto flex flex-col items-center gap-2">
      <Avatar className="h-24 w-24">
        <AvatarImage src={userProfile?.avatarUrl} alt="Avatar" />
        <AvatarFallback>
          {firstInitial(userProfile?.username ?? "")}
        </AvatarFallback>
      </Avatar>
      <div className="text-center">{userProfile?.status}</div>
      <div>{userProfile?.statusEmoji}</div>
    </div>
  );
};
