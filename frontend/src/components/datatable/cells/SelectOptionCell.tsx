import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Task } from "@/types/task";
import { Row } from "@tanstack/react-table";
import { useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectOptionCellProps {
  options: Option[];
  row: Row<Task>;
  onSelect?: (value: string) => void;
}

export const SelectOptionCell = ({ options, row }: SelectOptionCellProps) => {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  //TODO: Figure out how to handle this..when shold it write.
  //TODO: Should there be a Save Changes button?
  const handleSelection = (value: string) => {
    console.log("Selected", value);
    console.log("we need to do the mutation here.");
    setOpen(false);
  };

  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost">
            {selectedOption ? (
              <>{selectedOption.label}</>
            ) : (
              <>{row.original.category}</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[150px]" side="bottom" align="center">
          <Command>
            <CommandList>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(value) => {
                      setSelectedOption(
                        options.find((option) => option.value === value) ??
                          null,
                      );
                      handleSelection(value);
                      setOpen(false);
                    }}
                  >
                    {option.label}
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
