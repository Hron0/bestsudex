"use server"
import {db} from "@/backend/db";
import {Expertises} from "@/backend/db/schema";

export const getIds = async () => {
    return db.select({id: Expertises.id}).from(Expertises);
}