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
import TaskCategoryBadge from "@/features/tasks/components/TaskCategoryBadge";
import { useTaskMutations } from "@/features/tasks/hooks/useTaskMutations";
import { Task, TaskCategory } from "@/features/tasks/types";
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
            <TaskCategoryBadge size="sm" category={selectedCategory} />
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
