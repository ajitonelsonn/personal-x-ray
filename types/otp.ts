// types/otp.ts
export interface OTPRecord {
  id: number;
  user_id: number;
  email: string;
  otp_code: string;
  purpose: "REGISTRATION" | "PASSWORD_RESET" | "LOGIN";
  is_used: boolean;
  expires_at: Date;
  created_at: Date;
}
