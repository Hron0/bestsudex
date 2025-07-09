import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/backend/db"
import authConfig from "./auth.config"

export const {
    handlers: { GET, POST }, auth, signIn, signOut
} = NextAuth({
    trustHost: true,
    adapter: DrizzleAdapter(db),
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
    ...authConfig,
})