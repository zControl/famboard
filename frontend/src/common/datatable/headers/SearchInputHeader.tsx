import { Input } from "@/common/ui/fields/input";
import { cn } from "@/common/utils/classNames";
import { Column } from "@tanstack/react-table";
import { XCircleIcon } from "lucide-react";
import { useState } from "react";

interface SearchInputHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export const SearchInputHeader = <TData, TValue>({
  column,
  title,
  className,
}: SearchInputHeaderProps<TData, TValue>) => {
  const [search, setSearch] = useState(false);

  if (!column.getCanFilter()) {
    return <div className={cn(className)}>{title}</div>;
  }
  const handleCloseSearch = () => {
    setSearch(false);
    column.setFilterValue(undefined);
  };

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      {search ? (
        <>
          <div className="cursor-pointer" onClick={handleCloseSearch}>
            <XCircleIcon />
          </div>
          <Input
            type="search"
            value={(column.getFilterValue() as string) ?? ""}
            onChange={(event) => column.setFilterValue(event.target.value)}
            placeholder={`Search ${title}...`}
            className="h-8 w-[80%]"
            autoFocus
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
