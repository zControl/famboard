import { ActionModal } from "@/components/composites/ActionModal";
import { EnhancedSelector } from "@/components/composites/EnhancedSelector";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { taskListSchema } from "@/features/tasks/datatable/TaskListSchema";
import { useTasks } from "@/features/tasks/hooks/useTasks";
import {
  Task,
  TaskCategory,
  TaskDifficulty,
  TaskFrequency,
  TaskPriority,
  TaskStatus,
} from "@/types/task";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface TaskModalProps {
  existingTask?: Task;
}
export const TaskModal = ({ existingTask }: TaskModalProps) => {
  const [open, setOpen] = useState(false);
  const { addTaskMutation, updateTaskMutation } = useTasks();

  const isEditing = !!existingTask;

  const defaultValues = useMemo(
    () => ({
      title: existingTask?.title || "",
      description: existingTask?.description || "",
      pointValue: existingTask?.pointValue || 0,
      category: existingTask?.category || TaskCategory.Personal,
      frequency: existingTask?.frequency || TaskFrequency.Daily,
      difficulty: existingTask?.difficulty || TaskDifficulty.Easy,
      status: existingTask?.status || TaskStatus.Pending,
      priority: existingTask?.priority || TaskPriority.Low,
      note: existingTask?.note || "",
    }),
    [existingTask],
  );

  const handleSubmit = (data: z.infer<typeof taskListSchema>) => {
    if (isEditing) {
      updateTaskMutation.mutate(
        { taskId: existingTask.id, task: data },
        {
          onSuccess: () => {
            setOpen(false);
          },
          onError: (error) => {
            console.error(`Error updating task:`, error);
          },
        },
      );
    } else {
      addTaskMutation.mutate(data, {
        onSuccess: () => {
          setOpen(false);
        },
        onError: (error) => {
          console.error(`Error adding task:`, error);
        },
      });
    }
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const form = useForm<z.infer<typeof taskListSchema>>({
    resolver: zodResolver(taskListSchema),
    defaultValues,
  });

  useEffect(() => {
    if (open) {
      form.reset(defaultValues);
    }
  }, [open, form, defaultValues]);

  const modalTitle = isEditing ? "Edit task" : "Add a new task";
  const modalDescription = isEditing
    ? "Edit the existing task"
    : "Add a new task to your task list";
  const triggerButtonText = isEditing ? "Edit task" : "Add new task";

  return (
    <>
      <ActionModal
        open={open}
        onOpenChange={setOpen}
        onCancel={handleCancel}
        onConfirm={form.handleSubmit(handleSubmit)}
        title={modalTitle}
        description={modalDescription}
        trigger={<Button variant="primary">{triggerButtonText}</Button>}
      >
        <Form {...form}>
          <form className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter task title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter task description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pointValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Point Value</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <EnhancedSelector
                        value={field.value}
                        onChange={field.onChange}
                        enumType={TaskCategory}
                        triggerText="Category"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frequency</FormLabel>
                    <FormControl>
                      <EnhancedSelector
                        value={field.value}
                        onChange={field.onChange}
                        enumType={TaskFrequency}
                        triggerText="Frequency"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Difficulty</FormLabel>
                    <FormControl>
                      <EnhancedSelector
                        value={field.value}
                        onChange={field.onChange}
                        enumType={TaskDifficulty}
                        triggerText="Difficulty"
                      />
                    </FormControl>
                    <FormDescription>
                      How often should this task be completed?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <EnhancedSelector
                        value={field.value}
                        onChange={field.onChange}
                        enumType={TaskStatus}
                        triggerText="Status"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <FormControl>
                      <EnhancedSelector
                        value={field.value}
                        onChange={field.onChange}
                        enumType={TaskPriority}
                        triggerText="Priority"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </ActionModal>
    </>
  );
};
