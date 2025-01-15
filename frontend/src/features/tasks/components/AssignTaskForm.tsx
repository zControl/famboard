import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { useKidManager } from "@/features/parents/hooks/useKidManager";
import { useAssignments } from "@/features/tasks/hooks/useAssignments";
import { Task } from "@/types/task";
import { Row } from "@tanstack/react-table";
import { useEffect, useState } from "react";

interface AssignTaskFormProps {
  row: Row<Task>;
  onSelectedKidsChange: (selectedKids: string[]) => void;
}

export const AssignTaskForm = ({
  row,
  onSelectedKidsChange,
}: AssignTaskFormProps) => {
  const taskId = row.original.id;
  const { taskAssignments, isLoading: isLoadingAssignments } =
    useAssignments(taskId);
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

  console.log("Selected kids:", selectedKids);

  if (isLoadingAssignments) {
    return <div>Loading assignments...</div>;
  }

  return (
    <div className="flex flex-col space-y-2">
      <p>Looking at assignments of {row.original.id}</p>
      {kidIds.map((kidId) => {
        const { data: kidProfile } = getKidProfile(kidId);
        return (
          <>
            <div key={kidId} className="flex items-center space-x-4 p-2">
              <Checkbox
                checked={selectedKids.includes(kidId)}
                onCheckedChange={(checked) =>
                  handleKidSelection(kidId, checked as boolean)
                }
              />
              <Avatar>
                <AvatarImage
                  src={kidProfile?.avatarUrl}
                  alt={kidProfile?.username}
                />
                <AvatarFallback>
                  {kidProfile?.username?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span>{kidProfile?.username}</span>
            </div>
          </>
        );
      })}
    </div>
  );
};
