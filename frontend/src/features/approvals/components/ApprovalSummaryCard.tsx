import {
  CardContent,
  CardDescription,
  CardTitle,
} from "@/common/ui/surfaces/card";
import { ApprovalSummaryCardActions } from "@/features/approvals/components/ApprovalSummaryCardActions";
import { BaseApprovalResponse } from "@/features/approvals/types";
import TaskCategoryBadge from "@/features/tasks/components/TaskCategoryBadge";

//TODO: Instead of using BaseApprovalResponse, create a new type that only Picks the needed properties.
export interface TaskApprovalCardProps {
  approval: BaseApprovalResponse;
}

export const ApprovalSummaryCard = ({ approval }: TaskApprovalCardProps) => {
  return (
    <div className="border rounded-lg shadow-sm hover:shadow-md transition-all overflow-hidden">
      <div className="bg-muted/20 p-4">
        <div className="flex justify-between items-start">
          <div className="flex flex-col lg:flex-row  items-start gap-4">
            <TaskCategoryBadge category={approval.taskCategory} />
            <div>
              <CardTitle className="text-lg font-semibold">
                {approval.taskTitle}
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                {approval.taskDescription}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-muted-foreground">
                    Completed:{" "}
                    {new Date(
                      approval.completedAt || Date.now(),
                    ).toLocaleDateString()}
                  </span>
                </div>
              </CardDescription>
            </div>
          </div>
          <ApprovalSummaryCardActions approval={approval} />
        </div>
      </div>

      {approval.note && (
        <CardContent className="pt-3">
          <div className="bg-muted/10 rounded-md p-3 border-l-2 border-primary">
            <p className="text-sm italic">{approval.note}</p>
          </div>
        </CardContent>
      )}
    </div>
  );
};
