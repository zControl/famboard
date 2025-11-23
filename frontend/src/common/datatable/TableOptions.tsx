import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

interface DatatableOptionsProps {
  onRefresh: () => void;
}

export const TableOptions = ({ onRefresh }: DatatableOptionsProps) => {
  return (
    <Button
      variant="outline"
      size="sm"
      className="ml-auto hidden h-8 lg:flex"
      onClick={onRefresh}
    >
      <RefreshCcw />
    </Button>
  );
};
