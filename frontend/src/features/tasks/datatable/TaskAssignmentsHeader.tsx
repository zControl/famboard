import { SupremeColumnHeader } from "@/common/datatable/headers/SupremeColumnHeader";
import { cn } from "@/common/utils/classNames";
import { useKidManager } from "@/features/parents/hooks/useKidManager";
import { AssignedUserAvatar } from "@/features/tasks/components/AssignedUserAvatar";
import { AssignedUserName } from "@/features/tasks/components/AssignedUserName";
import { Column } from "@tanstack/react-table";

interface TaskAssignmentsHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}
export const TaskAssignmentsHeader = <TData, TValue>({
  column,
  title,
  className,
}: TaskAssignmentsHeaderProps<TData, TValue>) => {
  const { kidIds } = useKidManager();

  if (!column.getCanFilter()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <SupremeColumnHeader
        column={column}
        title="Assigned"
        options={kidIds.map((kidId) => {
          return {
            label: (
              <div className="flex items-center space-x-2">
                <AssignedUserAvatar userId={kidId} />
                <AssignedUserName userId={kidId} />
              </div>
            ),
            value: kidId,
          };
        })}
      />
    </div>
  );
};
