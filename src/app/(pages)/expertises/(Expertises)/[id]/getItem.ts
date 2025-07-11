"use server"

import {db} from "@/backend/db";
import {Expertises} from "@/backend/db/schema";
import {eq} from "drizzle-orm";
import {isEmptyArray} from "is-what";

export async function getItem(id:string) {
    let idD = Number(id)

    const data = await db.select({
        id: Expertises.id,
        title: Expertises.title,
    }).from(Expertises)
        .where(eq(Expertises.id, idD))
        .limit(1)

    if (!data || isEmptyArray(data)) {
        return []
    }

    return data
}