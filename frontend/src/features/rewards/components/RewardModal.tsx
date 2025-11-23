import { Input } from "@/common/ui/fields/input";
import { ActionModal } from "@/common/ui/overlay/ActionModal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/common/ui/surfaces/form";
import { rewardsListSchema } from "@/features/rewards/datatable/RewardsListSchema";
import { useRewards } from "@/features/rewards/hooks/useRewards";
import { Reward } from "@/features/rewards/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
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
      pointValue: existingReward?.rewardValue || 0,
    }),
    [existingReward],
  );

  const handleSubmit = (data: z.infer<typeof rewardsListSchema>) => {
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
          console.log("Reward added", { data });
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
  });

  useEffect(() => {
    if (modalOpen) {
      form.reset(defaultValues);
    }
  }, [modalOpen, form, defaultValues]);

  const modalTitle = isEditing ? "Edit task" : "Add task";
  const modalDescription = isEditing
    ? `Edit task "${existingReward?.title}"`
    : "Add a new task and set initial values";

  return (
    <ActionModal
      open={modalOpen}
      onOpenChange={onModalOpenChange}
      onCancel={handleCancel}
      onConfirm={form.handleSubmit(handleSubmit)}
      title={modalTitle}
      description={modalDescription}
    >
      <Form {...form}>
        <form className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reward Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter reward title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </ActionModal>
  );
};
