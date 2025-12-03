import { useKidManager } from "@/features/parents/hooks/useKidManager";
import { AssignedUserAvatar } from "@/features/tasks/components/AssignedUserAvatar";
import { AssignedUserName } from "@/features/tasks/components/AssignedUserName";
import { useTaskAssignments } from "@/features/tasks/hooks/useTaskAssignments";
import { Task } from "@/features/tasks/types";
import { Row } from "@tanstack/react-table";
import { useEffect, useState } from "react";

interface AssignedUserSelectionProps {
  row: Row<Task>;
  assignments: { id: string; user: { id: string } }[];
  onSelectedKidsChange: (selectedKids: string[]) => void;
}

export const AssignedUserSelection = ({
  row,
  assignments,
  onSelectedKidsChange,
}: AssignedUserSelectionProps) => {
  const taskId = row.original.id;
  const initialSelectedKids = assignments
    ? assignments.map((assignment) => assignment.user.id).filter(Boolean)
    : [];
  const { taskAssignments } = useTaskAssignments(taskId);
  const { kidIds } = useKidManager();
  const [selectedKids, setSelectedKids] =
    useState<string[]>(initialSelectedKids);

  useEffect(() => {
    if (!assignments && taskAssignments) {
      const newSelectedKids = taskAssignments
        .map((assignment) => assignment.id)
        .filter(Boolean);
      setSelectedKids(newSelectedKids);
    }
  }, [taskAssignments, assignments]);

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
