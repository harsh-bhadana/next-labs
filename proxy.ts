import { NextRequest, NextResponse } from "next/server";

/**
 * Specimen 03: The proxy.ts Interceptor
 * 
 * Next.js 16 introduces the `proxy.ts` layer as the evolved successor to `middleware.ts`.
 * It provides a more robust way to handle edge-level logic, network boundaries,
 * and request/response transformations before they hit the application cluster.
 */

export default async function proxy(request: NextRequest) {
  // 1. Request Fingerprinting
  // Generate a unique ID for this request based on networking metadata
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
  const platform = request.headers.get("sec-ch-ua-platform") || "Unknown";
  const fingerprint = Buffer.from(`${ip}-${platform}`).toString("base64").slice(0, 12);

  // 2. Geo-fencing & Edge Logic
  // Using Vercel/Edge headers for location data
  const country = request.headers.get("x-vercel-ip-country") || "US";
  const city = request.headers.get("x-vercel-ip-city") || "San Francisco";

  // Example Block List (Simulating Geo-fencing)
  if (country === "XX") { // Placeholder for blocked region
    return new NextResponse("Service Unavailable in your region", { status: 451 });
  }

  // 3. Centralized JWT Rotation Logic (Mocked)
  const response = NextResponse.next();

  // Inject fingerprint and geo-data into response headers for the specimen page to read
  response.headers.set("x-lab-fingerprint", fingerprint);
  response.headers.set("x-lab-geo", `${city}, ${country}`);

  const authToken = request.cookies.get("auth-token")?.value || "initial-token-123";

  // Logic: If token exists, "rotate" it every request (demonstration purposes)
  const rotatedToken = `rotated_${Math.random().toString(36).substring(7)}`;

  response.cookies.set("auth-token", rotatedToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours
  });

  // Signal to the UI that rotation occurred
  response.headers.set("x-token-rotated", "true");
  response.headers.set("x-prev-token", authToken.slice(-8));

  return response;
}

// Ensure the proxy only runs on the specimen route to avoid interfering with other labs
export const config = {
  matcher: ["/the-rendering/proxy-specimen/:path*"],
};
