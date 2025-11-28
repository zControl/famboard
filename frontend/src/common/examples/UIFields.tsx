import { PageSections } from "@/common/layout/PageSections";
import { Separator } from "@/common/ui/display/separator";
import { Tile } from "@/common/ui/surfaces/Tile";
import { Code } from "@/common/ui/typography/code";
import { CodeBlockData } from "@/common/ui/typography/code-block";

function SomeTile() {
  const code: CodeBlockData[] = [
    { language: "tsx", filename: "code", code: `code here` },
  ];
  return (
    <Tile
      title="Tile"
      description="Tile is a reusable wrapper that has props for title and description."
    >
      <ul>
        <li>Checkbox</li>
        <li>Input</li>
        <li>Radio</li>
        <li>Slider</li>
        <li>Switch</li>
        <li>TextArea</li>
        <li>Toggle Group</li>
        <li>ValueSlider</li>
      </ul>
      <Separator className="my-4" />
      <Code codeData={code} />
    </Tile>
  );
}

const sections = [{ id: "tile", title: "Tile", children: <SomeTile /> }];

export const UIFields = () => {
  return <PageSections sections={sections} />;
};
