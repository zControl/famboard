export interface Reward {
  id: string;
  title: string;
  description: string;
  rewardValue: number;
  note: string;
}

export interface RewardListResponse {
  count: number;
  data: Reward[];
}