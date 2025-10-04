import { Paragraph } from "@/components/ui/typography";
import { useApprovals } from "@/features/parents/hooks/useApprovals";

export const KidApprovalsCard = ({ userId }: { userId: string }) => {
  const { approvalsList } = useApprovals();

  console.log("Approvals", approvalsList);
  return (
    <div className="w-full border rounded-lg px-2">
      Show approvals for
      <Paragraph>{userId}</Paragraph>
      There are a total of {approvalsList?.count} approvals
      {approvalsList?.data?.map((approval) => (
        <Paragraph key={approval.approvalId}>
          {approval.pointsPossible}
        </Paragraph>
      ))}
    </div>
  );
};
