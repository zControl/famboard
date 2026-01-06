import { TableColumnVisibility } from "@/common/datatable/TableColumnVisibility";
import { TablePagination } from "@/common/datatable/TablePagination";
import {
  renderTableBody,
  renderTableHeader,
} from "@/common/datatable/tableUtils";
import {
  Table,
  TableBody,
  TableCaption,
  TableHeader,
} from "@/common/ui/data/table";
import { Header4 } from "@/common/ui/typography/typography";
import { cn } from "@/common/utils/classNames";
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
import React from "react";

interface DataTableCoreProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  title?: React.ReactNode;
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
  title,
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
      <Header4 className="mb-0 text-center">{title}</Header4>
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
