import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyJWT } from "@/lib/auth"

// Routes that require authentication
const protectedRoutes = ["/profile", "/bookings", "/admin"]

// API routes that require authentication
const protectedApiRoutes = ["/api/auth/profile", "/api/bookings", "/api/reviews/create"]

export function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl

    // Check if the route is protected
    const isProtectedPage = protectedRoutes.some((route) => pathname.startsWith(route))
    const isProtectedApi = protectedApiRoutes.some((route) => pathname.startsWith(route))

    if (isProtectedPage || isProtectedApi) {
      // Get token from cookies
      const token = request.cookies.get("auth_token")?.value

      // If no token or invalid token
      if (!token || !verifyJWT(token)) {
        if (isProtectedApi) {
          return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        // For pages, redirect to login
        const url = new URL("/auth/login", request.url)
        url.searchParams.set("from", pathname)
        return NextResponse.redirect(url)
      }
    }

    return NextResponse.next()
  } catch (error) {
    console.error("Middleware error:", error)
    // Allow the request to proceed even if there's an error in the middleware
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/bookings/:path*",
    "/admin/:path*",
    "/api/auth/profile/:path*",
    "/api/bookings/:path*",
    "/api/reviews/create/:path*",
  ],
}

