// types/next-auth.d.ts
import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      customField: string;
      isActive: boolean;
      githubId?: string;
      githubLogin?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    customField?: string;
    userId?: string;
    isActive?: boolean;
    githubId?: string;
    githubLogin?: string;
  }
}
