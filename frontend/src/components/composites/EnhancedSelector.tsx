import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { enumToArray } from "@/utils/enumToArray";
import { ChevronsUpDown } from "lucide-react";
import React from "react";

interface Option {
  value: string;
  label: string;
}

interface EnhancedSelectorProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  options?: Option[];
  enumType?: { [key: string]: T };
  triggerText: string;
  label?: string;
}

export function EnhancedSelector<T extends string>({
  value,
  onChange,
  options,
  enumType,
  triggerText,
  label,
}: EnhancedSelectorProps<T>) {
  const [open, setOpen] = React.useState(false);

  const selectorOptions = options || (enumType ? enumToArray(enumType) : []);

  const handleSetValue = (newValue: string) => {
    onChange(newValue as T);
  };

  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        {label && <Label>{label}</Label>}
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start">
            {value ? <>{value}</> : <p>Select {triggerText}</p>}
            <ChevronsUpDown className="ml-auto h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {selectorOptions.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      handleSetValue(currentValue);
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
}
