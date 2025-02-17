import { Tile } from "@/components/composites/Tile";
import { Badge } from "@/components/ui/badge";

import { Coin } from "@/components/ui/coin";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header3 } from "@/components/ui/typography";
import { TaskAnalyticsCard } from "@/features/tasks/components/TaskAnalyticsCard";
import { TaskApprovalsCard } from "@/features/tasks/components/TaskApprovalsCard";
import { TaskCommentsCard } from "@/features/tasks/components/TaskCommentsCard";
import { TaskDetailsCard } from "@/features/tasks/components/TaskDetailsCard";
import { useIsMobile } from "@/hooks/use-mobile";
import { Task } from "@/types/task";
import { EllipsisIcon, Share2Icon, UserPlus2Icon } from "lucide-react";

export const TaskTile = ({
  task,
  sequenceNumber,
}: {
  task: Task;
  sequenceNumber: string;
}) => {
  const isMobile = useIsMobile();
  return (
    <Tile
      title={
        <div className="flex flex-col md:flex-row space-x-2">
          <Header3>{`# ${task.sequenceNumber} `}</Header3>
          <Header3>{task.title}</Header3>
        </div>
      }
      description={
        <div className="flex flex-row space-x-4 justify-start">
          <Badge variant="primary">{task.status}</Badge>
          <Coin value={task.pointValue} />
        </div>
      }
      menu={
        isMobile ? (
          <EllipsisIcon />
        ) : (
          <div className="flex gap-2">
            <Share2Icon />
            <UserPlus2Icon />
          </div>
        )
      }
    >
      <Tabs defaultValue="details">
        {isMobile ? (
          <TabsList className="grid grid-cols-2 h-auto">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="approvals">Approvals</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
          </TabsList>
        ) : (
          <TabsList className="w-full">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="approvals">Approvals</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
          </TabsList>
        )}
        <TabsContent value="details">
          <TaskDetailsCard task={task} />
        </TabsContent>
        <TabsContent value="approvals">
          <TaskApprovalsCard sequenceNumber={sequenceNumber} />
        </TabsContent>
        <TabsContent value="analytics">
          <TaskAnalyticsCard sequenceNumber={sequenceNumber} />
        </TabsContent>
        <TabsContent value="comments">
          <TaskCommentsCard sequenceNumber={sequenceNumber} />
        </TabsContent>
      </Tabs>
    </Tile>
  );
};
