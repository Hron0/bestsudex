import authConfig from "./auth.config"
import NextAuth from "next-auth"
import {
    privateRoutes,
    adminRoutes,
    authRoutes,
    apiAuthPrefix,
    DEFAULT_LOGIN_REDIRECT
} from "../routes"
import { NextResponse } from 'next/server';
const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const { nextUrl } = req
    const isLoggedIn = !!req.auth
    const isAdmin = req.auth?.user.role === "ADMIN"

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isAdminRoute = nextUrl.pathname.startsWith(adminRoutes)
    const isPrivateRoute = privateRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)

    if (isApiAuthRoute) {
        return NextResponse.next()
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return NextResponse.next()
    }

    if (isAdminRoute) {
        if (isAdmin) {
            return NextResponse.next()
        }
        return NextResponse.redirect(new URL("/not-found", nextUrl))
    }

    if (!isLoggedIn && isPrivateRoute) {
        return NextResponse.redirect(new URL("/auth", nextUrl))
    }


    return NextResponse.next()
})

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}

export const runtime = "experimental-edge"