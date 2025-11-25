import { Coin } from "@/common/ui/display/coin";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/common/ui/display/item";

import { AssignedTaskItemProps } from "@/features/kids/types";
import { CheckCircle2Icon } from "lucide-react";

export const ApprovalTaskItem = ({ task }: AssignedTaskItemProps) => {
  return (
    <div className="flex w-full max-w-lg flex-col gap-6">
      <Item variant="muted">
        <ItemMedia variant="image">
          <CheckCircle2Icon className="size-12 text-highlight" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>{task.title}</ItemTitle>
          <ItemDescription>{task.description}</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Coin className="size-8" value={task.pointValue} />
        </ItemActions>
      </Item>
    </div>
  );
};
