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
import { Task } from "@/types/task";
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
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setOpen(false);
    },
    onError: (error) => {
      console.error("Error adding task:", error);
      // Handle error (e.g., show an error message)
    },
  });

  const handleAddTask = (data: z.infer<typeof formSchema>) => {
    addTaskMutation.mutate(data);
  };

  const handleCancel = () => {
    console.log("Cancel");
    setOpen(false);
  };

  const formSchema = z.object({
    title: z.string(),
    description: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
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
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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
