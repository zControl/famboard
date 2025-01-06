import { Card } from "@/components/ui/card";

export const KidActiveTasksCard = ({ userId }: { userId: string }) => {
  return <Card className="rounded-none w-full">Active Tasks for {userId}</Card>;
};
