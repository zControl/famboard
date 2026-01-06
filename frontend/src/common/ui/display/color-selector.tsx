import { CopyButton } from "@/common/ui/actions/copy-button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/common/ui/feedback/tooltip";
import { Input } from "@/common/ui/fields/input";
import { Label } from "@/common/ui/typography/label";
import { cn } from "@/common/utils/classNames";
import { useState } from "react";

function CustomLabel({
  children,
  tooltip,
}: {
  children: React.ReactNode;
  tooltip?: string;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Label className="w-40 text-xl font-semibold">{children}</Label>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function ColorSelector({ className, ...props }: React.ComponentProps<"div">) {
  const [lightness, setLightness] = useState(0);
  const [chroma, setChroma] = useState(0.12);
  const [hue, setHue] = useState(0);

  const handleLightnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLightness(e.target.valueAsNumber);
  };

  const handleChromaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChroma(Number(e.target.value));
  };

  const handleHueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHue(e.target.valueAsNumber);
  };

  const oklchColor = `oklch(${lightness} ${chroma} ${hue})`;

  return (
    <div
      className={cn(
        "grid grid-cols-1 place-items-center lg:grid-cols-2 lg:justify-center pb-4",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col">
        <div
          className="w-64 h-48 rounded-md"
          style={{ backgroundColor: oklchColor }}
        />
      </div>
      <div className="w-full space-y-4 my-auto">
        <div className="flex items-center space-x-2">
          <CustomLabel tooltip="Lightness">Lightness:</CustomLabel>
          <Input
            type="range"
            min="0"
            max="1"
            step="0.0001"
            value={lightness}
            onChange={handleLightnessChange}
            className="w-5/6"
          />
          <CustomLabel>{lightness.toFixed(4)}</CustomLabel>
        </div>
        <div className="flex items-center space-x-2">
          <CustomLabel tooltip="Chroma">Chroma:</CustomLabel>
          <Input
            type="range"
            min="0"
            max="0.4"
            step="0.001"
            value={chroma}
            onChange={handleChromaChange}
            className="w-5/6"
          />
          <CustomLabel>{chroma.toFixed(3)}</CustomLabel>
        </div>
        <div className="flex items-center space-x-2">
          <CustomLabel tooltip="Hue">Hue:</CustomLabel>
          <Input
            type="range"
            min="0"
            max="360"
            step="0.01"
            value={hue}
            onChange={handleHueChange}
            className="w-5/6"
          />
          <CustomLabel>{hue.toFixed(2)}</CustomLabel>
        </div>

        <div className="mx-auto flex items-center justify-center space-x-2 border border-accent">
          <span className="text-lg">{oklchColor}</span>
          <CopyButton content={oklchColor} />
        </div>
      </div>
    </div>
  );
}

export { ColorSelector };
