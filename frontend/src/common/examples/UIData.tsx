import { PageSections } from "@/common/layout/PageSections";
import { Button } from "@/common/ui/actions/button";
import { DetailedItem } from "@/common/ui/data/detailed-item";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/common/ui/data/item";
import { LabeledValue } from "@/common/ui/data/labeled-value";
import { Separator } from "@/common/ui/display/separator";
import { Tile } from "@/common/ui/surfaces/Tile";
import { Code } from "@/common/ui/typography/code";
import { CodeBlockData } from "@/common/ui/typography/code-block";
import { ShieldAlertIcon } from "lucide-react";

function ChartExampleTile() {
  const code: CodeBlockData[] = [
    { language: "tsx", filename: "code", code: `code here` },
  ];
  return (
    <Tile title="Chart" description="Display data in a chart format.">
      <p>Chart Example Here</p>
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
      description="A styled version of the item component used to display detailed information."
    >
      <div className="max-w-sm mx-auto">
        <DetailedItem
          title="Title"
          media={<ShieldAlertIcon />}
          description="Description"
          value="Value"
          units="Units"
        />
      </div>
      <Separator className="my-4" />
      <Code codeData={code} />
    </Tile>
  );
}

function ItemTile() {
  const code: CodeBlockData[] = [
    { language: "tsx", filename: "code", code: `code here` },
  ];
  return (
    <Tile
      title="Basic Item"
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
  {
    id: "chart",
    title: "Chart",
    children: <ChartExampleTile />,
  },
  {
    id: "detailed-item",
    title: "Detailed Item",
    children: <DetailedItemTile />,
  },
  {
    id: "item",
    title: "Item",
    children: <ItemTile />,
  },
  {
    id: "labeled-value",
    title: "Labeled Value",
    children: <LabeledValueTile />,
  },
];

export const UIData = () => {
  return <PageSections sections={sections} />;
};
