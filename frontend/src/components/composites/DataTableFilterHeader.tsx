import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Column } from "@tanstack/react-table";

interface DataTableFilterHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableFilterHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableFilterHeaderProps<TData, TValue>) {
  if (!column.getCanFilter()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Input
        type="search"
        value={(column.getFilterValue() as string) ?? ""}
        onChange={(event) => column.setFilterValue(event.target.value)}
        placeholder={`Search ${title}...`}
        className="h-8 w-[150px] lg:w-[250px]"
      />
    </div>
  );
}
