import { ErrorCard } from "@/common/error/ErrorCard";
import { Button } from "@/common/ui/actions/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/common/ui/display/empty";
import { Spinner } from "@/common/ui/feedback/spinner";
import { Card, CardContent } from "@/common/ui/surfaces/card";
import { ApprovalActionModal } from "@/features/approvals/components/ApprovalActionModal";
import { ApprovalSummaryCard } from "@/features/approvals/components/ApprovalSummaryCard";
import { useApprovalsByUser } from "@/features/approvals/hooks/useApprovalsByUser";
import { TaskAssignmentModal } from "@/features/tasks/components/TaskAssignmentModal";
import { UserProfile } from "@/features/user/types";
import { PartyPopperIcon } from "lucide-react";
import { useState } from "react";

export const KidApprovalsCard = ({
  userProfile,
}: {
  userProfile: UserProfile;
}) => {
  const { approvalsByUser, isLoading, error } = useApprovalsByUser(
    userProfile.userId,
  );
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [isAssignmentModalOpen, setAssignmentModalOpen] = useState(false);

  if (error) return <ErrorCard message="Error getting user approval list." />;

  const handleApprovalAll = () => {
    setConfirmModalOpen(true);
  };

  const handleAssignTask = () => {
    setAssignmentModalOpen(true);
  };

  return (
    <Card className="p-2">
      {isLoading ? (
        <Spinner />
      ) : approvalsByUser?.count === 0 ? (
        <CardContent className="flex flex-col items-center justify-center">
          <Empty>
            <EmptyHeader>
              <EmptyMedia>
                <PartyPopperIcon className="size-48 text-highlight" />
              </EmptyMedia>
              <EmptyTitle>Done!</EmptyTitle>
              <EmptyDescription>
                {userProfile.firstName} has no tasks that are awaiting approval!
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button size="lg" variant="secondary" onClick={handleAssignTask}>
                Assign a task
              </Button>
            </EmptyContent>
          </Empty>
        </CardContent>
      ) : (
        <>
          <div className="flex justify-end">
            <Button
              variant={"secondary"}
              size={"lg"}
              disabled={approvalsByUser?.count === 0}
              onClick={handleApprovalAll}
            >
              {`Approve All (${approvalsByUser?.count})`}
            </Button>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto">
            {approvalsByUser?.data.map((approval) => (
              <ApprovalSummaryCard
                key={approval.approvalId}
                approval={approval}
              />
            ))}
          </div>
        </>
      )}

      {approvalsByUser?.data && (
        <ApprovalActionModal
          isOpen={isConfirmModalOpen}
          onOpenChange={setConfirmModalOpen}
          actionType="approve"
          approvals={approvalsByUser.data}
        />
      )}
      <TaskAssignmentModal
        isOpen={isAssignmentModalOpen}
        onOpenChange={setAssignmentModalOpen}
        userId={userProfile.userId}
        username={userProfile.username}
        onComplete={() => {
          // Refresh approvals data after task assignment
        }}
      />
    </Card>
  );
};
