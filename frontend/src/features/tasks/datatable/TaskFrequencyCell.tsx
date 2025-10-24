import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import TaskFrequencyBadge from "@/features/tasks/components/TaskFrequencyBadge";
import { useTasks } from "@/features/tasks/hooks/useTasks";
import { Task, TaskFrequency } from "@/types/task";
import { enumToArray } from "@/utils/enumToArray";
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
  const { updateTaskMutation } = useTasks();

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
            <Tooltip>
              <TooltipTrigger>
                <TaskFrequencyBadge size="sm" category={selectedFrequency} />
              </TooltipTrigger>
              <TooltipContent>{selectedFrequency}</TooltipContent>
            </Tooltip>
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
                      category={option.value as TaskFrequency}
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
