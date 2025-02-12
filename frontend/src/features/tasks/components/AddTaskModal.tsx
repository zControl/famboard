import { EnhancedSelector } from "@/components/composites/EnhancedSelector";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
  TaskCategory,
  TaskDifficulty,
  TaskFrequency,
  TaskPriority,
  TaskStatus,
} from "@/types/task";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const AddTaskModal = () => {
  const [open, setOpen] = React.useState(false);
  const { addTaskMutation } = useTasks();

  const handleAddTask = (data: z.infer<typeof taskListSchema>) => {
    addTaskMutation.mutate(data, {
      onSuccess: () => {
        setOpen(false);
      },
      onError: (error) => {
        console.error("Error adding task:", error);
      },
    });
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const form = useForm<z.infer<typeof taskListSchema>>({
    resolver: zodResolver(taskListSchema),
    defaultValues: {
      title: "",
      description: "",
      pointValue: 0,
      category: TaskCategory.Personal,
      frequency: TaskFrequency.Daily,
      difficulty: TaskDifficulty.Easy,
      status: TaskStatus.Pending,
      priority: TaskPriority.Low,
      note: "",
    },
  });
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="primary">Add new task</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add a new task</AlertDialogTitle>
        </AlertDialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleAddTask)}
            className="space-y-8"
          >
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
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCancel}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={form.handleSubmit(handleAddTask)}>
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
