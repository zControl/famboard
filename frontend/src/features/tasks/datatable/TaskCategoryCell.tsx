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
import TaskCategoryBadge from "@/features/tasks/components/TaskCategoryBadge";
import { useTaskMutations } from "@/features/tasks/hooks/useTaskMutation";
import { Task, TaskCategory } from "@/types/task";
import { enumToArray } from "@/utils/enumToArray";
import { Row } from "@tanstack/react-table";
import { useState } from "react";

interface TaskCategoryCellProps {
  row: Row<Task>;
}

export const TaskCategoryCell = ({ row }: TaskCategoryCellProps) => {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<TaskCategory>(
    row.original.category,
  );
  const { updateTaskMutation } = useTaskMutations();

  const handleCategoryChange = (category: TaskCategory) => {
    setSelectedCategory(category);
    updateTaskMutation.mutate(
      {
        taskId: row.original.id,
        task: { category },
      },
      {
        onSuccess: () => {
          setOpen(false);
        },
        onError: (error) => {
          console.error("Error updating task category:", error);
          // Revert to original value on error
          setSelectedCategory(row.original.category);
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
                <TaskCategoryBadge size="sm" category={selectedCategory} />
              </TooltipTrigger>
              <TooltipContent>{selectedCategory}</TooltipContent>
            </Tooltip>
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[200px]" side="bottom" align="start">
          <Command>
            <CommandList>
              <CommandGroup>
                {enumToArray(TaskCategory).map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() =>
                      handleCategoryChange(option.value as TaskCategory)
                    }
                    className="flex items-center gap-2"
                  >
                    <TaskCategoryBadge
                      size="sm"
                      category={option.value as TaskCategory}
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
