import { Task } from "@/types/task";
import { Row } from "@tanstack/react-table";

interface TaskAssignmentsCellProps {
  row: Row<Task>;
}

export const TaskAssignmentsCell = ({ row }: TaskAssignmentsCellProps) => {
  return (
    <div>
      <span className="text-muted-foreground">{row.original.difficulty}</span>
    </div>
  );
};
