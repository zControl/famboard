import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { RefreshCcw } from "lucide-react";

export const TaskListActions = () => {
  const queryClient = useQueryClient();
  return (
    <Button
      variant={"ghost"}
      onClick={() => queryClient.invalidateQueries({ queryKey: ["tasks"] })}
    >
      <RefreshCcw />
    </Button>
  );
};
