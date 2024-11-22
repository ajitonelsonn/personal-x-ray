// app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import bcrypt from "bcrypt";
import { sendOTPEmail } from "@/lib/email";

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: Request) {
  try {
    const { email, password, username } = await request.json();

    // Check if user already exists
    const existingUsers = (await query(
      "SELECT id FROM users WHERE email = ? OR username = ?",
      [email, username]
    )) as any[];

    if (existingUsers.length > 0) {
      return NextResponse.json(
        { error: "Email or username already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create unverified user
    const result = (await query(
      `INSERT INTO users (username, email, password, is_active) 
       VALUES (?, ?, ?, FALSE)`,
      [username, email, hashedPassword]
    )) as any;

    const userId = result.insertId;

    // Generate and save OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await query(
      `INSERT INTO otp_codes (user_id, email, otp_code, purpose, expires_at)
       VALUES (?, ?, ?, 'REGISTRATION', ?)`,
      [userId, email, otp, expiresAt]
    );

    // Send OTP email
    const emailSent = await sendOTPEmail(email, otp);

    if (!emailSent) {
      // Rollback if email fails
      await query("DELETE FROM users WHERE id = ?", [userId]);
      return NextResponse.json(
        { error: "Failed to send verification email" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Please check your email for verification code",
      requiresOTP: true,
      email: email,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "An error occurred during registration" },
      { status: 500 }
    );
  }
}
