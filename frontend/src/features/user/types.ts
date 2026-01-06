export interface User {
  id: string;
  email: string;
  username: string;
  group: UserGroup;
}

export enum UserGroup {
  ADMIN = "admin",
  PARENT = "parent",
  KID = "kid",
  GUEST = "guest",
}

export interface UserProfile {
  userId: string;
  username: string;
  email: string;
  firstName: string;
  birthDate: Date;
  bio: string;
  statusEmoji: string;
  status: string;
  theme: string;
  avatarUrl: string;
  pointTotal: number;
  piggyBankCents: number;
  piggyBankDisplay: string;
}

export interface UsersByGroupResponse {
  email: string;
  username: string;
  group: UserGroup;
  profile: UserProfile;
}