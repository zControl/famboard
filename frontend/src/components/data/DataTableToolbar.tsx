import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table as ReactTable } from "@tanstack/react-table";

interface DataTableToolbarProps<TData> {
  table: ReactTable<TData>;
}

export const DataTableToolbar = <TData,>({
  table,
}: DataTableToolbarProps<TData>) => {
  return (
    <div className="flex items-center justify-between space-x-2">
      <Input
        placeholder="Search..."
        className="max-w-sm"
        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("name")?.setFilterValue(event.target.value)
        }
      />
      <Button onClick={() => console.log(table.getFilteredRowModel().rows)}>
        Log Rows
      </Button>
    </div>
  );
};
