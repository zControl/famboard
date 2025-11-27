import { PageSections } from "@/common/layout/PageSections";
import { Separator } from "@/common/ui/display/separator";
import { Tile } from "@/common/ui/surfaces/Tile";
import { Code } from "@/common/ui/typography/code";
import { CodeBlockData } from "@/common/ui/typography/code-block";

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

const sections = [
  { id: "chart", title: "Chart", children: <ChartExampleTile /> },
];

export const DataExamples = () => {
  return <PageSections sections={sections} />;
};
