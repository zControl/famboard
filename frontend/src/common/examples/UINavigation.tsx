import { PageSections } from "@/common/layout/PageSections";
import { Separator } from "@/common/ui/display/separator";
import { Tile } from "@/common/ui/surfaces/Tile";
import { Code } from "@/common/ui/typography/code";
import { CodeBlockData } from "@/common/ui/typography/code-block";

function BreadcrumbTile() {
  const code: CodeBlockData[] = [
    { language: "tsx", filename: "code", code: `code here` },
  ];
  return (
    <Tile
      title="Tile"
      description="Tile is a reusable wrapper that has props for title and description."
    >
      <p>Breadcrumb Example Here</p>
      <Separator className="my-4" />
      <Code codeData={code} />
    </Tile>
  );
}

function MenubarTile() {
  const code: CodeBlockData[] = [
    { language: "tsx", filename: "code", code: `code here` },
  ];
  return (
    <Tile
      title="Tile"
      description="Tile is a reusable wrapper that has props for title and description."
    >
      <p>MenuBar Example Here</p>
      <Separator className="my-4" />
      <Code codeData={code} />
    </Tile>
  );
}

function NavigationMenuTile() {
  const code: CodeBlockData[] = [
    { language: "tsx", filename: "code", code: `code here` },
  ];
  return (
    <Tile
      title="Tile"
      description="Tile is a reusable wrapper that has props for title and description."
    >
      <p>Navigation MenuHere</p>
      <Separator className="my-4" />
      <Code codeData={code} />
    </Tile>
  );
}

const sections = [
  { id: "breadcrumb", title: "Breadcrumb", children: <BreadcrumbTile /> },
  { id: "menubar", title: "Menubar", children: <MenubarTile /> },
  {
    id: "navigation-menu",
    title: "Navigation Menu",
    children: <NavigationMenuTile />,
  },
];

export const UINavigation = () => {
  return <PageSections sections={sections} />;
};
