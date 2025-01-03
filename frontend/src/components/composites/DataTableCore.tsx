import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type Table as ReactTable,
} from "@tanstack/react-table";

import { DataTablePagination } from "@/components/composites/DataTablePagination";
import { DataTableViewOptions } from "@/components/composites/DataTableViewOptions";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  toolbar?: React.ReactNode | ((table: ReactTable<TData>) => React.ReactNode);
  caption?: string;
  actions?: React.ReactNode;
}

export const DataTableCore = <TData, TValue>({
  columns,
  data,
  toolbar,
  caption,
  actions,
}: DataTableProps<TData, TValue>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const renderedToolbar =
    typeof toolbar === "function" ? toolbar(table) : toolbar;

  const renderTableHeader = (table: ReactTable<TData>) => {
    return table.getHeaderGroups().map((headerGroup) => (
      <TableRow key={headerGroup.id}>
        {headerGroup.headers.map((header) => (
          <TableHead key={header.id}>
            {header.isPlaceholder
              ? null
              : flexRender(header.column.columnDef.header, header.getContext())}
          </TableHead>
        ))}
      </TableRow>
    ));
  };

  const renderTableBody = (table: ReactTable<TData>) => {
    return table.getRowModel().rows?.length ? (
      table.getRowModel().rows.map((row) => (
        <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
          {row.getVisibleCells().map((cell) => (
            <TableCell key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))
    ) : (
      <TableRow>
        <TableCell colSpan={columns.length} className="h-24 text-center">
          No results.
        </TableCell>
      </TableRow>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>{renderedToolbar}</div>
        <div className="flex items-center">
          <DataTableViewOptions table={table} />
          <div>{actions}</div>
        </div>
      </div>
      <Table>
        <TableHeader>{renderTableHeader(table)}</TableHeader>
        <TableBody>{renderTableBody(table)}</TableBody>
        <TableCaption>{caption}</TableCaption>
      </Table>
      <DataTablePagination table={table} />
    </div>
  );
};
