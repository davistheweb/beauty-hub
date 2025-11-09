import { type NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("beauty_atk")?.value;

  console.log("userHasToken:", !!token);
  console.log(pathname, "is pathname from middleware");

  const publicRoute = ["/auth/login", "/auth/account-recovery"];

  const isPublicRoute = publicRoute.some((route) => pathname.startsWith(route));

  if (!token && !isPublicRoute)
    return NextResponse.redirect(new URL("/auth/login", request.url));

  if (!token && isPublicRoute) return NextResponse.next();

  try {
    const res = await fetch(`${API_BASE_URL}/admin/profile/fetch_profile`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.log(res);

      const response = NextResponse.redirect(
        new URL("/auth/login", request.nextUrl),
      );
      response.cookies.delete("beauty_atk");
      response.cookies.delete("cached_bearer_token");
      return response;
    }

    if (isPublicRoute && res.ok)
      return NextResponse.redirect(new URL("/dashboard", request.url));

    return NextResponse.next();
  } catch (err) {
    console.warn("Auth failed: ", err);
    const response = NextResponse.redirect(
      new URL("/auth/login", request.nextUrl),
    );
    response.cookies.delete("beauty_atk");
    response.cookies.delete("cached_bearer_token");
    return response;
  }
}

export const config = {
  matcher: [
    "/",
    "/auth/:path*",
    "/dashboard/:path*",
    "/booking/:path*",
    "/packages/:path*",
    "/staffs/:path*",
    "/customers/:path*",
    "/ratings/:path*",
    "/settings/:path*",
  ],
};
