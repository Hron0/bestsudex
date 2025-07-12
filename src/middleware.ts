import authConfig from "./auth.config"
import NextAuth from "next-auth"
import {
    privateRoutes,
    adminRoutes,
    authRoutes,
    apiAuthPrefix,
    DEFAULT_LOGIN_REDIRECT
} from "../routes"
import {NextRequest, NextResponse} from 'next/server';
import {loggingMiddleware} from "@/lib/loggingMiddleware";
const { auth } = NextAuth(authConfig)

export function middleware(request: NextRequest) {
    // Apply logging to all requests
    return loggingMiddleware(request)
}
//
// export default auth((req) => {
//     const { nextUrl } = req
//     const isLoggedIn = !!req.auth
//     const isAdmin = req.auth?.user.role === "ADMIN"
//
//     const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
//     const isAdminRoute = nextUrl.pathname.startsWith(adminRoutes)
//     const isPrivateRoute = privateRoutes.includes(nextUrl.pathname)
//     const isAuthRoute = authRoutes.includes(nextUrl.pathname)
//
//     if (isApiAuthRoute) {
//         return NextResponse.next()
//     }
//
//     if (isAuthRoute) {
//         if (isLoggedIn) {
//             return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
//         }
//         return NextResponse.next()
//     }
//
//     if (isAdminRoute) {
//         if (isAdmin) {
//             return NextResponse.next()
//         }
//         return NextResponse.redirect(new URL("/not-found", nextUrl))
//     }
//
//     if (!isLoggedIn && isPrivateRoute) {
//         return NextResponse.redirect(new URL("/auth", nextUrl))
//     }
//
//
//     return NextResponse.next()
// })

export const config = {
    runtime: 'nodejs',
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}

