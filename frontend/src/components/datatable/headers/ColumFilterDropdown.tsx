import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Option } from "@/types/common";
import { Column } from "@tanstack/react-table";
import { FilterIcon, XCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface ColumnFilterDropdownProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  column: Column<TData, TValue>;
  options: Option[];
}

export const ColumFilterDropdown = <TData, TValue>({
  title,
  column,
  options,
  className,
}: ColumnFilterDropdownProps<TData, TValue>) => {
  const [open, setOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleSelection = (value: string) => {
    setSelectedOptions((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  useEffect(() => {
    console.log("selectedOptions", selectedOptions);
    column.setFilterValue(selectedOptions.length ? selectedOptions : undefined);
  }, [selectedOptions, column]);

  const handleSearchInput = (value: string) => {
    console.log("value", value);
  };

  if (!column.getCanFilter()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost">
            <FilterIcon className="mr-2 h-4 w-4" />
            {title}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-0 min-w-[150px] max-w-[300px]"
          side="bottom"
          align="center"
        >
          <div className="flex items-center space-x-2">
            <XCircleIcon />
            <Input
              type="search"
              value={(column.getFilterValue() as string) ?? ""}
              onChange={(event) => handleSearchInput(event.target.value)}
              placeholder={`Search ${title}...`}
              className="h-8 w-[80%]"
            />
          </div>
          <Command>
            <CommandList>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      checked={selectedOptions.includes(option.value)}
                      onCheckedChange={() => handleSelection(option.value)}
                    />
                    <Label onClick={() => handleSelection(option.value)}>
                      {option.label}
                    </Label>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
