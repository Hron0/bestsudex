"use server"

import Link from "next/link";
import {auth} from "@/auth";

export default async function CreateBtn() {
    const session = await auth()

    return (
        <>
            {session?.user.role == "ADMIN"
                &&
                <Link href={'/expertises/create'} className={'pr-3 text-lg font-black'}>
                    Создать
                </Link>
            }
        </>
    );
};