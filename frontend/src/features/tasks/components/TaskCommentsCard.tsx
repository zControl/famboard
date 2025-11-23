import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/common/ui/surfaces/card";
import { Task } from "@/features/tasks/types";

export const TaskCommentsCard = ({ task }: { task: Task }) => {
  return (
    <Card className="max-w-4xl mx-auto overflow-hidden">
      <CardHeader>
        <CardTitle>Comments</CardTitle>
      </CardHeader>
      <CardContent>Comments for {task.title}</CardContent>
    </Card>
  );
};
