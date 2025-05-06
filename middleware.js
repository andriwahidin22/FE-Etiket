// middleware.js
import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import { adminRoutes, buyerRoutes } from "./lib/routes";

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Skip public files, static, or API
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Retrieve token from cookies
  const token = req.cookies.get("token")?.value;

  // If no token, redirect to login for protected routes
  if (!token) {
    const isAdminRoute = adminRoutes.includes(pathname);
    const isBuyerRoute = buyerRoutes.includes(pathname);

    if (isAdminRoute || isBuyerRoute) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  try {
    // Decode token if available
    const decoded = jwtDecode(token);

    // Check if the role matches for protected routes
    const isAdminRoute = adminRoutes.includes(pathname);
    const isBuyerRoute = buyerRoutes.includes(pathname);

    if (decoded && decoded.role) {
      const role = decoded.role;

      // Role mismatch handling
      if (isAdminRoute && role !== "ADMIN") {
        return NextResponse.redirect(new URL("/", req.url));
      }

      if (isBuyerRoute && role !== "BUYER") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
  } catch (error) {
    // If the token is invalid or there's an error during decoding, redirect to login
    console.error("Token decoding error:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/pembeli/:path*",
    "/beli/:path*"
  ],
};
