import { ActionModal } from "@/components/composites/ActionModal";
import { EnhancedSelector } from "@/components/composites/EnhancedSelector";
import { ValueSlider } from "@/components/composites/ValueSlider";
import {
  Form,
  FormControl,
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
  TaskFrequency,
  TaskPriority,
  TaskStatus,
} from "@/types/task";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface TaskModalProps {
  modalOpen: boolean;
  onModalOpenChange: (open: boolean) => void;
  existingTask?: Task;
  onTaskUpdated?: () => void;
}
export const TaskModal = ({
  modalOpen,
  onModalOpenChange,
  existingTask,
  onTaskUpdated,
}: TaskModalProps) => {
  const { addTaskMutation, updateTaskMutation } = useTasks();

  const isEditing = !!existingTask;

  const defaultValues = useMemo(
    () => ({
      title: existingTask?.title || "",
      description: existingTask?.description || "",
      pointValue: existingTask?.pointValue || 0,
      category: existingTask?.category || TaskCategory.Household,
      frequency: existingTask?.frequency || TaskFrequency.Daily,
      status: existingTask?.status || TaskStatus.Active,
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
            onModalOpenChange(false);
            onTaskUpdated?.();
          },
          onError: (error) => {
            console.error(`Error updating task:`, error);
          },
        },
      );
    } else {
      addTaskMutation.mutate(data, {
        onSuccess: () => {
          onModalOpenChange(false);
        },
        onError: (error) => {
          console.error(`Error adding task:`, error);
        },
      });
    }
  };
  const handleCancel = () => {
    onModalOpenChange(false);
  };

  const form = useForm<z.infer<typeof taskListSchema>>({
    resolver: zodResolver(taskListSchema),
    defaultValues,
  });

  useEffect(() => {
    if (modalOpen) {
      form.reset(defaultValues);
    }
  }, [modalOpen, form, defaultValues]);

  const modalTitle = isEditing ? "Edit task" : "Add task";
  const modalDescription = isEditing
    ? `Edit task "${existingTask?.sequenceNumber}"`
    : "Add a new task and set initial values";

  return (
    <>
      <ActionModal
        open={modalOpen}
        onOpenChange={onModalOpenChange}
        onCancel={handleCancel}
        onConfirm={form.handleSubmit(handleSubmit)}
        title={modalTitle}
        description={modalDescription}
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
                    <div className="flex flex-col pt-4">
                      <ValueSlider
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                    </div>
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
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter a note about this task."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </ActionModal>
    </>
  );
};
