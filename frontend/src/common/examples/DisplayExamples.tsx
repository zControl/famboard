import { PageSections } from "@/common/layout/PageSections";
import { Button } from "@/common/ui/actions/button";
import { DetailedItem } from "@/common/ui/display/detailed-item";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/common/ui/display/item";
import { LabeledValue } from "@/common/ui/display/labeled-value";
import { Separator } from "@/common/ui/display/separator";
import { Tile } from "@/common/ui/surfaces/Tile";
import { Code } from "@/common/ui/typography/code";
import { CodeBlockData } from "@/common/ui/typography/code-block";
import { ShieldAlertIcon } from "lucide-react";

function ItemTile() {
  const code: CodeBlockData[] = [
    { language: "tsx", filename: "code", code: `code here` },
  ];
  return (
    <Tile
      title="Item with variants"
      description="A reusable component for displaying an item with media, title, and description."
    >
      <div className="flex w-full max-w-lg flex-col gap-6">
        <Item variant="outline">
          <ItemMedia variant="icon">
            <ShieldAlertIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Title</ItemTitle>
            <ItemDescription>Description</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button size="sm" variant="outline">
              Action
            </Button>
          </ItemActions>
        </Item>
      </div>
      <p>There are variants for styling and size.</p>

      <Separator className="my-4" />
      <Code codeData={code} />
    </Tile>
  );
}

function DetailedItemTile() {
  const code: CodeBlockData[] = [
    { language: "tsx", filename: "code", code: `code here` },
  ];
  return (
    <Tile
      title="Detailed Item"
      description="A styled item used to display detailed information."
    >
      <DetailedItem
        media={<ShieldAlertIcon />}
        title="Detailed Title"
        description="Detailed Description"
        value="Value"
        units="Units"
      />
      <p>Custom DetailedItem(s) could be created for specific needs.</p>

      <Separator className="my-4" />
      <Code codeData={code} />
    </Tile>
  );
}

function LabeledValueTile() {
  const code: CodeBlockData[] = [
    { language: "tsx", filename: "code", code: `code here` },
  ];
  return (
    <Tile
      title="Labeled Value"
      description="A simple display of a title and its value"
    >
      <LabeledValue
        media={<ShieldAlertIcon />}
        title="Title"
        description="Description"
        value="Value"
        units="Units"
      />

      <Separator className="my-4" />
      <Code codeData={code} />
    </Tile>
  );
}

const sections = [
  { id: "tile", title: "Item", children: <ItemTile /> },
  { id: "tile", title: "DetailedItem", children: <DetailedItemTile /> },
  { id: "tile", title: "LabeledValue", children: <LabeledValueTile /> },
];

export const DisplayExamples = () => {
  return <PageSections sections={sections} />;
};
