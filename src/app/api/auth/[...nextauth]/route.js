export const dynamic = "static";

import connectMongoDB from "../../../../../libs/mongodb";
import User from "../../../../../models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { username, password } = credentials;
        try {
          await connectMongoDB("auth");
          const findUser = await User.findOne({ username });

          if (!findUser) {
            return null;
          }
          console.log(findUser);
          const passwordMatch = await bcrypt.compare(
            password,
            findUser.password
          );
          if (!passwordMatch) {
            return null;
          }

          return findUser;
        } catch (error) {
          console.log(error);
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
