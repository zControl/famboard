import { Card } from "@/components/ui/card";
import { Header2, StatLabel, StatValue } from "@/components/ui/typography";
import { useProfile } from "@/features/user/hooks/useProfile";
import {
  AwardIcon,
  Calendar1Icon,
  CalendarCheckIcon,
  FlameIcon,
  PiggyBankIcon,
  TrophyIcon,
} from "lucide-react";

export const KidShowcaseCard = () => {
  const { profile } = useProfile();
  return (
    <Card className="p-0">
      <div className="flex flex-col justify-start gap-2">
        <Header2 className="bg-linear-to-r from-primary to-chart-2 text-transparent bg-clip-text">
          Welcome, {profile?.firstName}!
        </Header2>
        <div className="flex flex-row items-center px-4">
          <PiggyBankIcon fill="green" className="size-8 text-green-600 mr-2" />
          <StatLabel>Points:</StatLabel>
          <StatValue>|completed number|</StatValue>
        </div>
        <div className="flex flex-row items-center px-4">
          <Calendar1Icon className="size-8 text-blue-600 mr-2" />
          <StatLabel>Weekly Completed:</StatLabel>
          <StatValue>|completed number|</StatValue>
        </div>
        <div className="flex flex-row items-center px-4">
          <CalendarCheckIcon className="size-8 text-blue-600 mr-2" />
          <StatLabel>Daily Completed:</StatLabel>
          <StatValue>|completed number|</StatValue>
        </div>
        <div className="flex flex-row items-center px-4">
          <TrophyIcon fill="yellow" className="size-8 text-yellow-400 mr-2" />
          <StatLabel>Achievements:</StatLabel>
        </div>
        <div>
          <div className="flex flex-col justify-start px-16 pt-0 gap-0">
            <StatValue>|list|</StatValue>
            <StatValue>|of|</StatValue>
            <StatValue>|achievements|</StatValue>
          </div>
        </div>
        <div className="flex flex-row items-center px-4">
          <AwardIcon className="size-8 text-orange-600 mr-2" />
          <StatLabel>Badges:</StatLabel>
        </div>
        <div className="flex flex-col justify-start px-16 pt-0">
          <StatValue>|list|</StatValue>
          <StatValue>|earned|</StatValue>
          <StatValue>|badges|</StatValue>
        </div>
        <div className="flex flex-row items-center px-4">
          <FlameIcon fill="red" className="size-8 text-orange-600 mr-2" />
          <StatLabel>Streaks:</StatLabel>
        </div>
        <div className="flex flex-col justify-start px-16 pt-0">
          <StatValue>|list|</StatValue>
          <StatValue>|streaks|</StatValue>
        </div>
      </div>
    </Card>
  );
};
