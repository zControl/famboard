import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DetailListItem } from "@/components/ui/list-item";
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
  ListTodoIcon,
  PickaxeIcon,
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
    console.log("Edit button clicked");
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
              Make an assignment component instead of this dumb list.
              {taskAssignments?.map((assignment) => (
                <p key={assignment.id}>{assignment.username}</p>
              ))}
            </article>
          </section>
          <section className="space-y-2">
            <label>
              <ReceiptTextIcon className="inline mr-2" />
              Details
            </label>
            <article className="grid grid-cols-1 md:grid-cols-2 gap-x-8  md:gap-x-12 px-2 md:px-4 border border-accent">
              <DetailListItem
                icon={<ContainerIcon />}
                label="Category"
                value={task?.category}
              />
              <DetailListItem
                icon={<ListTodoIcon />}
                label="Priority"
                value={task?.priority}
              />
              <DetailListItem
                icon={<CalendarCheckIcon />}
                label="Frequency"
                value={task?.frequency}
              />
              <DetailListItem
                icon={<PickaxeIcon />}
                label="Difficulty"
                value={task?.difficulty}
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
