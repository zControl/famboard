import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/common/ui/overlay/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/common/ui/overlay/popover";
import { enumToArray } from "@/common/utils/enumToArray";
import TaskFrequencyBadge from "@/features/tasks/components/TaskFrequencyBadge";
import { useTaskMutations } from "@/features/tasks/hooks/useTaskMutations";
import { Task, TaskFrequency } from "@/features/tasks/types";
import { Row } from "@tanstack/react-table";
import { useState } from "react";

interface TaskFrequencyCellProps {
  row: Row<Task>;
}

export const TaskFrequencyCell = ({ row }: TaskFrequencyCellProps) => {
  const [open, setOpen] = useState(false);
  const [selectedFrequency, setSelectedFrequency] = useState<TaskFrequency>(
    row.original.frequency,
  );
  const { updateTaskMutation } = useTaskMutations();

  const handleCategoryChange = (frequency: TaskFrequency) => {
    setSelectedFrequency(frequency);
    updateTaskMutation.mutate(
      {
        taskId: row.original.id,
        task: { frequency },
      },
      {
        onSuccess: () => {
          setOpen(false);
        },
        onError: (error) => {
          console.error("Error updating task category:", error);
          // Revert to original value on error
          setSelectedFrequency(row.original.frequency);
        },
      },
    );
  };

  return (
    <div className="flex items-end justify-end">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="cursor-pointer flex items-center">
            <TaskFrequencyBadge size="sm" frequency={selectedFrequency} />
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[200px]" side="bottom" align="start">
          <Command>
            <CommandList>
              <CommandGroup>
                {enumToArray(TaskFrequency).map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() =>
                      handleCategoryChange(option.value as TaskFrequency)
                    }
                    className="flex items-center gap-2"
                  >
                    <TaskFrequencyBadge
                      size="sm"
                      frequency={option.value as TaskFrequency}
                    />
                    <span>{option.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
