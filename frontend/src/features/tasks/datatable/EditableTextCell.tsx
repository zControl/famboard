import { Input } from "@/components/ui/input";
import { useTasks } from "@/features/tasks/hooks/useTasks";
import { Task } from "@/types/task";
import { Row } from "@tanstack/react-table";
import { CheckIcon, XIcon } from "lucide-react";
import { useState } from "react";

interface EditableTextCellProps {
  row: Row<Task>;
}

export const EditableTextCell = ({ row }: EditableTextCellProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(row.original.description);
  const { updateTaskMutation } = useTasks();

  const handleSave = (newValue: string) => {
    updateTaskMutation.mutate({
      taskId: row.original.id,
      task: { description: newValue },
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
  };
  // THIS IS CURSED, IT IS NOT UPDATING THE CORRECT DESCRIPTIONS.
  return (
    <div>
      {isEditing ? (
        <div className="flex items-center gap-1">
          <div className="flex flex-1">
            <Input
              type="text"
              defaultValue={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <div className="cursor-pointer">
            <XIcon className="h-4 w-4" onClick={handleCancel} />
            <CheckIcon
              className="h-4 w-4"
              onClick={() => handleSave(value ?? "")}
            />
          </div>
        </div>
      ) : (
        <div className="cursor-pointer" onClick={() => setIsEditing(true)}>
          {row.original.description}
        </div>
      )}
    </div>
  );
};
