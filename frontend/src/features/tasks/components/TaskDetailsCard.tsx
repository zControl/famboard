import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DetailListItem } from "@/components/ui/list-item";
import { AssignedUserAvatar } from "@/features/tasks/components/AssignedUserAvatar";
import { TaskModal } from "@/features/tasks/components/TaskModal";
import { useAssignments } from "@/features/tasks/hooks/useAssignments";
import { useTaskBySequenceNumber } from "@/features/tasks/hooks/useTasks";
import { Task } from "@/types/task";

import {
  BookOpenTextIcon,
  CalendarCheckIcon,
  ClipboardListIcon,
  ContainerIcon,
  EditIcon,
  ReceiptTextIcon,
  UsersIcon,
} from "lucide-react";
import { useState } from "react";

export const TaskDetailsCard = ({ task: initialTask }: { task: Task }) => {
  const { sequenceNumber } = initialTask;
  const { data: task, refetch } = useTaskBySequenceNumber(
    sequenceNumber.toString(),
  );
  const { taskAssignments } = useAssignments(task?.id || "");
  const [editOpen, setEditOpen] = useState(false);

  const handleEdit = () => {
    setEditOpen(true);
  };
  return (
    <>
      <Card className="max-w-4xl mx-auto overflow-hidden">
        <CardHeader>
          <CardTitle className="flex justify-between">
            <p className="text-2xl font-semibold text-accent-foreground">
              {task?.title}
            </p>
            <Button variant="ghost" size="icon" onClick={handleEdit}>
              <EditIcon />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-xl space-y-6">
          <section className="space-y-2">
            <label>
              <ClipboardListIcon className="inline mr-2" />
              Description
            </label>
            <article className="text-base border border-accent p-4">
              {task?.description}
            </article>
          </section>
          <section className="space-y-2">
            <label>
              <UsersIcon className="inline mr-2" />
              Assignments
            </label>
            <article className="border border-accent p-4">
              <div className="flex py-2 space-x-2 justify-around">
                {taskAssignments?.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="flex flex-col gap-4 place-items-center"
                  >
                    <AssignedUserAvatar
                      key={assignment.id}
                      userId={assignment.id}
                    />
                    <p className="text-center">{assignment.username}</p>
                  </div>
                ))}
              </div>
            </article>
          </section>
          <section className="space-y-2">
            <label>
              <ReceiptTextIcon className="inline mr-2" />
              Details
            </label>
            <article className="grid grid-cols-1 md:grid-cols-2 md:gap-x-12 px-2 md:px-4 py-4 border border-border gap-2">
              <DetailListItem
                icon={<ContainerIcon />}
                label="Category"
                value={task?.category}
              />
              <DetailListItem
                icon={<CalendarCheckIcon />}
                label="Frequency"
                value={task?.frequency}
              />
            </article>
          </section>
          <section className="space-y-2">
            <label>
              <BookOpenTextIcon className="inline mr-2" />
              Notes
            </label>
            {task?.note ? (
              <article className="border border-accent p-4">
                {task?.note}
              </article>
            ) : (
              <article className="border border-accent p-4">
                <Button variant="link">Add notes</Button>
              </article>
            )}
          </section>
        </CardContent>
        <CardFooter className="font-mono text-center">
          <p className="text-center">{task?.id}</p>
        </CardFooter>
      </Card>
      <TaskModal
        modalOpen={editOpen}
        onModalOpenChange={setEditOpen}
        existingTask={task}
        onTaskUpdated={() => refetch()}
      />
    </>
  );
};
