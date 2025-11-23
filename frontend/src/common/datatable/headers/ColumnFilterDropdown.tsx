import { Option } from "@/common/types";
import { Button } from "@/common/ui/actions/button";
import { Checkbox } from "@/common/ui/fields/checkbox";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/common/ui/overlay/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/common/ui/overlay/popover";
import { Label } from "@/common/ui/typography/label";
import { cn } from "@/common/utils/classNames";
import { Column } from "@tanstack/react-table";
import { FilterIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface ColumnFilterDropdownProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  options: Option[];
}

export const ColumnFilterDropdown = <TData, TValue>({
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
  const handleClearFilter = () => {
    setSelectedOptions([]);
    setOpen(false);
  };

  useEffect(() => {
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
                    <Button onClick={handleClearFilter}>Clear</Button>
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
