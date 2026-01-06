import { apiClient } from "@/api/apiClient";
import { API_ENDPOINTS } from "@/api/apiEndpoints";
import { Reward, RewardListResponse } from "@/features/rewards/types";

export const rewardsApi = {
  getRewards: () => apiClient.get<RewardListResponse>(API_ENDPOINTS.REWARDS.GET_ALL),
  getReward: (id: string) => apiClient.get<Reward>(API_ENDPOINTS.REWARDS.GET_ONE(id)),
  createReward: (reward: Partial<Reward>) => apiClient.post<Reward>(API_ENDPOINTS.REWARDS.CREATE, reward),
  updateReward: (id: string, reward: Partial<Reward>) => apiClient.patch<Reward>(API_ENDPOINTS.REWARDS.UPDATE(id), reward),
  deleteReward: (id: string) => apiClient.delete(API_ENDPOINTS.REWARDS.DELETE(id)),
};