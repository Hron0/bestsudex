"use client"
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react"
import { createContext, useContext, type ReactNode } from "react"
import type { Session } from "next-auth"

interface SessionContextType {
    session: Session | null
    isAuthenticated: boolean
    isAdmin: boolean
    user: Session["user"] | null
}

const SessionContext = createContext<SessionContextType>({
    session: null,
    isAuthenticated: false,
    isAdmin: false,
    user: null,
})

interface SessionProviderProps {
    children: ReactNode
    session: Session | null
}

export function SessionProvider({ children, session: initialSession }: SessionProviderProps) {
    const contextValue: SessionContextType = {
        session: initialSession,
        isAuthenticated: !!initialSession?.user,
        isAdmin: initialSession?.user?.role === "ADMIN",
        user: initialSession?.user || null,
    }

    return (
        <NextAuthSessionProvider session={initialSession}>
            <SessionContext.Provider value={contextValue}>{children}</SessionContext.Provider>
        </NextAuthSessionProvider>
    )
}

export const useSessionContext = () => {
    const context = useContext(SessionContext)
    if (!context) {
        throw new Error("useSessionContext must be used within a SessionProvider")
    }
    return context
}
