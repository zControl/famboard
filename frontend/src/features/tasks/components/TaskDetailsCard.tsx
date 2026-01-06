import { Button } from "@/common/ui/actions/button";
import { Coin } from "@/common/ui/display/coin";
import { CardSection } from "@/common/ui/surfaces/CardSection";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/common/ui/surfaces/card";
import { AssignedAvatarGroup } from "@/features/tasks/components/AssignedAvatarGroup";
import TaskCategoryBadge from "@/features/tasks/components/TaskCategoryBadge";
import TaskFrequencyBadge from "@/features/tasks/components/TaskFrequencyBadge";
import { TaskModal } from "@/features/tasks/components/TaskModal";
import { useTaskQuery } from "@/features/tasks/hooks/useTaskQuery";
import { Task } from "@/features/tasks/types";
import { useQueryClient } from "@tanstack/react-query";

import {
  BookOpenTextIcon,
  ClipboardListIcon,
  EditIcon,
  UsersIcon,
} from "lucide-react";
import { useState } from "react";

export const TaskDetailsCard = ({ task: initialTask }: { task: Task }) => {
  const { id } = initialTask;
  const { data: task } = useTaskQuery(id);
  const [editOpen, setEditOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleEdit = () => {
    setEditOpen(true);
  };

  const handleUpdateTask = () => {
    queryClient.invalidateQueries({ queryKey: ["taskBySequenceNumber"] });
  };
  return (
    <>
      <Card className="mx-auto overflow-hidden">
        <CardHeader>
          <CardTitle className="flex justify-between">
            {task && (
              <div className="flex gap-2">
                <Coin value={task?.pointValue || 0} />
                <TaskFrequencyBadge frequency={task?.frequency} size={"sm"} />
                <TaskCategoryBadge category={task?.category} size={"sm"} />
              </div>
            )}
            <span className="text-2xl font-semibold text-accent-foreground">
              {task?.title}
            </span>
            <Button variant="ghost" size="icon" onClick={handleEdit}>
              <EditIcon />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-xl space-y-6">
          <CardSection icon={<ClipboardListIcon />} label="Description">
            {task?.description}
          </CardSection>

          <CardSection icon={<UsersIcon />} label="Assignments">
            <AssignedAvatarGroup taskId={id} />
          </CardSection>

          <CardSection icon={<BookOpenTextIcon />} label="Notes">
            {task?.note || <Button variant="link">Add notes</Button>}
          </CardSection>
        </CardContent>
        <CardFooter className="font-mono text-center">
          <p className="text-center">{task?.id}</p>
        </CardFooter>
      </Card>
      <TaskModal
        modalOpen={editOpen}
        onModalOpenChange={setEditOpen}
        existingTask={task}
        onTaskUpdated={handleUpdateTask}
      />
    </>
  );
};
