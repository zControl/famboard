import { Button } from "@/common/ui/actions/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/common/ui/data/item";
import { Coin } from "@/common/ui/display/coin";
import { Spinner } from "@/common/ui/feedback/spinner";
import { Textarea } from "@/common/ui/fields/textarea";
import { ActionModal } from "@/common/ui/overlay/ActionModal";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { AssignedTaskItemProps } from "@/features/kids/types";
import { useTaskCompletion } from "@/features/tasks/hooks/useTaskCompletion";
import { SquareCheckBigIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const AssignedTaskItem = ({ task }: AssignedTaskItemProps) => {
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
    <Item variant="outline">
      <ItemMedia>
        <Coin className="size-12" value={task.pointValue} />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{task.title}</ItemTitle>
        <ItemDescription>{task.description}</ItemDescription>
      </ItemContent>
      <ItemActions>
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
            autoFocus
            placeholder="Leave a note if you want...."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full min-h-20 mt-4"
            maxLength={300}
          />
        </ActionModal>
      </ItemActions>
    </Item>
  );
};
