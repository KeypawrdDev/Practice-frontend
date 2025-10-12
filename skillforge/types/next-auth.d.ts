import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      role?: string
      customField?: string
      id?: string
      isActive?: boolean
      githubId?: string
      githubLogin?: string
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string
    customField?: string
    userId?: string
    isActive?: boolean
    githubId?: string
    githubLogin?: string
  }
}