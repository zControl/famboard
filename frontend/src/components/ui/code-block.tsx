import SyntaxHighlighter from "react-syntax-highlighter";
import {
  atomOneDark,
  atomOneLight,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useTheme } from "../common/theme/useTheme";
import CopyButton from "./copy-button";

type CodeBlockProps = {
  code: string;
  language?: string;
};

const CodeBlock = ({ code, language = "tsx" }: CodeBlockProps) => {
  const { theme } = useTheme();
  return (
    <section className="w-full lg:w-5/6 mx-auto">
      <div className="relative">
        <div className="absolute top-4 right-4">
          <CopyButton content={code as string} />
        </div>
        <div className="border border-accent rounded-lg p-2">
          <SyntaxHighlighter
            language={language}
            style={theme === "dark" ? atomOneDark : atomOneLight}
            wrapLines={true}
            wrapLongLines={true}
            showLineNumbers={false}
            showInlineLineNumbers={false}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
    </section>
  );
};

export { CodeBlock };
