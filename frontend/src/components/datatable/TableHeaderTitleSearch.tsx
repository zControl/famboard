import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Column } from "@tanstack/react-table";
import { useState } from "react";

interface TableHeaderTitleSearchProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export const TableHeaderTitleSearch = <TData, TValue>({
  column,
  title,
  className,
}: TableHeaderTitleSearchProps<TData, TValue>) => {
  const [search, setSearch] = useState(false);

  if (!column.getCanFilter()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      {search ? (
        <>
          <div className="cursor-pointer" onClick={() => setSearch(false)}>
            X
          </div>
          <Input
            type="search"
            value={(column.getFilterValue() as string) ?? ""}
            onChange={(event) => column.setFilterValue(event.target.value)}
            placeholder={`Search ${title}...`}
            className="h-8 w-[80%]"
          />
        </>
      ) : (
        <div className="cursor-pointer" onClick={() => setSearch(true)}>
          {title}
        </div>
      )}
    </div>
  );
};
