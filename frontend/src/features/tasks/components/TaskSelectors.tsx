import { OptionSelector } from "@/components/composites/OptionSelector";
import { TaskCategory, TaskFrequency } from "@/types/task";
import { enumToArray } from "@/utils/typeConverters";
import React from "react";

export const TaskCategorySelector = ({
  value,
  onChange,
}: {
  value: TaskCategory;
  onChange: (value: TaskCategory) => void;
}) => {
  const [categoryOpen, setCategoryOpen] = React.useState(false);

  const taskCategories = enumToArray(TaskCategory);
  return (
    <div>
      <OptionSelector
        options={taskCategories}
        triggerText="Category"
        open={categoryOpen}
        setOpen={setCategoryOpen}
        value={value}
        setValue={(newValue) => onChange(newValue as TaskCategory)}
      />
    </div>
  );
};

export const TaskFrequencySelector = ({
  value,
  onChange,
}: {
  value: TaskFrequency;
  onChange: (value: TaskFrequency) => void;
}) => {
  const [frequencyOpen, setFrequencyOpen] = React.useState(false);

  const taskFrequencies = enumToArray(TaskFrequency);
  return (
    <div>
      <OptionSelector
        options={taskFrequencies}
        triggerText="Frequency"
        open={frequencyOpen}
        setOpen={setFrequencyOpen}
        value={value}
        setValue={(newValue) => onChange(newValue as TaskFrequency)}
      />
    </div>
  );
};
