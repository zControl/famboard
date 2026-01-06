import { Coin } from "@/common/ui/display/coin";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/common/ui/fields/field";
import { Input } from "@/common/ui/fields/input";
import { Slider } from "@/common/ui/fields/slider";
import { Textarea } from "@/common/ui/fields/textarea";
import { ActionModal } from "@/common/ui/overlay/ActionModal";
import { rewardsListSchema } from "@/features/rewards/datatable/RewardsListSchema";
import { useRewards } from "@/features/rewards/hooks/useRewards";
import { Reward } from "@/features/rewards/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

interface RewardModalProps {
  modalOpen: boolean;
  onModalOpenChange: (open: boolean) => void;
  existingReward?: Reward;
}

export const RewardModal = ({
  modalOpen,
  onModalOpenChange,
  existingReward,
}: RewardModalProps) => {
  const { addRewardMutation, updateRewardMutation } = useRewards();

  const isEditing = !!existingReward;

  const defaultValues = useMemo(
    () => ({
      title: existingReward?.title || "",
      description: existingReward?.description || "",
      rewardValue: existingReward?.rewardValue ?? 0,
      note: existingReward?.note ?? "",
    }),
    [existingReward],
  );

  const onSubmit = (data: z.infer<typeof rewardsListSchema>) => {
    if (isEditing) {
      updateRewardMutation.mutate(
        { rewardId: existingReward.id, reward: data },
        {
          onSuccess: () => {
            onModalOpenChange(false);
          },
          onError: (error) => {
            console.error(`Error updating reward:`, error);
          },
        },
      );
    } else {
      addRewardMutation.mutate(data, {
        onSuccess: () => {
          onModalOpenChange(false);
        },
        onError: (error) => {
          console.error(`Error adding reward:`, error);
        },
      });
    }
  };

  const handleCancel = () => {
    onModalOpenChange(false);
  };

  const form = useForm<z.infer<typeof rewardsListSchema>>({
    resolver: zodResolver(rewardsListSchema),
    defaultValues,
    mode: "onSubmit",
  });

  useEffect(() => {
    if (modalOpen) {
      form.reset(defaultValues);
    }
  }, [modalOpen, form, defaultValues]);

  const modalTitle = isEditing ? "Edit reward" : "Add reward";
  const modalDescription = isEditing
    ? `Edit reward "${existingReward?.title}"`
    : "Add a new reward and set initial values";

  return (
    <ActionModal
      open={modalOpen}
      onOpenChange={onModalOpenChange}
      onCancel={handleCancel}
      onConfirm={form.handleSubmit(onSubmit)}
      title={modalTitle}
      description={modalDescription}
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter reward title"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter reward description"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="rewardValue"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Value</FieldLabel>
                <Slider
                  defaultValue={[field.value]}
                  max={500}
                  min={0}
                  step={1}
                  onValueChange={field.onChange}
                  indicator={(value) => <Coin value={value} />}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="note"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Note</FieldLabel>
                <Textarea
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter reward note"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </form>
    </ActionModal>
  );
};
