import { DetailListItemProps } from "@/common/types";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/common/ui/data/item";
import { Badge } from "@/common/ui/display/badge";
import React from "react";

function DetailedItem({
  media,
  title,
  description,
  value,
  units,
}: React.ComponentProps<"div"> & DetailListItemProps) {
  return (
    <Item variant="outline">
      <ItemMedia variant="image">
        {React.cloneElement(media as React.ReactElement, {
          className: "text-highlight",
        })}
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{title}</ItemTitle>
        <ItemDescription>{description}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Badge variant="highlight">{value}</Badge>
        <span>{units}</span>
      </ItemActions>
    </Item>
  );
}

export { DetailedItem };
