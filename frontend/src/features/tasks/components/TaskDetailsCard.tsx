import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Task } from "@/types/task";

import {
  CalendarCheckIcon,
  ClipboardListIcon,
  ContainerIcon,
  ListTodoIcon,
  PickaxeIcon,
  ShieldQuestionIcon,
  UsersIcon,
} from "lucide-react";

export const TaskDetailsCard = ({ task }: { task: Task }) => {
  return (
    <Card className="max-w-4xl mx-auto overflow-hidden">
      <CardHeader>
        <CardTitle className="flex justify-between">
          {task.title}
          <div className="flex justify-end">
            <ShieldQuestionIcon />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-xl">
        <div className="space-y-4">
          {task.category && (
            <div className="flex flex-row">
              <div className="w-1/5">
                <ContainerIcon className="inline mr-2" />
                <span>Category</span>
              </div>
              <div>{task.category}</div>
            </div>
          )}
          {task.priority && (
            <div className="flex flex-row">
              <div className="w-1/5">
                <ListTodoIcon className="inline mr-2" />
                <span>Priority</span>
              </div>
              <div>{task.priority}</div>
            </div>
          )}
          {task.frequency && (
            <div className="flex flex-row">
              <div className="w-1/5">
                <CalendarCheckIcon className="inline mr-2" />
                <span>Frequency</span>
              </div>
              <div>{task.frequency}</div>
            </div>
          )}
          {task.difficulty && (
            <div className="flex flex-row">
              <div className="w-1/5">
                <PickaxeIcon className="inline mr-2" />
                <span>Difficulty</span>
              </div>
              <div>{task.difficulty}</div>
            </div>
          )}
          {task.description && (
            <section className="space-y-2">
              <label>
                <ClipboardListIcon className="inline mr-2" />
                Description
              </label>
              <article className="text-base border border-accent p-4">
                {task.description}
              </article>
            </section>
          )}
          <section className="space-y-2">
            <label>
              <UsersIcon className="inline mr-2" />
              Assignments
            </label>
            <article className="border border-accent p-4">
              The assignment component needs to go here
            </article>
          </section>
        </div>
      </CardContent>
      <CardFooter className="p-4 font-mono">
        <div>ID: {task.id}</div>
      </CardFooter>
    </Card>
  );
};
