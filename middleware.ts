// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";


export async function middleware(req: any) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  
  const protectedPaths = ["/dashboard", "/settings", "/profile", "/create-profile"];

  const isProtected = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (isProtected && !token) {
    return new Response(
      `<script>alert("You need to be login first!"); window.location.href="/";</script>`,
      { headers: { "Content-Type": "text/html" }, status: 401 }
    );
  }


  
  return NextResponse.next();
}

// Paths the middleware runs on
export const config = {
  matcher: ["/dashboard/:path*", "/settings/:path*", "/profile/:path*", "/create-profile/:path*"],
};
