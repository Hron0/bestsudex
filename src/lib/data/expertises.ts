"use server"

import {db} from "@/backend/db"
import {Expertises} from "@/backend/db/schema"
import {desc, eq} from "drizzle-orm"
import {revalidatePath} from "next/cache"
import fs from "fs/promises"
import path from "path"
import {ExpertiseType} from "@/types/expertise";

const expertiseDirectory = path.join(process.cwd(), "public/content/expertises")

export async function getAllExpertises(): Promise<ExpertiseType[]> {
    return db.select().from(Expertises).orderBy(desc(Expertises.createdAt));
}

export async function getExpertiseById(id: number): Promise<ExpertiseType | null> {
    const expertise = await db.select().from(Expertises).where(eq(Expertises.id, id)).limit(1)
    return expertise[0] || null
}

export async function createExpertise(
    title: string,
    mdxContent: string,
): Promise<ExpertiseType> {
    const filename =
        title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .trim() + ".mdx"

    const [expertise] = await db
        .insert(Expertises)
        .values({
            title,
            mdxFile: filename,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
        .returning()

    try {
        await fs.access(expertiseDirectory)
    } catch {
        await fs.mkdir(expertiseDirectory, {recursive: true})
    }

    // Create MDX file
    const filePath = path.join(expertiseDirectory, filename)
    await fs.writeFile(filePath, mdxContent, "utf-8")

    revalidatePath("/expertises")
    revalidatePath(`/expertises/${expertise.id}`)

    return expertise
}

export async function updateExpertise(
    id: number,
    title: string,
    mdxContent: string,
): Promise<ExpertiseType> {
    const existingExpertise = await getExpertiseById(id)
    if (!existingExpertise) {
        throw new Error("Expertise not found")
    }

    const newFilename =
        title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .trim() + ".mdx"

    const [expertise] = await db
        .update(Expertises)
        .set({
            title,
            mdxFile: newFilename,
            updatedAt: new Date(),
        })
        .where(eq(Expertises.id, id))
        .returning()

    if (newFilename !== existingExpertise.mdxFile) {
        try {
            const oldFilePath = path.join(expertiseDirectory, existingExpertise.mdxFile)
            await fs.unlink(oldFilePath)
        } catch {
        }
    }

    const filePath = path.join(expertiseDirectory, newFilename)
    await fs.writeFile(filePath, mdxContent, "utf-8")

    revalidatePath("/expertises")
    revalidatePath(`/expertises/${expertise.id}`)

    return expertise
}

export async function deleteExpertise(id: number): Promise<void> {
    const expertise = await getExpertiseById(id)
    if (!expertise) {
        throw new Error("Expertise not found")
    }

    try {
        const filePath = path.join(expertiseDirectory, expertise.mdxFile)
        await fs.unlink(filePath)
    } catch {
    }

    // Delete database record
    await db.delete(Expertises).where(eq(Expertises.id, id))

    revalidatePath("/expertises")
}

export async function getMDXContent(filename: string): Promise<string> {
    const filePath = path.join(expertiseDirectory, filename)
    return await fs.readFile(filePath, "utf-8")
}
