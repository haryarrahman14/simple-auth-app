import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/", "/products", "/carts"];
const unprotectedRoutes = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get("jwt");

  if (!isAuthenticated && protectedRoutes.includes(request.nextUrl.pathname)) {
    const absoluteURL = new URL("/login", request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  if (isAuthenticated && unprotectedRoutes.includes(request.nextUrl.pathname)) {
    const absoluteURL = new URL("/", request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  return NextResponse.next();
}

export const config = {
  // matcher solution for public, api, assets and _next exclusion
  matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};
