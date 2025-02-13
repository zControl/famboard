import { Input } from "@/components/ui/input";
import { useTasks } from "@/features/tasks/hooks/useTasks";
import { Task } from "@/types/task";
import { Row } from "@tanstack/react-table";
import { CheckIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface EditableTextCellProps {
  row: Row<Task>;
}

export const EditableTextCell = ({ row }: EditableTextCellProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(row.original.description);
  const { updateTaskMutation } = useTasks();

  useEffect(() => {
    setValue(row.original.description);
  }, [row.original.description]);

  const handleSave = () => {
    updateTaskMutation.mutate(
      {
        taskId: row.original.id,
        task: { description: value },
      },
      {
        onSuccess: () => {
          console.log("boom");
          setIsEditing(false);
        },
        onError: (error) => {
          console.error("Error updating task:", error);
        },
      },
    );
  };

  const handleCancel = () => {
    setValue(row.original.description);
    setIsEditing(false);
  };
  return (
    <div>
      {isEditing ? (
        <div className="flex items-center gap-1">
          <div className="flex flex-1">
            <Input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              autoFocus
            />
          </div>
          <div className="cursor-pointer">
            <XIcon className="h-4 w-4" onClick={handleCancel} />
            <CheckIcon className="h-4 w-4" onClick={handleSave} />
          </div>
        </div>
      ) : (
        <div
          className="cursor-pointer"
          onClick={() => {
            setIsEditing(true);
          }}
        >
          {row.original.description}
        </div>
      )}
    </div>
  );
};
