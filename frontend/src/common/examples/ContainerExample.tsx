import { PageSections } from "@/common/layout/PageSections";
import { Tile } from "@/common/ui/surfaces/Tile";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { Code } from "@/components/ui/code";
import { CodeBlockData } from "@/components/ui/code-block";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

function AccordianTile() {
  const imp: CodeBlockData[] = [
    {
      language: "tsx",
      filename: "accordion-import",
      code: `import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";`,
    },
  ];
  const code: CodeBlockData[] = [
    {
      language: "tsx",
      filename: "accordion-usage",
      code: `<Accordian type="single" collapsible>
<AccordionItem value="itemId">
    <AccordionTrigger>Trigger</AccordionTrigger>
    <AccordionContent>
      Content
    </AccordionContent>
  </AccordionItem>
</Accordian>`,
    },
  ];
  return (
    <Tile
      title="Accordian"
      description="Accordion is used to show and hide content."
    >
      <div className="flex flex-col gap-2">
        <p>Single</p>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <p>Multiple</p>
        <Accordion type="multiple">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Separator className="my-4" />
        <Code codeData={imp} />
        <Code codeData={code} />
      </div>
    </Tile>
  );
}

function CardTile() {
  const imp: CodeBlockData[] = [
    {
      language: "tsx",
      filename: "card-import",
      code: `import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";`,
    },
  ];
  const code: CodeBlockData[] = [
    {
      language: "tsx",
      filename: "card-usage",
      code: `<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content</p>
  </CardContent>
  <CardFooter>
    <span>Card footer</span>
  </CardFooter>
</Card>`,
    },
  ];
  return (
    <Tile
      title="Card"
      description="Card is a basic wrapper for any kind of content. It can by styled in any way and contain any type of children."
    >
      <div className="flex flex-col gap-2">
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card content</p>
          </CardContent>
          <CardFooter>
            <span>Card footer</span>
          </CardFooter>
        </Card>
      </div>
      <Separator className="my-4" />
      <Code codeData={imp} />
      <Code codeData={code} />
    </Tile>
  );
}

function TileTile() {
  const imp: CodeBlockData[] = [
    {
      language: "tsx",
      filename: "tile-import",
      code: `import { Tile } from "@/components/composites/Tile";`,
    },
  ];
  const code: CodeBlockData[] = [
    {
      language: "tsx",
      filename: "tile-usage",
      code: `<Tile
  title="Tile"
  description="Tile is a reusable wrapper that has props for title and description.">
  Tile Content
</Tile>`,
    },
  ];
  return (
    <Tile
      title="Tile"
      description="Tile is a reusable wrapper that has props for title and description."
    >
      <p>Everything on this page is wrapped in a tile.</p>
      <Separator className="my-4" />
      <Code codeData={imp} />
      <Code codeData={code} />
    </Tile>
  );
}

function ScrollAreaTile() {
  const imp: CodeBlockData[] = [
    {
      language: "tsx",
      filename: "scrollarea-import",
      code: `import { ScrollArea } from "@/components/ui/scroll-area";`,
    },
  ];
  const code: CodeBlockData[] = [
    {
      language: "tsx",
      filename: "scrollarea-usage",
      code: `<ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
  Put some long text here and the scroll area will appear.
</ScrollArea>`,
    },
  ];
  return (
    <Tile
      title="Scroll Area"
      description="Augments native scroll functions for custom styling."
    >
      <div>
        <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
          Jokester began sneaking into the castle in the middle of the night and
          leaving jokes all over the place: under the king's pillow, in his
          soup, even in the royal toilet. The king was furious, but he couldn't
          seem to stop Jokester. And then, one day, the people of the kingdom
          discovered that the jokes left by Jokester were so funny that they
          couldn't help but laugh. And once they started laughing, they couldn't
          stop.
        </ScrollArea>
        <Separator className="my-4" />
        <Code codeData={imp} />
        <Code codeData={code} />
      </div>
    </Tile>
  );
}
function ResizeableTile() {
  const imp: CodeBlockData[] = [
    {
      language: "tsx",
      filename: "resizable-import",
      code: `import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"`,
    },
  ];
  const code: CodeBlockData[] = [
    {
      language: "tsx",
      filename: "resizable-usage",
      code: `<ResizablePanelGroup direction="horizontal">
  <ResizablePanel>One</ResizablePanel>
  <ResizableHandle />
  <ResizablePanel>Two</ResizablePanel>
</ResizablePanelGroup>`,
    },
  ];
  return (
    <Tile
      title="Resizeable Panels"
      description="Accessible, resizable panel groups with optional drag handles."
    >
      <ResizablePanelGroup
        direction="horizontal"
        className="rounded-lg border md:min-w-[450px]"
      >
        <ResizablePanel defaultSize={50}>
          <div className="flex h-[200px] items-center justify-center p-6">
            <span className="font-semibold">One</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={25}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Two</span>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={75}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Three</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
      <Separator className="my-4" />
      <Code codeData={imp} />
      <Code codeData={code} />
    </Tile>
  );
}

const sections = [
  { id: "accordian", title: "Accordian", children: <AccordianTile /> },
  { id: "card", title: "Card", children: <CardTile /> },
  { id: "tile", title: "Tile", children: <TileTile /> },
  { id: "scroll-area", title: "Scroll Area", children: <ScrollAreaTile /> },
  { id: "resizeable", title: "Resizeable", children: <ResizeableTile /> },
];
export const ContainerExample = () => {
  return <PageSections sections={sections} />;
};
