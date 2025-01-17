import { useKidManager } from "@/features/parents/hooks/useKidManager";
import { AssignedUserAvatar } from "@/features/tasks/components/AssignedUserAvatar";
import { useAssignments } from "@/features/tasks/hooks/useAssignments";
import { Task } from "@/types/task";
import { Row } from "@tanstack/react-table";
import { useEffect, useState } from "react";

interface AssignedUserSelectionProps {
  row: Row<Task>;
  onSelectedKidsChange: (selectedKids: string[]) => void;
}

export const AssignedUserSelection = ({
  row,
  onSelectedKidsChange,
}: AssignedUserSelectionProps) => {
  const taskId = row.original.id;
  const { taskAssignments } = useAssignments(taskId);
  const { kidIds, getKidProfile } = useKidManager();
  const [selectedKids, setSelectedKids] = useState<string[]>([]);

  useEffect(() => {
    if (taskAssignments) {
      const initialSelectedKids = taskAssignments.map(
        (assignment) => assignment.id,
      );
      setSelectedKids(initialSelectedKids);
      onSelectedKidsChange(initialSelectedKids);
    }
  }, [taskAssignments, onSelectedKidsChange]);

  const handleKidSelection = (kidId: string, isSelected: boolean) => {
    const newSelectedKids = isSelected
      ? [...selectedKids, kidId]
      : selectedKids.filter((id) => id !== kidId);

    setSelectedKids(newSelectedKids);
    onSelectedKidsChange(newSelectedKids);
  };

  return (
    <div className="flex flex-col space-y-4 w-3/4 mx-auto mb-4">
      {kidIds.map((kidId) => {
        const { data: kidProfile } = getKidProfile(kidId);
        const isSelected = selectedKids.includes(kidId);
        return (
          <div
            key={kidId}
            className={`flex items-center space-x-4 p-4 cursor-pointer border-2 ${
              isSelected ? "border-highlight" : "border-muted-foreground"
            }`}
            onClick={() => handleKidSelection(kidId, !isSelected)}
          >
            <AssignedUserAvatar userId={kidId} />
            <span>{kidProfile?.username}</span>
          </div>
        );
      })}
    </div>
  );
};
