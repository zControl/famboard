import { PageSections } from "@/common/layout/PageSections";
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
  SectionDescription,
  SectionTitle,
  StatLabel,
  StatValue,
  TextBlock,
} from "@/common/ui/typography/typography";

function HeadingsTile() {
  const code: CodeBlockData[] = [
    {
      language: "tsx",
      filename: "headings-import",
      code: `<Header1>Header1</Header1>
<Header2>Header 2</Header2>
<Header3>Header 3</Header3>
<Header4>Header 4</Header4>`,
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

function SectionTextTile() {
  const code: CodeBlockData[] = [
    {
      language: "tsx",
      filename: "section-text-import",
      code: `<SectionTitle>Section Title</SectionTitle>
<SectionDescription>Section Description</SectionDescription>`,
    },
  ];
  return (
    <Tile
      title="Section Text"
      description="Text components used within sections to provide context."
    >
      <SectionTitle>Section Title</SectionTitle>
      <SectionDescription>Section Description</SectionDescription>
      <Separator className="my-4" />
      <Code codeData={code} />
    </Tile>
  );
}

function StatLabelAndValueTile() {
  const code: CodeBlockData[] = [
    {
      language: "tsx",
      filename: "stat-label-and-value-import",
      code: `<StatLabel>Stat Label</StatLabel>
<StatValue>Stat Value</StatValue>`,
    },
  ];
  return (
    <Tile
      title="Stat Label & Value"
      description="Used to display a label and value."
    >
      <div className="flex flex-col gap-2">
        <StatLabel>Stat Label</StatLabel>
        <StatValue>Stat Value</StatValue>
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
      code: `<Paragraph>Paragraph text goes here.</Paragraph>
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
  { id: "headings", title: "Headings", children: <HeadingsTile /> },
  { id: "paragraph", title: "Paragraph", children: <ParagraphTile /> },
  { id: "section-text", title: "Section Text", children: <SectionTextTile /> },
  {
    id: "stat-label-and-value",
    title: "Label / Value",
    children: <StatLabelAndValueTile />,
  },
];

export const UITypography = () => {
  return <PageSections sections={sections} />;
};
