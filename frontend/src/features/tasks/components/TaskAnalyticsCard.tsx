import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const TaskAnalyticsCard = ({
  sequenceNumber,
}: {
  sequenceNumber: string;
}) => {
  return (
    <Card className="max-w-4xl mx-auto overflow-hidden">
      <CardHeader>
        <CardTitle>Analytics</CardTitle>
      </CardHeader>
      <CardContent>Analytics for {sequenceNumber}</CardContent>
    </Card>
  );
};
