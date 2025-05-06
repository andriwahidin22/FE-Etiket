// middleware.js
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { adminRoutes, buyerRoutes } from "./lib/routes";

const PUBLIC_FILE = /\.(.*)$/;

const getToken = async (req) => {
  try {
    const token = req.cookies.get("token")?.value || "";
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    if (!token) return null;

    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (e) {
    return null;
  }
};

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

  const token = await getToken(req);

  // No token, redirect to login if trying to access protected route
  const isAdminRoute = adminRoutes.includes(pathname);
  const isBuyerRoute = buyerRoutes.includes(pathname);

  if (!token && (isAdminRoute || isBuyerRoute)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Token found but role mismatch
  if (token) {
    const role = token.role;

    if (isAdminRoute && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (isBuyerRoute && role !== "BUYER") {
      return NextResponse.redirect(new URL("/", req.url));
    }
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
