import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  let cookie = request.cookies.get("blog_login");
  if (cookie?.value === "login") {
    if (request.nextUrl.pathname === "/login") {
      return NextResponse.rewrite(new URL("/", request.url));
    }
    if (request.nextUrl.pathname === "/register") {
      return NextResponse.rewrite(new URL("/", request.url));
    }
  }
  if (cookie?.value !== "login") {
    if (request.nextUrl.pathname === "/write") {
      return NextResponse.rewrite(new URL("/", request.url));
    }
    if (request.nextUrl.pathname.match(/\/edit\/([^/]+)/)) {
      return NextResponse.rewrite(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher: ["/login", "/register", "/write", "/edit/:path*"],
};
