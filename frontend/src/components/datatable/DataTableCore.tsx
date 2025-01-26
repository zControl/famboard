import { TableColumnVisibility } from "@/components/datatable/TableColumnVisibility";
import { TablePagination } from "@/components/datatable/TablePagination";
import {
  renderTableBody,
  renderTableHeader,
} from "@/components/datatable/tableUtils";
import {
  Table,
  TableBody,
  TableCaption,
  TableHeader,
} from "@/components/ui/table";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type Table as ReactTable,
} from "@tanstack/react-table";

interface DataTableCoreProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  actions?: React.ReactNode | ((table: ReactTable<TData>) => React.ReactNode);
  options?: React.ReactNode | ((table: ReactTable<TData>) => React.ReactNode);
  caption?: React.ReactNode | ((table: ReactTable<TData>) => React.ReactNode);
  showPagination?: boolean;
  showColumnVisibility?: boolean;
}

export const DataTableCore = <TData, TValue>({
  columns,
  data,
  actions,
  caption,
  options,
  showPagination = true,
  showColumnVisibility = true,
}: DataTableCoreProps<TData, TValue>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const actionsToolbar =
    typeof actions === "function" ? actions(table) : actions;

  const optionsToolbar =
    typeof options === "function" ? options(table) : options;

  const renderedCaption =
    typeof caption === "function" ? caption(table) : caption;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>{actionsToolbar}</div>
        <div className="flex items-center">
          {showColumnVisibility && <TableColumnVisibility table={table} />}
          <div>{optionsToolbar}</div>
        </div>
      </div>
      <Table>
        <TableHeader className="bg-muted px-2">
          {renderTableHeader(table)}
        </TableHeader>
        <TableBody>{renderTableBody({ table, columns })}</TableBody>
        <TableCaption>{renderedCaption}</TableCaption>
      </Table>
      {showPagination && <TablePagination table={table} />}
    </div>
  );
};
