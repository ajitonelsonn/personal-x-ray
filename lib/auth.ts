import * as jose from "jose";

// Define a type for the JWT payload
interface JWTPayload {
  [key: string]: unknown;
  iat?: number;
  exp?: number;
}

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "");

export async function createToken(payload: JWTPayload): Promise<string> {
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h") // Token expires in 24 hours
    .sign(secret);
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jose.jwtVerify(token, secret);
    return payload as JWTPayload;
  } catch {
    // Remove the unused parameter completely since we're not using it
    return null;
  }
}

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
