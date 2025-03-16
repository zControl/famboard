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
import { cn } from "@/lib/utils";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  TableState,
  useReactTable,
  type Table as ReactTable,
} from "@tanstack/react-table";

interface DataTableCoreProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  actions?: React.ReactNode | ((table: ReactTable<TData>) => React.ReactNode);
  options?: React.ReactNode | ((table: ReactTable<TData>) => React.ReactNode);
  caption?: React.ReactNode | ((table: ReactTable<TData>) => React.ReactNode);
  headerClassName?: string;
  showPagination?: boolean;
  showColumnVisibility?: boolean;
  initialState?: Partial<TableState>;
}

export const DataTableCore = <TData, TValue>({
  columns,
  data,
  actions,
  caption,
  options,
  headerClassName,
  showPagination = true,
  showColumnVisibility = true,
  initialState,
}: DataTableCoreProps<TData, TValue>) => {
  const table = useReactTable({
    data,
    columns,
    initialState,
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
        <div className="flex items-center">
          {showColumnVisibility && <TableColumnVisibility table={table} />}
          {optionsToolbar}
        </div>
        <div>{actionsToolbar}</div>
      </div>
      <Table>
        <TableHeader className={cn("bg-muted px-2", headerClassName)}>
          {renderTableHeader(table)}
        </TableHeader>
        <TableBody>{renderTableBody({ table, columns })}</TableBody>
        <TableCaption>{renderedCaption}</TableCaption>
      </Table>
      {showPagination && <TablePagination table={table} />}
    </div>
  );
};
