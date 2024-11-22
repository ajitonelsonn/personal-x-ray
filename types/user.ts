// types/user.ts
export interface DatabaseUser {
  id: number;
  email: string;
  username: string;
  password: string;
  is_active: boolean;
  last_login: Date;
}

// You might also want to export the public user type:
export type PublicUser = Pick<DatabaseUser, "id" | "email" | "username">;
