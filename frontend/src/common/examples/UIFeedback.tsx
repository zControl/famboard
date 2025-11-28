import { PageSections } from "@/common/layout/PageSections";
import { Button } from "@/common/ui/actions/button";
import { Separator } from "@/common/ui/display/separator";
import { LoadingBox, LoadingRows } from "@/common/ui/feedback/Loading";
import { Spinner } from "@/common/ui/feedback/spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/common/ui/feedback/tooltip";
import { Tile } from "@/common/ui/surfaces/Tile";
import { Code } from "@/common/ui/typography/code";
import { CodeBlockData } from "@/common/ui/typography/code-block";
import { Header4 } from "@/common/ui/typography/typography";
import { toast } from "sonner";

function SomeTile() {
  const code: CodeBlockData[] = [
    { language: "tsx", filename: "code", code: `code here` },
  ];
  return (
    <Tile
      title="Tile"
      description="Tile is a reusable wrapper that has props for title and description."
    >
      <p>Some Component Here</p>
      <Separator className="my-4" />
      <Code codeData={code} />
    </Tile>
  );
}

function LoadingRowsTile() {
  const code: CodeBlockData[] = [
    {
      language: "tsx",
      filename: "loadingrows-usage",
      code: `<LoadingRows count={3} />`,
    },
  ];
  return (
    <Tile
      title="Loading Rows Skeleton"
      description="A skeleton component to show when rows of a table are loading."
    >
      <Header4>Loading Rows</Header4>
      <LoadingRows count={5} />
      <Separator className="my-4" />
      <Code codeData={code} />
    </Tile>
  );
}

function LoadingBoxTile() {
  const code: CodeBlockData[] = [
    { language: "tsx", filename: "loadingbox-usage", code: `<LoadingBox />` },
  ];

  return (
    <Tile
      title="Loading Box Skeleton"
      description="A skeleton component to show when a box is loading."
    >
      <LoadingBox />
      <Separator className="my-4" />
      <Code codeData={code} />
    </Tile>
  );
}

function ToastTile() {
  const code: CodeBlockData[] = [
    {
      language: "tsx",
      filename: "sonner-usage",
      code: `<Button
  onClick={() =>
    toast("Detailed message", {
    description: "This is a detailed toast description.",
    action: {
      label: "Undo",
      onClick: () => console.log("Undo"),
      },
    })
  }
>
Detailed Toast
</Button>`,
    },
  ];
  return (
    <Tile
      title="Toasts"
      description="Toast notifications using the Sonner library."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        <Button onClick={() => toast("Toast message")}>Basic Toast</Button>
        <Button onClick={() => toast.success("Success message")}>
          Success Toast
        </Button>
        <Button onClick={() => toast.error("Error message")}>
          Error Toast
        </Button>
        <Button onClick={() => toast.warning("Warning message")}>
          Warning Toast
        </Button>
        <Button onClick={() => toast.info("Info message")}>Info Toast</Button>
        <Button
          onClick={() =>
            toast("Detailed message", {
              description: "This is a detailed toast description.",
              action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
              },
            })
          }
        >
          Detailed Toast
        </Button>
      </div>
      <Separator className="my-4" />
      <Code codeData={code} />
    </Tile>
  );
}

function SpinnerTile() {
  const code: CodeBlockData[] = [
    {
      language: "tsx",
      filename: "spinner-usage",
      code: `<Spinner />
<Spinner size="sm" />
<Spinner size="md" />
<Spinner color="primary" />
<Spinner color="highlight" />`,
    },
  ];
  return (
    <Tile
      title="Spinner"
      description="A spinning indicator to show when something is loading."
    >
      <Header4>Sizes</Header4>
      <div className="flex gap-2">
        <p>sm</p>
        <Spinner size="sm" />
        <p>md</p>
        <Spinner size="md" />
        <p>lg</p>
        <Spinner size="lg" />
        <p>xl</p>
        <Spinner size="xl" />
        <p>full (not shown)</p>
      </div>
      <Header4>Colors</Header4>
      <div className="flex gap-2">
        <p>default</p>
        <Spinner color="default" />
        <p>primary</p>
        <Spinner color="primary" />
        <p>highlight</p>
        <Spinner color="highlight" />
      </div>
      <Separator className="my-4" />
      <Code codeData={code} />
    </Tile>
  );
}

function TooltipTile() {
  const code: CodeBlockData[] = [
    {
      language: "tsx",
      filename: "tooltip-usage",
      code: `<Tooltip>
  <TooltipContent>Hello!, This is the tooltip</TooltipContent>
  <TooltipTrigger>
    <p>Hover over me to see the tooltip!</p>
  </TooltipTrigger>
</Tooltip>`,
    },
  ];
  return (
    <Tile
      title="Tooltip"
      description="A tooltip component to show additional information on hover."
    >
      <Tooltip>
        <TooltipContent>Hello!, This is the tooltip</TooltipContent>
        <TooltipTrigger>
          <p>Hover over me to see the tooltip!</p>
        </TooltipTrigger>
      </Tooltip>
      <Separator className="my-4" />
      <Code codeData={code} />
    </Tile>
  );
}

const sections = [
  { id: "loading-rows", title: "Loading Rows", children: <LoadingRowsTile /> },
  { id: "loading-box", title: "Loading Box", children: <LoadingBoxTile /> },
  { id: "toasts", title: "Toasts", children: <ToastTile /> },
  { id: "spinner", title: "Spinner", children: <SpinnerTile /> },
  { id: "tooltip", title: "Tooltip", children: <TooltipTile /> },
];

export const UIFeedback = () => {
  return <PageSections sections={sections} />;
};
