import { Button } from "@/common/ui/actions/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/common/ui/display/avatar";
import { Coin } from "@/common/ui/display/coin";
import { StatValue } from "@/common/ui/typography/typography";
import { firstInitial } from "@/common/utils/firstInitial";
import { useApprovalCounts } from "@/features/approvals/hooks/useApprovalCounts";
import { UserProfile } from "@/features/user/types";
import {
  CalendarCheckIcon,
  CalendarRangeIcon,
  CalendarSyncIcon,
} from "lucide-react";

export const KidProfileCard = ({
  userProfile,
}: {
  userProfile: UserProfile;
}) => {
  const { daily, weekly, monthly } = useApprovalCounts(userProfile.userId);
  return (
    <div className="p-0 flex flex-col gap-4">
      <div className="flex flex-col items-center gap-2">
        <Avatar className="h-32 w-32 shadow-lg">
          <AvatarImage src={userProfile.avatarUrl} alt="Avatar" />
          <AvatarFallback>{firstInitial(userProfile.username)}</AvatarFallback>
        </Avatar>
        <div className="flex items-center justify-around gap-2">
          <div>{userProfile.statusEmoji}</div>
          <div className="text-muted-foreground">{userProfile.status}</div>
        </div>
      </div>
      <div className="flex flex-row justify-around">
        <div className="flex flex-col items-center">
          <Coin value={userProfile.pointTotal} />
          <Button>Convert</Button>
        </div>
        <div className="flex flex-col items-center">
          <StatValue>{userProfile.piggyBankDisplay}</StatValue>
          <Button>Withdraw</Button>
        </div>
      </div>
      <div>
        <div className="flex flex-row justify-around">
          <div className="flex flex-row items-center">
            <CalendarCheckIcon />
            <StatValue>{daily}</StatValue>
          </div>
          <div className="flex flex-row items-center">
            <CalendarRangeIcon />
            <StatValue>{weekly}</StatValue>
          </div>
          <div className="flex flex-row items-center">
            <CalendarSyncIcon />
            <StatValue>{monthly}</StatValue>
          </div>
        </div>
      </div>
    </div>
  );
};
