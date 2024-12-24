import { PageSections } from "@/components/common/PageSections";
import { Tile } from "@/components/composites/Tile";
import { ColorBox } from "@/components/ui/color-box";
import { ColorSelector } from "@/components/ui/color-selector";
function ColorSelectorTile() {
  return (
    <Tile
      title="Color Selector"
      description="Use the sliders to change the color and get the hsl values."
    >
      <ColorSelector />
    </Tile>
  );
}
function ColorsTile() {
  return (
    <Tile title="Colors" description="These are the basic colors of the app">
      <div className="px-8 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ColorBox
          label="Background"
          bgColor="bg-background"
          textColor="text-foreground"
        />
        <ColorBox
          label="Foreground"
          bgColor="bg-foreground"
          textColor="text-background"
        />
        <ColorBox
          label="Card"
          bgColor="bg-card"
          textColor="text-card-foreground"
        />
        <ColorBox
          label="Popover"
          bgColor="bg-popover"
          textColor="text-popover-foreground"
        />
        <ColorBox
          label="Primary"
          bgColor="bg-primary"
          textColor="text-primary-foreground"
        />
        <ColorBox
          label="Secondary"
          bgColor="bg-secondary"
          textColor="text-secondary-foreground"
        />
        <ColorBox
          label="Muted"
          bgColor="bg-muted"
          textColor="text-muted-foreground"
        />
        <ColorBox
          label="Accent"
          bgColor="bg-accent"
          textColor="text-accent-foreground"
        />
        <ColorBox
          label="Destructive"
          bgColor="bg-destructive"
          textColor="text-destructive-foreground"
        />
        <ColorBox
          label="Warning"
          bgColor="bg-warning"
          textColor="text-warning-foreground"
        />
        <ColorBox
          label="Highlight"
          bgColor="bg-highlight"
          textColor="text-highlight-foreground"
        />
        <ColorBox
          label="Header"
          bgColor="bg-header"
          textColor="text-header-foreground"
        />
        <ColorBox
          label="Border"
          bgColor="bg-border"
          textColor="text-foreground"
        />
        <ColorBox
          label="Input"
          bgColor="bg-input"
          textColor="text-foreground"
        />
        <ColorBox label="Ring" bgColor="bg-ring" textColor="text-foreground" />
      </div>
    </Tile>
  );
}

function ChartColorsTile() {
  return (
    <Tile title="Chart Colors" description="These colors are used for charts.">
      <div className="px-8 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ColorBox
          label="Chart 1"
          bgColor="bg-chart-1"
          textColor="text-foreground"
        />
        <ColorBox
          label="Chart 2"
          bgColor="bg-chart-2"
          textColor="text-foreground"
        />
        <ColorBox
          label="Chart 3"
          bgColor="bg-chart-3"
          textColor="text-foreground"
        />
        <ColorBox
          label="Chart 4"
          bgColor="bg-chart-4"
          textColor="text-foreground"
        />
        <ColorBox
          label="Chart 5"
          bgColor="bg-chart-5"
          textColor="text-foreground"
        />
      </div>
    </Tile>
  );
}

function SidebarColorsTile() {
  return (
    <Tile
      title="Sidebar Colors"
      description="These colors are used for the sidebar."
    >
      <div className="px-8 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ColorBox
          label="Sidebar Background"
          bgColor="bg-sidebar-background"
          textColor="text-sidebar-foreground"
        />
        <ColorBox
          label="Sidebar Foreground"
          bgColor="bg-sidebar-background"
          textColor="text-sidebar-foreground"
        />
        <ColorBox
          label="Sidebar Primary"
          bgColor="bg-sidebar-primary"
          textColor="text-sidebar-primary-foreground"
        />
        <ColorBox
          label="Sidebar Accent"
          bgColor="bg-sidebar-accent"
          textColor="text-sidebar-accent-foreground"
        />
        <ColorBox
          label="Sidebar Border"
          bgColor="bg-sidebar-border"
          textColor="text-sidebar-border-foreground"
        />
        <ColorBox
          label="Sidebar Ring"
          bgColor="bg-sidebar-ring"
          textColor="text-sidebar-ring-foreground"
        />
      </div>
    </Tile>
  );
}

const sections = [
  {
    id: "color-selector",
    title: "Color Selector",
    children: <ColorSelectorTile />,
  },
  { id: "colors", title: "Colors", children: <ColorsTile /> },
  { id: "chart-colors", title: "Chart Colors", children: <ChartColorsTile /> },
  {
    id: "sidebar-colors",
    title: "Sidebar Colors",
    children: <SidebarColorsTile />,
  },
];
export const ColorsExample = () => {
  return <PageSections sections={sections} />;
};
