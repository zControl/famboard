import { useIsMobile } from "@/common/hooks/useIsMobile";
import { Tile } from "@/common/ui/surfaces/Tile";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/common/ui/surfaces/tabs";
import { TaskAnalyticsCard } from "@/features/tasks/components/TaskAnalyticsCard";
import { TaskApprovalsCard } from "@/features/tasks/components/TaskApprovalsCard";
import { TaskCommentsCard } from "@/features/tasks/components/TaskCommentsCard";
import { TaskDetailsCard } from "@/features/tasks/components/TaskDetailsCard";
import { Task } from "@/features/tasks/types";
import { EllipsisIcon, Share2Icon, UserPlus2Icon } from "lucide-react";

export const TaskTile = ({ task }: { task: Task }) => {
  const isMobile = useIsMobile();
  return (
    <Tile
      title={task.title}
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
          <TaskApprovalsCard task={task} />
        </TabsContent>
        <TabsContent value="analytics">
          <TaskAnalyticsCard task={task} />
        </TabsContent>
        <TabsContent value="comments">
          <TaskCommentsCard task={task} />
        </TabsContent>
      </Tabs>
    </Tile>
  );
};
