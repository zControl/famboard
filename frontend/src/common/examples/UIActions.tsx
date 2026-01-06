import { PageSections } from "@/common/layout/PageSections";
import { Button } from "@/common/ui/actions/button";
import { ButtonLink } from "@/common/ui/actions/ButtonLink";
import { CopyButton } from "@/common/ui/actions/copy-button";
import { Separator } from "@/common/ui/display/separator";
import { Spinner } from "@/common/ui/feedback/spinner";
import { Textarea } from "@/common/ui/fields/textarea";
import { Tile } from "@/common/ui/surfaces/Tile";
import { Code } from "@/common/ui/typography/code";
import { CodeBlockData } from "@/common/ui/typography/code-block";
import { Header4 } from "@/common/ui/typography/typography";
import { IceCream2Icon } from "lucide-react";
import { useState } from "react";

function ButtonTile() {
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
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
          <IceCream2Icon />
          With Icon
        </Button>
        <Button disabled>
          <Spinner />
          Disabled
        </Button>
      </div>
      <Separator className="my-4" />
      <Code codeData={code} />
      <Header4>Sizes</Header4>
      <div className="flex flex-row gap-2 mt-4">
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
        <Button size="sm">Small</Button>
        <Button size="icon">
          <IceCream2Icon />
        </Button>
      </div>
      <Separator className="my-4" />
      <Code codeData={sizes} />
    </Tile>
  );
}

function ButtonLinkTile() {
  const code: CodeBlockData[] = [
    {
      language: "tsx",
      filename: "button-usage",
      code: `<ButtonLink href="/" icon={<IceCream2Icon />}>
  ButtonLink Text
</ButtonLink>`,
    },
  ];
  return (
    <Tile title="ButtonLink" description="A link styled as a button.">
      <div className="flex flex-row gap-2">
        <ButtonLink href="/" icon={<IceCream2Icon />}>
          ButtonLink Text
        </ButtonLink>
      </div>
      <Separator className="my-4" />
      <Code codeData={code} />
    </Tile>
  );
}

function CopyButtonTile() {
  const code: CodeBlockData[] = [
    { language: "tsx", filename: "code", code: `code here` },
  ];
  const [text, setText] = useState("");
  return (
    <Tile
      title="Copy Button"
      description="You can pass some content to be copied to the clipboard."
    >
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter some text to be copied"
      />
      <CopyButton content={text} />
      <Separator className="my-4" />
      <Code codeData={code} />
    </Tile>
  );
}

const sections = [
  { id: "tile", title: "Tile", children: <ButtonTile /> },
  { id: "button-link", title: "ButtonLink", children: <ButtonLinkTile /> },
  { id: "copy-button", title: "Copy Button", children: <CopyButtonTile /> },
];

export const UIActions = () => {
  return <PageSections sections={sections} />;
};
