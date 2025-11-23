import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/common/ui/surfaces/card";
import { Task } from "@/features/tasks/types";

export const TaskApprovalsCard = ({ task }: { task: Task }) => {
  return (
    <Card className="max-w-4xl mx-auto overflow-hidden">
      <CardHeader>
        <CardTitle>Approvals</CardTitle>
      </CardHeader>
      <CardContent>Approvals for {task.title}</CardContent>
    </Card>
  );
};
