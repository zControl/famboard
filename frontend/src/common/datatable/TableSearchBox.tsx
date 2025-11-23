import { Button } from "@/common/ui/actions/button";
import { Input } from "@/common/ui/fields/input";
import { Table as ReactTable } from "@tanstack/react-table";

interface TableSearchBoxProps<TData> {
  table: ReactTable<TData>;
}

export const TableSearchBox = <TData,>({
  table,
}: TableSearchBoxProps<TData>) => {
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
