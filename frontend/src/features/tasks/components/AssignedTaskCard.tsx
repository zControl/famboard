import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Coin } from "@/components/ui/coin";
import { UserAssignedTaskResponse } from "@/types/task";
import { SquareCheckBigIcon } from "lucide-react";

interface AssignedTaskCardProps {
  task: UserAssignedTaskResponse;
}

export const AssignedTaskCard = ({ task }: AssignedTaskCardProps) => {
  return (
    <Card className="p-2 gap-0 h-full">
      <CardHeader className="px-1">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-2">
          <Coin className="size-8" value={task.pointValue} />
          <div className="flex flex-col space-y-1 grow">
            <CardTitle className="p-0">{task.title}</CardTitle>
            <CardDescription className="p-0">{task.frequency}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col p-0 flex-1">
        <CardDescription className="overflow-x-auto max-h-20 overflow-y-auto">
          {task.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="mt-auto pt-2 px-0">
        <div className="flex gap-2 w-full justify-end">
          <Button variant="secondary">
            <SquareCheckBigIcon />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
