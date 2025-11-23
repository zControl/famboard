import { ActionModal } from "@/common/ui/overlay/ActionModal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Coin } from "@/components/ui/coin";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useTaskCompletion } from "@/features/tasks/hooks/useTaskCompletion";
import { AssignedTask } from "@/features/tasks/types";
import { SquareCheckBigIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface AssignedTaskCardProps {
  task: AssignedTask;
}

export const AssignedTaskCard = ({ task }: AssignedTaskCardProps) => {
  const { user } = useAuth();
  const { completeTaskMutation, isCompleting } = useTaskCompletion();
  const [note, setNote] = useState("");

  const handleTaskCompletion = () => {
    if (!user?.id) return;
    completeTaskMutation.mutate(
      {
        taskId: task.taskId,
        userId: user.id,
        pointsPossible: task.pointValue,
        note: note,
      },
      {
        onSuccess: () => {
          toast.success("Task marked as complete!");
          setNote("");
        },
        onError: (error) => {
          toast.error("Failed to complete task.");
          console.error(error);
        },
      },
    );
  };

  return (
    <Card className="p-2 gap-0 h-full">
      <CardHeader className="px-1">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-2">
          <Coin className="size-8" value={task.pointValue} />
          <div className="flex flex-col space-y-1 grow">
            <CardTitle className="p-0">{task.title}</CardTitle>
            <CardDescription className="p-0">{task.frequency}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col p-0 flex-1">
        <CardDescription className="overflow-x-auto max-h-20 overflow-y-auto">
          {task.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="mt-auto pt-2 px-0">
        <div className="flex gap-2 w-full justify-end">
          <ActionModal
            trigger={
              <Button variant="primary">
                {isCompleting ? <Spinner size="sm" /> : <SquareCheckBigIcon />}
              </Button>
            }
            title={`Did you complete "${task.title}"?`}
            description={`This will earn you ${task.pointValue} points!`}
            onConfirm={() => handleTaskCompletion()}
            onCancel={() => console.log("Cancel")}
          >
            <Textarea
              placeholder="Leave a note if you want...."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full min-h-20 mt-4"
              maxLength={300}
            />
          </ActionModal>
        </div>
      </CardFooter>
    </Card>
  );
};
