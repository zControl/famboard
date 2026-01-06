import { SupremeColumnHeader } from "@/common/datatable/headers/SupremeColumnHeader";
import { Label } from "@/common/ui/typography/label";
import { cn } from "@/common/utils/classNames";
import { Column } from "@tanstack/react-table";

interface ApprovalStatusHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
  options: { label: string; value: string }[];
}
export const ApprovalStatusHeader = <TData, TValue>({
  column,
  title,
  className,
  options,
}: ApprovalStatusHeaderProps<TData, TValue>) => {
  if (!column.getCanFilter()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <SupremeColumnHeader
        column={column}
        title={title}
        options={options.map((option) => {
          return {
            label: <Label className="text-xs">{option.label}</Label>,
            value: option.value,
          };
        })}
      />
    </div>
  );
};
