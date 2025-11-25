import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/common/ui/display/avatar";
import {
  StyledGemIcon,
  StyledPiggyBankIcon,
} from "@/common/ui/display/styled-icons";
import { Spinner } from "@/common/ui/feedback/spinner";
import { Card, CardContent } from "@/common/ui/surfaces/card";
import { StatLabel, StatValue } from "@/common/ui/typography/typography";
import { firstInitial } from "@/common/utils/firstInitial";
import { useUserProfile } from "@/features/user/hooks/useUserProfile";

export const KidProfileCard = ({ id }: { id: string }) => {
  const { userProfile, isLoading } = useUserProfile(id);

  if (!userProfile) {
    return (
      <Card className="w-full">
        <CardContent className="p-6 flex flex-col items-center gap-4">
          <Avatar className="h-24 w-24">
            <AvatarFallback>{"??"}</AvatarFallback>
          </Avatar>
          <div className="text-lg">No Profile</div>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="p-0 flex flex-col gap-4">
      <div className="flex flex-col items-center gap-2">
        <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
          <AvatarImage src={userProfile.avatarUrl} alt="Avatar" />
          <AvatarFallback>
            {firstInitial(userProfile.username ?? "")}
          </AvatarFallback>
        </Avatar>
        <div className="flex items-center justify-around gap-2">
          <div>{userProfile.statusEmoji}</div>
          <div className="text-muted-foreground">{userProfile.status}</div>
        </div>
      </div>

      <div className="flex flex-row justify-around">
        <div className="flex flex-col items-center">
          <StyledPiggyBankIcon />
          <StatValue>{userProfile.pointTotal || 1}</StatValue>
        </div>

        <div className="flex flex-col items-center">
          <StyledGemIcon />
          <StatValue>{userProfile.pointTotal || 0}</StatValue>
        </div>
      </div>
      <div>
        <div className="flex flex-col">
          <StatLabel>Achievements</StatLabel>
          {/* <StatValue>{userProfile.achievements?.length || 0}</StatValue> */}
          <StatValue>TBD</StatValue>
        </div>

        <div className="flex flex-col">
          <StatLabel>About</StatLabel>
          <StatValue>{userProfile.bio}</StatValue>
        </div>
      </div>
    </div>
  );
};
