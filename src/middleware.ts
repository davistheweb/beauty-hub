import { type NextRequest, NextResponse } from "next/server";
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasToken = request.cookies.has("access_bearer_token");

  console.log("userHasToken:", hasToken);
  console.log(pathname, "is pathname from middleware");

  if (!hasToken && !pathname.startsWith("/auth/login")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (pathname.startsWith("/auth/login") && hasToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/auth/login",
    "/dashboard/:path*",
    "/booking/:path*",
    "/services/:path*",
    "/customers/:path*",
    "/settings/:path*",
  ],
};
