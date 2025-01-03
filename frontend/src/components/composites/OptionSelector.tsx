"use client";

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
import { ChevronsUpDown } from "lucide-react";

interface Option {
  value: string;
  label: string;
}
interface OptionSelectorProps {
  options: Option[];
  triggerText: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  value: string;
  setValue: (value: string) => void;
  label?: string;
}

export const OptionSelector = ({
  options,
  triggerText,
  open,
  setOpen,
  value,
  setValue,
  label,
}: OptionSelectorProps) => {
  const handleSetValue = (value: string) => {
    setValue(value);
    console.log("value changed: ", value);
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
                {options.map((option) => (
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
};
