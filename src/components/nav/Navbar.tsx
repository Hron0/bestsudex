"use client"
import * as React from 'react';
import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import Image from 'next/image'
import {cn} from "@/lib/utils";
import {signOut} from "next-auth/react";
import {Button} from "@/components/ui/button";
import {useSessionContext} from "@/components/providers/session-provider";

const rightLinks = [
    {name: "Экспертизы", href: "/expertises/"},
    {name: "Сообщество", href: "/community"},
]

// TODO: legacyBehavior on <Link />
export const Navbar = () => {
    const {session} = useSessionContext()

    const signOutPrompt = () => {
        if (window.confirm('Вы уверены что хотите выйти из аккаунта?')) {
            void signOut()
        }
    }

    return (
        <NavigationMenu
            className={"hidden lg:flex bg-background drop-shadow rounded-sm absolute top-0 h-20 flex-row items-center justify-between mt-4 px-10 container w-full z-10"}>
            <div className={"flex flex-row justify-between items-center gap-4 w-[40%] list-none"}>
                <NavigationMenuItem>
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "text-xl font-light")} asChild>
                        <Link href={"/"} passHref>
                            Главная
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {session &&
                    <NavigationMenuItem>
                        <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "text-xl font-light")}>
                            <Button variant="secondary" onClick={() => signOutPrompt()}>Выйти из аккаунта</Button>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                }
            </div>
            <div
                className={"relative top-12 w-[208px] bg-background aspect-square rounded-md flex flex-col items-center justify-between shadow-xl"}>
                <div className={"relative w-[115px] h-[100px] mt-2"}>
                    <Image
                        src={'/img/logo.png'}
                        fill
                        alt={"Логотип"}
                    />
                </div>

                <div className={"flex flex-col items-center pb-3"}>
                    <h1 className={"font-timesnew text-xl"}>ЛУЧШЕЕ РЕШЕНИЕ</h1>
                    <h3 className={"text-center text-base font-extralight"}>Центр независимых исследований.</h3>
                </div>
            </div>
            <div className={"flex flex-row items-center justify-around gap-2 w-[40%] list-none"}>
                {rightLinks.map((link, index) => (
                    <NavigationMenuItem key={index}>
                            <NavigationMenuLink asChild
                                className={cn(navigationMenuTriggerStyle(), "text-xl font-light px-0.5  text-nowrap")}>
                                <Link href={link.href} passHref>
                                    {link.name}
                                </Link>
                            </NavigationMenuLink>
                    </NavigationMenuItem>
                    ))}
            </div>
        </NavigationMenu>
);
};