import { Coin } from "@/components/ui/coin";
import { Slider } from "@/components/ui/slider";

interface ValueSliderProps {
  defaultValue?: number[];
  onValueChange?: (value: number[]) => void;
  max?: number;
  min?: number;
  step?: number;
}
export const ValueSlider = ({
  defaultValue = [25],
  onValueChange,
  max = 100,
  min = 0,
  step = 5,
}: ValueSliderProps) => {
  const handleValueChange = (newValue: number[]) => {
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <div className="flex flex-col items-center space-x-4">
      <Slider
        defaultValue={defaultValue}
        max={max}
        min={min}
        step={step}
        onValueChange={handleValueChange}
        indicator={(value) => <Coin value={value} />}
      />
    </div>
  );
};
