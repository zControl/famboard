import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/common/ui/surfaces/card";
import { Task } from "@/features/tasks/types";

export const TaskAnalyticsCard = ({ task }: { task: Task }) => {
  return (
    <Card className="max-w-4xl mx-auto overflow-hidden">
      <CardHeader>
        <CardTitle>Analytics</CardTitle>
      </CardHeader>
      <CardContent>Analytics for {task.title}</CardContent>
    </Card>
  );
};
