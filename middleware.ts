// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

// Define public routes that don't require authentication
const publicRoutes = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.includes(pathname);

  // Get the token from cookies
  const token = request.cookies.get("token")?.value;

  try {
    if (!token && !isPublicRoute) {
      // If no token and trying to access protected route, redirect to login
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (token) {
      // Verify the token
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      try {
        await jose.jwtVerify(token, secret);

        // If token is valid and trying to access login page, redirect to home
        if (isPublicRoute) {
          return NextResponse.redirect(new URL("/", request.url));
        }
      } catch (error) {
        // If token verification fails, clear the token and redirect to login
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("token");
        return response;
      }
    }

    return NextResponse.next();
  } catch (error) {
    // For any other errors, redirect to login
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
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
