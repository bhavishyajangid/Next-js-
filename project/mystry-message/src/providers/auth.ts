import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import { userModel } from "@/models/user.models";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Missing credentials");
        }

        await dbConnect();

        const user = await userModel.findOne({ email: credentials.email });

        if (!user) throw new Error("User not found");
        if (!user.isVerified) throw new Error("Please verify your email");

        const isMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isMatch) throw new Error("Invalid password");

        return user;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id.toString();
        token.isVerified = user.isVerified;
        token.username = user.username;
        token.isAcceptingMessages = user.isAcceptingMessages;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id 
        session.user.isVerified = token.isVerified
        session.user.username = token.username 
        session.user.isAcceptingMessages =
          token.isAcceptingMessages 
      }
      return session;
    },
  },

  pages: {
    signIn: "/sign-in",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.AUTH_SECRET,
});
