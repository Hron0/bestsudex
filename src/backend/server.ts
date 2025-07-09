import { desc, eq, like, or, gte, lte } from "drizzle-orm"
import { Hono } from "hono"
import { db } from "./db"
import { Expertises, Files, Posts } from "./db/schema"
import { del } from "@vercel/blob"
import {auth} from "@/auth";

export const app = new Hono().basePath("/api")

app.get("/expertise/:id", async ({ req, json }) => {
    const id = Number.parseInt(req.param("id"))

    const expertise = await db.query.Expertises.findFirst({
        where: eq(Expertises.id, id),
        with: {
            documents: true,
        },
    })

    if (!expertise) {
        return json({ error: "Expertise not found" }, { status: 404 })
    }

    return json(expertise)
})


app.get("/expertises/short", async ({ json }) => {
    const data = await db
        .select({
            id: Expertises.id,
            title: Expertises.title,
        })
        .from(Expertises)

    const formattedExpertises = data.map((expertise) => ({
        ...expertise,
    }))

    return json(formattedExpertises)
})

// Для SSG генерации всех Экспертиз
app.get("/expertises/all", async ({ json }) => {
    const data = await db.select({ id: Expertises.id }).from(Expertises)

    return json(data)
})

const POSTS_PER_PAGE = 10

app.get("blog/posts", async ({ req, json }) => {
    const page = Number(req.query("page") || "1")
    const search = req.query("search")
    const startDate = req.query("startDate")
    const endDate = req.query("endDate")
    const limit = POSTS_PER_PAGE
    const offset = (page - 1) * limit

    let query = db.select().from(Posts).leftJoin(Files, eq(Posts.id, Files.postId))

    if (search) {
        query = query.where(or(like(Posts.heading, `%${search}%`), like(Posts.text, `%${search}%`))) as typeof query
    }

    if (startDate) {
        query = query.where(gte(Posts.createdAt, new Date(startDate))) as typeof query
    }

    if (endDate) {
        query = query.where(lte(Posts.createdAt, new Date(endDate))) as typeof query
    }

    const data = await query.orderBy(desc(Posts.createdAt)).limit(limit).offset(offset)

    interface GroupedData {
        [key: number]: {
            id: number
            heading: string | null
            text: string | null
            createdAt: Date | null
            imgUrl?: string | null
            files: Array<{
                id: number
                postId: number | null
                fileUrl: string | null
                fileName: string | null
            }>
        }
    }

    const groupedData = data.reduce<GroupedData>((acc, row) => {
        const postId = row.posts.id
        if (!acc[postId]) {
            acc[postId] = { ...row.posts, files: [] }
        }
        if (row.files) {
            acc[postId].files.push(row.files)
        }
        return acc
    }, {})

    return json(Object.values(groupedData))
})

app.get("/blog/get/:id", async ({ req, json }) => {
    const id = Number.parseInt(req.param("id"))
    const post = await db.query.Posts.findFirst({
        where: eq(Posts.id, id),
        with: {
            files: true,
        },
    })
    return json(post)
})

// TODO: Добавил проверку сессии на удаление Поста, пока не проверял, работает или нет.

app.delete("blog/delete/:id", async ({ req, json }) => {
    const session = await auth()
    const id = Number(req.param("id"))

    // @ts-ignore
    if (session?.user.role === "ADMIN") {
        try {
            const post = await db.query.Posts.findFirst({
                where: eq(Posts.id, id),
                with: {
                    files: true,
                },
            })

            if (post?.imgUrl) {
                await del(post.imgUrl)
            }

            if (post?.files) {
                for (const file of post?.files) {
                    // @ts-ignore
                    await del(file.fileUrl)
                }
            }

            await db.delete(Files).where(eq(Files.postId, id))
            await db.delete(Posts).where(eq(Posts.id, id))

            return json({ success: true })
        } catch (e) {
            const currentTime = new Date().toJSON().slice(0, 10).replace(/-/g, "/")
            console.error(`ERROR DELETING POST AT ${currentTime} : `, e)
            return json({ error: "Что-то пошло не так..." }, 500)
        }
    } else {
        return json({ error: "Bad credentials" }, 401)
    }
})

app.put("blog/redact/:id", async ({ req }) => {
    const id = Number(req.param("id"))

    const data = req.json()
})
