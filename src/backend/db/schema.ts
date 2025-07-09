import { integer, pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core"
import { relations} from "drizzle-orm"

export const roles = pgEnum("roles", ["USER", "ADMIN"])

export const Users = pgTable("users", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    login: text("login").unique(),
    password: text("password"),
    email: text("email").unique(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    role: roles("role").default("USER"),
    image: text("image"),
})

export const Expertises = pgTable("expertises", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    mdxFile: text("mdx_file").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const Posts = pgTable("posts", {
    id: serial("id").primaryKey(),
    heading: text("heading"),
    text: text("text"),
    imgUrl: text("imgUrl"),
    createdAt: timestamp("created_at").defaultNow(),
})

export const Files = pgTable("files", {
    id: serial("id").primaryKey(),
    postId: integer("postId").references(() => Posts.id),
    fileUrl: text("file_url"),
    fileName: text("file_name"),
})

export const postsRelations = relations(Posts, ({ many }) => ({
    files: many(Files),
}))

export const filesRelations = relations(Files, ({ one }) => ({
    post: one(Posts, {
        fields: [Files.postId],
        references: [Posts.id],
    }),
}))

export const ExpertiseDoc = pgTable("expertiseDocs", {
    id: serial("id").primaryKey(),
    expertiseId: integer("expertiseId").references(() => Expertises.id),
    fileUrl: text("file_url"),
    fileName: text("file_name"),
    fileType: text("file_type"), // 'DOCUMENT', 'IMAGE', 'REPORT', 'EVIDENCE'
    uploadDate: timestamp("upload_date").defaultNow(),
})

export const expertiseRelations = relations(Expertises, ({ many }) => ({
    documents: many(ExpertiseDoc),
}))

export const expertiseDocsRelations = relations(ExpertiseDoc, ({ one }) => ({
    expertise: one(Expertises, {
        fields: [ExpertiseDoc.expertiseId],
        references: [Expertises.id],
    }),
}))
