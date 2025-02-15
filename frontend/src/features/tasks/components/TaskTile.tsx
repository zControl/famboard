import { Tile } from "@/components/composites/Tile";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Coin } from "@/components/ui/coin";
import { Header3 } from "@/components/ui/typography";
import { Task } from "@/types/task";
import { IceCream2Icon } from "lucide-react";

export const TaskTile = ({ task }: { task: Task }) => {
  return (
    <Tile
      title={
        <div className="flex flex-row space-x-2">
          <Header3>{`# ${task.sequenceNumber} `}</Header3>
          <Header3>{task.title}</Header3>
        </div>
      }
      description={
        <div className="flex flex-row space-x-2 justify-start">
          <Coin value={task.pointValue} />
          <Badge variant="primary">{task.status}</Badge>
        </div>
      }
      menu={"Menu"}
    >
      <Card className="max-w-3xl mx-auto overflow-hidden">
        <CardHeader>
          <CardTitle>Task Details</CardTitle>
        </CardHeader>
        <CardContent className="text-xl">
          <div className="space-y-4">
            {task.description && (
              <div>
                <IceCream2Icon className="inline mr-2" />
                {task.description}
              </div>
            )}
            {task.category && (
              <div>
                <IceCream2Icon className="inline mr-2" />
                Category: {task.category}
              </div>
            )}
            {task.frequency && (
              <div>
                <IceCream2Icon className="inline mr-2" />
                Frequency: {task.frequency}
              </div>
            )}
            {task.priority && (
              <div>
                <IceCream2Icon className="inline mr-2" />
                Priority: {task.priority}
              </div>
            )}
            {task.assignedTo && (
              <div>
                <IceCream2Icon className="inline mr-2" />
                Assigned to:{" "}
                {task.assignedTo.map((user) => user.username).join(", ")}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-4 font-mono">
          <div>ID: {task.id}</div>
        </CardFooter>
      </Card>
      <div>Action menu</div>
      <Card>Approvals</Card>
      <Card>Analytics</Card>
      <Card>Comments</Card>
    </Tile>
  );
};
