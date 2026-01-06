import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/common/ui/data/item";
import { Coin } from "@/common/ui/display/coin";
import { formatDate } from "@/common/utils/formatDate";

import { AssignedTaskItemProps } from "@/features/kids/types";
import { CheckCircle2Icon } from "lucide-react";

export const ApprovalTaskItem = ({ task }: AssignedTaskItemProps) => {
  return (
    <Item variant="muted">
      <ItemMedia variant="image">
        <CheckCircle2Icon className="size-12 text-highlight" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{task.title}</ItemTitle>
        <ItemDescription>{formatDate(task.assignedAt)}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Coin className="size-8" value={task.pointValue} />
      </ItemActions>
    </Item>
  );
};
