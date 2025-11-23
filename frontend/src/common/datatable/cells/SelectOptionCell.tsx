import { Option } from "@/common/types";
import { Button } from "@/common/ui/actions/button";
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
import { useState } from "react";

interface SelectOptionCellProps {
  options: Option[];
  initialValue: string;
  onSelect?: (value: string) => void;
}

export const SelectOptionCell = ({
  options,
  initialValue,
}: SelectOptionCellProps) => {
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
            {selectedOption ? <>{selectedOption.value}</> : <>{initialValue}</>}
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
