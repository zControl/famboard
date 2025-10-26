import { useKidManager } from "@/features/parents/hooks/useKidManager";
import { AssignedUserAvatar } from "@/features/tasks/components/AssignedUserAvatar";
import { AssignedUserName } from "@/features/tasks/components/AssignedUserName";
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
  const { kidIds } = useKidManager();
  const [selectedKids, setSelectedKids] = useState<string[]>([]);

  useEffect(() => {
    if (taskAssignments) {
      const initialSelectedKids = taskAssignments
        .map((assignment) => assignment.id)
        .filter(Boolean); // Filter out any undefined IDs
      setSelectedKids(initialSelectedKids);
    }
  }, [taskAssignments]);

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
        if (!kidId) {
          console.warn("Encountered undefined kidId");
          return null;
        }
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
            <AssignedUserName userId={kidId} />
          </div>
        );
      })}
    </div>
  );
};
