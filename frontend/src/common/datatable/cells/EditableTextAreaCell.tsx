import { Textarea } from "@/common/ui/fields/textarea";
import { ActionModal } from "@/common/ui/overlay/ActionModal";
import { Row } from "@tanstack/react-table";
import { useEffect, useState } from "react";

interface EditableTextAreaCellProps<T> {
  row: Row<T>;
  accessor: keyof T;
  onUpdate: (
    rowId: string | number,
    field: keyof T,
    value: string,
  ) => Promise<void>;
}

export const EditableTextAreaCell = <T extends { id: string | number }>({
  row,
  accessor,
  onUpdate,
}: EditableTextAreaCellProps<T>) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [value, setValue] = useState(row.original[accessor] as string);

  useEffect(() => {
    setValue(row.original[accessor] as string);
  }, [row.original, accessor]);

  // Set the enter key as the blur trigger
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
    onUpdate(row.original.id, accessor, value)
      .then(() => {
        setIsEditing(false);
      })
      .catch((error) => {
        console.error(`Error updating ${String(accessor)}:`, error);
      });
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
              className="max-h-24 overflow-y-auto"
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
          className="cursor-pointer"
          onClick={() => {
            setIsEditing(true);
          }}
        >
          {value}
        </div>
      )}
      <ActionModal
        title="Confirm Save!"
        description={`Changed ${String(accessor).charAt(0).toUpperCase() + String(accessor).slice(1)} from "${row.original[accessor]}" to "${value}"`}
        open={showConfirmation}
        onConfirm={() => handleConfirmSave(true)}
        onCancel={() => handleConfirmSave(false)}
      />
    </>
  );
};
