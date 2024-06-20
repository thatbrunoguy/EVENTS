// middleware.js
import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import { authFunctions } from "./app/utils/endpoints";
import { getData } from "./app/utils/localstorage";
import { EVENTSPARROT_USER } from "./app/constants";
import { cookies } from "next/headers";

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

export async function middleware(request: NextRequest) {
  const accountCookie = cookies().get("account");

  if (!accountCookie) {
    return NextResponse.redirect(new URL("auth/login", request.url));
  }

  const user = JSON.parse(accountCookie?.value);
  const userRole = user.user_role_on_account;

  const routes = [
    { path: /^\/dashboard\/?$/, allowedRoles: [1, 2] },
    { path: /^\/dashboard\/event\/?$/, allowedRoles: [1] },
    { path: /^\/dashboard\/campaigns\/?$/, allowedRoles: [1, 2] },
    { path: /^\/dashboard\/guestlist\/?$/, allowedRoles: [1, 2, 3] },
    { path: /^\/dashboard\/sales\/?$/, allowedRoles: [1] },
    { path: /^\/dashboard\/wallet\/?$/, allowedRoles: [1] },
    { path: /^\/dashboard\/settings\/?$/, allowedRoles: [1] },
    { path: /^\/dashboard\/events\/check-ins\/?$/, allowedRoles: [1, 2, 3] },
  ];

  if (userRole) {
    const currentPath = request.nextUrl.pathname;

    const route = routes.find((r) => r.path.test(currentPath));

    if (route && !route.allowedRoles.includes(userRole)) {
      const firstAllowedRoute = routes.find((r) =>
        r.allowedRoles.includes(userRole)
      );
      if (firstAllowedRoute) {
        const firstAllowedPath = firstAllowedRoute.path
          .toString()
          .replace(/^\/\^/, "")
          .replace(/\\\/\?\$\/$/, "")
          .replace(/\\\//g, "/");
        return NextResponse.redirect(new URL(firstAllowedPath, request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
