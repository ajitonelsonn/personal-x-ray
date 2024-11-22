// types/auth.ts
export interface JWTPayload {
  userId: number;
  email: string;
  iat?: number;
  exp?: number;
}
