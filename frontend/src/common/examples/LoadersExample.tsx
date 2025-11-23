import { PageSections } from "@/common/layout/PageSections";
import { Separator } from "@/common/ui/display/separator";
import { LoadingBox, LoadingRows } from "@/common/ui/feedback/Loading";
import { Spinner } from "@/common/ui/feedback/spinner";
import { Tile } from "@/common/ui/surfaces/Tile";
import { Code } from "@/common/ui/typography/code";
import { CodeBlockData } from "@/common/ui/typography/code-block";
import { Header4 } from "@/common/ui/typography/typography";

function SpinnerTile() {
  const imp: CodeBlockData[] = [
    {
      language: "tsx",
      filename: "spinner-import",
      code: `import { Spinner } from "@/components/ui/spinner";`,
    },
  ];
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
      <Code codeData={imp} />
      <Code codeData={code} />
    </Tile>
  );
}

function LoadingRowsTile() {
  const imp: CodeBlockData[] = [
    {
      language: "tsx",
      filename: "loadingrows-import",
      code: `import { LoadingRows } from "@/components/composites/Loading";`,
    },
  ];
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
      <Code codeData={imp} />
      <Code codeData={code} />
    </Tile>
  );
}

function LoadingBoxTile() {
  const imp: CodeBlockData[] = [
    {
      language: "tsx",
      filename: "loadingbox-import",
      code: `import { LoadingBox } from "@/components/composites/Loading";`,
    },
  ];
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
      <Code codeData={imp} />
      <Code codeData={code} />
    </Tile>
  );
}

const sections = [
  { id: "spinner", title: "Spinner", children: <SpinnerTile /> },
  {
    id: "loading-rows",
    title: "Loading Rows",
    children: <LoadingRowsTile />,
  },
  {
    id: "loading-box",
    title: "Loading Box",
    children: <LoadingBoxTile />,
  },
];
export const LoadersExample = () => {
  return <PageSections sections={sections} />;
};
