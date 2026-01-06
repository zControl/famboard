import { PageSections } from "@/common/layout/PageSections";
import { Avatar } from "@/common/ui/display/avatar";
import { Badge } from "@/common/ui/display/badge";
import { Coin } from "@/common/ui/display/coin";
import { Progress } from "@/common/ui/display/progress";
import { ProgressStep } from "@/common/ui/display/progress-step";
import { Separator } from "@/common/ui/display/separator";
import {
  StyledCalendar1Icon,
  StyledCalendarCheckIcon,
  StyledFlameIcon,
  StyledGemIcon,
  StyledPiggyBankIcon,
  StyledTrophyIcon,
} from "@/common/ui/display/styled-icons";
import { Tile } from "@/common/ui/surfaces/Tile";
import { Code } from "@/common/ui/typography/code";
import { CodeBlockData } from "@/common/ui/typography/code-block";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

function AvatarTile() {
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
      <Code codeData={code} />
    </Tile>
  );
}

function BadgeTile() {
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
      <Code codeData={code} />
    </Tile>
  );
}

function CoinTile() {
  const code: CodeBlockData[] = [
    { language: "tsx", filename: "coin-usage", code: `code here` },
  ];
  return (
    <Tile title="Coin" description="Displays a coin amount with an icon.">
      <div className="grid grid-cols-1 gap-y-6 mb-4">
        <div className="flex gap-6">
          <Coin value={10} />
          <Coin value={42} />
        </div>
      </div>
      <Separator className="my-4" />
      <Code codeData={code} />
    </Tile>
  );
}

function ProgressStepTile() {
  const code: CodeBlockData[] = [
    { language: "tsx", filename: "progress-step-usage", code: `code here` },
  ];
  return (
    <Tile
      title="Progress Step"
      description="Displays the current step in a multi-step process."
    >
      <div className="grid grid-cols-1 gap-y-6 mb-4">
        <div className="flex gap-6">
          <ProgressStep stepSize={2} />
          <ProgressStep stepSize={3} />
        </div>
      </div>
      <Separator className="my-4" />
      <Code codeData={code} />
    </Tile>
  );
}

function ProgressTile() {
  const code: CodeBlockData[] = [
    { language: "tsx", filename: "progress-usage", code: `code here` },
  ];
  return (
    <Tile title="Progress" description="Displays progress towards a goal.">
      <div className="grid grid-cols-1 gap-y-6 mb-4">
        <div className="flex gap-6">
          <Progress value={50} />
        </div>
      </div>
      <Separator className="my-4" />
      <Code codeData={code} />
    </Tile>
  );
}

function StyledIconsTile() {
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
      <Code codeData={code} />
    </Tile>
  );
}

function SeparatorTile() {
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
      <Code codeData={code} />
    </Tile>
  );
}

const sections = [
  { id: "avatar", title: "Avatar", children: <AvatarTile /> },
  { id: "badge", title: "Badge", children: <BadgeTile /> },
  { id: "coin", title: "Coin", children: <CoinTile /> },
  {
    id: "progress-step",
    title: "Progress Step",
    children: <ProgressStepTile />,
  },
  { id: "progress", title: "Progress", children: <ProgressTile /> },
  { id: "separator", title: "Separator", children: <SeparatorTile /> },
  { id: "styled-icons", title: "Styled Icons", children: <StyledIconsTile /> },
];

export const UIDisplay = () => {
  return <PageSections sections={sections} />;
};
