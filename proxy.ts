import { NextRequest, NextResponse } from "next/server";

/**
 * Specimen 03: The proxy.ts Interceptor
 * 
 * Next.js 16 introduces the `proxy.ts` layer as the evolved successor to `middleware.ts`.
 * It provides a more robust way to handle edge-level logic, network boundaries,
 * and request/response transformations before they hit the application cluster.
 */

const locales = ["en", "es", "fr"];
const defaultLocale = "en";

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) return defaultLocale;

  const languages = acceptLanguage
    .split(",")
    .map((lang) => lang.split(";")[0].split("-")[0].trim().toLowerCase());

  for (const lang of languages) {
    if (locales.includes(lang)) {
      return lang;
    }
  }

  return defaultLocale;
}

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const SPECIMEN_BASE = "/routing-lab/i18n";

  // Handle i18n logic
  if (pathname.startsWith(SPECIMEN_BASE)) {
    const pathnameIsMissingLocale = locales.every(
      (locale) => !pathname.startsWith(`${SPECIMEN_BASE}/${locale}/`) && pathname !== `${SPECIMEN_BASE}/${locale}`
    );

    if (pathnameIsMissingLocale) {
      const locale = getLocale(request);
      return NextResponse.redirect(
        new URL(
          `${SPECIMEN_BASE}/${locale}${pathname.substring(SPECIMEN_BASE.length)}`,
          request.url
        )
      );
    }
    return NextResponse.next();
  }

  // Handle original proxy-specimen logic
  if (pathname.startsWith("/the-rendering/proxy-specimen")) {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const platform = request.headers.get("sec-ch-ua-platform") || "Unknown";
    const fingerprint = Buffer.from(`${ip}-${platform}`).toString("base64").slice(0, 12);

    const country = request.headers.get("x-vercel-ip-country") || "US";
    const city = request.headers.get("x-vercel-ip-city") || "San Francisco";

    if (country === "XX") {
      return new NextResponse("Service Unavailable in your region", { status: 451 });
    }

    const response = NextResponse.next();
    response.headers.set("x-lab-fingerprint", fingerprint);
    response.headers.set("x-lab-geo", `${city}, ${country}`);

    const authToken = request.cookies.get("auth-token")?.value || "initial-token-123";
    const rotatedToken = `rotated_${Math.random().toString(36).substring(7)}`;

    response.cookies.set("auth-token", rotatedToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });

    response.headers.set("x-token-rotated", "true");
    response.headers.set("x-prev-token", authToken.slice(-8));

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/the-rendering/proxy-specimen/:path*",
    "/routing-lab/i18n/:path*"
  ],
};
