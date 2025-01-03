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
import {
  TaskCategorySelector,
  TaskFrequencySelector,
} from "@/features/tasks/components/TaskSelectors";
import {
  Task,
  TaskCategory,
  TaskDifficulty,
  TaskFrequency,
  TaskPriority,
  TaskStatus,
} from "@/types/task";
import { createApiClient } from "@/utils/apiClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const AddTaskModal = () => {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const apiClient = createApiClient("http://localhost:3000/v1");

  const addTaskMutation = useMutation({
    mutationFn: (newTask: Partial<Task>) =>
      apiClient.post<Task>("/tasks", newTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setOpen(false);
    },
    onError: (error) => {
      console.error("Error adding task:", error);
    },
  });

  const handleAddTask = (data: z.infer<typeof formSchema>) => {
    console.log("Adding task");
    addTaskMutation.mutate(data);
    console.log(data);
  };

  const handleCancel = () => {
    console.log("Cancel");
    setOpen(false);
  };

  const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    category: z.nativeEnum(TaskCategory),
    frequency: z.nativeEnum(TaskFrequency),
    difficulty: z.nativeEnum(TaskDifficulty),
    status: z.nativeEnum(TaskStatus),
    priority: z.nativeEnum(TaskPriority),
    note: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: TaskCategory.Personal,
      frequency: TaskFrequency.Daily,
      difficulty: TaskDifficulty.Easy,
      status: TaskStatus.Pending,
      priority: TaskPriority.Low,
      note: "",
    },
  });
  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild onClick={() => setOpen(true)}>
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
            <div className="w-full grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter task title" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the title of the task, keep it short.
                    </FormDescription>
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
                      <Input placeholder="Enter task description" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the task description. Include any special
                      instructions or requirements.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full grid grid-cols-3 gap-2">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <TaskCategorySelector
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormDescription>
                      This is the task description. Include any special
                      instructions or requirements.
                    </FormDescription>
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
                      <TaskFrequencySelector
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormDescription>
                      How often should this task be completed?
                    </FormDescription>
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
