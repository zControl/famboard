import { Button } from "@/components/ui/button";
import { CheckCircle2Icon, CopyIcon } from "lucide-react";
import { useState } from "react";

type CopyButtonProps = {
  content: string;
  className?: string;
};

const CopyButton = ({ content, className }: CopyButtonProps) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className={className}>
      <Button variant="ghost" onClick={copyToClipboard} size="icon">
        {copySuccess ? (
          <CheckCircle2Icon className="text-green-500" />
        ) : (
          <CopyIcon />
        )}
      </Button>
    </div>
  );
};

export default CopyButton;
