import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const TaskCommentsCard = ({
  sequenceNumber,
}: {
  sequenceNumber: string;
}) => {
  return (
    <Card className="max-w-4xl mx-auto overflow-hidden">
      <CardHeader>
        <CardTitle>Comments</CardTitle>
      </CardHeader>
      <CardContent>Comments for {sequenceNumber}</CardContent>
    </Card>
  );
};
