import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useKidManager } from "@/features/parents/hooks/useKidManager";
import { cn } from "@/lib/utils";
import { Column } from "@tanstack/react-table";
import { CircleXIcon, FilterIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface TaskAssignmentsHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}
export const TaskAssignmentsHeader = <TData, TValue>({
  column,
  title,
  className,
}: TaskAssignmentsHeaderProps<TData, TValue>) => {
  const { kidIds, getKidProfile } = useKidManager();
  const [open, setOpen] = useState(false);
  const [selectedKids, setSelectedKids] = useState<string[]>([]);

  const handleFilterChange = (kidId: string) => {
    setSelectedKids((prev) => {
      const newSelection = prev.includes(kidId)
        ? prev.filter((id) => id !== kidId)
        : [...prev, kidId];
      return newSelection;
    });
  };

  useEffect(() => {
    column.setFilterValue(selectedKids.length ? selectedKids : undefined);
  }, [column, selectedKids]);

  const clearFilter = () => {
    setSelectedKids([]);
    column.setFilterValue(undefined);
    setOpen(false);
  };

  if (!column.getCanFilter()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            <FilterIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <Button
            variant="ghost"
            size="sm"
            className="flex cursor-pointer items-center w-full"
            onClick={clearFilter}
          >
            <CircleXIcon className="mr-2 h-4 w-4" />
            Clear Filter
          </Button>
          {kidIds.map((kidId) => {
            const { data: kidProfile } = getKidProfile(kidId);
            return (
              <div key={kidId} className="flex items-center space-x-4 p-2">
                <Checkbox
                  checked={selectedKids.includes(kidId)}
                  onCheckedChange={() => handleFilterChange(kidId)}
                />
                <Avatar>
                  <AvatarImage
                    src={kidProfile?.avatarUrl}
                    alt={kidProfile?.username}
                  />
                  <AvatarFallback>
                    {kidProfile?.username?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span>{kidProfile?.username}</span>
              </div>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
