import { rewardsApi } from "@/features/rewards/api/rewardsApi";
import { Reward, RewardListResponse } from "@/features/rewards/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useRewards = () => {
  const queryClient = useQueryClient();

  const refreshRewards = () => {
    queryClient.invalidateQueries({ queryKey: ["rewards"] });
  }

  const { data: rewards, isLoading, error } = useQuery<RewardListResponse>({
    queryKey: ["rewards"],
    queryFn: rewardsApi.getRewards,
  });

  const addRewardMutation = useMutation({
    mutationFn: rewardsApi.createReward,
    onSuccess: refreshRewards,
  })

  const updateRewardMutation = useMutation({
    mutationFn: ({ rewardId, reward }: { rewardId: string, reward: Partial<Reward> }) => rewardsApi.updateReward(rewardId, reward),
    onSuccess: refreshRewards,
  })

  const deleteRewardMutation = useMutation({
    mutationFn: rewardsApi.deleteReward,
    onSuccess: refreshRewards,
  })

  return {
    queryClient,
    rewards,
    refreshRewards,
    addRewardMutation,
    updateRewardMutation,
    deleteRewardMutation,
    isLoading,
    error,
  }
}