import { PageSections } from "@/common/layout/PageSections";
import { Tile } from "@/common/ui/surfaces/Tile";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code } from "@/components/ui/code";
import { CodeBlockData } from "@/components/ui/code-block";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import {
  StyledCalendar1Icon,
  StyledCalendarCheckIcon,
  StyledFlameIcon,
  StyledGemIcon,
  StyledPiggyBankIcon,
  StyledTrophyIcon,
} from "@/components/ui/styled-icons";
import { Header4 } from "@/components/ui/typography";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { IceCream } from "lucide-react";

function AvatarTile() {
  const imp: CodeBlockData[] = [
    {
      language: "tsx",
      filename: "avatar-import",
      code: `import { Avatar } from "@/components/ui/avatar";`,
    },
  ];
  const code: CodeBlockData[] = [
    {
      language: "tsx",
      filename: "avatar-usage",
      code: `<Avatar>
  <AvatarImage src="/avatar-2.jpg" alt="Avatar" />
  <AvatarFallback>AZ</AvatarFallback>
</Avatar>`,
    },
  ];
  return (
    <Tile
      title="User Avatar"
      description="User Avatar shows the user's profile picture, or falls back to initials."
    >
      <Avatar>
        <AvatarImage src="/avatars/avatar-2.jpg" alt="Avatar" />
        <AvatarFallback>AZ</AvatarFallback>
      </Avatar>
      <Separator className="my-4" />
      <Code codeData={imp} />
      <Code codeData={code} />
    </Tile>
  );
}

function BadgeTile() {
  const imp: CodeBlockData[] = [
    {
      language: "tsx",
      filename: "badge-import",
      code: `import { Badge } from "@/components/ui/badge";`,
    },
  ];
  const code: CodeBlockData[] = [
    {
      language: "tsx",
      filename: "badge-usage",
      code: `<Badge>Basic</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="highlight">Highlight</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="info">Info</Badge>
<Badge variant="error">Error</Badge>`,
    },
  ];
  return (
    <Tile
      title="Badge"
      description="A badge can show status or be a flag for something."
    >
      <div className="grid grid-cols-1 gap-y-6 mb-4">
        <div className="flex gap-6">
          <Badge>Basic</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
        <div className="flex gap-6">
          <Badge variant="warning">Warning</Badge>
          <Badge variant="highlight">Highlight</Badge>
          <Badge variant="success">Success</Badge>
        </div>
        <div className="flex gap-6">
          <Badge variant="info">Info</Badge>
          <Badge variant="error">Error</Badge>
        </div>
      </div>
      <Separator className="my-4" />
      <Code codeData={imp} />
      <Code codeData={code} />
    </Tile>
  );
}

function ButtonTile() {
  const imp: CodeBlockData[] = [
    {
      language: "tsx",
      filename: "button-import",
      code: `import { Button } from "@/components/ui/button";`,
    },
  ];
  const code: CodeBlockData[] = [
    {
      language: "tsx",
      filename: "button-usage",
      code: `<Button>Default</Button>
<Button variant="variant">ButtonText</Button>
<Button>
  <IceCream />
  With Icon
</Button>
<Button disabled>
  <Spinner />
  Disabled
</Button>`,
    },
  ];
  const sizes: CodeBlockData[] = [
    {
      language: "tsx",
      filename: "button-sizes",
      code: `<Button size="default">Default</Button>
<Button size="icon">
  <IceCream />
</Button>`,
    },
  ];
  return (
    <Tile title="Button" description="A button is a clickable element.">
      <Header4>Colors</Header4>
      <div className="flex flex-row gap-2">
        <Button>Default</Button>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="warning">Warning</Button>
        <Button variant="highlight">Highlight</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button>
          <IceCream />
          With Icon
        </Button>
        <Button disabled>
          <Spinner />
          Disabled
        </Button>
      </div>
      <Separator className="my-4" />
      <Code codeData={imp} />
      <Code codeData={code} />
      <Header4>Sizes</Header4>
      <div className="flex flex-row gap-2 mt-4">
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
        <Button size="sm">Small</Button>
        <Button size="icon">
          <IceCream />
        </Button>
      </div>
      <Separator className="my-4" />
      <Code codeData={sizes} />
    </Tile>
  );
}

function StyledIconsTile() {
  const imp: CodeBlockData[] = [
    {
      language: "tsx",
      filename: "badge-import",
      code: `import { StyledPiggyBankIcon } from "@/components/ui/styled-icons";`,
    },
  ];
  const code: CodeBlockData[] = [
    {
      language: "tsx",
      filename: "styled-icon-usage",
      code: `<StyledPiggyBankIcon />`,
    },
  ];
  return (
    <Tile
      title="Styled Icons"
      description="Specific styled icons that can be used."
    >
      <div className="grid grid-cols-1 gap-y-6 mb-4">
        <div className="flex gap-6">
          <StyledPiggyBankIcon />
          <StyledGemIcon />
          <StyledCalendar1Icon />
          <StyledCalendarCheckIcon />
          <StyledFlameIcon />
          <StyledTrophyIcon />
        </div>
      </div>
      <Separator className="my-4" />
      <Code codeData={imp} />
      <Code codeData={code} />
    </Tile>
  );
}

function SeparatorTile() {
  const imp: CodeBlockData[] = [
    {
      language: "tsx",
      filename: "separator-import",
      code: `import { Separator } from "@/components/ui/separator";`,
    },
  ];
  const code: CodeBlockData[] = [
    {
      language: "tsx",
      filename: "separator-usage",
      code: `<Separator />
<Separator className="my-4 bg-highlight h-10" />
<div>Blog</div>
<Separator orientation="vertical" />
<div>Docs</div>
  `,
    },
  ];
  return (
    <Tile title="Separator" description="A separator is a thin line.">
      <div className="flex flex-col gap-4">
        <p>Horizontal</p>
        <Separator />
        <p>Custom Styling</p>
        <Separator className="my-4 bg-highlight h-10" />
        <p>Vertical</p>
        <div className="flex h-5 items-center space-x-4 text-sm">
          <div>Blog</div>
          <Separator orientation="vertical" />
          <div>Docs</div>
          <Separator orientation="vertical" />
          <div>Source</div>
          <Separator orientation="vertical" />
          <p>Custom</p>
          <Separator orientation="vertical" />
        </div>
      </div>
      <Separator className="my-4" />
      <Code codeData={imp} />
      <Code codeData={code} />
    </Tile>
  );
}

const sections = [
  { id: "avatar", title: "Avatar", children: <AvatarTile /> },
  { id: "badge", title: "Badge", children: <BadgeTile /> },
  { id: "button", title: "Button", children: <ButtonTile /> },
  { id: "separator", title: "Separator", children: <SeparatorTile /> },
  { id: "styled-icons", title: "Styled Icons", children: <StyledIconsTile /> },
];

export const BasicExample = () => {
  return <PageSections sections={sections} />;
};
