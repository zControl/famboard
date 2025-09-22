import CopyButton from "./copy-button";

type CodeBlockProps = {
  code: string;
};

const CodeBlock = ({ code }: CodeBlockProps) => {
  return (
    <section className="w-full lg:w-5/6 mx-auto">
      <div className="relative">
        <div className="absolute top-4 right-4">
          <CopyButton content={code as string} />
        </div>
        <div className="border border-accent rounded-lg p-2">{code}</div>
      </div>
    </section>
  );
};

export { CodeBlock };
