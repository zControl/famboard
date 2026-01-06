import { Textarea } from "@/common/ui/fields/textarea";
import { ActionModal } from "@/common/ui/overlay/ActionModal";
import { useTaskMutations } from "@/features/tasks/hooks/useTaskMutations";
import { Task } from "@/features/tasks/types";
import { Row } from "@tanstack/react-table";
import { useEffect, useState } from "react";

interface EditableTextCellProps {
  row: Row<Task>;
  accessor: keyof Task;
}

export const EditableTextCell = ({ row, accessor }: EditableTextCellProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [value, setValue] = useState(row.original[accessor] as string);
  const { updateTaskMutation } = useTaskMutations();

  useEffect(() => {
    setValue(row.original[accessor] as string);
  }, [row.original, accessor]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleBlur();
    }
  };

  const handleBlur = () => {
    if (value !== row.original[accessor]) {
      setShowConfirmation(true);
    } else {
      setIsEditing(false);
    }
  };

  const handleConfirmSave = (confirmed: boolean) => {
    if (confirmed) {
      handleSave();
    } else {
      handleCancel();
    }
    setShowConfirmation(false);
  };

  const handleSave = () => {
    updateTaskMutation.mutate(
      {
        taskId: row.original.id,
        task: { [accessor]: value },
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
        onError: (error) => {
          console.error(`Error updating task ${accessor}:`, error);
        },
      },
    );
  };

  const handleCancel = () => {
    setValue(row.original[accessor] as string);
    setIsEditing(false);
  };
  return (
    <>
      {isEditing ? (
        <div className="flex items-center gap-1">
          <div className="flex flex-1">
            <Textarea
              className="max-h-24 w-[300px] resize-none overflow-y-auto"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          </div>
        </div>
      ) : (
        <div
          className="max-w-[250px] truncate cursor-pointer"
          onClick={() => {
            setIsEditing(true);
          }}
        >
          {value}
        </div>
      )}
      <ActionModal
        title="Confirm Save!"
        description={`Changed ${accessor.charAt(0).toUpperCase() + accessor.slice(1)} from "${row.original[accessor]}" to "${value}"`}
        open={showConfirmation}
        onConfirm={() => handleConfirmSave(true)}
        onCancel={() => handleConfirmSave(false)}
      />
    </>
  );
};
