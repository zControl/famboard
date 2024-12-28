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