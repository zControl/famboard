import { AscDescSortHeader } from "@/components/datatable/headers/AscDescSortHeader";
import { ColumnFilterDropdown } from "@/components/datatable/headers/ColumnFilterDropdown";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/classNames";
import { Column } from "@tanstack/react-table";
import { useState } from "react";

export interface SupremeColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
  options?: { value: string; label: string }[];
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
        isModified ? "border-l-2 border-blue-500" : "",
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
