import { PageSections } from "@/components/common/PageSections";
import { Tile } from "@/components/composites/Tile";
import { CodeBlock } from "@/components/ui/code-block";
import { Separator } from "@/components/ui/separator";

function SomeTile() {
  const imp = `import here`;
  const code = `code here`;
  return (
    <Tile
      title="Tile"
      description="Tile is a reusable wrapper that has props for title and description."
    >
      <p>Some Component Here</p>
      <Separator className="my-4" />
      <CodeBlock code={imp} />
      <CodeBlock code={code} />
    </Tile>
  );
}

const sections = [
  { id: "tile", title: "Tile", children: <SomeTile /> },
  { id: "tile", title: "Tile", children: <SomeTile /> },
  { id: "tile", title: "Tile", children: <SomeTile /> },
];

const ExampleStarter = () => {
  return <PageSections sections={sections} />;
};

export { ExampleStarter };
