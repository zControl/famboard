import { PageSections } from "@/components/common/PageSections";
import { Tile } from "@/components/composites/Tile";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/ui/code-block";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { Header4 } from "@/components/ui/typography";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { IceCream } from "lucide-react";

function AvatarTile() {
  const imp = `import { Avatar } from "@/components/ui/avatar";`;
  const code = `<Avatar>
  <AvatarImage src="/avatar-2.jpg" alt="Avatar" />
  <AvatarFallback>AZ</AvatarFallback>
</Avatar>
`;
  return (
    <Tile
      title="User Avatar"
      description="User Avatar shows the user's profile picture, or falls back to initials."
    >
      <Avatar>
        <AvatarImage src="/avatar-2.jpg" alt="Avatar" />
        <AvatarFallback>AZ</AvatarFallback>
      </Avatar>
      <Separator className="my-4" />
      <CodeBlock code={imp} />
      <CodeBlock code={code} />
    </Tile>
  );
}

function BadgeTile() {
  const imp = `import { Badge } from "@/components/ui/badge";`;
  const code = `<Badge>Basic</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="highlight">Highlight</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="info">Info</Badge>
<Badge variant="error">Error</Badge>`;
  return (
    <Tile
      title="Badge"
      description="A badge can show status or be a flag for something."
    >
      <div className="flex flex-row gap-2 mb-4">
        <Badge>Basic</Badge>
        <Badge variant="primary">Primary</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="highlight">Highlight</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="info">Info</Badge>
        <Badge variant="error">Error</Badge>
      </div>
      <Separator className="my-4" />
      <CodeBlock code={imp} />
      <CodeBlock code={code} />
    </Tile>
  );
}

function ButtonTile() {
  const imp = `import { Button } from "@/components/ui/button";`;
  const code = `<Button>Default</Button>
<Button variant="variant">ButtonText</Button>
<Button>
  <IceCream />
  With Icon
</Button>
<Button disabled>
  <Spinner />
  Disabled
</Button>`;
  const sizes = `<Button size="default">Default</Button>
<Button size="icon">
  <IceCream />
</Button>`;
  return (
    <Tile title="Button" description="A button is a clickable element.">
      <Header4>Colors</Header4>
      <div className="flex flex-row gap-2">
        <Button>Default</Button>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
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
      <CodeBlock code={imp} />
      <CodeBlock code={code} />
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
      <CodeBlock code={sizes} />
    </Tile>
  );
}

function SeparatorTile() {
  const imp = `import { Separator } from "@/components/ui/separator";`;
  const code = `<Separator />
<Separator className="my-4 bg-highlight h-10" />
<div>Blog</div>
<Separator orientation="vertical" />
<div>Docs</div>
  `;
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
      <CodeBlock code={imp} />
      <CodeBlock code={code} />
    </Tile>
  );
}

const sections = [
  { id: "avatar", title: "Avatar", children: <AvatarTile /> },
  { id: "badge", title: "Badge", children: <BadgeTile /> },
  { id: "button", title: "Button", children: <ButtonTile /> },
  { id: "separator", title: "Separator", children: <SeparatorTile /> },
];

const BasicExample = () => {
  return <PageSections sections={sections} />;
};

export { BasicExample };
