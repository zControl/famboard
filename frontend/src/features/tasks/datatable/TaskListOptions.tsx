import { Button } from "@/components/ui/button";
import { useTasks } from "@/features/tasks/hooks/useTasks";
import { RefreshCcw } from "lucide-react";

export const TaskListOptions = () => {
  const { refreshTasks } = useTasks();
  return (
    <Button variant={"ghost"} onClick={refreshTasks}>
      <RefreshCcw />
    </Button>
  );
};
