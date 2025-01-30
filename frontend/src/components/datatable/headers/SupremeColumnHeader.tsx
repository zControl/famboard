import { AscDescSortHeader } from "@/components/datatable/headers/AscDescSortHeader";
import { SearchInputHeader } from "@/components/datatable/headers/SearchInputHeader";
import { cn } from "@/lib/utils";
import { Column } from "@tanstack/react-table";

export interface SupremeColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export const SupremeColumnHeader = <TData, TValue>({
  column,
  title,
  className,
}: SupremeColumnHeaderProps<TData, TValue>) => {
  // no filter or sort, just return title
  if (!column.getCanFilter() && !column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }
  // no filter but can sort, return title and sort icons
  if (!column.getCanFilter() && column.getCanSort()) {
    return <AscDescSortHeader column={column} title={title} />;
  }
  // can filter but not sort, return searh input
  if (column.getCanFilter() && !column.getCanSort()) {
    return <SearchInputHeader column={column} title={title} />;
  }

  // can filter and sort, return search input and sort icon
  return (
    <div className="flex items-center justify-center">
      <SearchInputHeader column={column} title={title} />
      <AscDescSortHeader column={column} />
    </div>
  );
};
