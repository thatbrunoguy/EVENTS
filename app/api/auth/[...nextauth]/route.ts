import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import toast from "react-hot-toast";

const BASE_URL = process.env.BASE_URL || "";
const APP_KEY = process.env.X_APP_KEY || "";
const ADMIN_APP_KEY = process.env.X_ADMIN_APP_KEY || "";
const ADMIN_BASE_URL = process.env.ADMIN_BASE_URL || "";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "";
console.log("ADMIN_EMAIL", ADMIN_EMAIL);

if (!BASE_URL || !APP_KEY || !ADMIN_BASE_URL) {
  throw new Error(
    "Environment variables BASE_URL, X_APP_KEY, or ADMIN_BASE_URL are not set."
  );
}

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "auraqule@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        let url = BASE_URL;
        let appKey = APP_KEY;
        if (credentials?.email === ADMIN_EMAIL) {
          console.log(ADMIN_EMAIL);
          url = ADMIN_BASE_URL;
          appKey = ADMIN_APP_KEY;
        }
        const res = await fetch(`${url}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-APP-KEY": appKey,
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });
        const user = await res.json();
        if (res.ok && user.status === true) {
          // Any object returned will be saved in `user` property of the JWT
          return user.data;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          throw new Error(user.message);
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
