import { type NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

if (!API_BASE_URL) throw new Error("NEXT_PUBLIC_API_BASE_URL Does not exist");

const TOKEN_CACHE_TTL: number = 10 * 60 * 1000;

const tokenCache = new Map<string, { valid: boolean; expires: number }>();

const invalidTokens = new Set<string>();

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("beauty_atk")?.value;

  console.log("userHasToken:", !!token);
  console.log(pathname, "is pathname from middleware");

  const publicRoute = ["/auth/login", "/auth/account-recovery"];

  const isPublicRoute = publicRoute.some((route) => pathname.startsWith(route));

  const redirectToLogin = () => {
    const res = NextResponse.redirect(new URL("/auth/login", request.url));
    ["beauty_atk", "cached_bearer_token"].forEach((v) => res.cookies.delete(v));
    if (token) {
      tokenCache.delete(token);
      invalidTokens.add(token);
    }
    return res;
  };

  if (!token) return isPublicRoute ? NextResponse.next() : redirectToLogin();

  if (token && invalidTokens.has(token)) redirectToLogin();

  const now = Date.now();
  const cached = token ? tokenCache.get(token) : null;

  if (cached && cached.expires > now) {
    console.log("Cache hit for token: ", token);

    if (!cached.valid) return redirectToLogin();

    if (isPublicRoute)
      return NextResponse.redirect(new URL(`/dashboard`, request.url));

    return NextResponse.next();
  }

  try {
    const res = await fetch(`${API_BASE_URL}/admin/profile/fetch_profile`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const isGoodResponse = res.ok;
    console.log(`GOOD RESPONSE: ${isGoodResponse} \n`);

    tokenCache.set(token, {
      valid: isGoodResponse,
      expires: now + TOKEN_CACHE_TTL,
    });

    if (!res.ok) return redirectToLogin();

    if (isPublicRoute)
      return NextResponse.redirect(new URL("/dashboard", request.url));

    return NextResponse.next();
  } catch (err) {
    console.warn("Auth failed: ", err);
    tokenCache.set(token, {
      valid: false,
      expires: now + TOKEN_CACHE_TTL,
    });

    return redirectToLogin();
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
