import { Paragraph } from "@/components/ui/typography";

export const KidApprovalsCard = ({ userId }: { userId: string }) => {
  return (
    <div className="w-full border rounded-lg px-2">
      Show approvals for
      <Paragraph>{userId}</Paragraph>
    </div>
  );
};
