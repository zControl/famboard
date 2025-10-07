import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ApprovalRowActions } from "@/features/parents/components/ApprovalRowActions";
import { TaskCompletionResponse } from "@/types/task";

export interface AssignedTaskCardProps {
  approval: TaskCompletionResponse;
}

export const TaskApprovalCard = ({ approval }: AssignedTaskCardProps) => {
  return (
    <div className="border-b-4 border-highlight mb-4">
      <CardHeader className="px-1">
        <div className="flex flex-col justify-start space-y-1">
          <CardTitle className="p-0">{approval.taskTitle}</CardTitle>
          <CardDescription className="p-0">
            {approval.taskDescription}
          </CardDescription>
          <div>cat_icon</div>
          <CardDescription className="overflow-x-auto max-h-20 overflow-y-auto">
            {approval.note}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end pb-2">
          <ApprovalRowActions approval={approval} />
        </div>
      </CardContent>
    </div>
  );
};
