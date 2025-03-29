import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  // Protected routes that require authentication
  const protectedPaths = ["/dashboard"]
  const path = req.nextUrl.pathname

  if (!session && protectedPaths.some((prefix) => path.startsWith(prefix))) {
    const url = new URL("/login", req.url)
    url.searchParams.set("callbackUrl", path)
    return NextResponse.redirect(url)
  }

  // If user is authenticated and trying to access login page, redirect to dashboard
  if (session && path === "/login") {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
}

