export interface ExpertiseType {
    id: number
    title: string
    mdxFile: string
    createdAt: Date
    updatedAt: Date
}

export interface ExpertiseMDXFrontmatter {
    title: string
    description?: string
    author?: string
    publishedAt?: string
    updatedAt?: string
    tags?: string[]
}

export interface ExpertiseMDX {
    frontmatter: ExpertiseMDXFrontmatter
    content: string
    slug: string
}