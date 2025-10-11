import { Badge } from "@/components/ui/badge";
import { CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { ApprovalRowActions } from "@/features/parents/components/ApprovalRowActions";
import { ApprovalResponse } from "@/types/task";

export interface TaskApprovalCardProps {
  approval: ApprovalResponse;
}

export const TaskApprovalCard = ({ approval }: TaskApprovalCardProps) => {
  return (
    <div className="border rounded-lg shadow-sm hover:shadow-md transition-all overflow-hidden">
      <div className="bg-muted/20 p-4">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <CardTitle className="text-lg font-semibold">
              {approval.taskTitle}
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              {approval.taskDescription}
            </CardDescription>
          </div>
          <ApprovalRowActions approval={approval} />
        </div>
      </div>

      <CardContent className="p-4 pt-3">
        {/* Display category with a badge */}
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="highlight">category</Badge>
          <span className="text-xs text-muted-foreground">
            {new Date(approval.completedAt || Date.now()).toLocaleDateString()}
          </span>
        </div>

        {/* Notes section with better styling */}
        {approval.note && (
          <div className="bg-muted/10 rounded-md p-3 border-l-2 border-primary">
            <p className="text-sm italic">{approval.note}</p>
          </div>
        )}
      </CardContent>
    </div>
  );
};
