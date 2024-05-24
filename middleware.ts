// middleware.js
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const { token } = req.nextauth;
    const url = req.nextUrl;

    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    const isAdminRoute = url.pathname.startsWith("/admin");
    const isUserRoute = url.pathname.startsWith("/dashboard");

    if (isAdminRoute && !token.admin) {
      // Redirect to 404 page if a non-admin tries to access admin route
      return NextResponse.rewrite(new URL("/404", req.url));
    }

    if (isUserRoute && token.admin) {
      // Redirect to admin dashboard if an admin tries to access user route
      return NextResponse.rewrite(new URL("/404", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      async authorized({ token }) {
        return !!token; // Ensure user is authenticated
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
