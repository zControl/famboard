import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserProfile } from "@/types/user";
import { firstInitial } from "@/utils/utils";

export const KidProfileSummaryCard = ({ kid }: { kid: UserProfile }) => {
  return (
    <div className="mx-auto flex flex-col items-center gap-2">
      <Avatar className="h-24 w-24">
        <AvatarImage src={kid?.avatarUrl} alt="Avatar" />
        <AvatarFallback>{firstInitial(kid?.username ?? "")}</AvatarFallback>
      </Avatar>
      <div>{kid?.username}</div>
      <div>{kid?.bio}</div>
    </div>
  );
};
