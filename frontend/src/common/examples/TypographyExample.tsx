import { PageSections } from "@/common/layout/PageSections";
import { LabeledValue } from "@/common/ui/display/labeled-value";
import { Separator } from "@/common/ui/display/separator";
import { Tile } from "@/common/ui/surfaces/Tile";
import { Code } from "@/common/ui/typography/code";
import { CodeBlockData } from "@/common/ui/typography/code-block";
import {
  BlockQuote,
  Header1,
  Header2,
  Header3,
  Header4,
  Paragraph,
  TextBlock,
} from "@/common/ui/typography/typography";

function HeadingsTile() {
  const code: CodeBlockData[] = [
    {
      language: "tsx",
      filename: "headings-import",
      code: `import { Header1 } from "@/components/ui/typography";
<Header1>HeaderText</Header1>`,
    },
  ];
  return (
    <Tile
      title="Headings"
      description="Headings are used to break up different sections of content."
    >
      <div className="flex flex-col gap-2">
        <Header1>Header 1</Header1>
        <Header2>Header 2</Header2>
        <Header3>Header 3</Header3>
        <Header4>Header 4</Header4>
      </div>
      <Separator className="my-4" />
      <Code codeData={code} />
    </Tile>
  );
}

function LabeledValueTile() {
  const code: CodeBlockData[] = [
    {
      language: "tsx",
      filename: "labeled-value-import",
      code: `import { LabeledValue } from "@/components/ui/labeled-value";

<LabeledValue label="Label" value={"value"} units="units" />`,
    },
  ];
  return (
    <Tile
      title="Labeled Value"
      description="A labeled value with optional units."
    >
      <div className="flex flex-col gap-2">
        <LabeledValue label="Label" value={"value"} units="units" />
      </div>
      <Separator className="my-4" />
      <Code codeData={code} />
    </Tile>
  );
}

function ParagraphTile() {
  const code: CodeBlockData[] = [
    {
      language: "tsx",
      filename: "paragraph-import",
      code: `import { Paragraph, BlockQuote, TextBlock } from "@/components/ui/typography";
<Paragraph>Paragraph text goes here.</Paragraph>
<BlockQuote>Blockquote text goes here.</BlockQuote>
<TextBlock>Textblock text goes here.</TextBlock>`,
    },
  ];
  return (
    <Tile
      title="Text"
      description="Sections of text that are separated from each other.."
    >
      <Header4>Paragraph</Header4>
      <Paragraph>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic nam eum
        explicabo repellendus iure alias corrupti quaerat. Excepturi cum fuga
        est possimus animi qui, perferendis repellat! Temporibus rem quo nobis!
      </Paragraph>
      <Header4>Block Quote</Header4>
      <BlockQuote>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic nam eum
        explicabo repellendus iure alias corrupti quaerat. Excepturi cum fuga
        est possimus animi qui, perferendis repellat! Temporibus rem quo nobis!
      </BlockQuote>
      <Header4>Text Block</Header4>
      <TextBlock>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. In maiores
        illum aliquid et porro, tenetur libero animi aliquam, repellat odit
        molestiae! Quisquam maxime consectetur asperiores. Reprehenderit,
        deleniti sit! Aut, eaque?
      </TextBlock>
      <Separator className="my-4" />
      <Code codeData={code} />
    </Tile>
  );
}

const sections = [
  {
    id: "labeled-value",
    title: "Labeled Value",
    children: <LabeledValueTile />,
  },
  { id: "headings", title: "Headings", children: <HeadingsTile /> },
  { id: "paragraph", title: "Paragraph", children: <ParagraphTile /> },
];

export const TypographyExample = () => {
  return <PageSections sections={sections} />;
};
