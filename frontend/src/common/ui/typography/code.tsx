import type { BundledLanguage } from "@/common/ui/typography/code-block";

import {
  CodeBlock,
  CodeBlockBody,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockFiles,
  CodeBlockHeader,
  CodeBlockItem,
} from "@/common/ui/typography/code-block";

import { type CodeBlockData } from "@/common/ui/typography/code-block";

interface CodeProps {
  codeData: CodeBlockData[];
  defaultLanguage?: string;
}

const Code = ({ codeData, defaultLanguage = "tsx" }: CodeProps) => {
  return (
    <section className="w-full lg:w-5/6 mx-auto">
      <div className="relative">
        <CodeBlock
          data={codeData}
          defaultValue={defaultLanguage || codeData[0]?.language}
        >
          <CodeBlockHeader>
            <CodeBlockFiles>
              {(item) => (
                <CodeBlockFilename key={item.language} value={item.language}>
                  {item.filename}
                </CodeBlockFilename>
              )}
            </CodeBlockFiles>
            <CodeBlockCopyButton
              onCopy={() => console.log("Copied code to clipboard")}
              onError={() => console.error("Failed to copy code to clipboard")}
            />
          </CodeBlockHeader>
          <CodeBlockBody>
            {(item) => (
              <CodeBlockItem key={item.language} value={item.language}>
                <CodeBlockContent language={item.language as BundledLanguage}>
                  {item.code}
                </CodeBlockContent>
              </CodeBlockItem>
            )}
          </CodeBlockBody>
        </CodeBlock>
      </div>
    </section>
  );
};

export { Code };
