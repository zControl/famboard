import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Task } from "@/types/task";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal, SaveAllIcon, XCircleIcon } from "lucide-react";

interface RowActionsMenuProps {
  row: Row<Task>;
  isChanged: boolean;
  onSave: () => void;
  onCancel: () => void;
}

export const RowActionsMenu = ({
  row,
  isChanged,
  onSave,
  onCancel,
}: RowActionsMenuProps) => {
  return (
    <div className="flex items-center space-x-2">
      {isChanged && (
        <>
          <Button variant="ghost" size="icon" onClick={onSave}>
            <SaveAllIcon className="text-primary" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <XCircleIcon className="text-destructive" />
          </Button>
        </>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(row.original.title)}
          >
            Copy task title
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Edit?</DropdownMenuItem>
          <DropdownMenuItem>Assign?</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
