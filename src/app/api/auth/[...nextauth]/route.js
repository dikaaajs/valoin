export const dynamic = "static";

import connectMongoDB from "../../../../../libs/mongodb";
import User from "../../../../../models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        console.log("authorize");
        const { username, password } = credentials;
        try {
          await connectMongoDB();
          const findUser = await User.findOne({ username });

          if (!findUser) {
            return null;
          }
          let passwordMatch = await bcrypt.compare(password, findUser.password);

          if (!passwordMatch) {
            passwordMatch = password === findUser.password;
          }

          console.log(passwordMatch);

          if (!passwordMatch) {
            return null;
          }

          console.log(findUser._doc.username);

          const user = {
            ...findUser._doc,
            name: findUser._doc.username,
            image: findUser._doc.pp,
          };
          return user;
        } catch (error) {
          console.log(error);
        }

        return null;
      },
    }),
    GithubProvider({
      name: "github",
      clientId: process.env.GITHUB_CLIENT,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async session({ session, token, user }) {
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
