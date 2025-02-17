import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DetailListItem } from "@/components/ui/list-item";
import { Task } from "@/types/task";

import {
  CalendarCheckIcon,
  ClipboardListIcon,
  ContainerIcon,
  ListTodoIcon,
  PickaxeIcon,
  ReceiptTextIcon,
  ShieldQuestionIcon,
  UsersIcon,
} from "lucide-react";

export const TaskDetailsCard = ({ task }: { task: Task }) => {
  return (
    <Card className="max-w-4xl mx-auto overflow-hidden">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <p className="text-2xl font-semibold text-accent-foreground">
            {task.title}
          </p>
          <div className="flex justify-end">
            <ShieldQuestionIcon />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-xl space-y-6">
        <section className="space-y-2">
          <label>
            <ClipboardListIcon className="inline mr-2" />
            Description
          </label>
          <article className="text-base border border-accent p-4">
            {task.description}
          </article>
        </section>
        <section className="space-y-2">
          <label>
            <UsersIcon className="inline mr-2" />
            Assignments
          </label>
          <article className="border border-accent p-4">
            The assignment component needs to go here
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
              value={task.category}
            />
            <DetailListItem
              icon={<ListTodoIcon />}
              label="Priority"
              value={task.priority}
            />
            <DetailListItem
              icon={<CalendarCheckIcon />}
              label="Frequency"
              value={task.frequency}
            />
            <DetailListItem
              icon={<PickaxeIcon />}
              label="Difficulty"
              value={task.difficulty}
            />
          </article>
        </section>
      </CardContent>
      <CardFooter className="font-mono text-center">
        <p className="text-center">{task.id}</p>
      </CardFooter>
    </Card>
  );
};
