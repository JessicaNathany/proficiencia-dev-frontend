import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const SECRET = process.env.SECRET;
const GITHUB_ID = String(process.env.GITHUB_ID);
const GITHUB_SECRET = String(process.env.GITHUB_SECRET);

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
    }),
  ],
  secret: SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session }) {
      return session;
    },
  },
});
