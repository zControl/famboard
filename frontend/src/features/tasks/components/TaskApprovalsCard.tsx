import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const TaskApprovalsCard = ({
  sequenceNumber,
}: {
  sequenceNumber: string;
}) => {
  return (
    <Card className="max-w-4xl mx-auto overflow-hidden">
      <CardHeader>
        <CardTitle>Approvals</CardTitle>
      </CardHeader>
      <CardContent>Approvals for {sequenceNumber}</CardContent>
    </Card>
  );
};
