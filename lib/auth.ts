// lib/auth.ts
import * as jose from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "");

export async function createToken(payload: any) {
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h") // Token expires in 24 hours
    .sign(secret);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jose.jwtVerify(token, secret);
    return payload;
  } catch (error) {
    return null;
  }
}

export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
