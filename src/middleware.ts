import { type NextRequest, NextResponse } from "next/server";
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasToken = request.cookies.has("beauty_atk");

  console.log("userHasToken:", hasToken);
  console.log(pathname, "is pathname from middleware");

  if (!hasToken && !pathname.startsWith("/auth/login")) {
    const response = NextResponse.redirect(new URL("/auth/login", request.url));
    response.cookies.delete("beauty_atk");
    response.headers.set("x-clear-client-cache", "true");
    return response;
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
    "/packages/:path*",
    "/staffs/:path*",
    "/customers/:path*",
    "/ratings/:path*",
    "/settings/:path*",
  ],
};
