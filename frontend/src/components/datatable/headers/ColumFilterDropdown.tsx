import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Option } from "@/types/common";
import { cn } from "@/utils/classNames";
import { Column } from "@tanstack/react-table";
import { FilterIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface ColumnFilterDropdownProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  options: Option[];
}

export const ColumFilterDropdown = <TData, TValue>({
  column,
  options,
  className,
}: ColumnFilterDropdownProps<TData, TValue>) => {
  const [open, setOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    (column.getFilterValue() as string[]) ?? [],
  );

  const handleSelection = (value: string) => {
    setSelectedOptions((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };
  const handleSelectAll = () => {
    setSelectedOptions(options.map((option) => option.value));
  };

  useEffect(() => {
    console.log("selectedOptions", selectedOptions);
    column.setFilterValue(selectedOptions.length ? selectedOptions : undefined);
  }, [selectedOptions, column]);

  if (!column.getCanFilter()) {
    return null;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="tight">
            <FilterIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-0 w-auto max-w-[300px]"
          side="bottom"
          align="end"
        >
          <Command>
            <CommandList>
              <CommandGroup>
                <div className="flex justify-between items-center p-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={selectedOptions.length === options.length}
                      onCheckedChange={handleSelectAll}
                    />
                    <Label onClick={handleSelectAll}>All</Label>
                  </div>
                </div>
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
