import type {Metadata} from "next";
import "./globals.css";
import {SessionProvider} from "@/components/providers/session-provider";
import {auth} from "@/auth";
import {Toaster} from "@/components/ui/sonner"
import {Inter} from "../../public/fonts/fonts";
import React from "react";
import {cn} from "@/lib/utils";
import {Navbar} from "@/components/nav/Navbar";
import {siteConfig} from "../../config/metadata";
import {QueryProvider} from "@/components/providers/query-provider";

export const metadata: Metadata = {
    title: {
        default: siteConfig.title,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    openGraph: {
        title: siteConfig.title,
        description: siteConfig.description,
    },
    icons: {
        icon: "/img/logo.svg",
    },
}

export default async function RootLayout({children,}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth()

    return (
        <html lang="en">
        <body
            className={cn("bg-background w-full flex flex-col items-center", Inter.className)}
        >
        <SessionProvider session={session}>
            <QueryProvider>
                <main className={"flex flex-col justify-between items-center w-full overflow-x-hidden"}>
                    <Navbar/>
                    {children}
                </main>
                <Toaster position="bottom-right"/>
            </QueryProvider>
        </SessionProvider>
        </body>
        </html>
    );
}
