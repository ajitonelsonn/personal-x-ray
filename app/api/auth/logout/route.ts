// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(request: Request) {
  try {
    // Log the logout action
    const userAgent = request.headers.get("user-agent") || "unknown";
    const ip = request.headers.get("x-forwarded-for") || "unknown";

    try {
      await query(
        `INSERT INTO auth_logs (action, status, ip_address, user_agent)
         VALUES (?, ?, ?, ?)`,
        ["LOGOUT", "SUCCESS", ip, userAgent]
      );
    } catch (logError) {
      console.error("Error logging logout:", logError);
      // Continue with logout even if logging fails
    }

    // Create response that will clear the auth token
    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });

    // Clear the auth cookie
    response.cookies.delete("token");

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "An error occurred during logout" },
      { status: 500 }
    );
  }
}
