import type React from "react"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { compileMDX } from "next-mdx-remote/rsc"
import type { MDXComponents } from "mdx/types"
import {useMDXComponents} from "@/lib/mdx-components";

const expertiseDirectory = path.join(process.cwd(), "public/content/expertises")

export interface ExpertiseMDXFrontmatter {
    title: string
    description: string
    expertiseId: number
    status: "DRAFT" | "PUBLISHED"
    slug: string
    publishedAt: string
    updatedAt?: string
    author?: string
    tags?: string[]
}

export interface ExpertiseMDX {
    frontmatter: ExpertiseMDXFrontmatter
    content: React.ReactElement
    slug: string
}

const mdxComponents: MDXComponents = useMDXComponents({})

export async function getExpertiseMDXBySlug(slug: string): Promise<ExpertiseMDX | null> {
    try {
        const filePath = path.join(expertiseDirectory, `${slug}.mdx`)

        if (!fs.existsSync(filePath)) {
            return null
        }

        const fileContent = fs.readFileSync(filePath, "utf8")
        const { data: frontmatter, content: rawContent } = matter(fileContent)

        const { content } = await compileMDX<ExpertiseMDXFrontmatter>({
            source: rawContent,
            components: mdxComponents,
            options: {
                parseFrontmatter: true,
            },
        })

        return {
            frontmatter: frontmatter as ExpertiseMDXFrontmatter,
            content,
            slug,
        }
    } catch (error) {
        console.error(`Error reading MDX file for slug ${slug}:`, error)
        return null
    }
}

export async function getExpertiseMDXById(expertiseId: number): Promise<ExpertiseMDX | null> {
    try {
        if (!fs.existsSync(expertiseDirectory)) {
            return null
        }

        const files = fs.readdirSync(expertiseDirectory)

        for (const file of files) {
            if (file.endsWith(".mdx")) {
                const filePath = path.join(expertiseDirectory, file)
                const fileContent = fs.readFileSync(filePath, "utf8")
                const { data: frontmatter } = matter(fileContent)

                if (frontmatter.expertiseId === expertiseId) {
                    const slug = file.replace(".mdx", "")
                    return await getExpertiseMDXBySlug(slug)
                }
            }
        }

        return null
    } catch (error) {
        console.error(`Error finding MDX file for expertise ID ${expertiseId}:`, error)
        return null
    }
}

export async function getAllExpertiseMDX(): Promise<ExpertiseMDX[]> {
    try {
        if (!fs.existsSync(expertiseDirectory)) {
            return []
        }

        const files = fs.readdirSync(expertiseDirectory)
        const mdxFiles = files.filter((file) => file.endsWith(".mdx"))

        const expertises = await Promise.all(
            mdxFiles.map(async (file) => {
                const slug = file.replace(".mdx", "")
                return await getExpertiseMDXBySlug(slug)
            }),
        )

        return expertises.filter((expertise): expertise is ExpertiseMDX => expertise !== null)
    } catch (error) {
        console.error("Error reading expertise MDX files:", error)
        return []
    }
}

export async function createMDXFile(
    slug: string,
    frontmatter: ExpertiseMDXFrontmatter,
    content: string,
): Promise<void> {
    try {
        // Ensure directory exists
        if (!fs.existsSync(expertiseDirectory)) {
            fs.mkdirSync(expertiseDirectory, { recursive: true })
        }

        const filePath = path.join(expertiseDirectory, `${slug}.mdx`)

        const frontmatterString = Object.entries(frontmatter)
            .map(([key, value]) => {
                if (typeof value === "string") {
                    return `${key}: "${value}"`
                }
                if (Array.isArray(value)) {
                    return `${key}: [${value.map((v) => `"${v}"`).join(", ")}]`
                }
                return `${key}: ${value}`
            })
            .join("\n")

        const fileContent = `---
${frontmatterString}
---

${content}`

        fs.writeFileSync(filePath, fileContent, "utf8")
    } catch (error) {
        console.error(`Error creating MDX file for slug ${slug}:`, error)
        throw error
    }
}

export async function updateMDXFile(
    slug: string,
    frontmatter: ExpertiseMDXFrontmatter,
    content: string,
): Promise<void> {
    try {
        const filePath = path.join(expertiseDirectory, `${slug}.mdx`)

        const frontmatterString = Object.entries(frontmatter)
            .map(([key, value]) => {
                if (typeof value === "string") {
                    return `${key}: "${value}"`
                }
                if (Array.isArray(value)) {
                    return `${key}: [${value.map((v) => `"${v}"`).join(", ")}]`
                }
                return `${key}: ${value}`
            })
            .join("\n")

        const fileContent = `---
${frontmatterString}
---

${content}`

        fs.writeFileSync(filePath, fileContent, "utf8")
    } catch (error) {
        console.error(`Error updating MDX file for slug ${slug}:`, error)
        throw error
    }
}

export async function deleteMDXFile(slug: string): Promise<void> {
    try {
        const filePath = path.join(expertiseDirectory, `${slug}.mdx`)

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath)
        }
    } catch (error) {
        console.error(`Error deleting MDX file for slug ${slug}:`, error)
        throw error
    }
}
