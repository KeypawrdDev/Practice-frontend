import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const nextAuth = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      checks: [], // Disable all checks
    }),
  ],
  session: { 
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    jwt: async ({ token, user, account, profile }) => {
      if (user) {
        token.role = "user";
        token.customField = "some custom value";
        token.userId = user.id || user.email || "unknown";
        token.isActive = true;
      }
      
      if (account?.provider === "github") {
        const githubProfile = profile as any;
        token.githubId = githubProfile?.id?.toString();
        token.githubLogin = githubProfile?.login;
      }
      
      return token;
    },
    session: async ({ session, token }) => {
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

export const { handlers, auth, signIn, signOut } = nextAuth;