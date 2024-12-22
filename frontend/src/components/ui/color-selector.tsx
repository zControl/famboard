import { useState } from "react";
import CopyButton from "./copy-button";
import { Input } from "./input";
import { Label } from "./label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
const CustomLabel = ({
  children,
  tooltip,
}: {
  children: React.ReactNode;
  tooltip?: string;
}) => {
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
};
const ColorSelector = () => {
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [lightness, setLightness] = useState(50);

  const handleHueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHue(e.target.valueAsNumber);
  };

  const handleSaturationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSaturation(e.target.valueAsNumber);
  };

  const handleLightnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLightness(e.target.valueAsNumber);
  };

  const hslColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  const hslValues = `${hue} ${saturation}% ${lightness}%`;

  return (
    <div className="grid grid-cols-1 place-items-center lg:grid-cols-2 lg:justify-center pb-4">
      <div className="flex flex-col">
        <div
          className="w-64 h-48 rounded-md"
          style={{ backgroundColor: hslColor }}
        />
      </div>
      <div className="w-full space-y-4 my-auto">
        <div className="flex items-center space-x-2">
          <CustomLabel tooltip="Hue is determined by the wavelength of the light and is typically represented on a color wheel. The hue is measured in degrees on the color wheel, where 0° represents red, 120° represents green, 240° represents blue, and so on, wrapping back around to red at 360°.">
            Hue:
          </CustomLabel>
          <Input
            type="range"
            min="0"
            max="360"
            value={hue}
            onChange={handleHueChange}
            className="w-5/6"
          />
          <CustomLabel>{hue}</CustomLabel>
        </div>
        <div className="flex items-center space-x-2">
          <CustomLabel tooltip="Saturation is a measure of how pure the color is. It is represented on a scale from 0% to 100%, where 0% represents a gray color and 100% represents the full saturation of the primary color.">
            Saturation:
          </CustomLabel>
          <Input
            type="range"
            min="0"
            max="100"
            value={saturation}
            onChange={handleSaturationChange}
            className="w-5/6"
          />
          <CustomLabel>{saturation}%</CustomLabel>
        </div>
        <div className="flex items-center space-x-2">
          <CustomLabel tooltip="Lightness is a measure of how light or dark the color is. It is represented on a scale from 0% to 100%, where 0% represents a black color and 100% represents a white color.">
            Lightness:
          </CustomLabel>
          <Input
            type="range"
            min="0"
            max="100"
            value={lightness}
            onChange={handleLightnessChange}
            className="w-5/6"
          />
          <CustomLabel>{lightness}%</CustomLabel>
        </div>
        <div className="w-1/2 mx-auto flex items-center justify-center space-x-2 border border-accent">
          <span className="text-lg">{hslColor}</span>
          <CopyButton content={hslValues} />
        </div>
      </div>
    </div>
  );
};

export { ColorSelector };
