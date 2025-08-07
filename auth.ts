import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./lib/db/prisma"
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "./lib/encrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          type: "email",
        },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (credentials == null) return null;

        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email as string,
          },
        });
        
        if (user && user.password) {
          const isMatch = await compare(
            credentials.password as string,
            user.password
          );
          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
        }
        return null;
      },
    })
  ],
  callbacks: {
      async session({ session, token, trigger }: any) {
      session.user.id = token.sub;
      session.user.name = token.name;
      session.user.role = token.role;

      if (trigger === "update" && token.name) {
        session.user.name = token.name;
      }

      return session;
    },
  },

  adapter: PrismaAdapter(prisma),
})