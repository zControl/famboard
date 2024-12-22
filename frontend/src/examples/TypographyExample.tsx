import { PageSections } from "@/components/common/PageSections";
import { Tile } from "@/components/composites/Tile";
import { CodeBlock } from "@/components/ui/code-block";
import { Separator } from "@/components/ui/separator";
import {
  BlockQuote,
  Header1,
  Header2,
  Header3,
  Header4,
  Paragraph,
  TextBlock,
} from "@/components/ui/typography";

function HeadingsTile() {
  const code = `import { Header1 } from "@/components/ui/typography";
<Header1>HeaderText</Header1>`;
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
      <CodeBlock code={code} />
    </Tile>
  );
}

function ParagraphTile() {
  const code = `import { Paragraph, BlockQuote, TextBlock } from "@/components/ui/typography";
<Paragraph>Paragraph text goes here.</Paragraph>
<BlockQuote>Blockquote text goes here.</BlockQuote>
<TextBlock>Textblock text goes here.</TextBlock>
`;
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
      <CodeBlock code={code} />
    </Tile>
  );
}

const sections = [
  { id: "headings", title: "Headings", children: <HeadingsTile /> },
  { id: "paragraph", title: "Paragraph", children: <ParagraphTile /> },
];

const TypographyExample = () => {
  return <PageSections sections={sections} />;
};

export { TypographyExample };
