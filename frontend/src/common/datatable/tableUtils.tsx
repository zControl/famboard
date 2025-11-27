import { TableCell, TableHead, TableRow } from "@/common/ui/data/table";
import {
  ColumnDef,
  flexRender,
  Table as ReactTable,
} from "@tanstack/react-table";

export const renderTableHeader = <TData,>(table: ReactTable<TData>) => {
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

export const renderTableBody = <TData, TValue>({
  table,
  columns,
}: {
  table: ReactTable<TData>;
  columns: ColumnDef<TData, TValue>[];
}) => {
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
