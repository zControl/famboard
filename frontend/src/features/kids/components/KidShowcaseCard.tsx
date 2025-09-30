import { Card } from "@/components/ui/card";

export const KidShowcaseCard = () => {
  return (
    <Card className="p-0">
      <div className="flex flex-col justify-start gap-4">
        <div>coins, earned, multiplier</div>
        <div>earned badges</div>
        <div>acheivements</div>
        <div>challenge streak</div>
      </div>
    </Card>
  );
};
