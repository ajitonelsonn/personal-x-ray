// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

// Define public paths
const publicPaths = [
  "/login",
  "/register",
  "/images/logo.png", // Add the logo path
];

// Define paths that should bypass middleware
const bypassPaths = ["/_next", "/api", "/images", "/favicon.ico"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path should bypass middleware
  if (bypassPaths.some((bp) => pathname.startsWith(bp))) {
    return NextResponse.next();
  }

  // Check if the path is public
  const isPublicPath = publicPaths.some((pp) => pathname.startsWith(pp));

  // Get token from request cookies
  const token = request.cookies.get("token")?.value;

  try {
    if (!token && !isPublicPath) {
      // If no token and trying to access protected route, redirect to login
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (token) {
      // Verify the token
      const payload = await verifyToken(token);

      if (!payload) {
        // If token is invalid, clear it and redirect to login
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("token");
        return response;
      }

      // If token is valid and trying to access login page, redirect to home
      if (isPublicPath) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    // For any errors, clear token and redirect to login
    console.error("Middleware error:", error);
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("token");
    return response;
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|gif|png|svg|ico)$).*)",
  ],
};
