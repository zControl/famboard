import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useKidManager } from "@/features/parents/hooks/useKidManager";

import { Checkbox } from "@/components/ui/checkbox";
import { assignMultipleUsersToTask } from "@/features/tasks/api/taskApi";
import { Task } from "@/types/task";
import { Row } from "@tanstack/react-table";
import { UserPlus2 } from "lucide-react";
import { useState } from "react";

interface RowActionAddAssignmentProps {
  row: Row<Task>;
}

export const RowActionAddAssignment = ({
  row,
}: RowActionAddAssignmentProps) => {
  const { kidIds, getKidProfile } = useKidManager();
  const [selectedKids, setSelectedKids] = useState<string[]>([]);
  const handleAssignTask = () => {
    console.log("Assigning task for", row.original.id, "to", selectedKids);
    try {
      assignMultipleUsersToTask(row.original.id, selectedKids);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCancel = () => {
    console.log("Cancel");
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <UserPlus2 size={20} className="cursor-pointer text-muted-foreground" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Assign {row.original.title}</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex flex-col items-center space-y-2 p-2">
          <div className="flex flex-col space-y-2">
            {kidIds.map((kidId) => {
              const { data: kidProfile } = getKidProfile(kidId);
              return (
                <div key={kidId} className="flex items-center space-x-4 p-2">
                  <Checkbox
                    checked={selectedKids.includes(kidId)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedKids((prev) => [...prev, kidId]);
                      } else {
                        setSelectedKids((prev) =>
                          prev.filter((id) => id !== kidId),
                        );
                      }
                    }}
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
              );
            })}
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleAssignTask}>
            Assign
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
