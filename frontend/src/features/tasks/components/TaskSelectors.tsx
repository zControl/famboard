import { OptionSelector } from "@/components/composites/OptionSelector";
import { TaskCategory, TaskFrequency } from "@/types/task";
import { enumToArray } from "@/utils/typeConverters";
import React from "react";

export const TaskCategorySelector = () => {
  const [categoryOpen, setCategoryOpen] = React.useState(false);
  const [category, setCategory] = React.useState("");

  const taskCategories = enumToArray(TaskCategory);
  return (
    <div>
      <OptionSelector
        options={taskCategories}
        triggerText="Category"
        open={categoryOpen}
        setOpen={setCategoryOpen}
        value={category}
        setValue={setCategory}
      />
    </div>
  );
};

export const TaskFrequencySelector = () => {
  const [frequencyOpen, setFrequencyOpen] = React.useState(false);
  const [frequency, setFrequency] = React.useState("");

  const taskFrequencies = enumToArray(TaskFrequency);
  return (
    <div>
      <OptionSelector
        options={taskFrequencies}
        triggerText="Frequency"
        open={frequencyOpen}
        setOpen={setFrequencyOpen}
        value={frequency}
        setValue={setFrequency}
      />
    </div>
  );
};
