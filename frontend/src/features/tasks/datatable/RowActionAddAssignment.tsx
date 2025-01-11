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
import { Task } from "@/types/task";
import { Row } from "@tanstack/react-table";
import { UserPlus2 } from "lucide-react";

interface RowActionAddAssignmentProps {
  row: Row<Task>;
}

export const RowActionAddAssignment = ({
  row,
}: RowActionAddAssignmentProps) => {
  const handleAssignTask = () => {
    console.log("Assigning task for", row.original.title);
    // mutation here
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
          <AlertDialogTitle>
            Assignments for {row.original.title}
          </AlertDialogTitle>
        </AlertDialogHeader>
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
