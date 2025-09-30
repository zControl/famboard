import { Card } from "@/components/ui/card";

export const AssignedTaskCard = () => {
  return (
    <Card className="p-0" title="title">
      <div className="flex flex-col justify-start">
        <div>icon</div>
        <div>title</div>
        <div>description</div>
        <div>due</div>
      </div>
    </Card>
  );
};
