export interface User {
  id: number;
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
  theme: string;
  avatarUrl: string;
}