// app/api/auth/verify-otp/route.ts
import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { createToken } from "@/lib/auth";
import { OTPRecord } from "@/types/otp";

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json();

    // Validate input
    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and verification code are required" },
        { status: 400 }
      );
    }

    // Find the user and OTP
    const otpResults = (await query(
      `SELECT o.*, u.id as user_id 
       FROM otp_codes o
       JOIN users u ON o.user_id = u.id
       WHERE o.email = ? 
       AND o.otp_code = ? 
       AND o.purpose = 'REGISTRATION'
       AND o.is_used = FALSE
       AND o.expires_at > CURRENT_TIMESTAMP()
       ORDER BY o.created_at DESC
       LIMIT 1`,
      [email, otp]
    )) as OTPRecord[];

    if (!otpResults || otpResults.length === 0) {
      return NextResponse.json(
        { error: "Invalid or expired verification code" },
        { status: 400 }
      );
    }

    const otpRecord = otpResults[0];

    // Mark OTP as used
    await query("UPDATE otp_codes SET is_used = TRUE WHERE id = ?", [
      otpRecord.id,
    ]);

    // Activate user
    await query("UPDATE users SET is_active = TRUE WHERE id = ?", [
      otpRecord.user_id,
    ]);

    // Create authentication token
    const token = await createToken({
      userId: otpRecord.user_id,
      email: email,
    });

    // Log the verification
    await query(
      `INSERT INTO auth_logs (user_id, action, status, ip_address, user_agent)
       VALUES (?, 'OTP_VERIFY', 'SUCCESS', ?, ?)`,
      [
        otpRecord.user_id,
        request.headers.get("x-forwarded-for") || "unknown",
        request.headers.get("user-agent") || "unknown",
      ]
    );

    const response = NextResponse.json({
      success: true,
      message: "Email verified successfully",
    });

    // Set authentication cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("OTP verification error:", error);
    return NextResponse.json(
      { error: "An error occurred during verification" },
      { status: 500 }
    );
  }
}
