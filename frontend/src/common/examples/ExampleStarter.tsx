import { PageSections } from "@/common/layout/PageSections";
import { Tile } from "@/common/ui/surfaces/Tile";
import { Code } from "@/components/ui/code";
import { CodeBlockData } from "@/components/ui/code-block";
import { Separator } from "@/components/ui/separator";

function SomeTile() {
  const imp: CodeBlockData[] = [
    { language: "tsx", filename: "imp", code: `import here` },
  ];
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
      <Code codeData={imp} />
      <Code codeData={code} />
    </Tile>
  );
}

const sections = [
  { id: "tile", title: "Tile", children: <SomeTile /> },
  { id: "tile", title: "Tile", children: <SomeTile /> },
  { id: "tile", title: "Tile", children: <SomeTile /> },
];

export const ExampleStarter = () => {
  return <PageSections sections={sections} />;
};
