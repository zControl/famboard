import { SupremeColumnHeader } from "@/components/datatable/headers/SupremeColumnHeader";
import { useKidManager } from "@/features/parents/hooks/useKidManager";
import { AssignedUserAvatar } from "@/features/tasks/components/AssignedUserAvatar";
import { cn } from "@/utils/classNames";
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
  const { kidIds, getKidProfile } = useKidManager();

  if (!column.getCanFilter()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <SupremeColumnHeader
        column={column}
        title="Assigned"
        options={kidIds.map((kidId) => {
          const { data: kidProfile } = getKidProfile(kidId);
          return {
            label: (
              <div className="flex items-center space-x-2">
                <AssignedUserAvatar userId={kidId} />
                <span>{kidProfile?.username}</span>
              </div>
            ),
            value: kidId,
          };
        })}
      />
    </div>
  );
};
