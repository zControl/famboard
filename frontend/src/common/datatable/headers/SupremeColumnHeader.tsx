import { AscDescSortHeader } from "@/common/datatable/headers/AscDescSortHeader";
import { ColumnFilterDropdown } from "@/common/datatable/headers/ColumnFilterDropdown";
import { Option } from "@/common/types";
import { Button } from "@/common/ui/actions/button";
import { cn } from "@/common/utils/classNames";
import { Column } from "@tanstack/react-table";
import { useState } from "react";

export interface SupremeColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
  options?: Option[];
}

export const SupremeColumnHeader = <TData, TValue>({
  column,
  title,
  options,
}: SupremeColumnHeaderProps<TData, TValue>) => {
  const [toolsOpen, setToolsOpen] = useState(false);

  const handleToggleTools = () => {
    if (toolsOpen) {
      setToolsOpen(false);
      column.setFilterValue(undefined);
      column.clearSorting();
    } else {
      setToolsOpen(true);
    }
  };

  const isModified =
    column.getIsSorted() || column.getFilterValue() !== undefined;

  return (
    <div
      className={cn(
        "flex items-center justify-center",
        isModified ? "pl-2 border-l-2 border-blue-500" : "",
      )}
    >
      {toolsOpen && (
        <div className="flex items-center pr-2">
          <AscDescSortHeader column={column} />
          {options && (
            <ColumnFilterDropdown column={column} options={options} />
          )}
        </div>
      )}
      <Button variant="ghost" size="tight" onClick={handleToggleTools}>
        {title}
      </Button>
    </div>
  );
};
