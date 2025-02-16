import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Task } from "@/types/task";

import { IceCream2Icon } from "lucide-react";

export const TaskDetailsCard = ({ task }: { task: Task }) => {
  return (
    <Card className="max-w-4xl mx-auto overflow-hidden">
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
  );
};
