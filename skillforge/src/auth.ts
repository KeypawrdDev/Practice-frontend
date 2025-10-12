import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    jwt: async ({ token, user, account, profile }) => {
      // Add custom fields to the JWT token
      if (user) {
        token.role = "user"; // You can set this based on user data
        token.customField = "some custom value";
        token.userId = user.id;
        token.isActive = true;
        // Add any other custom fields you need
      }
      
      // You can also modify existing fields
      if (account?.provider === "github") {
        token.githubId = profile?.id;
        token.githubLogin = profile?.login;
      }
      
      return token;
    },
    session: async ({ session, token }) => {
      // Pass custom fields from JWT to session
      if (token) {
        session.user.role = token.role as string;
        session.user.customField = token.customField as string;
        session.user.id = token.userId as string;
        session.user.isActive = token.isActive as boolean;
        session.user.githubId = token.githubId as string;
        session.user.githubLogin = token.githubLogin as string;
      }
      return session;
    },
  },
  debug: true,
});